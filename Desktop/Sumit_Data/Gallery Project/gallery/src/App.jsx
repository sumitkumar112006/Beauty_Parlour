import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Cards from './components/Cards';
import Buttons from './components/Buttons';

const App = () => {
  const [userData, setUserData] = useState([])
  const [index, setIndex] = useState(1)

  async function getData() {
    const response = await axios.get(`https://picsum.photos/v2/list?page=${index}&limit=15`)
    setUserData(response.data)
  }

  let printUserData = <h1 className='text-gray-500'>Loading...</h1>

  if (userData.length > 0) {

    printUserData = userData.map((elem, idx) => {
      return <div key={idx}>

        <Cards elem={elem} />

      </div>
    })
  }


  useEffect(function () {
    getData()
  }, [index])

  return (
    <div className='bg-black overflow-auto h-screen p-5 text-white'>
      {/* <button className='bg-gray-400 px-2 mb-5 rounded' onClick={getData}>Get Data</button> */}
      
      <div className='flex flex-wrap gap-4 justify-around'>
        {printUserData}
      </div>

      <Buttons index={index} setIndex={setIndex} setUserData={setUserData} />
    </div>
  )
}

export default App