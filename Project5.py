import React, { useState, useEffect } from 'react';
import { Line, Doughnut } from 'react-chartjs-2';
import io from 'socket.io-client';

const MCPDashboard = () => {
  const [metrics, setMetrics] = useState({ activeContexts:0, requestsPerSecond:0, responseTime:0, errorRate:0 });
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io('ws://localhost:8080');
    newSocket.on('metrics_update', (data) => setMetrics(prev => ({...prev, ...data})));
    setSocket(newSocket);
    return () => newSocket.close();
  }, []);

  const chartData = { labels:['Active','Idle','Error'], datasets:[{ data:[metrics.activeContexts, metrics.idleContexts||0, metrics.errorContexts||0], backgroundColor:['#4CAF50','#FFC107','#F44336'] }] };

  return (
    <div className="dashboard-container">
      <Doughnut data={chartData}/>
    </div>
  );
};