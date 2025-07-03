import React from 'react'

export default function Write() {
    const Close = () => {
        const modal = document.getElementById('add');
        if (modal) {
            modal.classList.add('hidden');
        }
    }

  return (
    <div id='add' className='hidden'>
    <div  className='absolute  left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-[5%] bg-white shadow-2xl w-full h-screen flex flex-col items-center p-10  md:w-[30%] md:h-[70%] z-50'> 
       <h1 className='text-3xl  text-gray-700 font-bold'>Journal Entry</h1>
       <div className='text-gray-500 text-sm '>~ add to your day</div>
         <textarea className='w-full h-full m-5 p-5 text-gray-700 bg-gray-100 rounded-lg  outline-dashed outline-gray-300  resize-none focus:outline-gray-400  ' placeholder='Write your thoughts here...'></textarea>
         <div className='flex justify-end gap-4 w-full mt-5'>
        <button className='bg-green-500   text-white px-4 py-1 rounded-lg hover:bg-green-600 transition duration-200'>✔</button>
        <button onClick={Close} className='bg-red-500  text-white px-4 py-1 rounded-lg hover:bg-red-600 transition duration-200'>✗</button>
         </div>
    </div>
    </div>
  )
}
