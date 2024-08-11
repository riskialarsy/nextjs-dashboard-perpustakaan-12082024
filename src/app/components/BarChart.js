import { useState, useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

export default function BarChart({ data }) {
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    if (data.length > 0) {
      const bookCounts = data.reduce((acc, item) => {
        acc[item.Judul_Buku] = (acc[item.Judul_Buku] || 0) + 1;
        return acc;
      }, {});

      const sortedBooks = Object.entries(bookCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10);

      setChartOptions({
        chart: {
          type: 'bar',
        },
        title: {
          text: '10 Buku Terpopuler',
        },
        xAxis: {
          categories: sortedBooks.map((book) => book[0]),
          title: {
            text: 'Judul Buku',
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
            data: sortedBooks.map((book) => book[1]),
          },
        ],
      });
    }
  }, [data]);

  return <HighchartsReact highcharts={Highcharts} options={chartOptions} />;
}
