import React from "react";

const styles = {
  container: `z-40 fixed w-full top-[390px] right-[0px]  flex justify-center items-center overflow-hidden`,
  modalContainer: `rounded-xl border z-50 border-2 border-gray-400 w-[350px] h-[170px] bg-[#fff] flex flex-col items-center justify-around`,
  buttons: `w-full flex justify-center items-center`,
  no: `p-2 bg-[#03a505] mr-1 rounded-[4px] w-[80px] transition-all duration-300  hover:scale-105 `,
  yes: `p-2 bg-[#d30206] ml-1 text-[#fff] rounded-[4px] w-[80px] transition-all duration-300  hover:scale-105`,
};

const DeleteModal = ({ setIsDeleteModalOpen, setDeleteDua }) => {
  return (
    <div className={styles.container}>
      <div className={styles?.modalContainer}>
        <h3>Are sure you want to delete it?</h3>
        <div className={styles.buttons}>
          <button
            onClick={() => {
              setDeleteDua(false);
              setIsDeleteModalOpen(false);
            }}
            className={styles.no}
          >
            Cancel
          </button>
          <button
            onClick={() => {
              setDeleteDua(true);
              setIsDeleteModalOpen(false);
            }}
            className={styles.yes}
          >
            Delete
          </button>
        </div>
      </div>
      <div className="w-screen h-screen fixed z-40 bg-[#000] opacity-50 left-0 top-0 p-6" />
    </div>
  );
};

export default DeleteModal;
