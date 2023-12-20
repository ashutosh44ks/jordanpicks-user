import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./text-editor.css";
import {
  AiOutlineBold,
  AiOutlineItalic,
  AiOutlineUnderline,
  AiOutlineOrderedList,
  AiOutlineUnorderedList,
  AiOutlineLink,
} from "react-icons/ai";
import { MdUndo, MdRedo } from "react-icons/md";
import { ImClearFormatting } from "react-icons/im";
import { LuHeading1, LuHeading2, LuHeading3, LuHeading4 } from "react-icons/lu";
// import HeadIcon1 from "../../../../assets/h1.svg";
// import HeadIcon2 from "../../../../assets/h2.svg";
// import HeadIcon3 from "../../../../assets/h3.svg";
// import HeadIcon4 from "../../../../assets/h4.svg";

// Handlers for the toolbar

// Handler functions will be bound to the toolbar (so using this will refer to the toolbar instance)
// and passed the value attribute of the input if the corresponding format is inactive,
// and false otherwise.
function myUndo() {
  this.quill.history.undo();
}
function myRedo() {
  this.quill.history.redo();
}

// Modules and Formats for the toolbar
const modules = {
  history: {
    delay: 1000,
    maxStack: 100,
    userOnly: false,
  },
  toolbar: {
    container: "#toolbar",
    handlers: {
      myRedo: myRedo,
      myUndo: myUndo,
    },
  },
  clipboard: {
    matchVisual: false,
  },
};
const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "list",
  "bullet",
  "link",
  "clean",
];

//custom toolbar component

// The ql-toolbar class will be added to the toolbar container and Quill attach appropriate handlers
// to <button> and <select> elements with a class name in the form ql-${format}.
// Buttons element may optionally have a custom value attribute.
const CustomToolbar = () => (
  <div id="toolbar">
    <span className="ql-formats">
      <button className="ql-myUndo">
        <MdUndo />
      </button>
      <button className="ql-myRedo">
        <MdRedo />
      </button>
    </span>
    <span className="ql-formats">
      <button className="ql-header" value="1">
        <LuHeading1 />
      </button>
      <button className="ql-header" value="2">
        <LuHeading2 />
      </button>
      <button className="ql-header" value="3">
        <LuHeading3 />
      </button>
      <button className="ql-header" value="4">
        <LuHeading4 />
      </button>
    </span>
    <span className="ql-formats">
      <button className="ql-bold">
        <AiOutlineBold />
      </button>
      <button className="ql-italic">
        <AiOutlineItalic />
      </button>
      <button className="ql-underline">
        <AiOutlineUnderline />
      </button>
    </span>
    <span className="ql-formats">
      <button className="ql-list" value="ordered">
        <AiOutlineOrderedList />
      </button>
      <button className="ql-list" value="bullet">
        <AiOutlineUnorderedList />
      </button>
      <button className="ql-link">
        <AiOutlineLink />
      </button>
      <button className="ql-clean">
        <ImClearFormatting />
      </button>
    </span>
  </div>
);

// Main component
const TextEditor = ({ documentContent, setDocumentContent }) => {
  const handleChange = (html) => {
    setDocumentContent({ editorHtml: html });
  };
  return (
    <div className="text-editor bg-white">
      <CustomToolbar />
      <ReactQuill
        className="text-editor-body"
        onChange={handleChange}
        value={documentContent.editorHtml}
        modules={modules}
        formats={formats}
        theme={false} // pass false to use minimal theme
        // pass "snow" for a built-in theme
      />
    </div>
  );
};

export default TextEditor;
