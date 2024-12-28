# Image Generation Application Using GenAI LLM

## Overview
This application leverages a pre-existing GenAI Large Language Model (LLM) to generate images based on user input. The application uses OpenAI's API to interact with the model and allows users to create custom images by providing text prompts.

It utilizes the **Retrieval-Augmented Generation (RAG)** approach to integrate external data sources and generate context-aware images. The application can be installed, configured, and run locally.

## Features
- Generate images based on text prompts provided by users.
- Simple backend using **Express** to handle API requests.
- Integration with OpenAI’s image generation model.
- Easy configuration with an API key using environment variables.

## Prerequisites
- **Node.js** (v14 or higher)
- An **OpenAI API key** (obtainable from [OpenAI's official website](https://beta.openai.com/signup/))
- Basic knowledge of running Node.js applications

## Setup Instructions

### 1. Clone the Repository
Clone this repository to your local machine using the following command:
```bash
git clone https://github.com/your-username/image-generation-app.git
cd image-generation-app
