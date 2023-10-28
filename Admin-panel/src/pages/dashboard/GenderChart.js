import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import axios from '../../../node_modules/axios/index';

const GenderChart = (props) => {
  const [male, setMale] = useState(0);
  const [female, setFemale] = useState(0);
  const [other, setOther] = useState(0);
  useEffect(() => {
    axios
      .get('https://sasefied-backend.onrender.com/api/genderWiseQuery')
      .then((response) => {
        setMale(response.data.male);
        setFemale(response.data.female);
        setOther(response.data.other);
      })
      .catch((error) => {
        console.error('Error while making the GET request:', error);
      });
  });
  const options = {
    chart: {
      id: 'basic-bar'
    },
    xaxis: {
      categories: ['Male', 'Female', 'Other']
    }
  };
  const series = [
    {
      name: 'Counting of queries',
      data: [male, female, other]
    }
  ];
  return (
    <div className="app">
      <div className="row">
        <div className="mixed-chart">
          <Chart options={options} series={series} type="bar" width={props.width} />
        </div>
      </div>
    </div>
  );
};
export default GenderChart;
