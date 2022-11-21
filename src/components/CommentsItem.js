import { FaReply, FaPlus, FaMinus, FaTrash } from "react-icons/fa";
import { useContext } from "react";
import CommentsContext from "../context/CommentsContext";

function CommentsItem({ comment }) {
  const {
    deleteComment,
    handleScoreIncrement,
    handleScoreDecrement,
    currentUser,
  } = useContext(CommentsContext);

  return (
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

          <div className="flex-child">
            {comment.user.username === currentUser.username ? (
              <div>
                <label htmlFor="my-modal" className="cursor-pointer">
                  <div className="flex items-center">
                    <FaTrash />
                    <span>Delete</span>
                  </div>
                </label>
                <input type="checkbox" id="my-modal" className="modal-toggle" />
                <div className="modal">
                  <div className="modal-box">
                    <h3 className="font-bold text-lg">
                      Congratulations random Internet user!
                    </h3>
                    <p className="py-4">
                      You've been selected for a chance to get one year of
                      subscription to use Wikipedia for free!
                    </p>
                    <div className="modal-action">
                      <label htmlFor="my-modal" className="btn uppercase">
                        No, Cancel
                      </label>
                      <label
                        onClick={() => deleteComment(comment.id)}
                        htmlFor="my-modal"
                        className="btn uppercase"
                      >
                        Yes, Delete
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <button className="flex items-center">
                <FaReply />
                <span>Reply</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommentsItem;
