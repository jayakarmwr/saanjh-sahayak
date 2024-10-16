from flask import Flask, request, jsonify
from flask_cors import CORS
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_community.llms import LlamaCpp
from langchain_community.vectorstores import FAISS
from langchain_community.document_loaders import PyPDFLoader
from langchain.chains import ConversationalRetrievalChain
from langchain.memory import ConversationBufferMemory
from langchain.text_splitter import RecursiveCharacterTextSplitter
import os
import tempfile

app = Flask(__name__)
CORS(app)

# Initialize the embeddings, vector store, and chain
def create_conversational_chain():
    # Define the LLM and embeddings
    llm = LlamaCpp(
        model_path="mistral-7b-instruct-v0.1.Q4_K_M.gguf",
        temperature=0.75,
        top_p=1,
        verbose=True,
        n_ctx=4096
    )
    
    embeddings = HuggingFaceEmbeddings(
        model_name="sentence-transformers/all-MiniLM-L6-v2", 
        model_kwargs={'device': 'cpu'}
    )
    
    memory = ConversationBufferMemory(memory_key="chat_history", return_messages=True)

    # Initialize chain without documents
    chain = ConversationalRetrievalChain.from_llm(
        llm=llm,
        retriever=None,  # No retriever yet
        memory=memory
    )
    return chain, memory, embeddings

# Create global chain and memory
chain, memory, embeddings = create_conversational_chain()

@app.route('/upload', methods=['POST'])
def upload_files():
    files = request.files.getlist("files")
    text = []

    for file in files:
        file_extension = os.path.splitext(file.filename)[1]
        with tempfile.NamedTemporaryFile(delete=False) as temp_file:
            temp_file.write(file.read())
            temp_file_path = temp_file.name

        loader = None
        if file_extension == ".pdf":
            loader = PyPDFLoader(temp_file_path)

        if loader:
            text.extend(loader.load())
            os.remove(temp_file_path)

    text_splitter = RecursiveCharacterTextSplitter(chunk_size=10000, chunk_overlap=20)
    text_chunks = text_splitter.split_documents(text)

    # Create vector store from documents and update the retriever in the chain
    vector_store = FAISS.from_documents(text_chunks, embedding=embeddings)
    chain.retriever = vector_store.as_retriever(search_kwargs={"k": 2})

    return jsonify({"message": "Files processed and vector store updated."})

@app.route('/chat', methods=['POST'])
def chat():
    data = request.json
    user_input = data.get('userInput')
    history = data.get('history', [])

    try:
        # Run the chain and get the response
        result = chain({"question": user_input, "chat_history": history})
        answer = result["answer"]

        return jsonify({'answer': answer})

    except Exception as e:
        print(f"Error: {e}")
        return jsonify({'error': 'An error occurred while processing your request.'}), 500

if __name__ == '__main__':
    app.run(port=5000, debug=True)
