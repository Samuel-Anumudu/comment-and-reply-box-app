import { createContext, useState, useEffect } from "react";

const CommentsContext = createContext();

export const CommentsContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [comments, setComments] = useState([]);
  const [currentUser, setCurrentUser] = useState([]);

  //  Fetch current user
  const fetchCurrentUser = async () => {
    const res = await fetch("/currentUser");
    const data = await res.json();
    setCurrentUser(data);
  };

  // Fetch comments
  const fetchComments = async () => {
    const res = await fetch("/comments?_sort=id");
    const data = await res.json();
    setComments(data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchComments();
    fetchCurrentUser();
  }, []);

  // Add Comment
  async function addComment(newComment) {
    const res = await fetch("/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newComment),
    });
    const data = await res.json();
    setComments([...comments, data]);
  }

  // Delete Comment
  async function deleteComment(id) {
    await fetch(`/comments/${id}`, {
      method: "DELETE",
    });
    setComments(comments.filter((comment) => comment.id !== id));
  }

  // Increment Score
  function handleScoreIncrement(id) {
    const newIncScore = comments.map((comment) => {
      if (comment.id !== id) {
        return comment;
      } else {
        return {
          ...comment,
          score: comment.score + 1,
        };
      }
    });
    setComments(newIncScore);
  }

  // Decrement Score
  function handleScoreDecrement(id) {
    const newDecScore = comments.map((comment) => {
      if (comment.score === 0) {
        return comment;
      }

      if (comment.id !== id) {
        return comment;
      } else {
        return {
          ...comment,
          score: comment.score - 1,
        };
      }
    });

    setComments(newDecScore);
  }

  return (
    <CommentsContext.Provider
      value={{
        comments,
        currentUser,
        isLoading,
        addComment,
        deleteComment,
        handleScoreIncrement,
        handleScoreDecrement,
      }}
    >
      {children}
    </CommentsContext.Provider>
  );
};

export default CommentsContext;
