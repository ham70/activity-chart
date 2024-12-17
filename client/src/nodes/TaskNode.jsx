import React from 'react';
import { Handle, Position } from '@xyflow/react';

const TaskNode = ({ data }) => {
  const {
    label,
    priority,
    status,
    dueDate,
    lastUpdated,
    description,
    deleteNode,
  } = data;

  // Helper for styling priority levels
  const priorityColors = {
    low: 'green',
    medium: 'orange',
    high: 'red',
  };

  const handleDelete = (e) => {
    e.stopPropagation(); // Prevent triggering the node click event
    
    if (typeof deleteNode === 'function') {
      deleteNode();
    } else {
      console.error('Delete function is not properly defined');
    }
  };

  return (
    <div
      style={{
        border: `2px solid ${priorityColors[priority] || 'gray'}`,
        borderRadius: '8px',
        padding: '10px',
        width: '200px',
        background: '#f9f9f9',
        textAlign: 'center',
      }}
    >
      <button
        style={{
          position: 'absolute',
          top: '5px',
          right: '5px',
          color: 'red',
          cursor: 'pointer',
        }}
        onClick={handleDelete}
      >
        X
      </button>


      <Handle type="target" position={Position.Top} isConnectable={true} />
      <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>{label}</div>
      <div style={{ fontSize: '12px', marginBottom: '5px' }}>
        <strong>Status:</strong> {status}
      </div>
      <div style={{ fontSize: '12px', marginBottom: '5px' }}>
        <strong>Due Date:</strong> {dueDate || 'N/A'}
      </div>
      <Handle type="source" position={Position.Bottom} isConnectable={true} />
    </div>
  );
};

export default TaskNode;