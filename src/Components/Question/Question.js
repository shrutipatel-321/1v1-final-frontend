import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import AuthContext from '../../store/AuthContext';
import Loader from "../quizz-game/Loader";
import Button from '../Utils/Button';
function Question(){
  const [isLoding,setisLoading]=useState(false);
  const [formData, setFormData] = useState({
    question: '',
    optionA: '',
    optionB: '',
    optionC: '',
    optionD: '',
    correctOption: '',
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const {
    user_id,
    token,
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
    if (!formData.question) newErrors.email = 'Question is required';
    if (!formData.optionA) newErrors.optionA = 'OptionA is required';
    if (!formData.optionB) newErrors.optionB = 'OptionB is required';
    if (!formData.optionC) newErrors.optionC = 'OptionC is required';
    if (!formData.optionD) newErrors.optionD = 'OptionD is required';
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
        question:formData.question,
        optionA:formData.optionA,
        optionB:formData.optionB,
        optionC:formData.optionC,
        optionD:formData.optionD,
        correctOption:formData.correctOption,
        //passwordConfirm:formData.confirmpassword
      }
      //console.log(form_data);
      try {
        setisLoading(true);
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/question/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(form_data),
        });
        const res=await response.json();
        //console.log(res);
        if (!res.status||res.status!=='sucess') {
            throw new Error(res.message);
        }
        setisLoading(false);
        navigate('/');
        //console.log('Data submitted successfully');
        toast.success('Question added to question bank');
    } catch (error) {
        setisLoading(false);
        toast.error('Error submitting data');
        //console.error('Error submitting data:', error.message);
        
        navigate('/add');
    }
      
    }
  };

  return (
    isLoding?<Loader/>:<>
    <form onSubmit={handleSubmit} className="mx-auto w-1/2  p-8 rounded mt-12">
      <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
      {/* Question */}
        <label htmlFor="question" className="sm:basis-40">
        Question
        </label>
        <input
          type="text"
          id="question"
          name="question"
          value={formData.question}
          onChange={handleChange}
          className={`input grow ${errors.Question ? 'border-red-500' : ''}`}
        />
        {errors.question && <p className="text-red-500 text-xs italic">{errors.question}</p>}
      </div>
      <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
       {/* optionA */}
        <label htmlFor="optionA" className="sm:basis-40">
          optionA
        </label>
        <input
          type="text"
          id="optionA"
          name="optionA"
          value={formData.optionA}
          onChange={handleChange}
          className={`input grow ${errors.optionA ? 'border-red-500' : ''}`}
        />
        {errors.optionA && <p className="text-red-500 text-xs italic">{errors.optionA}</p>}
      </div>
      <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
        {/* optionB */}
        <label htmlFor="optionB"className="sm:basis-40">
          optionB
        </label>
        <input
          type="text"
          id="optionB"
          name="optionB"
          value={formData.optionB}
          onChange={handleChange}
          className={`input grow ${errors.optionB ? 'border-red-500' : ''}`}
        />
        {errors.optionB && <p className="text-red-500 text-xs italic">{errors.optionB}</p>}
      </div>
      <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
      {/* optionC */}
        <label htmlFor="optionC" className="sm:basis-40">
          optionC
        </label>
        <input
          type="text"
          id="optionC"
          name="optionC"
          value={formData.optionC}
          onChange={handleChange}
          className={`input grow ${errors.optionC ? 'border-red-500' : ''}`}
        />
        {errors.optionC && <p className="text-red-500 text-xs italic">{errors.optionC}</p>}
      </div>
      <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
      {/* optionD */}
        <label htmlFor="optionD" className="sm:basis-40">
          optionD
        </label>
        <input
          type="text"
          id="optionD"
          name="optionD"
          value={formData.optionD}
          onChange={handleChange}
     
          className={`input grow ${errors.optionD ? 'border-red-500' : ''}`}
        />
        {errors.optionD && <p className="text-red-500 text-xs italic">{errors.optionD}</p>}
      </div>
      <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
      {/* correctOption */}
        <label htmlFor="correctOption" className="sm:basis-40">
          correctOption
        </label>
        <input
          type="text"
          id="correctOption"
          name="correctOption"
          value={formData.correctOption}
          onChange={handleChange}
          className={`input grow ${errors.correctOption ? 'border-red-500' : ''}`}
        />
        {errors.correctOption && <p className="text-red-500 text-xs italic">{errors.correctOption}</p>}
      </div>
      <div >
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

export default Question;
