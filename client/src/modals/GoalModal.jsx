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


const GoalModal = ({ open, onClose, onDelete, goalNode, onUpdate }) => {
    if (!goalNode) return null; // Avoid rendering if there's no data

    const { label, completed, dueDate, lastUpdated, description } = goalNode.data;
    const [nodeData, setNodeData] = useState({ label, completed, dueDate, lastUpdated, description })

    const handleSave = () => {
        if (goalNode) {
            onUpdate({ ...goalNode, data: nodeData });
            onClose();
        }
    };

    const handleInputChange = (field, value) => {
        setNodeData((prevData) => ({
            ...prevData,
            [field]: value
        }))
    }

    const handleDelete = () => {
        console.log(goalNode.id)
        if (typeof onDelete === 'function') {
            onDelete(goalNode.id);
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
                <div>
                    <button onClick={onClose}>Close</button>
                    <button onClick={handleDelete}>Delete</button>
                    <button onClick={handleSave}>Save</button>
                </div>
            </Box>
        </Modal>
    );
};

export default GoalModal;