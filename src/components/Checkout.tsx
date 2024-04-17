import React, { useState, useEffect } from "react";

const CheckOut = () => {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const handleOutsideClick = (event: any) => {
      if (!event.target.closest(".modal")) {
        closeModal();
      }
    };

    window.addEventListener("click", handleOutsideClick);

    return () => {
      window.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      {isOpen && (
        <div className="modal bg-gray-50 w-[300px]">
          <button
            className="close cursor-pointer absolute block p-2 h-[50px] w-[50px] -right-[23px] -top-[20px] text-2xl bg-gray-400 text-white rounded-full"
            onClick={closeModal}
          >
            &times;
          </button>
          <div className="header w-full text-center p-[5px] ">
            Order is Placed{" "}
          </div>
          <div className="content w-full p-[10px 5px] p-2 text-center">
            delectus saepe repudiandae explicabo nemo nam libero ad, doloribus,
            voluptas rem alias. Vitae?
          </div>
          <div className="actions w-full p-[10px 5px] mx-auto text-center">
            <button
              className="button bg-gray-300 p-2 mb-2 rounded-md"
              onClick={closeModal}
            >
              close modal
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default CheckOut;
