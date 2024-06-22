import React from "react";
import { Bar } from "react-chartjs-2";
const data = {
  labels: [
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
  ],
  datasets: [
    {
      label: "Le nombre d'absences totales par matière",
      backgroundColor: "rgba(255,99,132,0.2)",
      borderColor: "rgba(255,99,132,1)",
      borderWidth: 1,
      hoverBackgroundColor: "rgba(255,99,132,0.4)",
      hoverBorderColor: "rgba(255,99,132,1)",
      data: [23, 8, 15, 29, 5, 12, 18, 4, 27, 10, 20, 3],
    },
  ],
};
function App() {
  return (
    <div>
      <h2>Bar Example (custom size)</h2>
      <Bar
        data={data}
        width={100}
        height={50}
        options={{
          maintainAspectRatio: false,
        }}
      />
    </div>
  );
}
export default App;
