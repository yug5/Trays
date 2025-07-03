import React from 'react'

export default function Journal() {
  return (
    <div className='bg-white h-full rounded-2xl outline-dashed outline-3 outline-gray-400  flex flex-col justify-between'>
      <div className="flex flex-col items-center justify-center h-full">
         <h1 className="text-4xl font-bold text-gray-700 mb-4  p-5">Welcome to Trays</h1>
         <p className="text-lg text-gray-600 mb-8 p-5">Your personal space for thoughts and ideas</p>
         <p className="text-sm text-gray-500 mb-4 p-5">Click the ✍︎ button to start writing</p></div>
    </div>
  )
}
