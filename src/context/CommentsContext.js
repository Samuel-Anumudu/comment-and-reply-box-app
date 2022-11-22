import { createContext, useState, useEffect } from "react";

const CommentsContext = createContext();

export const CommentsContextProvider = ({ children }) => {
  const [displayConfirmationModal, setDisplayConfirmationModal] =
    useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [id, setId] = useState(null);
  const [comments, setComments] = useState([]);
  const [currentUser, setCurrentUser] = useState([]);

  // Show Modal
  const showDeleteModal = (id) => {
    setId(id);
    setDisplayConfirmationModal(true);
  };

  // Hide the modal
  const hideConfirmationModal = () => {
    setDisplayConfirmationModal(false);
  };

  //  Fetch current user
  const fetchCurrentUser = async () => {
    const res = await fetch("/currentUser");
    const data = await res.json();
    setCurrentUser(data);
  };

  // Fetch comments
  const fetchComments = async () => {
    const res = await fetch("/comments");
    const data = await res.json();
    data.sort((a, b) => (a.score < b.score ? 1 : -1));
    setComments(data);
    // setIsLoading(false);
  };

  useEffect(() => {
    fetchComments();
    fetchCurrentUser();
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  // Delete Comment
  async function deleteComment(id) {
    await fetch(`/comments/${id}`, {
      method: "DELETE",
    });
    setComments(comments.filter((comment) => comment.id !== id));
    setDisplayConfirmationModal(false);
  }

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

  // Increment Score
  async function handleScoreIncrement(id) {
    const newIncScore = comments
      .map((comment) => {
        if (comment.id !== id) {
          return comment;
        } else {
          return {
            ...comment,
            score: comment.score + 1,
          };
        }
      })
      .sort((a, b) => (a.score <= b.score ? 1 : -1));
    setComments(newIncScore);
  }

  // Decrement Score
  function handleScoreDecrement(id) {
    const newDecScore = comments
      .map((comment) => {
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
      })
      .sort((a, b) => (a.score <= b.score ? 1 : -1));
    setComments(newDecScore);
  }

  return (
    <CommentsContext.Provider
      value={{
        comments,
        currentUser,
        isLoading,
        displayConfirmationModal,
        id,
        showDeleteModal,
        hideConfirmationModal,
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
