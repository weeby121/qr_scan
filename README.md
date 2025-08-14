# Firebase Studio

This is a NextJS starter in Firebase Studio.

To get started, take a look at src/app/page.tsx.

## Running Locally

To run this project on your own machine, follow these steps:

### 1. Install Dependencies

First, install the necessary Node.js packages using npm:

```bash
npm install
```

### 2. Set Up Environment Variables

The project uses Genkit with the Google AI plugin, which requires a Gemini API key.

1.  Create a new file named `.env.local` in the root of your project.
2.  Add your Gemini API key to this file:

```
GEMINI_API_KEY=your_api_key_here
```

You can obtain a Gemini API key from Google AI Studio.

### 3. Run the Development Servers

You need to run two development servers concurrently in separate terminal windows.

1.  **Run the Next.js application:**

    ```bash
    npm run dev
    ```

    This will start the frontend on `http://localhost:9002`.

2.  **Run the Genkit flows:**

    ```bash
    npm run genkit:watch
    ```

    This will start the Genkit development server, which your Next.js application will communicate with for AI functionality.
