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



const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
};

const AddNode = ({ isOpen, onClose, onAddNode, nodeTypeOptions, defaultNodeData }) => {
    const [selectedNodeType, setSelectedNodeType] = useState('')
    const [nodeData, setNodeData] = useState({})
    const [alertMessage, setAlertMessage] = useState('');

    const handleNodeTypeChange = (type) => {
        setSelectedNodeType(type)
        setNodeData(defaultNodeData[type] || {})
    }

    const handleInputChange = (field, value) => {
        setNodeData((prevData) => ({
            ...prevData,
            [field]: value
        }))
    }

    const handleAddNode = () => {
        if (selectedNodeType && nodeData && nodeData.label) {
            onAddNode(selectedNodeType, nodeData)
            onClose()
            setSelectedNodeType('')
            setNodeData({})
        }
        else if (!nodeData.label) {
            setAlertMessage('Label is a required field.')
        }
    }

    return (
        <Modal open={isOpen} onClose={onClose} aria-labelledby="add-node-modal-title">
            <Box sx={modalStyle}>
                <Typography id="add-node-modal-title" variant="h6" component="h2" gutterBottom>
                    Add New Node
                </Typography>
                {alertMessage && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {alertMessage}
                    </Alert>
                )}
                <FormControl fullWidth margin="normal">
                    <InputLabel id="node-type-label">Node Type</InputLabel>
                    <Select
                        labelId="node-type-label"
                        value={selectedNodeType}
                        onChange={(e) => handleNodeTypeChange(e.target.value)}
                        label="Node Type"
                    >
                        {nodeTypeOptions.map((options) => (
                            <MenuItem key={options.type} value={options.type}>
                                {options.label}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                {selectedNodeType == 'taskNode' && (
                    <div>
                        <TextField
                            label="Task Label"
                            value={nodeData.label || ''}
                            onChange={(e) => handleInputChange('label', e.target.value)}
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
                            label="Description"
                            value={nodeData.description || ''}
                            onChange={(e) => handleInputChange('description', e.target.value)}
                            fullWidth
                            multiline
                            maxRows={5}
                            margin="normal"
                        />
                    </div>
                )}
                {selectedNodeType == 'goalNode' && (
                    <div>
                        <TextField
                            label="Goal Label"
                            value={nodeData.label || ''}
                            onChange={(e) => handleInputChange('label', e.target.value)}
                            fullWidth
                            margin="normal"
                        />
                        <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                            <Typography variant="body1" sx={{ mr: 1 }}>
                                Completed:
                            </Typography>
                            <Switch
                                checked={nodeData.completed || false}
                                onChange={(e) => handleInputChange('completed', e.target.checked)}
                            />
                        </Box>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                label="Deadline"
                                value={dayjs(nodeData.deadline)}
                                onChange={(date) => handleInputChange('deadline', date.toISOString().split('T')[0])}
                            />
                        </LocalizationProvider>
                        <TextField
                            label="Description"
                            value={nodeData.description || ''}
                            onChange={(e) => handleInputChange('description', e.target.value)}
                            fullWidth
                            multiline
                            maxRows={5}
                            margin="normal"
                        />
                    </div>
                )}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
                    <Button variant="contained" color="primary" onClick={handleAddNode} disabled={!selectedNodeType}>
                        Add Node
                    </Button>
                    <Button variant="outlined" color="secondary" onClick={onClose}>
                        Cancel
                    </Button>
                </Box>
            </Box>
        </Modal>
    )
}

export default AddNode