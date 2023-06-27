import React, { useState } from 'react';

function Dialog(props) {
  const [openTab, setOpenTab] = useState(1);

  const [activeTab, setActiveTab] = useState('profile');

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  if (!props.isOpen) return null;

  const { top, left, right } = props.position;
  console.log(top, "top")
  const dialogStyle = {
    position: 'absolute',
    top: `${top}px`,
    // left:100,
    // right: `calc(${right}px - 20%)`,
    right: 125,
    zIndex: 50,
    width: '25%',
    maxWidth: '600px',
    maxHeight: '80%',
    minHeight: '575px',
    minWidth: '586px',
  };
  const dialogStyle1 = {
    position: 'absolute',
    top: 50,
    // right: `calc(${right}px - 20%)`,
    left: 325,
    zIndex: 50,
    width: '25%',
    maxWidth: '600px',
    maxHeight: '80%',
    minHeight: '500px',
  };

  const backdropStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    // background: 'rgba(15, 15, 15, 0.8)', // Black background
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  return (
    <div style={backdropStyle}>
      <div className=' p-4' style={dialogStyle1}>
        {props.children2}
      </div>
      <div className="bg-white rounded-lg shadow-lg p-4" style={dialogStyle}>
        <div className="flex justify-between items-center border-b-2 mb-4">
          <div className="">
            <ul className="flex flex-wrap -mb-px text-sm font-medium text-center" id="myTab" data-tabs-toggle="#myTabContent" role="tablist">
              <li className={`mr-2 ${activeTab === 'profile' ? 'border-b-2 border-blue-600' : ''}`} role="presentation">
                <button className="inline-block px-4 py-2 rounded-t-lg focus:outline-none" id="profile-tab" data-tabs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected={activeTab === 'profile'} onClick={() => handleTabClick('profile')}> Screen Components</button>
              </li>
              <li className={`mr-2 ${activeTab === 'dashboard' ? 'border-b-2 border-blue-600' : ''}`} role="presentation">
                <button className="inline-block px-4 py-2 rounded-t-lg hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none" id="dashboard-tab" data-tabs-target="#dashboard" type="button" role="tab" aria-controls="dashboard" aria-selected={activeTab === 'dashboard'} onClick={() => handleTabClick('dashboard')}> Add Component</button>
              </li>
            </ul>
          </div>
          <button
            className="bg-transparent text-lg cursor-pointer"
            onClick={props.onClose}
          >
            X
          </button>
        </div>
        <div id="myTabContent">
          <div className={`p-4 rounded-lg  ${activeTab === 'profile' ? '' : 'hidden'}`} id="profile" role="tabpanel" aria-labelledby="profile-tab">
            {props.children1}
          </div>
          <div className={`p-4 rounded-lg ${activeTab === 'dashboard' ? '' : 'hidden'}`} id="dashboard" role="tabpanel" aria-labelledby="dashboard-tab">
            add commponent
            
          </div>

        </div>
      </div>
    </div>
  );
}

export default Dialog;

