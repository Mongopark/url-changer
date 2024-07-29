import { useState } from 'react';
import useBreakpoint from '../../../hooks/useBreakpoint.ts';
import { DataProps } from '../model/type.ts';
import LinkModal from '../../../components/LinkModal.tsx';

export default function SingleUrl({ item, index }: DataProps) {
  const isSmall = useBreakpoint("sm").isBelowSm;
  const isMobile = useBreakpoint('md').isBelowMd;
  const isLaptop = useBreakpoint("lg").isBelowLg;
  const [shortCode, setShortCode] = useState<string | undefined>('');
  const [longCode, setLongCode] = useState<string | undefined>('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = (item: {shortUrl: string; originalUrl: string;} | undefined) => {
    setShortCode(item?.shortUrl);
    setLongCode(item?.originalUrl);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setShortCode('');
    setLongCode('');
  };

  return (
    <>
      <tr key={index} className="border-b border-white w-full">
        {!isLaptop && (
          <td className="py-5 pe-2 ps-2 whitespace-nowrap border-t-2 border-[#EEEAF2] text-[9px] sm:text-[11px] md:text-[13px]">
            {item?.urlName.slice(0,20)}{(item?.urlName?.length||0)>20 ? "...":""}
          </td>
        )}
        {!isLaptop && (
          <td className="py-2 pe-2 whitespace-nowrap border-t-2 border-[#EEEAF2] text-[#808080] text-[9px] sm:text-[11px] md:text-[13px]">
            {item?.urlDescription.slice(0,40)}{(item?.urlDescription?.length||0)>40 ? "...":""}
          </td>
        )}
        {!isMobile && (
          <td className="py-2 pe-2 whitespace-nowrap border-t-2 border-[#EEEAF2] text-[#808080] text-[9px] sm:text-[11px] md:text-[13px]">
            {item?.originalUrl.slice(0,30)}{(item?.originalUrl?.length||0)>30 ? "...":""}
          </td>
        )}
        <td className="py-2 pe-2 whitespace-nowrap border-t-2 border-[#EEEAF2] text-[#808080] text-[9px] sm:text-[11px] md:text-[13px]">
          https://yourlinkapp.vercel.app/api/url/{item?.shortUrl}
        </td>
        <td className="py-2 pe-2 whitespace-nowrap border-t-2 border-[#EEEAF2] text-[#808080] text-[9px] sm:text-[11px] md:text-[13px]">
          <label
            className="cursor-pointer"
            htmlFor="my_modal_8"
            onClick={() => {
              handleOpenModal(item);
              console.log(item?.shortUrl);
            }}
          >
            <i className="fas fa-link"></i>
          </label>
        </td>
      </tr>
      {isModalOpen && (
        <LinkModal link={`https://yourlinkapp.vercel.app/api/url/${shortCode}`} url={longCode} onClose={handleCloseModal} />
      )}
    </>
  );
}
