REST Client Web Application
A modern, full-stack REST client built with React and Node.js, designed for making and inspecting HTTP requests. This application serves as a lightweight, web-based alternative to tools like Postman, with a focus on performance and a clean user experience.

✨ Features
Full HTTP Method Support: Send GET, POST, PUT, and DELETE requests.

Request Configuration: Add a JSON body and custom headers for complex requests.

Dynamic Response Viewer: View formatted JSON responses and error messages instantly without page reloads.

Persistent Request History: All requests are automatically saved to a database for later use.

Interactive History Panel: Click any past request to instantly load its configuration into the main panel.

Performance Optimized: The history list is virtualized with react-window to handle thousands of entries smoothly.

Fully Responsive: The UI adapts seamlessly from mobile devices to large desktop screens.

🛠️ Tech Stack
This project is a monorepo containing a separate frontend and backend, each with its own modern technology stack.

Backend
Runtime: Node.js

Framework: Express.js

Database: SQLite

ORM: MikroORM (for elegant database interaction)

Language: TypeScript

Core Packages: cors, body-parser

Frontend
Framework: React 19

Build Tool: Vite

Language: TypeScript

Styling: Tailwind CSS

API Communication: Axios

Server State Management: TanStack Query (React Query)

Performance: react-window & react-virtualized-auto-sizer for list virtualization

📂 Project Structure
The project is organized into two main directories: backend and frontend. Both follow a clean, modular architecture to separate concerns.

/
├── backend/
│   ├── src/
│   │   ├── api/          # API routes (v1)
│   │   ├── controller/   # Handles request/response logic
│   │   ├── db/           # Database connection (MikroORM)
│   │   ├── services/     # Business logic and database interaction
│   │   ├── shared/       # Shared types and entities
│   │   └── server.ts     # Main Express server entry point
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── api/          # Axios client configuration
    │   ├── modules/      # Feature-based modules (History, Request)
    │   │   ├── components/
    │   │   ├── hooks/
    │   │   └── services/
    │   ├── App.tsx       # Main application layout
    │   └── main.tsx      # React app entry point
    └── package.json

🚀 Getting Started
To run this project locally, you will need Node.js installed.

1. Clone the Repository
git clone https://github.com/your-username/rest-client-app.git
cd rest-client-app

2. Set Up the Backend
Navigate to the backend directory, install dependencies, and start the server.

cd backend
npm install
npm run dev

The backend server will start on http://localhost:7777.

3. Set Up the Frontend
Open a new terminal window, navigate to the frontend directory, install dependencies, and start the development server.

cd frontend
npm install
npm run dev

The frontend application will be available at http://localhost:5173.