type Props = {
  total: number;
  currentPage: number;
  items: number;
  onPageChange: (page: number) => void;
};

export default function Pagination({ total, currentPage, items, onPageChange }: Props) {
    const totalPages = Math.ceil(total / items);
    if (totalPages <= 1) return null;

    return (
        <div className="flex items-center justify-between mt-4">
        {Array.from({ length: totalPages }, (_, i) => (
            <button
                key={i}
                className={`px-3 py-1 rounded-md ${currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                onClick={() => onPageChange(i + 1)}
            >
                {i + 1}
            </button>
        ))}
        </div>
  );
}

