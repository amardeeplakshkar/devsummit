'use client'

import React from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { useEffect } from 'react'
import { ClerkLoaded, ClerkLoading, ClerkProvider } from '@clerk/nextjs'
import Navbar from '../Navbar'
const Provider = ({ children }) =>
{
  useEffect(() =>
  {
    AOS.init();
  }, [])
  return (
    <ClerkProvider>
      <ClerkLoading>
        loading..
      </ClerkLoading>
      <ClerkLoaded>
        < Navbar />
        {children}
      </ClerkLoaded>
    </ClerkProvider>
  )
}

export default Provider