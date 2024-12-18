import React from 'react';
import { Handle, Position } from '@xyflow/react';

const TaskNode = ({ data }) => {
  const {
    label,
    priority,
    status,
    dueDate,
  } = data;

  // Helper for styling priority levels
  const priorityColors = {
    low: 'green',
    medium: 'orange',
    high: 'red',
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