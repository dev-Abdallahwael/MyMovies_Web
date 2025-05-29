import React from 'react'
import img from "../assets/imgs/nodata.svg"
export default function Nomovies() {
  return (
    <>
        <div className=" container flex items-center justify-center w-screen my-7">
          <img src={img} alt="No Data" />
        </div>
    </>
  )
}
