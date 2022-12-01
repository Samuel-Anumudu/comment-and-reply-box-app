import { FaReply, FaPlus, FaMinus, FaTrash, FaPen } from "react-icons/fa";
import { useContext } from "react";
import CommentsContext from "../../context/CommentsContext";
import RepliesForm from "./RepliesForm";

function RepliesItem({ reply }) {
  const { currentUser, deleteReplyModal, handleReplyClick } =
    useContext(CommentsContext);

  console.log(reply);
  return (
    <div className="card rounded-[8px] w-[100%] max-w-full mx-auto bg-base-100 ">
      <div className="card-body p-4 lg:p-6">
        <div className="block lg:flex items-start justify-between">
          <div className="hidden flex-child lg:flex flex-col items-center gap-4 py-3 px-3 text-center bg-[var(--very-light-gray)] rounded-[10px]">
            <button className="increment text-xs text-[var(--light-grayish-blue)]">
              <FaPlus />
            </button>
            <p className="font-medium text-[var(--moderate-blue)]">
              {reply.score}
            </p>
            <button className="decrement text-xs text-[var(--light-grayish-blue)]">
              <FaMinus />
            </button>
          </div>
          <div className="flex-child flex flex-col gap-4 w-full lg:ml-6">
            <div className="flex items-center gap-4">
              <div className="avatar w-8">
                <div className="w-24 rounded-full">
                  <img src={reply.user.image.png} alt={reply.username} />
                </div>
              </div>
              <div className="font-medium text-[var(--dark-blue)]">
                {reply.user.username}
              </div>
              {reply.user.username === currentUser.username && (
                <span className="bg-[var(--moderate-blue)] inline-block px-[0.3rem] pb-[0.1rem] text-sm  text-white rounded-[2px]">
                  you
                </span>
              )}
              <div className="font-normal text-[var(--grayish-blue)]">
                {reply.createdAt}
              </div>
            </div>
            <div className="text-base text-[var(--grayish-blue)] font-light">
              <span className="font-medium text-[var(--moderate-blue)]">
                @{reply.replyingTo}{" "}
              </span>
              {reply.content}
            </div>
          </div>
          <div className="hidden flex-child lg:flex items-center gap-4 ">
            {reply.user.username === currentUser.username ? (
              <button
                onClick={() => deleteReplyModal(reply.id)}
                className="flex items-center text-[var(--soft-red)] font-medium hover:text-[var(--pale-red)]"
              >
                <FaTrash />
                <span className="inline-block pl-2">Delete</span>
              </button>
            ) : (
              <button className="flex items-center text-[var(--moderate-blue)] hover:text-[var(--light-grayish-blue)]">
                <FaReply />
                <span className="font-medium inline-block pl-2">Reply</span>
              </button>
            )}
            {reply.user.username === currentUser.username && (
              <button className="flex items-center text-[var(--moderate-blue)] hover:text-[var(--light-grayish-blue)]">
                <FaPen />
                <span className="inline-block pl-2 font-medium">Edit</span>
              </button>
            )}
          </div>

          <div className="flex lg:hidden items-center justify-between">
            <div className="flex-child flex items-center gap-4 py-3 px-3 text-center bg-[var(--very-light-gray)] rounded-[10px]">
              <button className="increment text-xs text-[var(--light-grayish-blue)]">
                <FaPlus />
              </button>
              <p className="font-medium text-[var(--moderate-blue)]">
                {reply.score}
              </p>
              <button className="decrement text-xs text-[var(--light-grayish-blue)]">
                <FaMinus />
              </button>
            </div>
            <div className="flex-child flex items-center gap-4 ">
              {reply.user.username === currentUser.username ? (
                <button
                  onClick={() => deleteReplyModal(reply.id)}
                  className="flex items-center text-[var(--soft-red)] font-medium hover:text-[var(--pale-red)]"
                >
                  <FaTrash />
                  <span className="inline-block pl-2">Delete</span>
                </button>
              ) : (
                <button className="flex items-center text-[var(--moderate-blue)] hover:text-[var(--light-grayish-blue)]">
                  <FaReply />
                  <span className="font-medium inline-block pl-2">Reply</span>
                </button>
              )}
              {reply.user.username === currentUser.username && (
                <button className="flex items-center text-[var(--moderate-blue)] hover:text-[var(--light-grayish-blue)]">
                  <FaPen />
                  <span className="font-medium inline-block pl-2">Edit</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RepliesItem;
