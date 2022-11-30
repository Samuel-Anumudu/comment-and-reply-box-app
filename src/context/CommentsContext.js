import { comment } from "postcss";
import { createContext, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

const CommentsContext = createContext();

export const CommentsContextProvider = ({ children }) => {
  const [comments, setComments] = useState([]);
  const [currentUser, setCurrentUser] = useState([]);
  const [isDeleted, setIsDeleted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isReplied, setIsReplied] = useState(true);
  const [displayConfirmationModal, setDisplayConfirmationModal] =
    useState(false);
  const [commentId, setCommentId] = useState(null);
  const [replyId, setReplyId] = useState(null);
  const [showDeleteReplyModal, setShowDeleteReplyModal] = useState(false);
  const [commentEdit, setCommentEdit] = useState({
    item: {},
    isEdited: false,
  });

  useEffect(() => {
    fetchComments();
    fetchCurrentUser();
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  // Replies
  const handleReplyClick = (id) => {
    setIsReplied(true);
    setCommentId(id);
    setComments(
      comments.map((comment) => {
        if (comment.id === id) {
          return {
            ...comment,
            isReplying: true,
          };
        } else {
          return comment;
        }
      })
    );
  };

  // Show Reply Modal
  const deleteReplyModal = (id) => {
    setReplyId(id);
    setShowDeleteReplyModal(true);
  };

  // Hide Reply Modal
  const hideReplyModal = () => {
    setShowDeleteReplyModal(false);
  };

  // Show Comment Modal
  const showDeleteModal = (id) => {
    setCommentId(id);
    setDisplayConfirmationModal(true);
  };

  // Hide Comment modal
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

  // Delete Comment
  async function deleteComment(id) {
    await fetch(`/comments/${id}`, {
      method: "DELETE",
    });
    setComments(comments.filter((comment) => comment.id !== id));
    setDisplayConfirmationModal(false);
    setIsDeleted(true);
  }

  // Delete Reply
  function deleteReply(replyId) {
    const replyArray = comments.map((comment) => comment.replies);
    for (let i = 0; i < replyArray.length; ++i) {
      if (replyArray[i].length) {
        replyArray[i].splice(i, 1);
      }
    }

    setShowDeleteReplyModal(false);
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

  // Add Reply
  function addReply(id, newReply) {
    setComments(
      comments.map((comment) => {
        if (comment.id === id) {
          comment.replies.push({
            ...newReply,
            id: uuidv4(),
            replyingTo: comment.user.username,
          });
          return comment;
        } else {
          return comment;
        }
      })
    );
    setIsReplied(false);
  }

  // Edit Comment
  const editComment = (item) => {
    setCommentEdit({
      item,
      isEdited: true,
    });
    setIsDeleted(false);
  };

  // Update Comment
  const updateFeedback = async (id, updatedComment) => {
    const res = await fetch(`/comments/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedComment),
    });

    const data = await res.json();
    setComments(
      comments.map((comment) =>
        comment.id === id ? { ...comment, ...data } : comment
      )
    );
  };

  // Increment Score
  function handleScoreIncrement(id) {
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
        isReplied,
        isDeleted,
        isLoading,
        displayConfirmationModal,
        commentId,
        replyId,
        commentEdit,
        showDeleteReplyModal,
        deleteReplyModal,
        handleReplyClick,
        addReply,
        hideReplyModal,
        showDeleteModal,
        hideConfirmationModal,
        addComment,
        deleteComment,
        deleteReply,
        editComment,
        updateFeedback,
        handleScoreIncrement,
        handleScoreDecrement,
      }}
    >
      {children}
    </CommentsContext.Provider>
  );
};

export default CommentsContext;
