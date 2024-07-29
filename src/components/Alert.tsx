import React, { useEffect } from 'react';

const Alert = (props: {type: string; text: string; dialog: boolean; setDialog: ()=>void;}) => {
    const { type, text, dialog, setDialog} = props;
    useEffect(() => {
if (dialog){
        // Set the alert to hide after 5 seconds (5000 milliseconds)
        const timer = setTimeout(() => {
          setDialog();
        }, 5000);}
    
        // Clean up the timer when the component unmounts
        // return () => clearTimeout(timer);
      }, [dialog]);
    
  return (
    <>
    {dialog&&<div className="absolute md:top-20 top-16 left-0 md:w-8/12 w-25 z-50">
      <div role="alert" className={`flex alert ${type==='success'?'bg-green-300':type==='error'?'bg-red-500':type==='loading'?'bg-black':'bg-blue-300'}`}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="white"
          viewBox="0 0 24 24"
          className="stroke-info shrink-0 w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
        <span className={`font-bold md:text-sm text-[10px] md:text-sm text-[10px] flex ${type==='success'?'text-black':type==='error'?'text-white':type==='loading'?'text-white':'text-black'}`}>{text}</span>
      </div>
    </div>}
    </>
  );
};

export default Alert;
