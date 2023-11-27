import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart, BarController, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';

Chart.register(BarController, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const DashboardBar = () => {
  const [monthlyOrderCount, setMonthlyOrderCount] = useState([]);
  const [selectedYear, setSelectedYear] = useState(2023);
  const [serverMessage, setServerMessage] = useState('');
  useEffect(() => {
    const fetchData = () => {
      axios.get(`http://localhost:3101/api/orders/statisticinyear/${selectedYear}`)
        .then(response => {
          if (response.data.success) {
            setMonthlyOrderCount(response.data.months);
            setServerMessage('');
          } else {
            setServerMessage(response.data.message);
          }
        })
        .catch(error => {
          console.error('Error fetching data: ', error);
        });
    };
  
    fetchData();
    const intervalId = setInterval(fetchData, 10000); // fetch data every 10 seconds
  
    return () => {
      clearInterval(intervalId); // clear interval on component unmount
    };
  }, [selectedYear]);

  const sortedMonthlyOrderCount = [...monthlyOrderCount].sort((a, b) => a._id - b._id);

  const labels = sortedMonthlyOrderCount.map(month => `Tháng ${month._id}`);
  const data = sortedMonthlyOrderCount.map(month => month.total);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'My First Dataset',
        data: data,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true
      }
    },
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Thống kê order theo năm',
      },
      tooltip: {
        enabled: true,
        callbacks: {
          title: function(context) {
            return context[0].dataset.label;
          },
          label: function(context) {
            var label = `Tháng ${context.dataIndex + 1}: `;
  
            if (context.parsed.y !== null) {
              label += new Number(context.parsed.y).toLocaleString();
            }
            return label;
          }
        }
      },
    },
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false
    },
    hover: {
      mode: 'nearest',
      intersect: true,
      animationDuration: 1000,
      onHover: (event, chartElement) => {
        event.target.style.cursor = chartElement[0] ? 'pointer' : 'default';
      }
    },
    animation: {
      duration: 1000
    }
  };

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  return (
    <div className='w-[1000px]'>
      <select onChange={handleYearChange}>
        {Array.from({length: 10}, (_, i) => 2023 - i).map(year => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
      {serverMessage ? (
        <p>{serverMessage}</p>
      ) : (
        <Bar data={chartData} options={options} />
      )}
    </div>
  );
}
  
export default DashboardBar;