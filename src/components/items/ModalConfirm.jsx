import React from 'react';
import PropTypes from 'prop-types';
import './modalConfirm.css';
export const ModalConfirm = ({title, text, confirmFunction, closeModal}) => {
  return (
    <div className="modal-container">
      <div className="modal">
        <div className="modal-title">
          <h1>{title}</h1>
        </div>
        <div className="modal-text">
          <h2>{text}</h2>
        </div>
        <div className="modal-buttons">
          <button name="confirm" onClick={() => confirmFunction()}>
            Aceptar
          </button>
          <button name="cancel" onClick={() => closeModal(false)}>
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

ModalConfirm.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  confirmFunction: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
};
