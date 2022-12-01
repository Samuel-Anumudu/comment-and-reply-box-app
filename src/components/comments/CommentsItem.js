import { FaReply, FaPlus, FaMinus, FaTrash, FaPen } from "react-icons/fa";
import { useContext } from "react";
import CommentsContext from "../../context/CommentsContext";
import RepliesList from "../replies/RepliesList";
import RepliesForm from "../replies/RepliesForm";

function CommentsItem({ comment }) {
  const {
    isReplied,
    handleReplyClick,
    showDeleteModal,
    handleScoreIncrement,
    editComment,
    handleScoreDecrement,
    currentUser,
  } = useContext(CommentsContext);

  return (
    <>
      <div className="card rounded-[8px] w-full lg:w-9/12 mx-auto	bg-base-100">
        <div className="card-body p-4 lg:p-6">
          <div className="block lg:flex items-start justify-between">
            <div className="hidden flex-child lg:flex flex-col items-center gap-4 py-3 px-3 text-center bg-[var(--very-light-gray)] rounded-[10px]">
              <button className="increment text-xs text-[var(--light-grayish-blue)]">
                <FaPlus onClick={() => handleScoreIncrement(comment.id)} />
              </button>
              <p className="font-medium text-[var(--moderate-blue)]">
                {comment.score}
              </p>
              <button className="decrement text-xs text-[var(--light-grayish-blue)]">
                <FaMinus onClick={() => handleScoreDecrement(comment.id)} />
              </button>
            </div>
            <div className="flex-child flex flex-col gap-4 w-full lg:ml-6">
              <div className="flex items-center gap-4">
                <div className="avatar w-8">
                  <div className="w-24 rounded-full">
                    <img src={comment.user.image.png} alt={comment.username} />
                  </div>
                </div>
                <div className="font-medium text-[var(--dark-blue)]">
                  {comment.user.username}
                </div>
                {comment.user.username === currentUser.username && (
                  <span className="bg-blue-500 inline-block px-[0.3rem] pb-[0.1rem] text-sm font-bold text-white rounded-[2px]">
                    you
                  </span>
                )}
                <div className="font-normal text-[var(--grayish-blue)]">
                  {comment.createdAt}
                </div>
              </div>
              <div className="text-base text-[var(--grayish-blue)] font-normal">
                {comment.content}
              </div>
            </div>
            <div className="hidden flex-child lg:flex items-center gap-4">
              {comment.user.username === currentUser.username ? (
                <button
                  className="flex items-center"
                  onClick={() => showDeleteModal(comment.id)}
                >
                  <FaTrash />
                  <span>Delete</span>
                </button>
              ) : (
                <button
                  onClick={() => {
                    handleReplyClick(comment.id);
                  }}
                  className="flex items-center text-[var(--moderate-blue)]"
                >
                  <FaReply />
                  <span className="font-medium inline-block pl-2">Reply</span>
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
            <div className="flex lg:hidden items-center justify-between">
              <div className="flex-child flex items-center gap-4 py-3 px-3 text-center bg-[var(--very-light-gray)] rounded-[10px]">
                <button className="increment text-xs">
                  <FaPlus onClick={() => handleScoreIncrement(comment.id)} />
                </button>
                <p>{comment.score}</p>
                <button className="decrement text-xs">
                  <FaMinus onClick={() => handleScoreDecrement(comment.id)} />
                </button>
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
                  <button
                    onClick={() => {
                      handleReplyClick(comment.id);
                    }}
                    className="flex items-center"
                  >
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
      </div>

      {comment.isReplying && isReplied ? <RepliesForm /> : null}
      {comment && comment.replies && comment.replies.length ? (
        <RepliesList replies={comment.replies} />
      ) : null}
    </>
  );
}

export default CommentsItem;
