import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';

const Problem = () => {

  const [problem, setProblem] = useState({});
  const { id } = useParams();

  const fecthProblem = async () => {
    const url = process.env.REACT_APP_BASE_URL + `/getProblem/${id}`;
    const response = await fetch(url);

    const responseData = await response.json();

    if(responseData.success) {
      setProblem(responseData.problem);
      console.log(problem);
    } else {
      toast.error(responseData.message);
    }
  };

  useEffect(() => {
    fecthProblem();
  }, []);


  return (
    <div className='pt-[13vh] w-10/12 mx-auto min-h-screen grid grid-cols-2'>
      {/* prolem statement */}
      <div className='flex-col h-full gap-y-7'>
        <div className='flex flex-col gap-y-4'>
          <h1 className='text-3xl font-bold'>{problem?.title}</h1>
          <p className={`px-3 py-1 w-fit text-white ${problem?.difficulty === "Easy" ? "bg-green-400" : problem?.difficulty === "Medium" ? "bg-yellow-500" : 'bg-red-800'}`}>{problem?.difficulty}</p>
          <p>{problem?.description}</p>

        </div>
      </div>  

    {/* editor + input */}
      <div>

      </div>
    </div>
  )
}

export default Problem
