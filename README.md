# Wild Oasis Project

## Overview
The **Wild Oasis** project is a modern web application built using **React**, enhanced with **LangChain** for AI-driven interactions. This project demonstrates the power of modern web development tools, focusing on mastering **React fundamentals**, state management, performance optimization, SPA development, and integrating AI functionalities. Additionally, the application is deployed on **AWS** using **SAM (Serverless Application Model)** for efficient and scalable cloud management.

---

## Table of Contents
1. [SPA Development](#spa-development)
2. [App Deployment with SAM on AWS](#app-deployment-with-sam-on-aws)
3. [RAG Implementation](#rag-implementation)
4. [Technologies Used](#technologies-used)
5. [Installation](#installation)
6. [Contributing](#contributing)
7. [License](#license)

---

## SPA Development
In this section, we explore the **Single Page Application (SPA)** architecture using **React**. The app is built with the following core concepts:
- **React Fundamentals**: Understanding JSX, components, props, and state management.
- **State & Component Philosophy**: Mastering state placement, component splitting, and reusable components.
- **Effects & Hooks**: Deep dive into `useEffect`, lifecycle syncing, and custom hooks.
- **Performance Optimization**: Learning memoization techniques and optimizing renders.
- **Advanced State Management**: Leveraging `useReducer`, `Context API`, `Redux Toolkit`, and **React Query**.
- **SPA Development**: Building the application using **Vite** and **React Router**.

Additionally, **LangChain** is integrated to explore **ReactAgent** with retrievals, enhancing the app with AI-driven features.

---

## App Deployment with SAM on AWS
The **Wild Oasis** app is deployed on **AWS** using **CloudFormation** to manage infrastructure, providing a scalable and efficient cloud environment for serving the React web app. Here's how the deployment is structured:
- **Static Files on S3**: HTML, JavaScript, CSS, and other assets are stored in an S3 bucket.
- **Serving via CloudFront**: The static files are served securely using **CloudFront** with HTTPS and caching.
- **EC2 Instance for AI Interaction**: An EC2 instance is running **Ollama** for AI interaction, integrated with a **Lambda function** to handle CORS errors.
- **GitHub Actions Workflows**: 
  - One workflow for **static code analysis** to ensure high-quality code.
  - Another for **deployment of infrastructure** and continuous integration.

---

## RAG Implementation
The **Wild Oasis** project integrates **Retrieval-Augmented Generation (RAG)** using **LangChain** to create a dynamic and intelligent chatbot. The chatbot is capable of answering user queries based on real-time data from the cabins and bookings database.

### Key Components:
1. **OllamaEmbeddings**: Used to create embeddings for textual data.
2. **CharacterTextSplitter**: Splits data into manageable chunks.
3. **MemoryVectorStore**: Stores the embedded data in memory for efficient retrieval.
4. **ChatGoogleGenerativeAI**: Powers the chatbot's ability to generate responses based on retrieved data.
5. **AgentExecutor**: Manages the interaction between the user, retrieval system, and LLM.


## Installation

To set up the **Wild Oasis** project locally, follow these steps:

### Prerequisites:
- **Node.js** (>= 16.0)
- **npm** (>= 8.0)
- **AWS CLI** (for SAM deployment)
- **AWS SAM CLI** (for managing serverless applications)

### Steps:
1. **Clone the repository**:
    ```bash
    git clone https://github.com/your-username/wild-oasis.git
    cd wild-oasis
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Run the application locally**:
    ```bash
    npm run dev
    ```
    This will start a local development server using **Vite**, and the application will be available at [http://localhost:3000](http://localhost:3000).

4. **Deploy to AWS using SAM**:
    To deploy the application on AWS, use the **AWS SAM CLI**:
    ```bash
    sam build
    sam deploy --guided
    ```
    Follow the prompts to set up the deployment, including the AWS region, stack name, and other configurations.
5. **Sync the build folder to the S3 bucket**:
    After building your app locally, use this command to sync the build folder with the S3 bucket:
    ```bash
    aws s3 sync ./build s3://your-s3-bucket-name --delete
    ```

6. **Invalidate CloudFront Cache**:
    After syncing the files to S3, run this command to invalidate the CloudFront distribution and refresh the cache:
    ```bash
    aws cloudfront create-invalidation --distribution-id your-cloudfront-distribution-id --paths "/*"
    ```

7. **Access the app**:
    Your app should now be accessible through the CloudFront URL, for example:
    ```
    https://your-cloudfront-url.cloudfront.net
    ```
