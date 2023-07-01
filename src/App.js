
import React, { useEffect, useState } from 'react';
import useStore from './GlobalStore';
import RenderComponents from './Just';
import Dialog from './closeModal';

const MyComponent = () => {
  const Dragcomponent = [
    {
      component: 'Button',
      className: [' px-3 bg-green-400  py-1 text-white  rounded-md'],
      value: 'save',
      id: 'buttonn_b1',
      svgpath: (<svg x='8' y='70' width="109" height="40">
        <rect x="0" y='0' width="109" height="40" rx='20' fill='#F3F4F6' />
        <svg x="13" y="8" width="24" height="24" fill="#49454F">
          <path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z" />
        </svg>
        <text x='45' y='25' fill="#49454F" fontSize="14px" fontWeight="500" >Button
        </text>
      </svg>
      ),
    }
  ];
  const {
    components,
    pos,
    // setComponents,
    isDialogOpen,
    // setPos,
    handleKeyDown,
    onScroll,
    handleClick,
    handleDialogClose,
    selectedComponent,
    tabletview,
    mobileview,
    dialogRightX,
    // rightmostX,
    // clickedComponentRightX,
  } = useStore();
  console.log(selectedComponent, "clickedComponent")
  const [dropComponent, setDropcomponent] = useState(Dragcomponent);
  function componentLoop(componentData, id, newData) {
    for (let i = 0; i < componentData.length; i++) {
      const data = componentData[i];
      if (data.id === id) {
        console.log(data, 'data idss');
        componentData[i]?.children?.push(newData);
      } else if (data.children) {
        const dataDrag = componentLoop(data.children, id, newData);
      }
    }
  }
  function drop(e) {
    e.target.classList.remove('drag-over');
    console.log(e.target.id);
    e.preventDefault();
    let data = e.dataTransfer.getData('item');
    console.log(data, 'data');
    let item = Dragcomponent.find((item) => item?.id === data);
    console.log(item, 'item');
    let newData = JSON.parse(JSON.stringify(item));

    const targetComponent = components.find(
      (component) => component.id === e.target.id
    );


    if (!targetComponent.isActive) {
      return false; // Prevent drop if the target component is not active
    }

    e.target.classList.add('active-drop');
    componentLoop(components, e.target.id, newData);
    setDropcomponent(newData);
    return false;
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('wheel', onScroll);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('wheel', onScroll);
    };
  }, [handleKeyDown, onScroll]);

  return (
    <div className="bg-[#F5F5F5] h-full w-full fixed top-0 left-0 right-0 bottom-0 overflow-auto">
      <div className='w-full h-16 flex items-center justify-between fixed z-50 bg-[#ffffff] '>
        <div className='flex items-center '>
          <div className='ml-3 '>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-[35px] h-[33.06px]">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
            </svg>
          </div>
          <div className='flex items-center'>
            <form className="flex items-center ml-3">
              <label for="simple-search" className="sr-only">Search</label>
              <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
                </div>
                <input type="text" id="simple-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-2xl focus:ring-blue-500 focus:border-blue-500 block w-[402px] h-[45px] pl-12 p-1.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search" required />
              </div>
            </form>
          </div>
        </div>
        <div className='flex  mr-5 gap-5 '>
          {/* <div className='w-10 h-10 hover:bg-[#ccced8] flex justify-center items-center' onClick={mobileview}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
              </svg>
            </div>
            <div className='w-10 h-10 hover:bg-[#ccced8] flex justify-center items-center' onClick={tabletview}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5h3m-6.75 2.25h10.5a2.25 2.25 0 002.25-2.25v-15a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 4.5v15a2.25 2.25 0 002.25 2.25z" />
              </svg>
            </div> */}
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-[32px] h-[32px]">
              <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
            </svg>
          </div>
          <div>
            <div className='border w-[32px] h-[32px] rounded-full'>
              <img className='rounded-full' src='https://helostatus.com/wp-content/uploads/2021/08/profile-pictures-for-WhatsApp-1024x1024.jpg' />
            </div>
          </div>
        </div>

      </div>
      <div className='bg-white w-[92px] h-[357px] mt-[198px] rounded-r-[8px] justify-center items-center text-center grid'>
        <div className='text-center w-[84px] h-[57px]  '>
          <div className='w-[20px] ml-8 text-center '>
            <svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m6-6H6"></path>
            </svg>
          </div>
          <p className=' w-[76px] h-[21px] ml-1 text-sm font-normal'>Add screen</p>
        </div>

        <div className='w-[54px] h-[57px] ml-4'>
          <div className='w-[20px] ml-3 text-center '>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 11.25l1.5 1.5.75-.75V8.758l2.276-.61a3 3 0 10-3.675-3.675l-.61 2.277H12l-.75.75 1.5 1.5M15 11.25l-8.47 8.47c-.34.34-.8.53-1.28.53s-.94.19-1.28.53l-.97.97-.75-.75.97-.97c.34-.34.53-.8.53-1.28s.19-.94.53-1.28L12.75 9M15 11.25L12.75 9" />
            </svg>
          </div>
          <p className=' w-[46px] h-[21px] ml- text-sm font-normal'>Theme</p>
        </div>

        <div className='w-[62px] h-[57px] ml-4'>
          <div className='w-[20px] ml-3 text-center '>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
            </svg>
          </div>
          <p className=' w-[46px] h-[21px] ml- text-sm font-normal'>Screens</p>
        </div>

        <div className='w-[71px] h-[57px] ml-2'>
          <div className='w-[20px] ml-5 text-center '>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
              <path d="M21 6.375c0 2.692-4.03 4.875-9 4.875S3 9.067 3 6.375 7.03 1.5 12 1.5s9 2.183 9 4.875z" />
              <path d="M12 12.75c2.685 0 5.19-.586 7.078-1.609a8.283 8.283 0 001.897-1.384c.016.121.025.244.025.368C21 12.817 16.97 15 12 15s-9-2.183-9-4.875c0-.124.009-.247.025-.368a8.285 8.285 0 001.897 1.384C6.809 12.164 9.315 12.75 12 12.75z" />
              <path d="M12 16.5c2.685 0 5.19-.586 7.078-1.609a8.282 8.282 0 001.897-1.384c.016.121.025.244.025.368 0 2.692-4.03 4.875-9 4.875s-9-2.183-9-4.875c0-.124.009-.247.025-.368a8.284 8.284 0 001.897 1.384C6.809 15.914 9.315 16.5 12 16.5z" />
              <path d="M12 20.25c2.685 0 5.19-.586 7.078-1.609a8.282 8.282 0 001.897-1.384c.016.121.025.244.025.368 0 2.692-4.03 4.875-9 4.875s-9-2.183-9-4.875c0-.124.009-.247.025-.368a8.284 8.284 0 001.897 1.384C6.809 19.664 9.315 20.25 12 20.25z" />
            </svg>
          </div>
          <p className=' w-[63px] h-[21px] ml- text-sm font-normal'>Database</p>
        </div>

        <div className='w-[56px] h-[57px] ml-4'>
          <div className='w-[20px] ml-3 text-center '>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12.75 3.03v.568c0 .334.148.65.405.864l1.068.89c.442.369.535 1.01.216 1.49l-.51.766a2.25 2.25 0 01-1.161.886l-.143.048a1.107 1.107 0 00-.57 1.664c.369.555.169 1.307-.427 1.605L9 13.125l.423 1.059a.956.956 0 01-1.652.928l-.679-.906a1.125 1.125 0 00-1.906.172L4.5 15.75l-.612.153M12.75 3.031a9 9 0 00-8.862 12.872M12.75 3.031a9 9 0 016.69 14.036m0 0l-.177-.529A2.25 2.25 0 0017.128 15H16.5l-.324-.324a1.453 1.453 0 00-2.328.377l-.036.073a1.586 1.586 0 01-.982.816l-.99.282c-.55.157-.894.702-.8 1.267l.073.438c.08.474.49.821.97.821.846 0 1.598.542 1.865 1.345l.215.643m5.276-3.67a9.012 9.012 0 01-5.276 3.67m0 0a9 9 0 01-10.275-4.835M15.75 9c0 .896-.393 1.7-1.016 2.25" />
            </svg>

          </div>
          <p className=' w-[48px] h-[21px] ml- text-sm font-normal'>Publish</p>
        </div>
      </div>
      {components?.map((block, key) => {
        const style = {
          position: 'absolute',
          left: block.x,
          top: block.y,
          transform: `translate(${pos.x}px, ${pos.y}px) scale(${pos.scale})`,
        };
        return (
          <div key={key} style={style} onWheelCapture={onScroll}>
            <RenderComponents
              onClick={() => handleClick(block.id, block.x, block.y)}
              onWheelCapture={onScroll}
              style={style}
              {...block}
              drop={drop}
              active={block.isActive}
            />
          </div>
        );
      })}

      <Dialog
        isOpen={isDialogOpen}
        title="Screen Name"
        onClose={handleDialogClose}
        componentPosition={selectedComponent}
        position={{ top: 65, left: 680, right: dialogRightX }}

        children1={<div>
          {Dragcomponent.map((block, key) => {
            console.log(block.path, "hfgh")
            return (
              <div key={key}>
                <RenderComponents {...block} />
              </div>
            );
          })}
        </div>}
        children2={
          selectedComponent ? (
            <RenderComponents {...selectedComponent} drop={drop} />
          ) : null

        }
      >
      </Dialog>
    </div>
  );
};

export default MyComponent;