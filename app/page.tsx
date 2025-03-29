import Link from 'next/link'
import React from 'react'

const LandingPage = () => {
  return (
    <div>LandingPage
      <br />
      <Link href={
        "/dashboard"
      }>
        dashboard
        </Link>
    </div>
  )
}

export default LandingPage