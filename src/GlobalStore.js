
import {create} from 'zustand';
const initialComponents = [

    {
      component: 'Layout',
      id: 'grid_c_1',
      className: [
        'min-w-[300px] min-h-[550px] m-1 fixed  p-1 border overflow-auto flex  bg-green-200 ',
      ],
      children: [],
      x: 50,
      y: 0,
    },
    {
      component: 'Layout',
      id: 'grid_c_2',
      className: [
        'min-w-[300px] min-h-[550px] m-1 fixed  p-1 border overflow-auto flex bg-blue-200',
      ],
      children: [],
      x: 300,
      y: 0,
    },
  ];

  
  const useStore = create((set) => ({
    components: initialComponents.map((component) => ({
      ...component,
      position: {
        x: component.x,
        y: component.y,
      },
    })),
    pos: { scale: 1, x: 0, y: 0 },
    handleKeyDown: (e) => {
      const step = 10; // Step for arrow key movement
  
      if (e.keyCode === 37) {
        // Left arrow key
        set((state) => ({
          components: state.components.map((component) => ({
            ...component,
            x: component.x - step,
          })),
        }));
      } else if (e.keyCode === 38) {
        // Up arrow key
        set((state) => ({
          components: state.components.map((component) => ({
            ...component,
            y: component.y - step,
          })),
        }));
      } else if (e.keyCode === 39) {
        // Right arrow key
        set((state) => ({
          components: state.components.map((component) => ({
            ...component,
            x: component.x + step,
          })),
        }));
      } else if (e.keyCode === 40) {
        // Down arrow key
        set((state) => ({
          components: state.components.map((component) => ({
            ...component,
            y: component.y + step,
          })),
        }));
      }
    },
  
    onScroll: (e) => {
      const delta = e.deltaY * -0.0001;
  
      set((state) => {
        const newScale = state.pos.scale + delta;
        const ratio = 1 - newScale / state.pos.scale;
  
        return {
          components: state.components.map((component) => {
            let newX, newY;
            // Zoom in: Multiply x and y values by the new scale
            if (delta > 0) {
              newX = component.x + (e.clientX - component.x) * ratio * newScale;
              newY = component.y + (e.clientY - component.y) * ratio * newScale;
            }
            // Zoom out: Divide x and y values by the new scale
            else {
              newX = component.x + ((e.clientX - component.x) * ratio) / newScale;
              newY = component.y + ((e.clientY - component.y) * ratio) / newScale;
            }
  
            return {
              ...component,
              x: newX,
              y: newY,
            };
          }),
          pos: {
            scale: newScale,
            x: state.pos.x,
            y: state.pos.y,
          },
        };
      });
    },
  }));
  
  export default useStore;
  