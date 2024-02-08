import { forwardRef, useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import "./modal.css";

const Modal = forwardRef(({ content, title, closeDialog = () => {} }, ref) => {
  const hideDialog = (event) => {
    var rect = ref.current.getBoundingClientRect();
    var isInDialog =
      rect.top <= event.clientY &&
      event.clientY <= rect.top + rect.height &&
      rect.left <= event.clientX &&
      event.clientX <= rect.left + rect.width;
    if (!isInDialog) {
      ref.current.close();
      closeDialog();
    }
  };
  useEffect(() => {
    const dialog = ref.current;
    dialog.addEventListener("click", hideDialog);
    return () => dialog.removeEventListener("click", hideDialog);
  }, []);
  return (
    <dialog ref={ref}>
      <div className="flex justify-between items-center px-4 py-2 bg-yellow text-darkblack">
        <span></span>
        <h4>{title}</h4>
        <span
          className="p-2 cursor-pointer scale-150"
          onClick={() => {
            ref.current.close();
            closeDialog();
          }}
        >
          <IoMdClose />
        </span>
      </div>
      <div className="px-6 py-8 max-h-[75vh] overflow-y-auto overflow-x-hidden">
        {content}
      </div>
    </dialog>
  );
});

export default Modal;
