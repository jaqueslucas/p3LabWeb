import React, { useContext } from "react";
import { TaskContext } from "../context/TaskContext";
import { Checkbox, IconButton, List, ListItem, ListItemText, TextField, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';
import { MdDelete, MdEdit, MdCheck, MdClose } from 'react-icons/md';
import { SnackbarContext } from '../App';

const TaskList = ({ tasks, categoryId }) => {
  const { toggleTask, removeTask, editTask } = useContext(TaskContext);
  const [editingId, setEditingId] = React.useState(null);
  const [editValue, setEditValue] = React.useState("");
  const showSnackbar = useContext(SnackbarContext);
  const [confirmOpen, setConfirmOpen] = React.useState(false);
  const [toDeleteId, setToDeleteId] = React.useState(null);

  if (!tasks || tasks.length === 0) {
    return <span style={{ color: '#888' }}>Nenhuma tarefa nesta categoria.</span>;
  }

  return (
    <List>
      {tasks.map((task) => (
        <ListItem key={task.id} disableGutters secondaryAction={
          editingId === task.id ? (
            <>
              <IconButton edge="end" color="success" onClick={() => { editTask(categoryId, task.id, editValue.trim()); setEditingId(null); showSnackbar('Tarefa editada!', 'success'); }}>
                <MdCheck />
              </IconButton>
              <IconButton edge="end" color="error" onClick={() => setEditingId(null)}>
                <MdClose />
              </IconButton>
            </>
          ) : (
            <IconButton edge="end" color="error" onClick={() => { setToDeleteId(task.id); setConfirmOpen(true); }} className="delete-btn">
              <MdDelete />
            </IconButton>
          )
        }>
          <Checkbox
            checked={task.completed}
            onChange={() => toggleTask(categoryId, task.id)}
            color="primary"
            disabled={editingId === task.id}
          />
          {editingId === task.id ? (
            <TextField
              value={editValue}
              onChange={e => setEditValue(e.target.value)}
              size="small"
              autoFocus
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  editTask(categoryId, task.id, editValue.trim());
                  setEditingId(null);
                  showSnackbar('Tarefa editada!', 'success');
                } else if (e.key === 'Escape') {
                  setEditingId(null);
                }
              }}
              sx={{ flex: 1 }}
            />
          ) : (
            <ListItemText
              primary={task.text}
              sx={{ textDecoration: task.completed ? 'line-through' : 'none', color: task.completed ? '#888' : undefined }}
              onDoubleClick={() => { setEditingId(task.id); setEditValue(task.text); }}
            />
          )}
          {editingId !== task.id && (
            <IconButton edge="end" color="primary" onClick={() => { setEditingId(task.id); setEditValue(task.text); }}>
              <MdEdit />
            </IconButton>
          )}
        </ListItem>
      ))}
      {/* Diálogo de confirmação de exclusão */}
      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <DialogTitle>Confirmar exclusão</DialogTitle>
        <DialogContent>
          <DialogContentText>Tem certeza que deseja excluir esta tarefa?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)} color="primary">Cancelar</Button>
          <Button onClick={() => { removeTask(categoryId, toDeleteId); showSnackbar('Tarefa excluída!', 'info'); setConfirmOpen(false); }} color="error">Excluir</Button>
        </DialogActions>
      </Dialog>
    </List>
  );
};

export default TaskList; 