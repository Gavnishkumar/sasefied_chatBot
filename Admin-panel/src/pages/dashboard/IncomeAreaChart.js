import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
// material-ui
import { useTheme } from '@mui/material/styles';
// third-party
import ReactApexChart from 'react-apexcharts';
// chart options
const areaChartOptions = {
  chart: {
    height: 450,
    type: 'area',
    toolbar: {
      show: false
    }
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    curve: 'smooth',
    width: 2
  },
  grid: {
    strokeDashArray: 0
  }
};

// ==============================|| INCOME AREA CHART ||============================== //

const IncomeAreaChart = ({ slot }) => {
  const theme = useTheme();
  const { primary, secondary } = theme.palette.text;
  const line = theme.palette.divider;
  const [series, setSeries] = useState([
    {
      name: 'Queries registered',
      data: [0, 0, 0, 0, 0, 0, 0]
    },
    {
      name: 'Queries resolved',
      data: [0, 0, 0, 0, 0, 0, 0]
    }
  ]);
  const [options, setOptions] = useState(areaChartOptions);
  useEffect(() => {
    const fetchWeekData = async () => {
      const jwtTokenData = JSON.parse(localStorage.getItem('authToken'));
      const headers = { Authorization: `Bearer ${jwtTokenData.token}` };
      const data = await fetch('https://sasefied-backend.onrender.com/api/getQueryWeek', { headers });
      const { res, reg } = await data.json();
      if (slot === 'month') {
        const yearData = await fetch('https://sasefied-backend.onrender.com/api/getQueryYear', { headers });
        const { yearRes, yearReg } = await yearData.json();
        console.log('sree', yearRes);
        setSeries([yearRes, yearReg]);
      }
      if (slot !== 'month') setSeries([res, reg]);
    };
    fetchWeekData();
    setOptions((prevState) => ({
      ...prevState,
      colors: [theme.palette.primary.main, theme.palette.primary[700]],
      xaxis: {
        categories:
          slot === 'month'
            ? ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
            : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        labels: {
          style: {
            colors: [
              secondary,
              secondary,
              secondary,
              secondary,
              secondary,
              secondary,
              secondary,
              secondary,
              secondary,
              secondary,
              secondary,
              secondary
            ]
          }
        },
        axisBorder: {
          show: true,
          color: line
        },
        tickAmount: slot === 'month' ? 11 : 7
      },
      yaxis: {
        labels: {
          style: {
            colors: [secondary]
          }
        }
      },
      grid: {
        borderColor: line
      },
      tooltip: {
        theme: 'light'
      }
    }));
  }, [primary, secondary, line, theme, slot]);

  return <ReactApexChart options={options} series={series} type="area" height={260} />;
};
IncomeAreaChart.propTypes = {
  slot: PropTypes.string
};
export default IncomeAreaChart;
