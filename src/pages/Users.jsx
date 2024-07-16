import {useState} from 'react';
import PropTypes from 'prop-types';
import {useFetchUsersQuery} from '../slices/usersApi';
import './styles/users.css';
import {TasksOptions} from '../components/items/TasksOptions';
import {EditUser} from '../components/forms/EditUser';
import {CreateUser} from '../components/forms/CreateUser';
import {ModalConfirm} from '../components/items/ModalConfirm';
const Users = ({isDark}) => {
  const {data: users, isLoading} = useFetchUsersQuery();
  const [searchTerm, setSearchTerm] = useState('');
  const [newUserActive, setNewUserActive] = useState(false);
  const [editUserActive, setEditUserActive] = useState(false);
  const [eliminateModal, setEliminateModal] = useState(false);
  const [eliminateId, setEliminateId] = useState('');
  const [editId, setEditId] = useState('');
  const [filterState, setFilterState] = useState('');
  const handleSearch = event => {
    setSearchTerm(event.target.value);
  };

  const filterByUserType = state => {
    setFilterState(state);
  };
  const filteredData = users?.filter(item => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    const matchesSearchTerm =
      item?.name.toLowerCase().startsWith(lowerCaseSearchTerm) ||
      item?.email.includes(searchTerm);
    const matchesUsersTypes = filterState ? item.type === filterState : true;
    return matchesSearchTerm && matchesUsersTypes;
  });
  const edit = id => {
    setEditUserActive(true);
    setEditId(id);
  };
  const eliminateUser = id => {
    setEliminateModal(true);
    setEliminateId(id);
  };
  return (
    <div data-theme={isDark ? 'dark' : 'light'} className="users-container">
      <TasksOptions
        handleSearch={handleSearch}
        searchTerm={searchTerm}
        filterByTaskState={filterByUserType}
        setNewTaskActive={setNewUserActive}
        type="users"
      />
      {eliminateModal && (
        <ModalConfirm
          title="Eliminar"
          text="¿Desea eliminar este usuario?"
          closeModal={setEliminateModal}
          taskId={eliminateId}
          type="user"
        />
      )}
      <div className="tasks-container">
        <div className="tasks">
          {!newUserActive && (
            <div className="resp-tasks">
              <div className="tasks-data">
                <div className="task-title">
                  <h3 className="task-item">Nombre</h3>
                </div>
                <div
                  className="task-user-description"
                  style={{alignItems: 'center'}}>
                  <div className="description">
                    <h3 className="task-item">Email</h3>
                  </div>
                  <h3 className="task-item">Tipo</h3>
                  <div className="edit-area"></div>
                </div>
              </div>
            </div>
          )}
          {newUserActive && <CreateUser setNewUserActive={setNewUserActive} />}
          {!isLoading ? (
            filteredData.map((e, i) => (
              <div key={i}>
                {editUserActive && editId === e.id && (
                  <EditUser
                    idUser={editId}
                    userbyId={e}
                    setEditId={setEditId}
                    setEditUserActive={setEditUserActive}
                  />
                )}
                <div className="edit-task">
                  <div
                    className="user"
                    style={{
                      margin: '15px auto',
                    }}>
                    <div className="task-title">
                      <h1 className="title">{e.name}</h1>
                    </div>
                    <div className="task-user-description">
                      <div className="description">
                        <h2 className="taskState">{e.email}</h2>
                      </div>
                      {e.type === 'admin' ? (
                        <h3 className="taskState">Administrador</h3>
                      ) : (
                        <h3 className="taskState">Regular</h3>
                      )}
                      <div className="edit-area">
                        {!editUserActive &&
                          !newUserActive &&
                          !eliminateModal && (
                            <>
                              <button
                                className="edit-btn"
                                onClick={() => edit(e.id)}>
                                Editar
                              </button>
                              <button
                                className="delete-btn"
                                onClick={() => eliminateUser(e.id)}>
                                Eliminar
                              </button>
                            </>
                          )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="loading">Loading...</div>
          )}
        </div>
      </div>
    </div>
  );
};
export default Users;

Users.propTypes = {
  isDark: PropTypes.bool.isRequired,
};
