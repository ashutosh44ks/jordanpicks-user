import { forwardRef, useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import "./modal.css";

const Modal = forwardRef(({ content }, ref) => {
  const hideDialog = (event) => {
    var rect = ref.current.getBoundingClientRect();
    var isInDialog =
      rect.top <= event.clientY &&
      event.clientY <= rect.top + rect.height &&
      rect.left <= event.clientX &&
      event.clientX <= rect.left + rect.width;
    if (!isInDialog) {
      ref.current.close();
    }
  };
  useEffect(() => {
    const dialog = ref.current;
    dialog.addEventListener("click", hideDialog);
    return () => dialog.removeEventListener("click", hideDialog);
  }, []);
  return (
    <dialog ref={ref}>
      <div className="flex justify-between items-center m-4">
        <h3>Preview Content</h3>
        <span
          className="p-2 cursor-pointer scale-150"
          onClick={() => {
            ref.current.close();
          }}
        >
          <IoMdClose />
        </span>
      </div>
      <hr />
      <div
        className="m-4 max-h-[75vh] overflow-auto"
        dangerouslySetInnerHTML={{ __html: content }}
      ></div>
    </dialog>
  );
});

export default Modal;
