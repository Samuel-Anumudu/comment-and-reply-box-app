import { useContext } from "react";
import CommentsContext from "../../context/CommentsContext";

function Modal({ hideModal, confirmModal, id }) {
  const { displayConfirmationModal } = useContext(CommentsContext);
  return (
    displayConfirmationModal && (
      <div className="custom-modal p-4 lg:p-0 top-0 right-0 left-0 fixed bg-black/[0.5] w-full h-full z-10 flex justify-center items-center min-h-screen">
        <div className="modal-body bg-white rounded-[8px] w-96 p-6">
          <h3 className=" mb-4 text-[var(--dark-blue)] text-xl font-medium">
            Delete comment
          </h3>
          <p className="font-light">
            Are you sure you want to delete this comment? This will remove the
            comment and can't be undone.
          </p>
          <div className="modal-btn mt-4">
            <button
              className="btn border-none uppercase px-6 bg-[var(--grayish-blue)] hover:bg-[var(--dark-blue)]"
              onClick={hideModal}
            >
              No, Cancel
            </button>
            <button
              onClick={() => confirmModal(id)}
              className="btn border-none uppercase px-6 ml-4 bg-[var(--soft-red)] hover:bg-[var(--pale-red)]"
            >
              Yes, Delete
            </button>
          </div>
        </div>
      </div>
    )
  );
}

export default Modal;
