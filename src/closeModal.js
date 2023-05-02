
import React from 'react';

function Dialog(props) {
  if (!props.isOpen) return null;

  const dialogStyle = {
    position: 'absolute',
    top: 50,
    left: 680,
    zIndex: 50,
    width: '25%',
    maxWidth: '600px',
    maxHeight: '80%',
    minHeight: '500px',
  };

  return (
    <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-lg p-4" style={dialogStyle}>
        <div className="flex justify-between items-center border-b-2 mb-4">
          <h3>{props.title}</h3>
          <button
            className="bg-transparent text-lg cursor-pointer"
            onClick={props.onClose}
          >
            X
          </button>
        </div>
        <div className="flex-grow overflow-y-auto">{props.children}</div>
      </div>
    </div>
  );
}

export default Dialog;