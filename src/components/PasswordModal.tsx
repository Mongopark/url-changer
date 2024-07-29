import React, { useState, useEffect } from 'react';
import { useAppDispatch } from '../hooks';
import { logout } from '../features/auth/slice'; // Adjust the path to where your authSlice is located
import useBreakpoint from '../hooks/useBreakpoint.ts';
import { useChangePasswordMutation } from '../app/api';
import { toast } from 'react-toastify';
import { FaX } from 'react-icons/fa6';

const LogoutModal = () => {
  const dispatch = useAppDispatch();
  const [hidePassword, setHidePassword ] = useState(false);
  const isMobile = useBreakpoint('md').isBelowMd;
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  const [changePassword
      , { data: changePData, isLoading: changePDataIsLoading, isSuccess, isError }
  ] = useChangePasswordMutation<any>();

  useEffect(() => {
    // Check if all fields are filled and the new passwords match
    if (
      oldPassword &&
      newPassword &&
      confirmNewPassword &&
      newPassword === confirmNewPassword
    ) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [oldPassword, newPassword, confirmNewPassword]);

  // Submit the form
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const changePasswordData = { oldPassword, newPassword };
        try {
            const result = await changePassword(changePasswordData).unwrap();
            if (result.success) {
                setOldPassword("");
            setNewPassword("");
            setConfirmNewPassword("");
                toast.success('Password changed successfully'); 
                // navigate('/edit');
            }
            console.log(result);
        } catch (error: any) {
            console.log(error);
            toast.error(error?.data?.error || 'Failed to change password');
        }
    };

  return (
    <>
      {/* Put this part before </body> tag */}
      <input type="checkbox" id="my_modal_6" className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box">
        <label className="modal-backdrop text-red-500 justify-end text-sm md:text-2xl" htmlFor="my_modal_6"><FaX /></label>
          <h3 className="text-lg font-bold mb-4 md:mb-10 text-sm md:text-[20px] px-2">Change Password Form:</h3>
          <div className="flex flex-col space-y-4">
          <div className="relative">
            <input
              type={hidePassword?"password":"name"}
              placeholder="Old Password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className="input input-bordered w-full"
            />
            {!isMobile&&<i className={`far ${hidePassword?"far fa-eye-slash":"far fa-eye"} absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer`} onClick={()=>{setHidePassword(!hidePassword)}}></i>}
            </div>
            <div className="relative">
            <input
              type={hidePassword?"password":"name"}
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="input input-bordered w-full"
            />
            {!isMobile&&<i className={`far ${hidePassword?"far fa-eye-slash":"far fa-eye"} absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer`} onClick={()=>{setHidePassword(!hidePassword)}}></i>}
            </div>
            <div className="relative">
            <input
              type={hidePassword?"password":"name"}
              placeholder="Confirm New Password"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              className="input input-bordered w-full"
            />
            {!isMobile&&<i className={`far ${hidePassword?"far fa-eye-slash":"far fa-eye"} absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer`} onClick={()=>{setHidePassword(!hidePassword)}}></i>}
            </div>
            <button
              className={`btn w-full ${isDisabled || changePDataIsLoading ? 'btn-disabled' : 'btn-primary text-white'}`}
              onClick={handleSubmit}
              disabled={isDisabled}
            >
                <span>{!changePDataIsLoading?"Change Password":"Changing Password"}</span>{changePDataIsLoading && <span className="loading loading-spinner"></span>}
            </button>
          </div>
        </div>
        <label className="modal-backdrop" htmlFor="my_modal_6">Close</label>
      </div>
    </>
  );
};

export default LogoutModal;
