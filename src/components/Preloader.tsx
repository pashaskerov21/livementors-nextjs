'use client'
import React from 'react'

const Preloader: React.FC = () => {
  return (
    <div className='preloader'>
      {/* <div className="logo">
        <img src="/logo/header-logo.png" width={500} height={60} alt="" />
      </div> */}
      <div className="preloader-icon"></div>
    </div>
  )
}

export default React.memo(Preloader)
