import { toast } from 'react-toastify';
import useBreakpoint from '../hooks/useBreakpoint.ts';
import { useState } from 'react';

const LinkModal = (props: { link: string; url: string | undefined; onClose: () => void }) => {
  const isMobile = useBreakpoint('md').isBelowMd;
  const [seeOriginal, setSeeOriginal] = useState<boolean>(false);
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(
      () => {
        toast(`Link ${text} copied to clipboard!`, { type: 'info' });
      },
      (err) => {
        toast(`Could not copy link ${text}: ${err}`, { type: 'error' });
      }
    );
  };

  return (
    <>
      <input type="checkbox" id="my_modal_8" className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box">
          <i className='bg-primarylight rounded rounded-[30px] p-2 py-3 md:p-3 md:py-5 cursor-pointer' onClick={() => copyToClipboard(props.link)}>
            <i className="fas fa-link bg-[skyblue] rounded rounded-[20px] p-2 md:p-3 text-primary"></i>
          </i>
          <h3 className="text-lg font-bold mb-1 md:mb-2 text-sm md:text-[20px] pt-4 text-primary cursor-pointer" onClick={()=> setSeeOriginal(!seeOriginal)}>{seeOriginal ? "Click to Hide full URL":"Click to View full URL"}</h3>
          {seeOriginal && <h3 className="text-lg font-light mb-4 w-10/12 break-all md:mb-10 text-sm md:text-[20px]">{props.url}</h3>}
          <div className='justify-between flex'>
          <span>Share Link</span>
          {isMobile && <button className='md:p-3 text-[10px] md:text-sm w-1/12 md:w-1/6' onClick={() => copyToClipboard(props.link)}>
              <i className='far fa-clone'></i>
            </button>}
          </div>
          <div className="flex mb-3">
            <label className='modal-backdrop text-[10px] md:text-sm rounded-[8px] border text-black w-full md:w-5/6 border-grey border-[3px] items-center py-3'>
              {props.link}
            </label>
            {!isMobile && <button className='p-3 text-[10px] md:text-sm w-1/6 md:w-1/6' onClick={() => copyToClipboard(props.link)}>
              <i className='far fa-clone'></i>
            </button>}
          </div>
          <div className="flex flex-col md:flex-row flex-col-reverse mt-3 justify-between">
            <label
              className="mt-2 md:mt-0 text-black text-[10px] md:text-sm hover:bg-pink w-full md:h-12 h-10 md:w-5/12 border-grey border-[3px] text-center rounded-[8px] cursor-pointer flex items-center justify-center"
              onClick={props.onClose}
            >
              <span>Cancel</span>
            </label>
            <button className='btn bg-primary hover:bg-primarylight text-white text-[10px] md:text-sm w-full md:w-5/12' onClick={props.onClose}>
              Done
            </button>
          </div>
        </div>
        <label className="modal-backdrop" htmlFor="my_modal_8" onClick={props.onClose}>Close</label>
      </div>
    </>
  );
};

export default LinkModal;
