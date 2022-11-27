import React from "react";
import { CommentsContextProvider } from "./context/CommentsContext";
import CommentsList from "./components/CommentsList";
import CommentForm from "./components/CommentForm";

function App() {
  return (
    <CommentsContextProvider>
      <main className="container px-4 mx-auto py-16 w-screen ">
        <CommentsList />
        <CommentForm />
      </main>
    </CommentsContextProvider>
  );
}

export default App;
