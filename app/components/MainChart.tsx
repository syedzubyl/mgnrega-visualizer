
'use client'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import data from '../data/mgnrega-data.json';

const MainChart = () => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="district" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="employment.provided_employment" fill="#8884d8" name="Employment Provided" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default MainChart;
