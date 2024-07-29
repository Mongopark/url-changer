import React from 'react'
import { useAppDispatch } from '../hooks';
import { logout } from '../features/auth/slice'; // Adjust the path to where your authSlice is located

const LogoutModal = () => {
    const dispatch = useAppDispatch();


    const handleLogout = () => {
      dispatch(logout());
    };


  return (
    <>
{/* Put this part before </body> tag */}
<input type="checkbox" id="my_modal_7" className="modal-toggle" />
<div className="modal" role="dialog">
  <div className="modal-box">
    <h3 className="text-lg font-bold mb-4 md:mb-10 text-sm md:text-[20px] px-2">Are you sure you want to Logout?</h3>
    <div className="flex">
            <div>
    <p className="px-2 text-[12px] md:text-[20px]">Sorry, I still have things to do!</p>
    <label className='modal-backdrop text-white text-[10px] md:text-sm btn bg-primary hover:bg-other w-3/5 md:w-2/5' htmlFor="my_modal_7">Go Back</label>
    </div>
    <div>
    <p className="px-2 text-[12px] md:text-[20px]">Yeah, i'm done for now!</p>
    <button className='btn bg-red-600 hover:bg-red-400 text-white text-[10px] md:text-sm w-4/5 md:w-3/5' onClick={handleLogout}>Logout</button>
    </div>
    </div>
  </div>
  <label className="modal-backdrop" htmlFor="my_modal_7">Close</label>
</div>
</>
  )
}

export default LogoutModal;