import { useEffect, useState } from 'react';
import { initialRegisterFieldState, registerFields } from '../model/fields.ts';
import { registerValidator } from '../model/validators.ts';
import { useFormik } from 'formik';
import { RegRequest } from '../model';
import { useAuthAction } from '../slice';
import { RegisterRequest } from '../model';
import useBreakpoint from '../../../hooks/useBreakpoint.ts';

export default function AdminForm(props: {toggleRegister: ()=>void;}) {
  const fields = registerFields;
  const [hidePassword, setHidePassword ] = useState(false);
  const [disabled, setDisabled] = useState(false)
  const { registerUser, loading } = useAuthAction();
  const isMobile = useBreakpoint('md').isBelowMd;


  const formik = useFormik<RegRequest>({
    initialValues: initialRegisterFieldState,
    validationSchema: registerValidator,
    onSubmit: (values) => registerUser(values, '/home')
  });

  const handleRegister = async () => {
    const request: RegisterRequest = { name:  formik.values.name, email : formik.values.email, password: formik.values.password };
    await registerUser(request, '/auth');
  };


  useEffect(() => {
    if (formik.values.password !== formik.values.confirm_password){
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [formik.values.password, formik.values.confirm_password])


  useEffect(() => {
      setDisabled(false);
  }, [])
  

  return (
    <section>
      <div className="border border-grey-300 p-5 rounded-[10px]">
      <h1 className="text-2xl font-bold text-center mt-4-text md:text-2xl text-sm">Create an Account</h1>
      <form>
        <div className="flex flex-col md:gap-5 gap-3">
          {fields.map((field) => (
            <label key={field.id} className="form-control">
              <span className="label label-text md:text-sm text-[12px]">{field.label}</span>
              <div className="relative">
              <input
                id={field.id}
                name={field.id}
                type={hidePassword?field.type:'name'}
                placeholder={field.placeholder}
                className={`w-full input input-bordered flex items-center gap-2-text md:text-sm text-[12px] ${
                  formik.touched[field.id] && formik.errors[field.id] && 'input-error'
                }`}
                value={formik.values[field.id]}
                onChange={formik.handleChange}
              />
                  {!isMobile&&<i className={`far ${hidePassword?field.rightIcon:field.leftIcon} absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer`} onClick={()=>{setHidePassword(!hidePassword)}}></i>}</div>
              {formik.touched[field.id] && formik.errors[field.id] ? (
                <span className="label label-text-alt">{formik.errors[field.id]}</span>
              ) : null}
            </label>
          ))}
        </div>
        <button
          type="submit"
          className="btn btn-primary mt-8 w-full"
          // disabled={loading || !(formik.isValid && formik.dirty)}
          disabled={loading || disabled}
          onClick={handleRegister}
        >                
        <div className="btn btn-sm btn-ghost text-white text-xs md:text-sm">
            Create Account
          </div> {loading && <span className="loading loading-spinner"></span>}
        </button>  
        <p className="text-center text-[#808080] mb-1 lg:mb-[0.75rem] pt-5 md:text-sm text-[10px]">Already have an account?<span className="text-center text-primary mb-1 lg:mb-[0.75rem] cursor-pointer md:text-sm text-[10px]" onClick={()=>props.toggleRegister()}> Log In</span></p>
      </form>
      </div>
    </section>
  );
}
