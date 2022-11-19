import { FaReply, FaPlus, FaMinus } from "react-icons/fa";
import { useContext } from "react";
import CommentsContext from "../context/CommentsContext";

function CommentsItem({ comment }) {
  const { currentUser } = useContext(CommentsContext);
  console.log(currentUser.username);
  return (
    <div className="card w-9/12 mx-auto	bg-base-100">
      <div className="card-body">
        <div className="flex justify-between">
          <div className="flex-child flex flex-col gap-4 bg-[var(--very-light-gray)] p-4 rounded-[15px]">
            <button>
              <FaPlus />
            </button>
            <p>{comment.score}</p>
            <button>
              <FaMinus />
            </button>
          </div>
          <div className="flex-child flex flex-col gap-4 w-full ml-6">
            <div className="flex items-center gap-4">
              <div className="avatar w-8">
                <div className="w-24 rounded-full">
                  <img src={comment.user.image.png} />
                </div>
              </div>
              <div>{comment.user.username}</div>
              {comment.user.username === currentUser.username ? (
                <div className="bg-blue-500 text-white px-2 block">you</div>
              ) : (
                <div></div>
              )}

              <div>{comment.createdAt}</div>
            </div>
            <div>{comment.content}</div>
          </div>

          <div className="flex-child">
            <button className="flex justify-center items-center">
              <span className="inline-block mr-3">
                <FaReply />
              </span>
              Reply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommentsItem;
