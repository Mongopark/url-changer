import React, { useState } from 'react';
import useBreakpoint from '../../../hooks/useBreakpoint.ts';'react-router-dom';
import { FaGear } from "react-icons/fa6";
import { useLocation, useNavigate, Link, Outlet, } from 'react-router-dom';
import { useCreateProductMutation, useGetMeQuery } from '../../../app/api';




export interface CardProps {
    title?: string;
  }

export default function Header({
    title,
  }: CardProps) {
    const navigate = useNavigate();
    const { pathname, search } = useLocation();
    const [ password, setPassword] = useState<boolean>(false);
    const isMobile = useBreakpoint('md').isBelowMd;  
    const { data: getmeData, isLoading: getmeDataIsLoading } = useGetMeQuery<any>();
  const notify = [
    {
    title: "Amelia GH recently changed the url https://instagram.com...",
    time: '7 hours',
    read: false
  },
  {
    title: "Jame Hugh recently changed the url https://facebook.com...",
    time: '4 hours',
    read: true
  },
  {
    title: "Riley Jack recently changed the url https://whatsapp.com...",
    time: '4 hours',
    read: true
  },
  {
    title: "Emmanuel Sam recently changed the url https://twitter.com...",
    time: '4 hours',
    read: true
  }
]
 


  return (
    <div className="font-medium bg-primary flex md:justify-between justify-end lg:text-2xl md:text-lg p-5 w-full">
        <h1 className='text-white md:ms-10 md:block hidden ms-2'>{title}</h1>
    <h1 className='md:me-10 me-1 md:me-2 flex'>
      <span className="form-control">
      <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
    </span>
    <div className="flex-none">
      <span className="p-[16px] md:p-[15px] lg:p-3 rounded font-semibold disabled:opacity-50 bg-other mx-1 md:mx-2 far fa-search text-white btn-ghost border-none"></span>
      </div>
      <div className="flex-none">
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost rounded font-semibold disabled:opacity-50 bg-other me-1 md:me-2 btn-circle text-white mb-2">
        <div className="indicator far fa-bell text-lg">          
          <span className="badge badge-sm indicator-item bg-red-500 text-white">4</span>
        </div>
      </div>
      <div
        tabIndex={0}
        className="card card-compact dropdown-content bg-base-100 z-[1] w-72 shadow">
          <span className="font-bold pt-3 mx-3">Notifications</span>
        <div className="card-body items-center">
          <div className="card-body border items-center w-72">
        <div className="card-actions">
            {notify.map(item => <div className="rounded-[0px] btn-ghost w-72 justify-start flex px-3 cursor-pointer">
              <div className=""><i className="fas fa-calendar text-primary mt-2"></i></div>
              
              <div className="text-start ps-2">
                <div className="text-[12px] font-bold">{item.title}</div><span className="text-[12px] font-light">{item.time}</span></div>
                </div>)}
          </div>
          </div> 
        <span className="font-bold items-center text-info mx-3 justify-center font-light cursor-pointer">Mark All As Read</span>       
        </div>        
      </div>
    </div>
    </div> 
    <div className="flex-none">
      <label className="p-[16px] md:p-[15px] lg:p-3 rounded font-semibold disabled:opacity-50 btn-ghost bg-other me-1 md:me-2 far fa-sign-out-alt text-white border-none" htmlFor="my_modal_7" onClick={()=>{}}></label>
      </div>

      <div className="flex-none">
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="bg-white rounded-full btn btn-ghost rounded btn-circle">
      <img src={getmeData?.user?.profilePicture?.url} className="card-img img-fluid rounded rounded-[100px]"  alt="" />
      </div>
      <div
        tabIndex={0}
        className="card card-compact dropdown-content bg-base-100 z-[1] w-72 shadow">
        <div className="card-body items-center">
          <div className="card-body border items-center w-72">
        <div tabIndex={0} role="button" className="bg-black rounded-full btn btn-ghost rounded btn-circle w-[90px] h-[90px]">
        <img src={getmeData?.user?.profilePicture?.url} className="card-img img-fluid rounded rounded-[100px]"  alt="" />
        </div>
          <span className="text-lg font-bold">{getmeData?.user?.name}</span>
          <span className="text-info">{getmeData?.user?.email}</span>
          </div>
          <div className="card-actions">
          <button className={`btn rounded-[0px] justify-between w-72 ${pathname.includes('/edit')?'btn-ghost':'btn-info'}`} onClick={()=>navigate('/')}><i className="fas fa-home"></i><span>User Dashboard</span><span> </span></button>
            {/* <button className={`btn rounded-[0px] justify-between w-72 ${pathname.includes('patient/view')?'btn-info':'btn-ghost'}`} onClick={()=>navigate('/patient/view')}><i className="fas fa-user"></i><span>View Profile</span><span> </span></button> */}
            <button className={`btn rounded-[0px] justify-between w-72 ${pathname.includes('/edit')?'btn-info':'btn-ghost'}`} onClick={()=>navigate('/edit')}><FaGear /><span>Edit Profile</span><span> </span></button>
            <button className="btn rounded-[0px] btn-ghost justify-between w-full"><i className="fas fa-lock"></i><label className="" htmlFor="my_modal_6">Change Password</label><span> </span></button>
          </div>
        </div>
      </div>
    </div>
    </div>
      </h1>
    </div>
  );
}
