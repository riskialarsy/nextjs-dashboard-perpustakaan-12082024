import { useState, useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

export default function LineChart({ data }) {
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    if (data.length > 0) {
      const monthlyBorrows = data.reduce((acc, item) => {
        const date = new Date(item.Tanggal_Pinjam);
        const monthYear = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
        acc[monthYear] = (acc[monthYear] || 0) + 1;
        return acc;
      }, {});

      const sortedMonths = Object.entries(monthlyBorrows).sort((a, b) => a[0].localeCompare(b[0]));

      setChartOptions({
        chart: {
          type: 'line',
        },
        title: {
          text: 'Tren Peminjaman Bulanan',
        },
        xAxis: {
          categories: sortedMonths.map((month) => month[0]),
          title: {
            text: 'Bulan',
          },
        },
        yAxis: {
          title: {
            text: 'Jumlah Peminjaman',
          },
        },
        series: [
          {
            name: 'Jumlah Peminjaman',
            data: sortedMonths.map((month) => month[1]),
          },
        ],
      });
    }
  }, [data]);

  return <HighchartsReact highcharts={Highcharts} options={chartOptions} />;
}
