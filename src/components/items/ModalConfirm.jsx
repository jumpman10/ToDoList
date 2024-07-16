import PropTypes from 'prop-types';
import './modalConfirm.css';
import {useDeletebyIdMutation} from '../../slices/todoApi';
import {useDeleteUserMutation} from '../../slices/usersApi';
export const ModalConfirm = ({title, text, taskId, closeModal, type}) => {
  const [deleteTask, {isLoading: loadingTask}] = useDeletebyIdMutation();
  const [deleteUser, {isLoading: loadingUser}] = useDeleteUserMutation();
  const deleteTaskbyId = () => {
    if (type === 'user') {
      try {
        deleteUser(taskId);
        if (!loadingTask) {
          alert('Eliminaste al usuario!');
        }
      } catch (error) {
        alert('Algo falló intentalo nuevamente', error);
      }
    } else {
      try {
        deleteTask(taskId);
        if (!loadingUser) {
          alert('Eliminaste la tarea!');
        }
      } catch (error) {
        alert('Algo falló intentalo nuevamente', error);
      }
    }
    closeModal(false);
  };
  return (
    <div className="modal-container">
      <div className="modal">
        {loadingTask ||
          (loadingUser && <div className="loading">Loading...</div>)}
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
