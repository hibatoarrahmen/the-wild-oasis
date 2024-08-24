import React, { useEffect, useState } from "react";

import { OllamaEmbeddings } from "@langchain/ollama";

import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

import { AgentExecutor, createReactAgent } from "langchain/agents";
import type { PromptTemplate } from "@langchain/core/prompts";

import { pull } from "langchain/hub";
import { Calculator } from "@langchain/community/tools/calculator";

import Spinner from "../../ui/Spinner";
import { CharacterTextSplitter } from "langchain/text_splitter";

import { MemoryVectorStore } from "langchain/vectorstores/memory";

interface Cabin {
  id: number;
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  description: string;
  image: string;
}
interface Booking {
  id: number;
  cabinId: number;
  userId: number;
  startDate: string;
  endDate: string;
  numberOfGuests: number;
  totalPrice: number;
  status: "confirmed" | "pending" | "canceled";
}

interface ChatMessagesProps {
  chatInput: string;
  cabins: Cabin[];
  bookings: Booking[];
}

const ChatMessages: React.FC<ChatMessagesProps> = ({
  chatInput,
  cabins,
  bookings,
}) => {
  const [response, setResponse] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchResponse = async () => {
      setIsLoading(true);

      const tools = [new Calculator()];
      const text = `#${cabins}#${bookings}`;
      console.log(text);
      const splitter = new CharacterTextSplitter({
        separator: "#",
        chunkSize: 1000,
        chunkOverlap: 3,
      });

      const docs = await splitter.createDocuments([text]);
      console.log(docs);
      const embeddings = new OllamaEmbeddings({
        model: "mxbai-embed-large", // Default value
        baseUrl: "http://localhost:11434", // Default value
      });

      const vectorStore = new MemoryVectorStore(embeddings);
      await vectorStore.addDocuments(docs);

      const retriever = vectorStore.asRetriever({
        k: 1,
      });

      const retrievedDocuments = await retriever.invoke(chatInput);
      const relevantData = retrievedDocuments[0].pageContent;

      const llm = new ChatGoogleGenerativeAI({
        modelName: "gemini-pro",
        maxOutputTokens: 2048,
        apiKey: "AIzaSyAjXRi1CmpiiRwQe1P8-VtP5J5P60ZASRM",
      });

      const promptWithChat = await pull<PromptTemplate>("hwchase17/react-chat");

      const agentWithChat = await createReactAgent({
        llm,
        tools,
        prompt: promptWithChat,
      });

      const agentExecutorWithChat = new AgentExecutor({
        agent: agentWithChat,
        tools,
      });

      const result = await agentExecutorWithChat.invoke({
        input: `${chatInput}`,
        chat_history: `Human: Hi! use this information as context  ${relevantData}  \nAI: ok i got it !`,
      });

      try {
        if (result && result.output) {
          setResponse(result.output);
        } else {
          setResponse("No response received.");
        }
      } catch (error) {
        console.error("Failed to fetch response:", error);
        setResponse("Error fetching response.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchResponse();
  }, [cabins, chatInput]);

  return <div>{isLoading ? <Spinner /> : response}</div>;
};

export default ChatMessages;
