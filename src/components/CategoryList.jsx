import React, { useContext } from "react";
import { TaskContext } from "../context/TaskContext";
import AddTask from "./AddTask";
import TaskList from "./TaskList";
import { Card, CardContent, Typography, IconButton, Box, TextField, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';
import { MdDelete, MdEdit, MdCheck, MdClose } from 'react-icons/md';
import { SnackbarContext } from '../App';

const CategoryList = () => {
  const { categories, removeCategory, editCategory } = useContext(TaskContext);
  const [editingId, setEditingId] = React.useState(null);
  const [editValue, setEditValue] = React.useState("");
  const showSnackbar = useContext(SnackbarContext);
  const [confirmOpen, setConfirmOpen] = React.useState(false);
  const [toDeleteId, setToDeleteId] = React.useState(null);

  if (categories.length === 0) {
    return <Typography color="text.secondary">Nenhuma categoria criada ainda.</Typography>;
  }

  return (
    <Box display="flex" flexDirection="column" gap={3}>
      {categories.map((cat) => (
        <Card key={cat.id} sx={{ position: 'relative', borderRadius: 2 }}>
          <IconButton onClick={() => { setToDeleteId(cat.id); setConfirmOpen(true); }} sx={{ position: 'absolute', top: 8, right: 8 }} color="error" className="delete-btn">
            <MdDelete />
          </IconButton>
          <IconButton onClick={() => { setEditingId(cat.id); setEditValue(cat.name); }} sx={{ position: 'absolute', top: 8, right: 48 }} color="primary">
            <MdEdit />
          </IconButton>
          <CardContent>
            {editingId === cat.id ? (
              <Box display="flex" alignItems="center" gap={1} mb={2}>
                <TextField
                  value={editValue}
                  onChange={e => setEditValue(e.target.value)}
                  size="small"
                  autoFocus
                  onKeyDown={e => {
                    if (e.key === 'Enter') {
                      editCategory(cat.id, editValue.trim());
                      setEditingId(null);
                      showSnackbar('Categoria editada!', 'success');
                    } else if (e.key === 'Escape') {
                      setEditingId(null);
                    }
                  }}
                />
                <IconButton color="success" onClick={() => { editCategory(cat.id, editValue.trim()); setEditingId(null); showSnackbar('Categoria editada!', 'success'); }}><MdCheck /></IconButton>
                <IconButton color="error" onClick={() => setEditingId(null)}><MdClose /></IconButton>
              </Box>
            ) : (
              <Typography variant="h6" gutterBottom>{cat.name}</Typography>
            )}
            <AddTask categoryId={cat.id} />
            <TaskList tasks={cat.tasks} categoryId={cat.id} />
          </CardContent>
        </Card>
      ))}
      {/* Diálogo de confirmação de exclusão */}
      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <DialogTitle>Confirmar exclusão</DialogTitle>
        <DialogContent>
          <DialogContentText>Tem certeza que deseja excluir esta categoria e todas as suas tarefas?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)} color="primary">Cancelar</Button>
          <Button onClick={() => { removeCategory(toDeleteId); showSnackbar('Categoria excluída!', 'info'); setConfirmOpen(false); }} color="error">Excluir</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CategoryList; 