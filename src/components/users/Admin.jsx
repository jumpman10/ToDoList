import {useState} from 'react';
import useLocalStorage from 'use-local-storage';
import './admin.css';
import {TasksOptions} from '../items/TasksOptions';
import {CreatTask} from '../forms/CreatTask';
import {ModalConfirm} from '../items/ModalConfirm';
import {useFetchTasksQuery} from '../../slices/todoApi';
import {EditTask} from '../forms/EditTask';
const Admin = () => {
  const [isDark] = useLocalStorage('isDark', false);
  const [searchTerm, setSearchTerm] = useState('');
  const {data: tasks, isLoading} = useFetchTasksQuery();
  const [newTaskActive, setNewTaskActive] = useState(false);
  const [editTaskActive, setEditTaskActive] = useState(false);
  const [eliminateModal, setEliminateModal] = useState(false);
  const [eliminateId, setEliminateId] = useState('');
  const [editId, setEditId] = useState('');
  const [filterState, setFilterState] = useState('');
  const handleSearch = event => {
    setSearchTerm(event.target.value);
  };

  const filterByTaskState = state => {
    setFilterState(state);
  };
  const filteredData = tasks?.filter(item => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    const matchesSearchTerm =
      item?.title.toLowerCase().startsWith(lowerCaseSearchTerm) ||
      item?.createdAt.includes(searchTerm) ||
      item?.expiration_date.includes(searchTerm);
    const matchesTaskState = filterState ? item.status === filterState : true;
    return matchesSearchTerm && matchesTaskState;
  });
  const createTask = () => {
    setNewTaskActive(false);
  };
  const edit = id => {
    setEditTaskActive(true);
    setEditId(id);
  };
  const eliminateTask = id => {
    setEliminateModal(true);
    setEliminateId(id);
  };
  return (
    <div className="container" data-theme={isDark ? 'dark' : 'light'}>
      <TasksOptions
        handleSearch={handleSearch}
        searchTerm={searchTerm}
        filterByTaskState={filterByTaskState}
        setNewTaskActive={setNewTaskActive}
        type="tasks"
      />
      {eliminateModal && (
        <ModalConfirm
          title="Eliminar"
          text="¿Desea eliminar esta tarea?"
          closeModal={setEliminateModal}
          taskId={eliminateId}
          type="task"
        />
      )}
      <div className="tasks-container">
        <div className="tasks">
          <div className="resp-tasks">
            <div className="tasks-data">
              <div className="task-title">
                <h3>Título</h3>
              </div>
              <div className="task-title" style={{width: '80%'}}>
                <h3 className="task-item" style={{width: '35%'}}>
                  Descripción
                </h3>
                <h3 className="task-item" style={{width: '10%'}}>
                  Fecha de creación
                </h3>
                <h3 className="task-item" style={{width: '10%'}}>
                  Fecha de expiración
                </h3>
                <h3 className="task-item" style={{width: '15%'}}>
                  Creador
                </h3>
                <h3 className="task-item" style={{width: '10%'}}>
                  Estado
                </h3>
                <h3 className="task-item" style={{width: '20%'}}></h3>
              </div>
            </div>
          </div>
          {newTaskActive && (
            <CreatTask
              createTask={createTask}
              setNewTaskActive={setNewTaskActive}
            />
          )}
          {!isLoading ? (
            filteredData?.map((e, i) => (
              <div key={i}>
                {editTaskActive && editId === e.id && (
                  <EditTask
                    setEditTaskActive={setEditTaskActive}
                    taskbyId={e}
                    idTask={editId}
                    setEditId={setEditId}
                  />
                )}
                <div className="edit-task">
                  <div
                    className="task"
                    style={{
                      backgroundColor:
                        e.status === 'pending'
                          ? 'var(--inprocess-color)'
                          : 'var(--complete-color)',
                      margin: '15px auto',
                    }}>
                    <div className="task-title">
                      <h1 className="title">{e.title}</h1>
                    </div>
                    <div className="task-description">
                      <div className="description">
                        <textarea
                          value={e.description}
                          name="description"
                          disabled
                        />
                      </div>
                      <input
                        className="date"
                        value={e.createdAt.slice(0, 10)}
                        name="createdAt"
                        type="date"
                        disabled
                      />
                      <input
                        className="date"
                        value={e.expiration_date.slice(0, 10)}
                        name="createdAt"
                        type="date"
                        disabled
                      />
                      <div className="task-userdata">
                        <h3>{e.user.name}</h3>
                      </div>
                      {e.status === 'pending' ? (
                        <h3 className="taskState">Pendiente</h3>
                      ) : (
                        <h3 className="taskState">Completada</h3>
                      )}
                      <div className="edit-area">
                        <button className="edit-btn" onClick={() => edit(e.id)}>
                          Editar
                        </button>
                        <button
                          className="delete-btn"
                          onClick={() => eliminateTask(e.id)}>
                          Eliminar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="loading"> </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;
