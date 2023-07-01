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
      <div className="bg-white rounded-lg shadow-lg p-4 overflow-auto" style={dialogStyle}>
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
          <div className={`  ${activeTab === 'profile' ? '' : 'hidden'}`} id="profile" role="tabpanel" aria-labelledby="profile-tab">
            Screen commponent
          </div>
          <div className={` ${activeTab === 'dashboard' ? '' : 'hidden'}`} id="dashboard" role="tabpanel" aria-labelledby="dashboard-tab">
            <div className='flex items-center justify-center'>
              <form className="flex items-center ">
                <label for="simple-search" className="sr-only">Search</label>
                <div className="relative w-full">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
                  </div>
                  <input type="text" id="simple-search" className="bg-[#F9FAFB] border border-gray-300 text-gray-900 text-sm rounded-2xl focus:ring-blue-500 focus:border-blue-500 block w-[546px] h-[45px] pl-12 p-1.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search" required />
                </div>
              </form>
            </div>
            {/* button to click to opan a component design */}
            <div className='flex gap-3  h-[31px] mt-5 ml-2'>
              <div className=''>
                <a href='#navigation'>  <button type='button' className='px-3 py-2 text-xs font-medium text-center text-[#1F2A37] bg-[#f3f4f6] rounded-lg focus:bg-[#1C64F2] focus:text-white  focus:outline-none  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'> Navigation</button></a>
              </div>
              <div className=''>
                <a href='#lists'>  <button type='button' className='px-3 py-2 text-xs font-medium text-center text-[#1F2A37] bg-[#f3f4f6] rounded-lg focus:bg-[#1C64F2] focus:text-white  focus:outline-none  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>Lists</button></a>
              </div>
              <div className=''>
                <a href='#buttons'>  <button className='px-3 py-2 text-xs font-medium text-center text-[#1F2A37] bg-[#f3f4f6] rounded-lg focus:bg-[#1C64F2] focus:text-white  focus:outline-none  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>Button</button></a>
              </div>
              <div className=''>
                <a href='#cards'>  <button className='px-3 py-2 text-xs font-medium text-center text-[#1F2A37] bg-[#f3f4f6] rounded-lg focus:bg-[#1C64F2] focus:text-white  focus:outline-none  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>Card</button></a>
              </div>
              <div className=''>
                <a href='#shapes'>  <button className='px-3 py-2 text-xs font-medium text-center text-[#1F2A37] bg-[#f3f4f6] rounded-lg focus:bg-[#1C64F2] focus:text-white  focus:outline-none  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>Shapes</button></a>
              </div>
              <div className=''>
                <a href='#form'> <button className='px-3 py-2 text-xs font-medium text-center text-[#1F2A37] bg-[#f3f4f6] rounded-lg focus:bg-[#1C64F2] focus:text-white  focus:outline-none  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>Form & Fields</button></a>
              </div>
            </div>
            {/* Components design  */}
            <div id='navgation' className='mt-3'>
              <span>Navigation</span>
              <div className='mt-4 border w-[171px] h-[170px] rounded-lg flex justify-center items-center'>
                {props.children1}
              </div>
            </div>

            <div id='lists' className='mt-3'>
              <span>Lists</span>
              <div className='mt-4 border w-[171px] h-[170px] rounded-lg flex justify-center items-center'>
                {props.children1}
              </div>
            </div>

            <div id='buttons' className='mt-3'>
              <span>Button</span>
              <div className='mt-4 border w-[171px] h-[170px] rounded-lg flex justify-center items-center'>
                {props.children1}
              </div>
            </div>

            <div id='cards' className='mt-3'>
              <span>Card</span>
              <div className='mt-4 border w-[171px] h-[170px] rounded-lg flex justify-center items-center'>
                {props.children1}
              </div>
            </div>

            <div id='shapes' className='mt-3'>
              <span>Shapes</span>
              <div className='mt-4 border w-[171px] h-[170px] rounded-lg flex justify-center items-center'>
                {props.children1}
              </div>
            </div>

            <div id='form' className='mt-3'>
              <span>Form & Fields</span>
              <div className='mt-4 border w-[171px] h-[170px] rounded-lg flex justify-center items-center'>
                {props.children1}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Dialog;

