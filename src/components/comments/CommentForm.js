import { useContext, useState, useEffect } from "react";
import CommentsContext from "../../context/CommentsContext";

function CommentForm() {
  const {
    currentUser,
    addComment,
    commentEdit,
    updateFeedback,
    isDeleted,
    replyEdit,
  } = useContext(CommentsContext);

  const imageURL = currentUser.image && currentUser.image.png;
  const [content, setContent] = useState("");

  useEffect(() => {
    if (commentEdit.isEdited === true) {
      setContent(commentEdit.item.content);
    }
    if (isDeleted) {
      commentEdit.isEdited = false;
      setContent("");
    }
    // Can work without this cleanup code
    return () => {
      commentEdit.isEdited = false;
    };
  }, [commentEdit, isDeleted]);

  function handleSendComment() {
    const date = new Date();
    const timestamp = date.toDateString() + " @ " + date.toLocaleTimeString();
    if (content.trim().length > 0) {
      const newComment = {
        content: content,
        createdAt: timestamp,
        score: 0,
        user: {
          ...currentUser,
        },
      };
      if (commentEdit.isEdited === true) {
        updateFeedback(commentEdit.item.id, newComment);
        commentEdit.isEdited = false;
      } else {
        addComment(newComment);
      }
      setContent("");
    }
  }

  return (
    <div className="card w-9/12 mx-auto bg-base-100 mt-6">
      <div className="card-body">
        <div className="flex justify-between">
          <div className="avatar w-11 h-11">
            <div className="w-24 rounded-full">
              <img
                src={imageURL || "./images/avatars/image-juliusomo.png"}
                alt={currentUser.username}
              />
            </div>
          </div>

          <div className="form-control w-5/6">
            <input
              onChange={(e) => setContent(e.target.value)}
              value={content}
              type="text"
              placeholder="Add a comment…"
              className="input input-bordered pb-20 pt-6"
            />
          </div>
          <button onClick={handleSendComment} className="btn">
            {commentEdit.isEdited ? "Update" : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CommentForm;
