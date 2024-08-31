import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import AuthContext from '../../store/AuthContext';
import Loader from '../Loader';
import Button from '../Utils/Button';
function Form(){
  const [isLoding,setisLoading]=useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmpassword: '',
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const {
    setCredHandler,
    //setSocket
    //unsetCredHandler,
  }=useContext(AuthContext);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (!formData.confirmpassword) newErrors.confirmpassword = 'ConfirmPassword is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      // Handle form submission
      setisLoading(true);
      const form_data={
        username:formData.name,
        email:formData.email,
        password:formData.password,
        passwordConfirm:formData.confirmpassword
      }
      //console.log(form_data);
      //console.log(process.env.REACT_APP_API_URL);
      try {
        setisLoading(true);
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(form_data),
        });
        const res=await response.json();
        //console.log(res.data.user._id);
        if (!res.status||res.status!=='sucess') {
           //console.log(res);
            throw new Error(res.message);
        }
        setisLoading(false);
        // Handle success
        setCredHandler(res.data.user.username,res.data.user._id,res.token);
        //console.log(localStorage.getItem('user'));
        //setSocket();
        
        toast.success('Signup successful!');

        navigate('/');
        //console.log('Data submitted successfully');
        
    } catch (error) {
        setisLoading(false);
        //console.error('Error submitting data:', error.message);
        toast.error(`Signup Unsuccessful! ${error.message}`);
        navigate('/signup');
    }
      
    }
  };

  return (
    isLoding?<Loader/>:<>
    <form onSubmit={handleSubmit} className="mx-auto w-1/2  p-8 rounded mt-12">
      <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
        <label htmlFor="name" className="sm:basis-40">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={`input grow ${errors.name ? 'border-red-500' : ''}`}
        />
        {errors.name && <p className="text-red-500 text-xs italic">{errors.name}</p>}
      </div>
      <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
        <label htmlFor="email" className="sm:basis-40">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={`input grow ${errors.email ? 'border-red-500' : ''}`}
        />
        {errors.email && <p className="text-red-500 text-xs italic">{errors.email}</p>}
      </div>
      <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
        <label htmlFor="password" className="sm:basis-40">
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className={`input grow ${errors.password ? 'border-red-500' : ''}`}
        />
        {errors.password && <p className="text-red-500 text-xs italic">{errors.password}</p>}
      </div>
      <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
        <label htmlFor="password" className="sm:basis-40">
          confirmPassword
        </label>
        <input
          type="password"
          id="confirmpassword"
          name="confirmpassword"
          value={formData.confirmpassword}
          onChange={handleChange}
          className={`input grow ${errors.password ? 'border-red-500' : ''}`}
        />
        {errors.confirmpassword && <p className="text-red-500 text-xs italic">{errors.confirmpassword}</p>}
      </div>
      <div className="flex items-center justify-between">
      <Button
          type="primary"
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </div>
    </form>
    </>
  );
  
};

export default Form;
