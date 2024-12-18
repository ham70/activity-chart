import React from 'react';
import { Handle, Position } from '@xyflow/react';

const GoalNode = ({ data }) => {
  const {
    label,
    completed,
    deadline,
    description,
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
        border: `2px solid gray`,
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
        <strong>Deadline:</strong> {deadline || 'N/A'}
      </div>
    </div>
  );
};

export default GoalNode