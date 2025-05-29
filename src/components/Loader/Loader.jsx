import React from 'react'
import styles from './Loader.module.css';
export default function Loader() {
  
  return (
    <>


    <div className="fixed inset-0 bg-gray-100/5 backdrop-blur-sm flex items-center justify-center">
        <div className={styles.loader}></div>
    </div>
    
    </>
  )
}
