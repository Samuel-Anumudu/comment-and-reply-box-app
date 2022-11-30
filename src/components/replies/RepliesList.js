import { useContext } from "react";
import CommentsContext from "../../context/CommentsContext";
import ReplyModal from "../replies/ReplyModal";

import RepliesItem from "./RepliesItem";

function RepliesList({ replies }) {
  const { hideReplyModal, replyId, deleteReply } = useContext(CommentsContext);
  return (
    <>
      <article className="sm:w-9/12  mx-auto pl-[3.275rem]">
        <div className="flex items-stretch justify-between gap-10">
          <div className="reply__custom-line lg:h-auto lg:w-[2px] bg-[var(--light-gray)] border"></div>
          <div className="flex flex-col gap-6 grow">
            {replies.map((reply) => (
              <RepliesItem key={reply.id} reply={reply} />
            ))}
          </div>
        </div>
      </article>
      <ReplyModal
        hideModal={hideReplyModal}
        confirmModal={deleteReply}
        id={replyId}
      />
    </>
  );
}

export default RepliesList;
