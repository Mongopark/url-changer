import React, { useEffect, useState } from 'react';
import Header from './Header';
import { toast } from 'react-toastify';
import LogoutModal from '../../../components/LogoutModal';
import { useEditProfileMutation, useGetMeQuery } from '../../../app/api';
import { useLocation, useNavigate, Link, Outlet, } from 'react-router-dom';
import PasswordModal from '../../../components/PasswordModal.tsx';

export interface Category {
    _id?: string;
    name?: string;
}

const AdminEditProfile = () => {
    const { data: getmeData, isLoading: getmeDataIsLoading } = useGetMeQuery<any>();
    const navigate = useNavigate();
    const [name, setName] = useState<string>(getmeData?.user.name || '');
    const [description, setDescription] = useState<any>(getmeData?.user.about || '');
    const [price, setPrice] = useState<string>(getmeData?.user.age || '');
    const [image, setImage] = useState<string | ArrayBuffer | null>('');
    const [editProfile
        , { data: editPData, isLoading: pDataIsLoading, isSuccess, isError }
    ] = useEditProfileMutation<any>();

    
    useEffect(() => {
        if (getmeData) {
            setName(getmeData?.user?.name);
            setDescription(getmeData?.user?.about);
            setPrice(getmeData?.user?.age);
            setImage(getmeData?.user?.profilePicture?.CreateUrl);
        }
    }, [getmeData]);

    // Handle and convert it in base 64
    const handleImage = (e: any) => {
        const file = e.target.files[0];
        setFileToBase(file);
    };

    const setFileToBase = (file: File) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setImage(reader.result);
        };
    };

    // Submit the form
    const submitForm = async (e: any) => {
        e.preventDefault();
        const editProfileData = { name, description, price, image };
        try {
            const result = await editProfile(editProfileData).unwrap();
            if (result.success) {
                setName(getmeData?.user?.name);
            setDescription(getmeData?.user?.about);
            setPrice(getmeData?.user?.age);
                setImage('');
                toast.success('Profile updated successfully'); 
                // navigate('/edit');
            }
            setTimeout(() => {  
                location.reload()             
            }, 5000);
        } catch (error: any) {
            toast.error(error.message || 'Failed to edit profile');
        }
    };

    return (
        <div className="w-full">
            <Header title="YOUR URL CHANGER"/>
                <LogoutModal />
                <PasswordModal />
                <h2 className="font-bold text-3xl text-center ps-5">EDIT PROFILE</h2>
                <div className="m-0 ps-5 md:ps-10 overflow-hidden">
                <form className="text-[darkblue] font-bold col-sm-6 offset-3 pt-3 signup_form" encType="multipart/form-data" onSubmit={submitForm}>
                    <div className="form-outline mb-5">
                        <input onChange={(e) => setName(e.target.value)} type="text" id="form4Example1" className="border-primary border rounded w-10/12 md:w-8/12 p-2 md:p-4 form-control text-black text-[12px] sm:text-sm md:text-lg" value={name} />
                        <label className="form-label text-[10px] md:text-sm" htmlFor="form4Example1">Name</label>
                    </div>
                    <div className="form-outline mb-5">
                        <textarea onChange={(e) => setDescription(e.target.value)} type="text" id="form4Example2" className="border-primary border rounded w-10/12 md:w-8/12 p-2 p-2 md:p-4 form-control text-[12px] sm:text-sm md:text-lg text-black" value={description} />
                        <label className="form-label text-[10px] md:text-sm" htmlFor="form4Example2">About</label>
                    </div>
                    <div className="form-outline mb-5">
                        <input onChange={(e) => setPrice(e.target.value)} type="number" id="form4Example3" className="border-primary border rounded w-10/12 md:w-8/12 p-2 p-2 md:p-4 form-control text-[12px] sm:text-sm md:text-lg text-black" value={price} />
                        <label className="form-label text-[10px] md:text-sm" htmlFor="form4Example2">Age</label>
                    </div>
                    <div className="form-outline mb-4">
                        <input onChange={handleImage} type="file" id="formupload" name="image" className="form-control text-[12px] sm:text-sm md:text-lg" />
                        <label className="form-label text-[10px] md:text-sm" htmlFor="form4Example2">Image</label>
                    </div>
                    <img className="img-fluid" src={image as string} alt="" />
                    <button type="submit" className={`btn ${pDataIsLoading?"text-[black]":"text-white"} btn-primary w-8/12 md:w-4/12 mb-4 flex`} disabled={pDataIsLoading}><span>{!pDataIsLoading?"Update Profile":"Updating Profile"}</span>{pDataIsLoading && <span className="loading loading-spinner"></span>}</button>
                </form>
            </div>
        </div>
    );
};

export default AdminEditProfile;
