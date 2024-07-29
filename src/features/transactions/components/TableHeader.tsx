import useBreakpoint from '../../../hooks/useBreakpoint.ts';

export default function TableHeader() {
  const isSmall = useBreakpoint("sm").isBelowSm;
  const isMobile = useBreakpoint('md').isBelowMd;
  const isLaptop = useBreakpoint("lg").isBelowLg;  
  
  
 
// black #8F86D7 #98BCF1 #3D7C8D

  return (
    <thead className="">
    <tr>
    {!isLaptop&&<th scope="col" className="text-left font-medium text-gray-500 tracking-wider text-[9px] sm:text-[12px] md:text-xs whitespace-nowrap ps-2 py-4">Name</th>}
    {!isLaptop&&<th scope="col" className="text-left font-medium text-gray-500 tracking-wider text-[9px] sm:text-[12px] md:text-xs whitespace-nowrap">Description <i className='far fa-question-circle'></i></th>}
    {!isMobile&&<th scope="col" className="text-left font-medium text-gray-500 tracking-wider text-[9px] sm:text-[12px] md:text-xs whitespace-nowrap">Original Url <i className='far fa-question-circle'></i></th>}
      <th scope="col" className="text-left font-medium text-gray-500 tracking-wider text-[9px] sm:text-[12px] md:text-xs pe-1 md:whitespace-nowrap md:py-4 py-2">Changed Url</th>
      <th scope="col" className="text-left font-medium text-gray-500 tracking-wider text-[9px] sm:text-[12px] md:text-xs pe-1 md:whitespace-nowrap"></th>
    </tr>
  </thead>
  );
}
