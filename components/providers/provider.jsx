'use client'

import React from 'react'
import AOS  from 'aos'
import 'aos/dist/aos.css'
import { useEffect } from 'react'
import { ClerkProvider } from '@clerk/nextjs'
import Navbar from '../Navbar'
const Provider = ({ children }) =>
{
  useEffect(() =>
  {
    AOS.init();
  }, [])
  return (
    <ClerkProvider>
      < Navbar/>
      {children}
    </ClerkProvider>
  )
}

export default Provider