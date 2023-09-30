import React from "react";

function DialogModal({
  idToDelete = null,
  title,
  content,
  handleConfirmDelete,
  setShowModal,
}) {
  const confirmAndCloseModal = () => {
    handleConfirmDelete();
    setShowModal(false);
  };

  return (
    <div
      className="modal fade"
      id="confirmationModal"
      tabIndex="-1"
      aria-labelledby="modal"
      aria-hidden={false}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="modal">
              {title}
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            {content} <span id="idToDelete">{idToDelete} </span>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              onClick={() => setShowModal(false)}
            >
              Annuler
            </button>
            <button
              type="button"
              className="btn btn-danger"
              data-bs-dismiss="modal"
              onClick={handleConfirmDelete}
            >
              Confirm Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DialogModal;
