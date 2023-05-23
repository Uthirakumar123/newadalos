import React, { useState } from 'react';

function Dialog(props) {
  const [openTab, setOpenTab] = useState(1);
  
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
    <div className="">
      <div className="bg-white rounded-lg shadow-lg p-4" style={dialogStyle}>
        <div className="flex justify-between items-center border-b-2 mb-4">
          {/* <h3>{props.title}</h3> */}
          {/* <h2>component</h2> */}
          <a
            className={
              'text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal ' +
              (openTab === 1
                ? 'text-black bg-gray-200'
                : 'text-' + +'-600 bg-white')
            }
            onClick={(e) => {
              e.preventDefault();
              setOpenTab(1);
            }}
            data-toggle="tab"
            href="#link1"
            role="tablist"
          >
            Component
          </a>
          <a
            className={
              'text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal ' +
              (openTab === 2
                ? 'text-black bg-gray-200'
                : 'text-' + +'-600 bg-white')
            }
            onClick={(e) => {
              e.preventDefault();
              setOpenTab(2);
            }}
            data-toggle="tab"
            href="#link2"
            role="tablist"
          >
            AddScreen
          </a>
          <button
            className="bg-transparent text-lg cursor-pointer"
            onClick={props.onClose}
          >
            X
          </button>
        </div>
        <div className="flex-grow overflow-y-auto"></div>
        <div className={openTab === 1 ? 'block' : 'hidden'} id="link1">
          {props.children}
        </div>
        <div className={openTab === 2 ? 'block' : 'hidden'} id="link2"></div>
      </div>
    </div>
  );
}

export default Dialog;
