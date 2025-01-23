import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Typography, List, ListItem, ListItemText } from '@mui/material';

const HomePage = () => {
  const [charts, setCharts] = useState([
    { id: '1', name: 'First Chart' },
    { id: '2', name: 'Second Chart' },
  ]);

  const navigate = useNavigate();

  const handleNewChart = () => {
    const newChartId = (charts.length + 1).toString();
    const newChart = { id: newChartId, name: `New Chart ${newChartId}` };
    setCharts([...charts, newChart]);
    navigate(`/chart/${newChartId}`);
  };

  const handleOpenChart = (chartId) => {
    navigate(`/chart/${chartId}`);
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        React Flow Charts
      </Typography>
      <Button variant="contained" color="primary" onClick={handleNewChart} sx={{ mb: 2 }}>
        Create New Chart
      </Button>
      <List>
        {charts.map((chart) => (
          <ListItem
            key={chart.id}
            button
            onClick={() => handleOpenChart(chart.id)}
          >
            <ListItemText primary={chart.name} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default HomePage;
