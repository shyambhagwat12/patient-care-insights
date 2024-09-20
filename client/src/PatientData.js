import React from 'react';
import { Box, Typography, Card, CardContent, Divider } from '@mui/material';

const PatientData = ({ data, type }) => {
  return (
    <Box>

      {Object.keys(data).map((key) => (
        <Card sx={{ marginBottom: '1rem' }} key={key}>  
          <CardContent>
            <Typography variant="h6">{key.replace(/([A-Z])/g, ' $1').trim()}</Typography>
            <Divider sx={{ marginY: '0.5rem' }} />
            {typeof data[key] === 'string' || Array.isArray(data[key])
              ? <Typography>{Array.isArray(data[key]) ? data[key].join(', ') : data[key]}</Typography>
              : Object.keys(data[key]).map(subKey => (
                <Typography key={subKey}>{`${subKey}: ${data[key][subKey]}`}</Typography>
              ))}
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default PatientData;
