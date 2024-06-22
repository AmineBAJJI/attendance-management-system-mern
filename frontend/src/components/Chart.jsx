import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const chartData = [
  "GINF31",
  "GINF32",
  "GINF33",
  "GINF34",
  "GINF35",
  "GINF36",
  "GINF41",
  "GINF42",
  "GINF43",
  "GINF44",
  "GINF45",
  "GINF46",
];

const dataKey = [23, 8, 15, 29, 5, 12, 18, 4, 27, 10, 20, 3];

const chartDataArray = chartData.map((name, index) => ({
  name,
  value: dataKey[index],
}));

function Chart({ title }) {
  return (
    <div className="rounded-lg shadow-xl p-8 mt-4">
      <h3 className="text-xl font-bold mb-6">{title}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={chartDataArray}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Chart;
