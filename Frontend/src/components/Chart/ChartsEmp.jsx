import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);


export function ChartEmp(props) {
  let bikeName = props.data.map((item)=>(
    item.name
  ))
  let bikeCount = props.data.map((item)=>(
    item.count
  ))
  const data = {
    labels: [...bikeName],
    datasets: [
      {
        label: 'No of Bikes',
        data: [...bikeCount ],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };
  
  return (
  <div style={{width: "30%",height: "30%",display: 'flex',marginLeft: "13%"}}>
  {props.data.length > 0 ? <Doughnut data={data}  /> : <h4>No Records Found</h4>}
  </div>
  )
}
