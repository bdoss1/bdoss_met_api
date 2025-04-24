'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getDepartments, searchObjects, getObjectDetails } from '@/lib/api';
import Image from 'next/image';

export type MetObject = {
  objectID: number;
  title: string;
  primaryImageSmall: string;
  artistDisplayName?: string;
  objectDate?: string;
  medium?: string;
  department?: string;
};

export default function HomePage() {
  const [objects, setObjects] = useState<MetObject[]>([]);
  const [objectIDs, setObjectIDs] = useState<number[]>([]);
  const [departments, setDepartments] = useState<{ departmentId: number; displayName: string }[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedDept, setSelectedDept] = useState<number>();
  const [query, setQuery] = useState('');
  const [idSearch, setIdSearch] = useState('');

  const itemsPerPage = 12;

  // Fetch all departments
  useEffect(() => {
    getDepartments().then(setDepartments);
  }, []);

  // Fetch object IDs when query/department changes
  useEffect(() => {
    if (query) {
      searchObjects(query, selectedDept).then((ids) => {
        setObjectIDs(ids || []);
        setCurrentPage(1);
      });
    }
  }, [query, selectedDept]);

  // Fetch object details for current page
  useEffect(() => {
    const fetchPageObjects = async () => {
      const pageIDs = objectIDs.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
      const objectData = await Promise.all(pageIDs.map((id) => getObjectDetails(id)));
      setObjects(objectData);
    };

    if (objectIDs.length > 0) {
      fetchPageObjects();
    } else {
      setObjects([]);
    }
  }, [objectIDs, currentPage]);

  const handleIdSearch = () => {
    const trimmed = idSearch.trim();
    if (!trimmed) return;
    window.location.href = `/object/${trimmed}`;
  };

  return (
    <main className="p-4 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Metropolitan Museum Art Gallery</h1>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <input
          placeholder="Search by title"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <select
          className="p-2 border rounded"
          onChange={(e) => setSelectedDept(Number(e.target.value))}
          defaultValue=""
        >
          <option value="">All Departments</option>
          {departments.map((dept) => (
            <option key={dept.departmentId} value={dept.departmentId}>
              {dept.displayName}
            </option>
          ))}
        </select>
        <div className="flex gap-2">
          <input
            placeholder="Search by Object ID"
            value={idSearch}
            onChange={(e) => setIdSearch(e.target.value)}
            className="border p-2 rounded"
          />
          <button
            onClick={handleIdSearch}
            className="bg-black text-white px-4 py-2 rounded"
          >
            Go
          </button>
        </div>
      </div>

      {/* Object Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {objects.map((obj) => (
        <Link href={`/object/${obj.objectID}`} key={obj.objectID}>
          <div className="border p-2 rounded hover:shadow cursor-pointer">
            <Image
              src={obj.primaryImageSmall}
              alt={obj.title}
              width={300}
              height={300}
              className="w-full h-48 object-cover"
            />
          <p className="mt-2 font-semibold text-sm">{obj.title}</p>
          </div>
        </Link>
      ))}
      </div>

      {/* Pagination */}
      {objectIDs.length > itemsPerPage && (
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: Math.ceil(objectIDs.length / itemsPerPage) }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 border rounded ${
                currentPage === i + 1 ? 'bg-black text-white' : 'bg-white'
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </main>
  );
}