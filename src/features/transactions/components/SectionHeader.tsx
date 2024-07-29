
export interface CardProps {
    title?: string;
  }

export default function SectionHeader({
    title,
  }: CardProps) {
  
  
 


  return (
    <div className="font-medium flex justify-between md:text-2xl text-sm"><h1 className='ms-2'>{title}</h1><h1></h1></div>
  );
}
