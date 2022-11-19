import { motion, AnimatePresence } from "framer-motion";
import { useContext } from "react";
import CommentsContext from "../context/CommentsContext";
import CommentsItem from "./CommentsItem";
import Spinner from "./Spinner";

function CommentsList() {
  const { comments, isLoading } = useContext(CommentsContext);

  return isLoading ? (
    <Spinner />
  ) : (
    <section className="flex flex-col gap-6">
      <AnimatePresence>
        {comments.map((comment) => (
          <motion.div
            key={comment.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <CommentsItem key={comment.id} comment={comment} />
          </motion.div>
        ))}
      </AnimatePresence>
    </section>
  );

  // return isLoading ? (
  //   <Spinner />
  // ) : (
  //   <section className="py-16 flex flex-col gap-6">
  //     {comments.map((comment) => (
  //       <CommentsItem key={comment.id} comment={comment} />
  //     ))}
  //   </section>
  // );
}

export default CommentsList;
