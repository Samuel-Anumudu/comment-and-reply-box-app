import { useContext, useState } from "react";
import CommentsContext from "../context/CommentsContext";
import { v4 as uuidv4 } from "uuid";

function CommentForm() {
  const [content, setContent] = useState("");

  const { currentUser, addComment } = useContext(CommentsContext);

  const imageURL = currentUser.image && currentUser.image.png;

  function handleSendComment() {
    const date = new Date();
    if (content.trim().length > 0) {
      const newComment = {
        id: uuidv4(),
        content: content,
        createdAt: date.toDateString(),
        score: 0,
        user: {
          ...currentUser,
        },
      };
      addComment(newComment);
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
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default CommentForm;
