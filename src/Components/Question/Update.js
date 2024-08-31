import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import AuthContext from '../../store/AuthContext';
import QuestionContext from '../../store/QuestionContext';
import Loader from "../quizz-game/Loader";
import Button from '../Utils/Button';
function Update(){
  const [isLoding,setisLoading]=useState(false);
  const {id,ind}=useParams();
  const {updateQuestionHandler}=useContext(QuestionContext)
  const [formData, setFormData] = useState({
    question: '',
    optionA: '',
    optionB: '',
    optionC: '',
    optionD: '',
    correctOption: '',
  });
  const[defaultValue,setDefaultValue]=useState({});
  const[errors,setErrors]=useState({});
  const navigate = useNavigate();
  const {
    user_id,
    token,
  }=useContext(AuthContext);
  const[question,setQuestion]=useState({});
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
      // Handle form submission
      setisLoading(true);
      const form_data={
        //username:formData.name,
        question:formData.question,
        optionA:formData.optionA,
        optionB:formData.optionB,
        optionC:formData.optionC,
        optionD:formData.optionD,
        correctOption:formData.correctoption,
        //passwordConfirm:formData.confirmpassword
      }
      //console.log(form_data,id);
      try {
        setisLoading(true);
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/question/updatequestion/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(form_data),
        });
        const res=await response.json();
       // console.log(res);
        if (!res.status||res.status!=='sucess') {
            throw new Error(res.message);
        }
        setisLoading(false);
        updateQuestionHandler(ind,res.data);
        navigate('/View');
        //console.log('Data submitted successfully');
        toast.success('Updation done suvessfully');
        
    } catch (error) {
        setisLoading(false);
        toast.error(error.message);
        //console.error('Error submitting data:', error.message);
    }
      
    
  };
  useEffect(()=>{
    const fetchQuestion=async()=>{
    try{
      setisLoading(true);
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/question/getq/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            //body: JSON.stringify(form_data),
        });
        const res=await response.json();
        //console.log(res);
        if (!res.status||res.status!=='sucess') {
            throw new Error(res.message);
        }
        setisLoading(false);
        setFormData({
          question:res.question.question,
          optionA:res.question.optionA,
          optionB:res.question.optionB,
          optionC:res.question.optionC,
          optionD:res.question.optionD,
          correctOption:res.question.correctOption,
        });
        //console.log(res.question);
        //updateQuestionHandler(ind,res.data);
    }catch(err){
      setisLoading(false);
    }
  }
   fetchQuestion();
  },[])
  //console.log(defaultValue)
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
          defaultValue={defaultValue.question}
          onChange={handleChange}
          className={"input grow"}
        />
    
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
          className={`input grow`}
        />
      </div>
      <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
        {/* optionB */}
        <label htmlFor="optionB" className="sm:basis-40">
          optionB
        </label>
        <input
          type="text"
          id="optionB"
          name="optionB"
          value={formData.optionB}
          onChange={handleChange}
          className={`input grow`}
        />
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
          className={`input grow`}
        />
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
     
          className={`input grow`}
        />
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
          className={`input grow`}
        />
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

export default Update;
