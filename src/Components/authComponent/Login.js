import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import AuthContext from '../../store/AuthContext';
import Loader from "../quizz-game/Loader";
import Button from '../Utils/Button';
function Login(){
  const [isLoding,setisLoading]=useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const {
    setCredHandler,
    //setSocket,
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
    //if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    //if (!formData.confirmpassword) newErrors.confirmpassword = 'ConfirmPassword is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      // Handle form submission
      setisLoading(true);
      const form_data={
        //username:formData.name,
        email:formData.email,
        password:formData.password,
        //passwordConfirm:formData.confirmpassword
      }
     
      try {
        setisLoading(true);
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(form_data),
        });
        const res=await response.json();
        //console.log(res.data.user._id,res.data.user.username,res);
        if (!res.status||res.status!=='sucess') {
            throw new Error(res.message);
        }
        setisLoading(false);
        // Handle success
        setCredHandler(res.data.user.username,res.data.user._id,res.token);
       //setSocket();
        //console.log(localStorage.getItem('user'));
        
        // toast.success('Signup successful!', {
        //   position: toast.POSITION.TOP_RIGHT,
        //   autoClose: 5000,
        // });

        navigate('/');
        toast.success('Login successful!');
        
    } catch (error) {
        setisLoading(false);
        //console.error('Error submitting data:', error.message);
        toast.error('Login failed!');
        navigate('/login');
    }
      
    }
  };
  console.log(process.env.REACT_APP_API_URL);
  return (
    isLoding?<Loader/>:<>
    <form onSubmit={handleSubmit}className="mx-auto w-1/2  p-8 rounded mt-12">
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

export default Login;
