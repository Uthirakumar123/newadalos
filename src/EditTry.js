
import useStore from './GlobalStore';
import RenderComponents from './Just';
import { useEffect, useState } from 'react';
import Dialog from './closeModal';

const MyComponent = () => {
  const {
    components,
    pos,
    // setComponents,
    // setPos,
    handleKeyDown,
    onScroll,
  } = useStore();


  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState(null);
  // const [pos, setPos] = useState({ x: 0, y: 0, scale: 1 });
  // function handleButtonClick(component: any) {
  //   setIsDialogOpen(true);
  //   setSelectedComponent(component);
  // }

  function handleClick(component) {
    setIsDialogOpen(true);
    setSelectedComponent(component);

  }
  function handleDialogClose() {
    setIsDialogOpen(false);
    setSelectedComponent(null);
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('wheel', onScroll);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('wheel', onScroll);
    };
  }, [handleKeyDown, pos]);

  return (
    <div className="w-full h-full bg-[#f3f4f8]">
      {components?.map((block, key) => {
        const style = {
          position: "absolute",
          left: block.x,
          top: block.y,
          transform: `translate(${pos.x}px, ${pos.y}px) scale(${pos.scale})`,
        };
        return (
          <div key={key}>
            <div style={style} onWheelCapture={onScroll}>
              <RenderComponents
                onClick={() => handleClick(block)}
                onWheelCapture={onScroll}
                style={style}
                {...block}
              />
            </div>
          </div>
        );
      })}

      <Dialog
        isOpen={isDialogOpen}
        title="Popup Title"
        onClose={handleDialogClose}
        componentPosition={{ selectedComponent }}
      >
        <p>This is the content of the popup.</p>
      </Dialog>
    </div>
  );
};

export default MyComponent;
