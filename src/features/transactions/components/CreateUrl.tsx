import { initialLoginFieldState, registerFields } from '../model/fields.ts';
import { registerValidator } from '../../auth/model/validators.ts';
import { useFormik } from 'formik';
import { AuthRequest } from '../../auth/model/index.ts';
import { useAuthAction } from '../../auth/slice/index.ts';
import { useUrlShortnerMutation } from '../../../app/api';
import { toast } from 'react-toastify';
import { useAppSelector } from '../../../hooks';
import { RootState } from '../../../app/store';


export default function CreateUrl(props: {toggleRegister: ()=>void;}) {
  const fields = registerFields;
    const { authenticate } = useAuthAction();
    const currentUserId = useAppSelector((state: RootState) => state.auth.userId);
  const [ urlShortner,
    { 
      isLoading: shortenIsLoading,
      isSuccess: shortenIsSuccess,
    }
    ] = useUrlShortnerMutation();

  const formik = useFormik<AuthRequest>({
    initialValues: initialLoginFieldState,
    validationSchema: registerValidator,
    onSubmit: (values) => authenticate(values)
  });


  
  


  const handleShorten = async (e: any) => {
    e.preventDefault();
    try {
      const response: any = await urlShortner({
        name: formik.values.username,
      url: formik.values.web,
      description: formik.values.text,
    });
    if (response.data) {
          toast(response.data.message || "successful", { type: response.data.status === 200?'success':'info' });
          // formik.resetForm();
          formik.values.username = "";
       formik.values.web= "";
      formik.values.text= "";      
      setTimeout(() => {  
        response.data.status === 200 && window.location.reload()             
    }, 5000);
    } else{
        toast(response.error.data||'input all fields', { type: 'error' });
        formik.values.username = "";
       formik.values.web= "";
      formik.values.text= "";
      } 
    } catch (error: any) {
      // Handle error
        toast(error.data.error || "Error, something went wrong", { type: 'error' });
    }
  };

  return (
    <section>      
      <div className="p-5">
      <form>
        <div className="flex flex-col md:gap-5 gap-3">
          {fields.map((field) => (
            <label key={field.id} className="form-control">
              <span className="label label-text md:text-sm text-[12px]">{field.label}</span>
              <input
                id={field.id}
                name={field.id}
                type={field.type}
                placeholder={field.placeholder}
                className={`w-full input input-bordered flex items-center gap-2 md:text-sm text-[12px] ${
                  formik.touched[field.id] && formik.errors[field.id] && 'input-error'
                }`}
                value={formik.values[field.id]}
                onChange={formik.handleChange}
              />
              {formik.touched[field.id] && formik.errors[field.id] ? (
                <span className="label label-text-alt">{formik.errors[field.id]}</span>
              ) : null}
            </label>
          ))}
        </div>
        <button
          type="submit"
          className="btn btn-primary mt-8 w-full"
          disabled={shortenIsLoading}
          onClick={(handleShorten)}
        >                
        <div className="btn btn-sm text-white btn-ghost text-xs md:text-sm">
        {shortenIsLoading?"Changing URL":"Change URL"}
          </div> {shortenIsLoading && <span className="loading loading-spinner"></span>}
        </button>
      </form>
      </div>
    </section>
  );
}
