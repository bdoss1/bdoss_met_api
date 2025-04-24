// app/object/[id]/page.tsx

import { getObjectDetails } from '@/lib/api';
import { notFound } from 'next/navigation';
import { use } from 'react';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link'
import { Button } from '@/components/ui/button';
import Image from 'next/image'


export default function ObjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params); // ✅ unwrap Promise
  const objectId = parseInt(id, 10);

  if (isNaN(objectId)) notFound();

  const object = use(getObjectDetails(objectId)); // 🧠 This uses React 18 streaming

  return (
   

<section className="py-16 md:py-32">
<div className="mx-auto max-w-5xl space-y-8 px-6 md:space-y-12">
<h2 className="text-4xl font-medium">{object.title}</h2>


    <div className="grid gap-6 md:grid-cols-2 md:gap-12">
    {object.primaryImageSmall && (
       <Image src={object.primaryImageSmall} alt={object.title} className="my-4" />
      )}
     
        <div className="space-y-6">
            <p><strong>Artist:</strong> {object.artistDisplayName}</p>
            <p><strong>Date:</strong> {object.objectDate}</p>
            <p><strong>Medium:</strong> {object.medium}</p>
            <p><strong>Department:</strong> {object.department}</p>
            <Button asChild variant="secondary" size="sm" className="gap-1 pr-1.5">
                <Link href="/">
                    <span>Back</span>
                    <ChevronRight className="size-2" />
                </Link>
            </Button>
        </div>
    </div>
</div>
</section>
  );
}