import React, { useState } from 'react'
import {
    Modal,
    Box,
    Typography,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    TextField,
    Button,
    Alert,
    Switch,
} from '@mui/material'
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


const TaskModal = ({ open, onClose, onDelete, taskNode }) => {
  if (!taskNode) return null; // Avoid rendering if there's no data

  const { label, priority, status, dueDate, lastUpdated, description } = taskNode.data;
  const [nodeData, setNodeData] = useState({ label, priority, status, dueDate, lastUpdated, description })
  
  const handleInputChange = (field, value) => {
    setNodeData((prevData) => ({
      ...prevData,
      [field]: value
    }))
  }

  const handleDelete = () => { 
    console.log(taskNode.id)
    if (typeof onDelete === 'function') {
      onDelete(taskNode.id);
    } else {
      console.error('Delete function is not properly defined');
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
          borderRadius: '8px',
        }}
      >
        <h2>{label}</h2>
        <div>
          <TextField 
            label ="Task Label"
            value = {nodeData.label || ''} 
            onChange = {(e) => handleInputChange('label', e.target.value)}
            fullWidth
            margin="normal"
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Priority</InputLabel>
            <Select
              value={nodeData.priority || ''}
              onChange={(e) => handleInputChange('priority', e.target.value)}
            >
              <MenuItem value="low">Low</MenuItem>
              <MenuItem value="medium">Medium</MenuItem>
              <MenuItem value="high">High</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
          <InputLabel>Status</InputLabel>
            <Select
              value={nodeData.status || ''}
              onChange={(e) => handleInputChange('status', e.target.value)}
            >
              <MenuItem value="open">Closed</MenuItem>
              <MenuItem value="open">Open</MenuItem>
              <MenuItem value="in progress">In Progress</MenuItem>
              <MenuItem value="completed">Completed</MenuItem>
            </Select>
          </FormControl>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
            label="Due Date"
            value={dayjs(nodeData.dueDate)}
            onChange={(date) => handleInputChange('dueDate', date.toISOString().split('T')[0])}
            />
          </LocalizationProvider>
          <TextField 
            label ="Description"
            value = {nodeData.description || ''} 
            onChange = {(e) => handleInputChange('description', e.target.value)}
            fullWidth
            multiline
            maxRows={5}
            margin="normal"
          />
      </div>
        <div>
          <button onClick={onClose}>Close</button>
          <button onClick={handleDelete}>Delete</button>
        </div>
      </Box>
    </Modal>
  );
};

export default TaskModal;