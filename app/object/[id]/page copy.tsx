// app/object/[id]/page.tsx

import { getObjectDetails } from '@/lib/api';
import { notFound } from 'next/navigation';
import { use } from 'react';

export default function ObjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params); // ✅ unwrap Promise
  const objectId = parseInt(id, 10);

  if (isNaN(objectId)) notFound();

  const object = use(getObjectDetails(objectId)); // 🧠 This uses React 18 streaming

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <a href="/" className="mb-6 inline-block bg-gray-200 hover:bg-gray-300 text-sm px-4 py-2 rounded">
        ← Back
      </a>

      <h2 className="text-2xl font-semibold">{object.title}</h2>
      {object.primaryImageSmall && (
        <img src={object.primaryImageSmall} alt={object.title} className="my-4" />
      )}
      <p><strong>Artist:</strong> {object.artistDisplayName}</p>
      <p><strong>Date:</strong> {object.objectDate}</p>
      <p><strong>Medium:</strong> {object.medium}</p>
      <p><strong>Department:</strong> {object.department}</p>
    </div>
  );
}