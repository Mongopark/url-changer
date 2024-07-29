import { IconType } from 'react-icons';


export interface CardProps {
    title?: string;
    text?: string;
    CardIcon?: IconType;
    bgColor?: string;
  }

export default function Card({
    title,
    text,
    CardIcon,
    bgColor,
  }: CardProps) {
  
  
 
// black #8F86D7 #98BCF1 #3D7C8D

  return (
      <div className='md:pe-5 md:py-5 md:ps-1 py-3 px-3 bg-primary rounded-lg flex md:m-2 m-1' style={{backgroundColor: bgColor}}>
      {CardIcon && <div className='md:p-3 p-1 bg-white rounded-md'>
       <CardIcon size={30}/>
        </div>}
      <div className='ms-1 pe-3'>
        <div className='text-white md:text-sm text-[8px] whitespace-nowrap'>
        {title}
        </div>
        <div className='text-white md:text-lg text-[10px] font-semibold'>
        {text}
        </div>
        </div>
      </div>
  );
}
