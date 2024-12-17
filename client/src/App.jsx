import React, { useCallback, useState } from 'react'
import {
  ReactFlow,
  Background,
  Controls,
  useNodesState,
  useEdgesState,
  addEdge,
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'

import TaskNode from './nodes/TaskNode'
import TaskModal from './modals/TaskModal'
import AddNodeModal from './modals/AddNodeModal'


function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState([])
  const [edges, setEdges, onEdgesChange] = useEdgesState([])

  const [addNodeModalOpen, setAddNodeModalOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [nodeData, setNodeData] = useState(null);

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
      title: '',
      progress: 0,
      deadline: null,
      description: '',
    },
  };

  const deleteNode = (nodeId) => {
    setNodes((prevNodes) => prevNodes.filter((node) => node.id !== nodeId));
  }

  const onConnect = useCallback((connection) => {
    const edge = { ...connection, id: `e${connection.source}-${connection.target}` }
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

  const [selectedNode, setSelectedNode] = useState(null);

  const handleNodeClick = (event, node) => {
    setSelectedNode(node.data);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedNode(null);
  };

  return (
    <>
      <button
        style={{
          position: 'absolute',
          top: '10px',
          left: '10px',
          zIndex: 10,
          padding: '10px 20px',
          fontSize: '16px',
          cursor: 'pointer',
        }}
        onClick={() => setAddNodeModalOpen(true)}
      >
        Add Node
      </button>
      <div style={{ width: '100vw', height: '100vh' }}>
        <ReactFlow
          nodes={nodes.map((node) => ({
            ...node,
            data: {
              ...node.data,
              deleteNode: () => deleteNode(node.id), // Correctly pass deleteNode in data
            },
          }))}
          edges={edges}
          onNodesChange={onNodesChange}
          onNodeClick={handleNodeClick}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={{ taskNode: TaskNode }}
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
          open={modalOpen}
          onClose={handleCloseModal}
          taskData={selectedNode}
        />
      </div>
    </>
  );
}

export default App;