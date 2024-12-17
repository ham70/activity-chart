import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

const TaskModal = ({ open, onClose, taskData }) => {
  if (!taskData) return null; // Avoid rendering if there's no data

  const { label, priority, status, dueDate, lastUpdated, description } = taskData;

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
        <p><strong>Priority:</strong> {priority}</p>
        <p><strong>Status:</strong> {status}</p>
        <p><strong>Due Date:</strong> {dueDate || 'N/A'}</p>
        <p><strong>Last Updated:</strong> {lastUpdated || 'N/A'}</p>
        <p><strong>Description:</strong> {description || 'No description'}</p>
        <button onClick={onClose}>Close</button>
      </Box>
    </Modal>
  );
};

export default TaskModal;