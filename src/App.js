
import React, { useEffect } from 'react';
import useStore from './GlobalStore';
import RenderComponents from './Just';
import Dialog from './closeModal';

const MyComponent = () => {
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
  } = useStore();
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
            />
          </div>
        );
      })}

      <Dialog
        isOpen={isDialogOpen}
        title="Screen Name"
        onClose={handleDialogClose}
        componentPosition={selectedComponent}
      >
        {/* {components?.map((pop: any) => (

          <div>
            <p>{pop.id}</p>

          </div>
        ))} */}
        <div>df</div>
      </Dialog>
    </div>
  );
};

export default MyComponent;
