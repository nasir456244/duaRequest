import React, { useState } from 'react'

const styles = {
    container: `w-screen z-50 h-screen fixed flex justify-center items-center overflow-hidden`,
    modalContainer: `rounded-xl w-[350px] h-[170px] bg-[#fff] flex flex-col items-center justify-around`,
    buttons: `w-full flex justify-center items-center`,
    no: `p-2 bg-[#03a505] mr-1 rounded-[4px] w-[80px] transition-all duration-300  hover:scale-105 `,
    yes: `p-2 bg-[#d30206] ml-1 text-[#fff] rounded-[4px] w-[80px] transition-all duration-300  hover:scale-105`
}

const DeleteModal = ({setIsDeleteModalOpen, setDeleteDua}) => {
  return (
    <div className={styles.container}>

        <div className={styles?.modalContainer}>
            <h3>
                Are sure you want to delete this prayer?
            </h3>
            <div className={styles.buttons}>
                <button onClick={() => {setDeleteDua(false);setIsDeleteModalOpen(false);}} className={styles.no}>Sike</button>
                <button onClick={() => {setDeleteDua(true);setIsDeleteModalOpen(false);}} className={styles.yes}>Delete</button>
            </div>

        </div>
        

    </div>
  )
}

export default DeleteModal