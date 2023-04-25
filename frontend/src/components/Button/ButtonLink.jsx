import React from 'react'
import { Link } from 'react-router-dom'

const ButtonLink = ({ text = 'No text', background = 'bg-transparent', destination = '/' }) => {
  return (
    <Link to={destination} className='border-2 border-transparent hover:brightness-95 bg-blue-theme font-medium px-5 text-center text-white py-2 rounded duration-200'>Online Database</Link>
  )
}

export default ButtonLink