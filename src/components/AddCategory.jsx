import React, { useState, useContext } from "react";
import { TaskContext } from "../context/TaskContext";
import { TextField, Button, InputAdornment } from '@mui/material';
import { MdCategory } from 'react-icons/md';
import { SnackbarContext } from '../App';

const AddCategory = () => {
  const [name, setName] = useState("");
  const { addCategory } = useContext(TaskContext);
  const showSnackbar = useContext(SnackbarContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      addCategory(name.trim());
      setName("");
      showSnackbar('Categoria adicionada!', 'success');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", gap: 8, marginBottom: 16 }}>
      <TextField
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Nova categoria"
        required
        size="small"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <MdCategory />
            </InputAdornment>
          ),
        }}
        sx={{ flex: 1 }}
      />
      <Button type="submit" variant="contained" color="primary" size="small">Adicionar</Button>
    </form>
  );
};

export default AddCategory; 