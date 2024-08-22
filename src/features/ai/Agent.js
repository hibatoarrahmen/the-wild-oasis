import { initializeAgentExecutorWithOptions } from "langchain/agents";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

export class Agent {
  executor;

  async init({ apiKey, temperature, tools }) {
    // setup the agent to be connected to the Gemini api and connect the external tools

    const model = new ChatGoogleGenerativeAI({
      model: "gemini-pro",
      apiKey,
      temperature,
      verbose: false,
    });

    this.executor = await initializeAgentExecutorWithOptions(tools, model, {
      // create our agent executor, this will be used to run our prompts
      agentType: "structured-chat-zero-shot-react-description",
    });
  }

  async run(input, logProcess = false) {
    const result = await this.executor.invoke(
      { input },
      {
        // sending our request to the Gemini API, if needed it will call our tools to get additional information
        callbacks: [
          {
            handleAgentAction(action, runId) {
              // this function will be invoked if a tool is called
              if (logProcess) console.log("\nhandleAgentAction", action, runId);
            },
            handleAgentEnd(action, runId) {
              // this function will be invoked once the agent is finished and returned an answer
              if (logProcess) console.log("\nhandleAgentEnd", action, runId);
            },
            handleToolEnd(output, runId) {
              // this function will be invoked when the tool finished
              if (logProcess) console.log("\nhandleToolEnd", output, runId);
            },
          },
        ],
      }
    );

    return result;
  }
}
