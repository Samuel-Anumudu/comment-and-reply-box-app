import { motion, AnimatePresence } from "framer-motion";
import { useContext } from "react";
import CommentsContext from "../../context/CommentsContext";
import CommentsItem from "../comments/CommentsItem";
import Spinner from "../spinner/Spinner";
import CommentModal from "./CommentModal";

function CommentsList() {
  const {
    comments,
    isLoading,
    hideConfirmationModal,
    deleteComment,
    commentId,
  } = useContext(CommentsContext);

  // With Animation
  // return isLoading ? (
  //   <Spinner />
  // ) : (
  //   <section className="flex flex-col gap-6">
  //     <AnimatePresence>
  //       {comments.map((comment) => (
  //         <motion.div
  //           key={comment.id}
  //           initial={{ opacity: 0 }}
  //           animate={{ opacity: 1 }}
  //           exit={{ opacity: 0 }}
  //         >
  //           <CommentsItem key={comment.id} comment={comment} />
  //         </motion.div>
  //       ))}
  //     </AnimatePresence>
  //     <Modal
  //       hideModal={hideConfirmationModal}
  //       confirmModal={deleteComment}
  //       id={id}
  //     />
  //   </section>
  // );

  // Without Animation
  return isLoading ? (
    <Spinner />
  ) : (
    <>
      <section className="flex flex-col gap-4">
        {comments.map((comment) => (
          <CommentsItem key={comment.id} comment={comment} />
        ))}
        <CommentModal
          hideModal={hideConfirmationModal}
          confirmModal={deleteComment}
          id={commentId}
        />
      </section>
    </>
  );
}

export default CommentsList;
