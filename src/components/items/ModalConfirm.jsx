import PropTypes from 'prop-types';
import './modalConfirm.css';
import {useDeletebyIdMutation} from '../../slices/todoApi';
import {useDeleteUserMutation} from '../../slices/usersApi';
export const ModalConfirm = ({title, text, taskId, closeModal, type}) => {
  const [deleteTask] = useDeletebyIdMutation();
  const [deleteUser] = useDeleteUserMutation();
  const deleteTaskbyId = () => {
    if (type === 'user') {
      deleteUser(taskId);
    } else {
      deleteTask(taskId);
    }
    closeModal(false);
  };
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
          <button name="confirm" onClick={() => deleteTaskbyId()}>
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
  taskId: PropTypes.number.isRequired,
  closeModal: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
};
