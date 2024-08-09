import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

const CodingArena = () => {

  const [problems, setProblems] = useState([]);

  const fetchProblems = async () => {
    const url = process.env.REACT_APP_BASE_URL + '/getAllProblems';
    const response = await fetch(url);
    const responseData = await response.json();

    if(responseData.success) {
      setProblems(responseData.data);
      console.log(problems);
    } else {
      toast.error(responseData.message);
    }
  };

  useEffect(() => {
    async function fetchData() {
      await fetchProblems();
    }
    
    fetchData();
  }, []);

  return (
    <div className='pt-[13vh] min-h-screen w-10/12 mx-auto flex flex-col gap-y-7'>
      <h1 className='text-4xl font-bold text-center drop-shadow-lg capitalize'>Welcome to the Coding Arena</h1>

      <div className='flex flex-col w-full border-2 border-black'>
        <div className='flex items-center bg-[#201E43] text-white text-lg text-center'>
          <p className='w-[10%] p-3'>No.</p>
          <p className='w-full p-3'>Problem</p>
          <p className='w-[15%] p-3 text-center'>Solve It</p>
        </div>

        {
          problems?.map((problem, idx) => (
            <div key={problem._id} className='flex items-center text-lg'>
              <p className='w-[10%] p-3 border-r-2 border-r-black'>{idx+1}</p>
              <p className='w-full p-3 border-r-2 border-r-black'>{problem.title}</p>
              <Link to={`/codingArena/${problem._id}`} className='w-[15%] text-green-500 p-3 underline cursor-pointer text-center'>Solve</Link>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default CodingArena
