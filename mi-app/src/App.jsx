// src/App.jsx
import React from "react";
import AppRouter from "./router/AppRouter";
function App() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <AppRouter />
    </div>
  );
}

export default App;
