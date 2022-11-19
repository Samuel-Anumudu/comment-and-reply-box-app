import { createContext, useState, useEffect } from "react";

const CommentsContext = createContext();

export const CommentsContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [currentUser, setCurrentUser] = useState([]);

  //  Fetch current user
  const fetchCurrentUser = async () => {
    const res = await fetch("http://localhost:5000/currentUser");
    const data = await res.json();
    setCurrentUser(data);
  };

  //   Fetch comments
  const fetchComments = async () => {
    const res = await fetch("http://localhost:5000/comments?_sort=id");
    const data = await res.json();
    setComments(data);
    setIsLoading(false);
  };

  // Add Comment
  function addComment(newComment) {
    setComments([...comments, newComment]);
  }

  useEffect(() => {
    fetchComments();
    fetchCurrentUser();
    addComment();
  }, []);

  return (
    <CommentsContext.Provider
      value={{ comments, currentUser, isLoading, addComment }}
    >
      {children}
    </CommentsContext.Provider>
  );
};

export default CommentsContext;
