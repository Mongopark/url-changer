import { ItemProps} from '../model/type';
import Arrow from '../../../assets/images/arrow.tsx';
import ArrowBack from '../../../assets/images/arrowBack.tsx';
import { useState } from 'react';


export interface DataProps {
    data: ItemProps[];
    currentPage: number;
    setCurrentPage: (page: number) => void;
  }

export default function Pagination({
    data, currentPage, setCurrentPage
  }: DataProps) {
    const [itemsPerPage] = useState(7); // Set the number of items per page
    const totalPages = Math.ceil((data?.length || 0) / itemsPerPage);
  
  


  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className='flex justify-between items-center w-full'>
    <button
      onClick={() => paginate(currentPage - 1)}
      disabled={currentPage === 1}
      className="mr-[1px] md:mr-2 px-2 py-[0px] md:py-1 md:px-3 md:border-2 border border-1 border-gray-300 rounded font-semibold flex items-center"
    >
      <ArrowBack color="black"/><span className='ps-2'>Previous</span>
    </button>


<div>
    <button
      onClick={() => paginate(currentPage)}
      className={`mr-[1px] md:mr-2 px-2 py-[0px] md:py-1 md:px-3 md:border-2 border border-4 bg-primarylight border-primarylight text-primary text-[10px] md:text-sm rounded`}
    >
      {currentPage}
    </button>

    
    {currentPage + 1 > totalPages?<></>:<button
      onClick={() => paginate(currentPage+1)}
      disabled={currentPage + 1 > totalPages}
      className={`mr-[1px] md:mr-2 px-2 py-[0px] md:py-1 md:px-3 rounded text-[10px] md:text-sm`}
    >
      {currentPage+1}
    </button>}


    {currentPage + 2 > totalPages?<></>:<button
      onClick={() => paginate(currentPage+2)}
      disabled={currentPage + 2 > totalPages}
      className={`mr-[1px] md:mr-2 px-2 py-[0px] md:py-1 md:px-3 rounded text-[10px] md:text-sm`}
    >
      {currentPage+2}
    </button>}


{currentPage > totalPages?<></>:
    <button
      className="mr-[1px] md:mr-2 px-2 py-[0px] md:py-1 md:px-3 rounded text-[10px] md:text-sm"
    >
      {currentPage+3 > totalPages?"end":"..."}
    </button>}


{currentPage+5>totalPages?<></>:<button
  onClick={() => paginate(currentPage + 4)}
  disabled={currentPage === totalPages}
  className="mr-[1px] md:mr-2 px-2 py-[0px] md:py-1 md:px-3 rounded"
>
  {totalPages-2}
</button>}


{currentPage+6>totalPages?<></>:<button
  onClick={() => paginate(currentPage + 5)}
  disabled={currentPage === totalPages}
  className="mr-[1px] md:mr-2 px-2 py-[0px] md:py-1 md:px-3 rounded"
>
  {totalPages-1}
</button>}


    {currentPage+7>totalPages?<></>:<button
      onClick={() => paginate(currentPage + 6)}
      disabled={currentPage === totalPages}
      className="mr-[1px] md:mr-2 px-2 py-[0px] md:py-1 md:px-3 rounded"
    >
      {totalPages}
    </button>}
    </div>


    {currentPage === totalPages?<div></div>:<button
      onClick={() => paginate(currentPage + 1)}
      disabled={currentPage === totalPages}
      className="mr-[1px] md:mr-2 px-2 py-[0px] md:py-1 md:px-3 md:border-2 border border-1 border-gray-300 rounded font-semibold flex items-center"
    >
      <span className='pe-2'>Next</span><Arrow color="black"/>
    </button>}
  </div>
  );
}



export function PaginationMobile({
  data, currentPage, setCurrentPage
}: DataProps) {
  const [itemsPerPage] = useState(7); // Set the number of items per page
  const totalPages = Math.ceil((data?.length || 0) / itemsPerPage);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className='flex justify-between items-center w-full'>
      <button
        onClick={() => paginate(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-2 py-1 h-full md:px-3 md:py-2 border border-gray-300 rounded font-semibold disabled:opacity-50"
      >
        <ArrowBack color="black" />
      </button>
      <text className='text-[11px]'>Page {currentPage} of {totalPages}</text>
            
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-2 py-1 md:px-3 h-full md:py-2 border border-gray-300 rounded font-semibold disabled:opacity-50"
        >
          <Arrow color="black" />
        </button>
    </div>
  );
}