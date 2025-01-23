import React, { useCallback, useState } from 'react'
import { useParams } from 'react-router-dom'
import {
  ReactFlow,
  Background,
  Controls,
  useNodesState,
  useEdgesState,
  addEdge,
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import { Box, Button, Typography } from '@mui/material';

import TaskNode from '../nodes/TaskNode'
import GoalNode from '../nodes/GoalNode'
import TaskModal from '../modals/TaskModal'
import GoalModal from '../modals/GoalModal'
import AddNodeModal from '../modals/AddNodeModal'


function ChartPage() {
  const { chartId } = useParams();
  const [nodes, setNodes, onNodesChange] = useNodesState([])
  const [edges, setEdges, onEdgesChange] = useEdgesState([])

  const [addNodeModalOpen, setAddNodeModalOpen] = useState(false);
  const [taskModalOpen, setTaskModalOpen] = useState(false);
  const [goalModalOpen, setGoalModalOpen] = useState(false);
  const [selectedNode, setSelectedNode] = useState(null);

  const nodeTypeOptions = [
    { type: 'taskNode', label: 'Task Node' },
    { type: 'goalNode', label: 'Goal Node' },
  ];

  const defaultNodeData = {
    taskNode: {
      label: '',
      priority: 'low',
      status: 'open',
      dueDate: new Date().toISOString().split('T')[0],
      lastUpdated: new Date().toISOString().split('T')[0],
      description: '',
    },
    goalNode: {
      label: '',
      completed: false,
      deadline: new Date().toISOString().split('T')[0],
      description: '',
    },
  };

  const deleteNode = (nodeId) => {
    console.log("deleteing Node: " + nodeId)
    setNodes((prevNodes) => prevNodes.filter((node) => node.id !== nodeId))
    handleCloseModal()
  }

  const onConnect = useCallback((connection) => {
    const edge = { ...connection, id: `e${connection.source}-${connection.target}`, deletable: true }
    setEdges((prevEdges) => addEdge(edge, prevEdges))
  }, []);

  const handleAddNode = (type, data) => {
    const newNodeId = `${nodes.length + 1}`;
    const newNode = {
      id: newNodeId,
      type,
      position: { x: Math.random() * 500, y: Math.random() * 500 },
      data,
    };
    setNodes((prevNodes) => [...prevNodes, newNode]);
  };

  const handleUpdateNodeData = (updatedNode) => {
    setNodes((prevNodes) =>
      prevNodes.map((node) =>
        node.id === updatedNode.id ? { ...node, data: updatedNode.data } : node
      )
    );
  };

  const handleNodeClick = (event, node) => {
    setSelectedNode(node);
    if (node.type === 'taskNode') {
      setTaskModalOpen(true);
    } else if (node.type === 'goalNode') {
      setGoalModalOpen(true);
    }
  };

  const handleCloseModals = () => {
    setTaskModalOpen(false);
    setGoalModalOpen(false);
    setSelectedNode(null);
  };

  return (
    <>
      <Box>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => window.history.back()}
        >
          Back to Home
        </Button>
        <Button
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          cursor: 'pointer',
        }}
        onClick={() => setAddNodeModalOpen(true)}
      >
        Add Node
      </Button>
        <Typography variant="h6">Chart ID: {chartId}</Typography>
      </Box>
      
      <div style={{ width: '100vw', height: '100vh' }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onNodeClick={handleNodeClick}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={{ taskNode: TaskNode, goalNode: GoalNode}}
          fitView
        >
          <Background />
          <Controls />
        </ReactFlow>
        <AddNodeModal
          isOpen={addNodeModalOpen}
          onClose={() => setAddNodeModalOpen(false)}
          onAddNode={handleAddNode}
          nodeTypeOptions={nodeTypeOptions}
          defaultNodeData={defaultNodeData}
        />
        <TaskModal
          open={taskModalOpen}
          onClose={handleCloseModals}
          onDelete={deleteNode}
          taskNode={selectedNode}
          onUpdate={handleUpdateNodeData}
        />
        <GoalModal
          open={goalModalOpen}
          onClose={handleCloseModals}
          onDelete={deleteNode}
          goalNode={selectedNode}
          onUpdate={handleUpdateNodeData}
        />
      </div>
    </>
  );
}

export default ChartPage;