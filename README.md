# Focus Loop

Focus Loop is a modern, customizable productivity timer application designed to help you maintain focus and manage your work sessions effectively. Built with React, TypeScript, and Vite, it offers a seamless experience with features like customizable timer modes, loop counting, and user authentication.

## Features

- **Flexible Timer Modes**: Switch between Work, Short Break, Long Break, and Custom timer modes to suit your workflow.
- **Customizable Durations**: Adjust the duration for each mode in the settings panel.
- **Loop Counting**: Track your work cycles (loops) to monitor your productivity sessions.
- **Audio Alerts**: Get notified with audio alerts when a timer completes.
- **User Authentication**: Sign in to save your preferences and track your progress (powered by Supabase).
- **Theme Support**: Toggle between Light and Dark modes for visual comfort.
- **Fullscreen Mode**: Eliminate distractions by using the application in fullscreen.
- **Responsive Design**: Works beautifully on desktop and mobile devices.

## Tech Stack

- **Frontend Framework**: [React](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: CSS (with CSS Variables for theming)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Backend/Auth**: [Supabase](https://supabase.com/)

## Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/) (usually comes with Node.js)

## Installation & Setup

1.  **Clone the repository**
    ```bash
    git clone <repository-url>
    cd timer
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Environment Configuration**
    Create a `.env` file in the root directory and add your Supabase credentials:
    ```env
    VITE_SUPABASE_URL=your_supabase_url
    VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
    ```

4.  **Start the development server**
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:5173`.

## Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the application for production.
- `npm run lint`: Runs ESLint to check for code quality issues.
- `npm run preview`: Previews the production build locally.

## License

This project is open source and available under the [MIT License](LICENSE).
