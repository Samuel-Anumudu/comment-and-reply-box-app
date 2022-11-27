import { FaReply, FaPlus, FaMinus, FaTrash, FaPen } from "react-icons/fa";
import { useContext } from "react";
import CommentsContext from "../context/CommentsContext";
function RepliesItem({ reply }) {
  const { currentUser } = useContext(CommentsContext);
  return (
    <div className="card w-[100%] mx-auto bg-base-100 ">
      <div className="card-body">
        <div className="flex items-start justify-between">
          <div className="flex-child flex flex-col items-center gap-4 py-3 px-4 text-center bg-[var(--very-light-gray)] rounded-[10px]">
            <button className="increment text-xs">
              <FaPlus />
            </button>
            <p>{reply.score}</p>
            <button className="decrement text-xs">
              <FaMinus />
            </button>
          </div>
          <div className="flex-child flex flex-col gap-4 w-full ml-6">
            <div className="flex items-center gap-4">
              <div className="avatar w-8">
                <div className="w-24 rounded-full">
                  <img src={reply.user.image.png} alt={reply.username} />
                </div>
              </div>
              <div>{reply.user.username}</div>
              {reply.user.username === currentUser.username && (
                <span className="bg-blue-500 inline-block px-[0.3rem] pb-[0.1rem] text-sm font-bold text-white rounded-[2px]">
                  you
                </span>
              )}
              <div>{reply.createdAt}</div>
            </div>
            <div className="text-base">
              <span className="text-blue-500">@{reply.replyingTo} </span>
              {reply.content}
            </div>
          </div>
          <div className="flex-child flex items-center gap-4">
            {reply.user.username === currentUser.username ? (
              <button className="flex items-center">
                <FaTrash />
                <span>Delete</span>
              </button>
            ) : (
              <button className="flex items-center">
                <FaReply />
                <span>Reply</span>
              </button>
            )}
            {reply.user.username === currentUser.username && (
              <button className="flex items-center">
                <FaPen />
                <span>Edit</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RepliesItem;
