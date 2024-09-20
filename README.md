
# Project Setup Instructions

## 1. Clone the Repository

First, clone the repository to your local machine:

```bash
git clone <repository-url>
cd <repository-directory>
```

## 2. Install Dependencies

You need to run `npm install` in the following directories:

- Inside the **root** folder:
    ```bash
    npm install
    ```

- Inside the **client** folder:
    ```bash
    cd client
    npm install
    cd ..
    ```

- Inside the **server** folder:
    ```bash
    cd server
    npm install
    cd ..
    ```

## 3. Set Up Environment Variables

Copy the environment variable file in the **server** folder:

1. Navigate to the **server** folder:
    ```bash
    cd server
    ```

2. Copy the `.env.example` file to `.env`:
    ```bash
    cp .env.example .env
    ```

3. Update the secrets and configuration in the `.env` file as needed.

## 4. Update `server.js`

Make any required updates to `server.js` inside the `server` folder based on your application requirements.

## 5. Running the Application

You have two options to run the application:

### Option 1: Using npm

In the root folder, run the following command to bring up both the client and server in watch mode:

```bash
npm run dev
```

### Option 2: Using VS Code Debugging

You can debug the application in VS Code. Ensure your launch configuration is set up to run both the client and server simultaneously.

---

With either option, the application should be running with hot-reload capabilities, allowing you to work on both the client and server.
