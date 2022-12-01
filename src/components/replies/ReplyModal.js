import { useContext } from "react";
import CommentsContext from "../../context/CommentsContext";

function ReplyModal({ hideModal, confirmModal, id }) {
  const { showDeleteReplyModal } = useContext(CommentsContext);
  return (
    showDeleteReplyModal && (
      <div className="custom-modal p-4 lg:p-0  top-0 right-0 left-0 fixed bg-black/[0.5] w-full h-full z-10 flex justify-center items-center min-h-screen">
        <div className="modal-body bg-white rounded-[8px] w-96 p-6">
          <h3 className="font-bold mb-4">Delete reply</h3>
          <p>
            Are you sure you want to delete this reply? This will remove the
            reply and can't be undone.
          </p>
          <div className="modal-btn mt-4">
            <button
              onClick={hideModal}
              className="btn border-none uppercase px-6"
            >
              No, Cancel
            </button>
            <button
              // onClick={() => confirmModal(id)}
              onClick={hideModal}
              className="btn bg-red-400 border-none uppercase px-6 ml-4"
            >
              Yes, Delete
            </button>
          </div>
        </div>
      </div>
    )
  );
}

export default ReplyModal;
