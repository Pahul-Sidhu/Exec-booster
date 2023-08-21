const express = require("express");
const app = express();
const fs = require("fs");
const routerAI = express.Router();
const dotenv = require("dotenv");
const { OpenAI } = require("langchain/llms/openai");
const { loadQARefineChain } = require("langchain/chains");
const { Document } = require("langchain/document");
const { RecursiveCharacterTextSplitter } = require("langchain/text_splitter");
const { TextLoader } = require("langchain/document_loaders/fs/text");
const { MemoryVectorStore } = require("langchain/vectorstores/memory");
const { OpenAIEmbeddings } = require("langchain/embeddings/openai");
const { TokenTextSplitter } = require("langchain/text_splitter");

dotenv.config();
app.use(express.json());
app.use(express.urlencoded());

var docOutput = null;
var store = null;

const model = new OpenAI({
  temperature: 0,
  maxConcurrency: 6,
  openAIApiKey: process.env.AI_KEY, // In Node.js defaults to process.env.OPENAI_API_KEY
});

const embeddings = new OpenAIEmbeddings({ openAIApiKey: process.env.AI_KEY });

const chainA = loadQARefineChain(model);

const splitter = new TokenTextSplitter({
  encodingName: "gpt2",
  chunkSize: 500,
  chunkOverlap: 0,
});

routerAI.post("/completions", async (req, res) => {
  const text = req.body.data;
  if (docOutput === null) docOutput = await splitter.createDocuments([text]);

  try {
    const question_user =
      req.body.query + " from the documents i have provided.";
    if (store === null)
      store = await MemoryVectorStore.fromDocuments(docOutput, embeddings);

    const relevantDocs = await store.similaritySearch(question_user);

    var resB = await chainA.call({
      input_documents: relevantDocs,
      question: question_user,
    });
    console.log(resB);

    if (
      resB.output_text.includes("I don't know") ||
      resB.output_text.includes("No relevant text.") ||
      resB.output_text.includes("The documents provided do not")
    ) {
      resB = await model.predict(question_user );
    }

    if (!resB.hasOwnProperty("output_text")) {
      res.send(`${resB}`);
    } else {
      res.send(resB.output_text);
    }
    console.log(resB);
  } catch (error) {
    console.log(error);
  }
});

module.exports = { routerAI };
