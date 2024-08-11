import { useState, useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

export default function PieChart({ data }) {
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    if (data.length > 0) {
      const statusCounts = data.reduce((acc, item) => {
        acc[item.Status] = (acc[item.Status] || 0) + 1;
        return acc;
      }, {});

      setChartOptions({
        chart: {
          type: 'pie'
        },
        title: {
          text: 'Status Peminjaman Buku'
        },
        series: [{
          name: 'Jumlah',
          data: Object.entries(statusCounts).map(([name, y]) => ({ name, y }))
        }]
      });
    }
  }, [data]);

  return <HighchartsReact highcharts={Highcharts} options={chartOptions} />;
}