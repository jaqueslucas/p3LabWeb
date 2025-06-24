import React, { useState, useContext } from "react";
import { TaskContext } from "../context/TaskContext";
import { TextField, Button, InputAdornment } from '@mui/material';
import { MdOutlineAddTask } from 'react-icons/md';
import { SnackbarContext } from '../App';

const AddTask = ({ categoryId }) => {
  const [text, setText] = useState("");
  const { addTask } = useContext(TaskContext);
  const showSnackbar = useContext(SnackbarContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      addTask(categoryId, text.trim());
      setText("");
      showSnackbar('Tarefa adicionada!', 'success');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", gap: 8, marginBottom: 8 }}>
      <TextField
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Nova tarefa"
        required
        size="small"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <MdOutlineAddTask />
            </InputAdornment>
          ),
        }}
        sx={{ flex: 1 }}
      />
      <Button type="submit" variant="contained" color="primary" size="small">Adicionar</Button>
    </form>
  );
};

export default AddTask; 