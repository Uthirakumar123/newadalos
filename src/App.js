
import React, { useEffect, useState } from 'react';
import useStore from './GlobalStore';
import RenderComponents from './Just';
import Dialog from './closeModal';

const MyComponent = () => {
  const Dragcomponent = [
    {
      component: 'Button',
      className: ['bg-green-500 px-3 py-1 text-white  rounded-md'],
      value: 'save',
      id: 'buttonn_b1',
    }
  ];
  const {
    components,
    pos,
    setComponents,
    isDialogOpen,
    setPos,
    handleKeyDown,
    onScroll,
    handleClick,
    handleDialogClose,
    selectedComponent,
    tabletview,
    mobileview,
    dialogRightX,
    dialogPosition,
  } = useStore();
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
    <div className="bg-[#f3f4f8] h-full w-full fixed top-0 left-0 right-0 bottom-0 overflow-auto">
      <div className='w-full h-10 fixed z-50 bg-[#d9def5] '>
        <div className='flex justify-end mr-5 gap-2 '>
          <div className='w-10 h-10 hover:bg-[#ccced8] flex justify-center items-center' onClick={mobileview}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
            </svg>
          </div>
          <div className='w-10 h-10 hover:bg-[#ccced8] flex justify-center items-center' onClick={tabletview}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5h3m-6.75 2.25h10.5a2.25 2.25 0 002.25-2.25v-15a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 4.5v15a2.25 2.25 0 002.25 2.25z" />
            </svg>
          </div>
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
        position={{ top: 100, left: 680, right: dialogRightX }}
      >
        <div>
          {Dragcomponent.map((block, key) => {
            return (
              <div key={key}>
                <RenderComponents {...block} />
              </div>
            );
          })}
        </div>
      </Dialog>
    </div>
  );
};

export default MyComponent;