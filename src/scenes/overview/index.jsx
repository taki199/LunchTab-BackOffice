import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const ActivityLogDashboard = () => {
  const [activityLogs, setActivityLogs] = useState([]);

  useEffect(() => {
    fetchActivityLogs();
  }, []);

  const fetchActivityLogs = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/auth/activity-log');
      if (!response.ok) {
        throw new Error('Failed to fetch activity logs');
      }
      const logs = await response.json();
      
      // Extract necessary information and format logs into strings
      const formattedLogs = logs.map(log => {
        const timestamp = new Date(log.timestamp).toLocaleString();
        return `${log.userId} ${log.action} ${timestamp}`;
      });
      
      // Set formatted logs in the state
      setActivityLogs(formattedLogs);
    } catch (error) {
      console.error('Error fetching activity logs:', error);
    }
  };
  

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>User ID</TableCell>
            <TableCell>Type of Action</TableCell>
            <TableCell>Path</TableCell>
            <TableCell>Time</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {activityLogs.map((log, index) => {
            // Check if log is a string before attempting to split
            if (typeof log !== 'string') {
              console.error('Invalid log entry:', log);
              return null;
            }

            const logParts = log.split(' ');
            const userID = logParts[0];
            const action = logParts[1];
            const time = logParts[2];
            const path = logParts.slice(3).join(' ');

            return (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{userID}</TableCell>
                <TableCell>
                  <span style={{ color: action.includes('GET') ? '#61affe' : action.includes('PUT') ? '#49cc90' : action.includes('POST') ? '#fca130' : action.includes('DELETE') ? '#f93e3e' : '#000' }}>
                    {action}
                  </span>
                </TableCell>
                <TableCell>{path}</TableCell>
                <TableCell>{time}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ActivityLogDashboard;
