import React, {useState} from 'react';
import './tasks.css';
import {CreatTask} from '../forms/CreatTask';
export const Tasks = () => {
  const [isMoved, setIsMoved] = useState(false);
  const [showComponent, setShowComponent] = useState(false);
  const handleButtonClick = () => {
    setShowComponent(true);
    setTimeout(() => {
      setIsMoved(true);
    }, 100);
  };
  return (
    <div className="container-tasks">
      <div className="dropdown">Crear</div>
      <div className="dropdown-content">
        <h1>Crear tarea</h1>
        <CreatTask />
      </div>
    </div>
  );
};
