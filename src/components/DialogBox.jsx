import React from "react";

const DialogBox = ({
  question,
  setDialogBoxOpen,
  setText,
  showAlert,
  theme,
  setPreviewText,
}) => {
  const handleClear = () => {
    setText("");
    setPreviewText("");
    setDialogBoxOpen(false);
    if (showAlert) {
      showAlert("Cleared the text.", "success");
    }
  };

  const handleCancel = () => {
    setDialogBoxOpen(false);
  };

  return (
    <div
      className="fixed flex justify-center items-center z-[9999]"
      style={{
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: "100vw",
        backgroundColor:
          theme === "light" ? "rgba(0, 0, 0, 0.5)" : "rgba(0, 0, 0, 0.7)",
      }}
    >
      <div
        className="w-[90%] max-w-[400px] p-5 rounded-lg shadow-md"
        style={{
          backgroundColor: theme === "light" ? "white" : "#313131",
          color: theme === "light" ? "black" : "white",
          border: theme === "light" ? "0px solid black" : "0px solid grey",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h5 className="text-lg font-medium mb-3">Clear Text</h5>
        <p className="mb-4">{question}</p>
        <div className="flex justify-end gap-2">
          <button
            type="button"
            className="px-3 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            type="button"
            className="px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-50"
            onClick={handleClear}
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
};

export default DialogBox;
