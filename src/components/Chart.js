import React from 'react';
import ApexChart from 'react-apexcharts';

const Chart = ({ distances, generations, title }) => {
  const chartOptions = {
    title: {
      text: title,
      align: 'center',
    },
    chart: {
      type: 'line',
      zoom: {
        enabled: false,
      },
    },
    xaxis: {
      categories: generations,
      title: {
        text: 'Покоління',
      },
      axisBorder: {
        show: true,
        color: '#ff0000',
      },
    },
    yaxis: {
      title: {
        text: 'Найкраща відстань маршруту',
      },
      axisBorder: {
        show: true,
        color: '#FF1654',
      },
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val.toFixed(2);
        },
      },
      marker: {
        show: false,
      },
    },
  };

  const chartSeries = [
    {
      name: 'Найкраща відстань',
      data: distances.map((dist) => dist.toFixed()),
    },
  ];

  return (
    <div>
      <ApexChart
        options={chartOptions}
        series={chartSeries}
        type='line'
        height={350}
      />
    </div>
  );
};

export default Chart;
