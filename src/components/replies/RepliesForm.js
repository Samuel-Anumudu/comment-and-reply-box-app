import { useContext, useState } from "react";
import CommentsContext from "../../context/CommentsContext";

function RepliesForm() {
  const [content, setContent] = useState("");
  const { currentUser, commentId, addReply } = useContext(CommentsContext);

  function handleReply(id) {
    const date = new Date();
    const timestamp = date.toLocaleDateString();
    if (content.trim().length > 0) {
      const newComment = {
        content: content,
        createdAt: timestamp,
        score: 0,
        user: {
          ...currentUser,
        },
      };
      addReply(id, newComment);
      setContent("");
    }
  }

  const imageURL = currentUser.image && currentUser.image.png;
  return (
    <div className="card w-full lg:w-9/12 mx-auto bg-base-100">
      <div className="card-body p-6">
        <div className="block lg:flex justify-between gap-4">
          <div className="hidden lg:flex avatar w-11 h-11">
            <div className="w-24 rounded-full">
              <img
                src={imageURL || "./images/avatars/image-juliusomo.png"}
                alt={currentUser.username}
              />
            </div>
          </div>

          <div className="form-control w-full lg:w-5/6">
            <input
              value={content}
              onChange={(e) => setContent(e.target.value)}
              type="text"
              className="cursor-pointer input caret-[var(--moderate-blue)] input-bordered pb-20 focus:outline-none pt-6 outline-none border border-[var(--moderate-blue)]"
            />
          </div>
          <button
            className="lg:block hidden btn border-none bg-[var(--moderate-blue)] px-8 font-medium hover:bg-[var(--light-grayish-blue)]"
            onClick={() => handleReply(commentId)}
          >
            Reply
          </button>
          {/*  */}
          <div className="lg:hidden flex items-center justify-between mt-4">
            <div className=" avatar w-11 h-11">
              <div className="w-24 rounded-full">
                <img
                  src={imageURL || "./images/avatars/image-juliusomo.png"}
                  alt={currentUser.username}
                />
              </div>
            </div>
            <button
              className="btn border-none bg-[var(--moderate-blue)] px-8 font-medium hover:bg-[var(--light-grayish-blue)]"
              onClick={() => handleReply(commentId)}
            >
              Reply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RepliesForm;
