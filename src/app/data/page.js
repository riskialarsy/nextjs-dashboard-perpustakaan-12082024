'use client';

import { useState, useEffect } from 'react';
import Papa from 'papaparse';
import Layout from '../components/Layout';

export default function Data() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

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

  // Mendapatkan data untuk halaman saat ini
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  // Mengubah halaman
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Layout>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Data Perpustakaan</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 border-b">ID</th>
                <th className="py-2 px-4 border-b">Judul Buku</th>
                <th className="py-2 px-4 border-b">Penulis</th>
                <th className="py-2 px-4 border-b">Tahun Terbit</th>
                <th className="py-2 px-4 border-b">Peminjam</th>
                <th className="py-2 px-4 border-b">Tanggal Pinjam</th>
                <th className="py-2 px-4 border-b">Tanggal Kembali</th>
                <th className="py-2 px-4 border-b">Status</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                  <td className="py-2 px-4 border-b">{item.ID}</td>
                  <td className="py-2 px-4 border-b">{item.Judul_Buku}</td>
                  <td className="py-2 px-4 border-b">{item.Penulis}</td>
                  <td className="py-2 px-4 border-b">{item.Tahun_Terbit}</td>
                  <td className="py-2 px-4 border-b">{item.Peminjam}</td>
                  <td className="py-2 px-4 border-b">{item.Tanggal_Pinjam}</td>
                  <td className="py-2 px-4 border-b">{item.Tanggal_Kembali}</td>
                  <td className="py-2 px-4 border-b">{item.Status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 flex justify-center">
          <Pagination
            itemsPerPage={itemsPerPage}
            totalItems={data.length}
            paginate={paginate}
            currentPage={currentPage}
          />
        </div>
      </div>
    </Layout>
  );
}

function Pagination({ itemsPerPage, totalItems, paginate, currentPage }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="flex list-none">
        {pageNumbers.map(number => (
          <li key={number} className="mx-1">
            <button
              onClick={() => paginate(number)}
              className={`px-3 py-1 border rounded ${
                currentPage === number ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'
              }`}
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
