import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import io from 'socket.io-client';

const MCPAnalytics = () => {
  const [metrics, setMetrics] = useState({ activeContexts:0, requests:0, errors:0 });
  useEffect(() => {
    const socket = io('ws://localhost:8080');
    socket.on('update', (data) => setMetrics(data));
    return () => socket.close();
  }, []);
  const data = {
    labels: ['Active', 'Requests', 'Errors'],
    datasets: [{ data: [metrics.activeContexts, metrics.requests, metrics.errors], backgroundColor: ['#4CAF50','#2196F3','#F44336'] }]
  };
  return <Line data={data} />;
};

export default MCPAnalytics;