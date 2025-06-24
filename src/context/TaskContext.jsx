import React, { createContext, useState, useEffect } from "react";

export const TaskContext = createContext();

const STORAGE_KEY = 'task_categories_v1';

export const TaskProvider = ({ children }) => {
  const [categories, setCategories] = useState(() => {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(categories));
  }, [categories]);

  // Estrutura das categorias: [{ id, name, tasks: [{ id, text, completed }] }]

  const addCategory = (name) => {
    setCategories((prev) => [
      ...prev,
      { id: Date.now().toString(), name, tasks: [] }
    ]);
  };

  const addTask = (categoryId, text) => {
    setCategories((prev) =>
      prev.map((cat) =>
        cat.id === categoryId
          ? {
              ...cat,
              tasks: [
                ...cat.tasks,
                { id: Date.now().toString(), text, completed: false }
              ]
            }
          : cat
      )
    );
  };

  const toggleTask = (categoryId, taskId) => {
    setCategories((prev) =>
      prev.map((cat) =>
        cat.id === categoryId
          ? {
              ...cat,
              tasks: cat.tasks.map((task) =>
                task.id === taskId
                  ? { ...task, completed: !task.completed }
                  : task
              )
            }
          : cat
      )
    );
  };

  const removeCategory = (categoryId) => {
    setCategories((prev) => prev.filter((cat) => cat.id !== categoryId));
  };

  const removeTask = (categoryId, taskId) => {
    setCategories((prev) =>
      prev.map((cat) =>
        cat.id === categoryId
          ? {
              ...cat,
              tasks: cat.tasks.filter((task) => task.id !== taskId)
            }
          : cat
      )
    );
  };

  const editCategory = (categoryId, newName) => {
    setCategories((prev) =>
      prev.map((cat) =>
        cat.id === categoryId ? { ...cat, name: newName } : cat
      )
    );
  };

  const editTask = (categoryId, taskId, newText) => {
    setCategories((prev) =>
      prev.map((cat) =>
        cat.id === categoryId
          ? {
              ...cat,
              tasks: cat.tasks.map((task) =>
                task.id === taskId ? { ...task, text: newText } : task
              )
            }
          : cat
      )
    );
  };

  return (
    <TaskContext.Provider value={{ categories, addCategory, addTask, toggleTask, removeCategory, removeTask, editCategory, editTask }}>
      {children}
    </TaskContext.Provider>
  );
}; 