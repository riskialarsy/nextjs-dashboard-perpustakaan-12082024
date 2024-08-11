"use client";

import { useState, useEffect } from 'react';
import Papa from 'papaparse';
import PieChart from '../components/PieChart';
import BarChart from '../components/BarChart';
import LineChart from '../components/LineChart';
import Layout from '../components/Layout';

export default function Dashboard() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/data_perpustakaan.csv');
      const reader = response.body.getReader();
      const result = await reader.read();
      const decoder = new TextDecoder('utf-8');
      const csv = decoder.decode(result.value);
      const results = Papa.parse(csv, { header: true });
      setData(results.data);
    };

    fetchData();
  }, []);

  return (
    <Layout>
      <div className="bg-gradient-to-br from-indigo-200 via-purple-200 to-pink-200 p-10 rounded-3xl shadow-2xl">
        <h1 className="text-5xl font-extrabold mb-10 text-gray-800 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">Dashboard Perpustakaan</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          <div className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition duration-300 transform hover:-translate-y-2">
            <h2 className="text-2xl font-bold mb-6 text-center text-indigo-600">Statistik Peminjaman</h2>
            <div className="bg-gradient-to-r from-blue-100 to-indigo-100 p-4 rounded-2xl">
              <PieChart data={data} />
            </div>
          </div>
          <div className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition duration-300 transform hover:-translate-y-2">
            <h2 className="text-2xl font-bold mb-6 text-center text-purple-600">Tren Bulanan</h2>
            <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-4 rounded-2xl">
              <BarChart data={data} />
            </div>
          </div>
          <div className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition duration-300 transform hover:-translate-y-2">
            <h2 className="text-2xl font-bold mb-6 text-center text-pink-600">Perkembangan Tahunan</h2>
            <div className="bg-gradient-to-r from-pink-100 to-red-100 p-4 rounded-2xl">
              <LineChart data={data} />
            </div>
          </div>
        </div>
        <div className="mt-10 bg-white p-8 rounded-3xl shadow-lg">
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Ringkasan Statistik</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gradient-to-r from-blue-400 to-indigo-500 p-6 rounded-2xl text-white">
              <h3 className="text-xl font-semibold mb-2">Total Buku</h3>
              <p className="text-3xl font-bold">{data.length}</p>
            </div>
            <div className="bg-gradient-to-r from-purple-400 to-pink-500 p-6 rounded-2xl text-white">
              <h3 className="text-xl font-semibold mb-2">Buku Dipinjam</h3>
              <p className="text-3xl font-bold">{data.filter(item => item.Status === 'Dipinjam').length}</p>
            </div>
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-6 rounded-2xl text-white">
              <h3 className="text-xl font-semibold mb-2">Buku Tersedia</h3>
              <p className="text-3xl font-bold">{data.filter(item => item.Status === 'Tersedia').length}</p>
            </div>
            <div className="bg-gradient-to-r from-green-400 to-teal-500 p-6 rounded-2xl text-white">
              <h3 className="text-xl font-semibold mb-2">Peminjam Aktif</h3>
              <p className="text-3xl font-bold">{new Set(data.map(item => item.Peminjam)).size}</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}