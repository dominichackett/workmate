import { ArrowLongLeftIcon, ArrowLongRightIcon } from '@heroicons/react/20/solid';
interface PaginationProps {
  currentPage: number; // Current page number
  totalPages: number; // Total number of pages
  onPageChange: (page: number) => void; // Function to handle page changes
  recordsPerPage: number; // Number of records per page
  onRecordsPerPageChange: (records: number) => void; // Function to handle changes in records per page
}
const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  recordsPerPage,
  onRecordsPerPageChange,
}) => {
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex flex-col items-center">
      <nav className="flex items-center justify-between border-t border-gray-200 px-4 sm:px-0 w-full">
        <div className="-mt-px flex w-0 flex-1">
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); onPageChange(currentPage - 1); }}
            className={`inline-flex items-center border-t-2 border-transparent pr-1 pt-4 text-sm font-medium ${currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-gray-500 hover:border-gray-300 hover:text-gray-700'}`}
            aria-disabled={currentPage === 1}
            
          >
            <ArrowLongLeftIcon aria-hidden="true" className="mr-3 h-5 w-5 text-gray-400" />
            Previous
          </a>
        </div>

        <div className="hidden md:-mt-px md:flex">
          {pageNumbers.map((page) => (
            <a
              key={page}
              href="#"
              onClick={(e) => { e.preventDefault(); onPageChange(page); }}
              className={`inline-flex items-center border-t-2 px-4 pt-4 text-sm font-medium ${currentPage === page ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
            >
              {page}
            </a>
          ))}

          {totalPages > 5 && currentPage < totalPages - 2 && (
            <span className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500">...</span>
          )}
        </div>

        <div className="-mt-px flex w-0 flex-1 justify-end">
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); onPageChange(currentPage + 1); }}
            className={`inline-flex items-center border-t-2 border-transparent pl-1 pt-4 text-sm font-medium ${currentPage === totalPages ? 'text-gray-400 cursor-not-allowed' : 'text-gray-500 hover:border-gray-300 hover:text-gray-700'}`}
            aria-disabled={currentPage === totalPages}
          >
            Next
            <ArrowLongRightIcon aria-hidden="true" className="ml-3 h-5 w-5 text-gray-400" />
          </a>
        </div>
      </nav>

      {/* Dropdown below the pagination */}
      <div className="mt-4">
        <div className="flex justify-center">
          <div className="flex items-center text-sm text-gray-500">
            <span>Records per page: </span>
            <select
              value={recordsPerPage}
              onChange={(e) => onRecordsPerPageChange(Number(e.target.value))}
              className="ml-2 border-gray-300 rounded-md text-sm"
            >
              <option value={2}>2</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
              <option value={200}>200</option>
              <option value={300}>300</option>
              <option value={400}>400</option>
              <option value={500}>500</option>




            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
