import { FaReply, FaPlus, FaMinus, FaTrash, FaPen } from "react-icons/fa";
import { useContext } from "react";
import CommentsContext from "../context/CommentsContext";

function CommentsItem({ comment }) {
  const {
    showDeleteModal,
    handleScoreIncrement,
    editComment,
    handleScoreDecrement,
    currentUser,
  } = useContext(CommentsContext);

  return (
    <>
      <div className="card w-9/12 mx-auto	bg-base-100">
        <div className="card-body">
          <div className="flex items-start justify-between">
            <div className="flex-child flex flex-col items-center gap-4 py-3 px-4 text-center bg-[var(--very-light-gray)] rounded-[10px]">
              <button className="increment text-xs">
                <FaPlus onClick={() => handleScoreIncrement(comment.id)} />
              </button>
              <p>{comment.score}</p>
              <button className="decrement text-xs">
                <FaMinus onClick={() => handleScoreDecrement(comment.id)} />
              </button>
            </div>
            <div className="flex-child flex flex-col gap-4 w-full ml-6">
              <div className="flex items-center gap-4">
                <div className="avatar w-8">
                  <div className="w-24 rounded-full">
                    <img src={comment.user.image.png} alt={comment.username} />
                  </div>
                </div>
                <div>{comment.user.username}</div>
                {comment.user.username === currentUser.username && (
                  <span className="bg-blue-500 inline-block px-[0.3rem] pb-[0.1rem] text-sm font-bold text-white rounded-[2px]">
                    you
                  </span>
                )}
                <div>{comment.createdAt}</div>
              </div>
              <div className="text-base">{comment.content}</div>
            </div>
            <div className="flex-child flex items-center gap-4">
              {comment.user.username === currentUser.username ? (
                <button
                  className="flex items-center"
                  onClick={() => showDeleteModal(comment.id)}
                >
                  <FaTrash />
                  <span>Delete</span>
                </button>
              ) : (
                <button className="flex items-center">
                  <FaReply />
                  <span>Reply</span>
                </button>
              )}
              {comment.user.username === currentUser.username && (
                <button
                  className="flex items-center"
                  onClick={() => editComment(comment)}
                >
                  <FaPen />
                  <span>Edit</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CommentsItem;
