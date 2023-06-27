import create from 'zustand';

const initialComponents = [
  {
    component: 'Layout',
    id: 'grid_c_1',
    className: [
      'min-w-[300px] min-h-[550px] m-1 fixed p-1 border overflow-auto flex bg-green-200',
    ],
    children: [],
    x: 50,
    y: 40,
    width: 300,
    tabletWidth: 600,
    mobileWidth: 300,

  },
  {
    component: 'Layout',
    id: 'grid_c_2',
    className: [
      'min-w-[300px] min-h-[550px] m-1 fixed p-1 border overflow-auto flex bg-blue-200',
    ],
    children: [],
    x: 405,
    y: 40,
    width: 300,
    tabletWidth: 600,
    mobileWidth: 300,
  },
  {
    component: 'Layout',
    id: 'grid_c_3',
    className: [
      'min-w-[300px] min-h-[550px] m-1 fixed p-1 border overflow-auto flex bg-red-200',
    ],
    children: [],
    x: 750,
    y: 40,
    width: 300,
    tabletWidth: 600,
    mobileWidth: 300,

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
  selectedComponent: null,
  isDialogOpen: false,
  // Arrow key function in left and right to top and botton move a components
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
  // HandleClick functioon open dialog and component id check to move the component 
  handleClick: (id, rightPositionValue) => {
    const offsetX = 170;
    const offsetY = 33;

    set((state) => {
      const clickedComponent = state.components.find(
        (component) => component.id === id
      );

      if (!clickedComponent) {
        return state;
      }

      const updatedComponents = state.components.map((component) => ({
        ...component,
        x: component.x + offsetX - clickedComponent.x,
        y: component.y + offsetY - clickedComponent.y,
        isActive: component.id === id,
      }));

      const rightmostX = Math.max(
        ...updatedComponents.map(
          (component) => component.x + component.width - component.tabletWidth
        )
      );

      const dialogRightX = rightmostX + rightPositionValue;

      console.log('Active view:', state.activeView);
      console.log('rightPositionValue:', rightPositionValue);
      console.log('Rightmost x position:', rightmostX);
      console.log('Dialog right side position 199813:', dialogRightX);

      const rightPosX = rightmostX - 120;
      console.log(rightPosX, "rightPosX");

      const clickedComponentRightX =
        clickedComponent.x + clickedComponent.width - clickedComponent.tabletWidth;
      console.log(clickedComponentRightX, "clickedComponentRightX");

      return {
        ...state,
        components: updatedComponents,
        selectedComponent: clickedComponent,
        isDialogOpen: true,
        dialogRightX: dialogRightX,
        rightmostX: rightPosX,
        clickedComponentRightX: clickedComponentRightX,
      };
    });
  },

  // Dialog close function
  handleDialogClose: () => {
    set((state) => ({
      isDialogOpen: false,
    }));
  },
  // Tabletview component width and Height
  tabletview: () => {
    const tabletWidth = 600;
    const tabletHeight = 800;

    set((state) => {
      const updatedComponents = state.components.map((component) => {
        const newComponent = {
          ...component,
          style: {
            ...component.style,
            width: `${tabletWidth}px`,
            height: `${tabletHeight}px`,
            left: `${component.x}px`,
            top: `${component.y}px`,
          },
        };

        return newComponent;
      });

      // Get the rightmost x position of the updated components
      const rightmostX = Math.max(
        ...updatedComponents.map(
          (component) => component.x + component.tabletWidth
        )
      );

      console.log('Rightmost x positionefef:', rightmostX);

      return {
        ...state,
        components: updatedComponents,
      };
    });

    console.log('Active view: Tablet');
  },

  // Mobileview component width and Height
  mobileview: () => {
    const mobileWidth = 300;
    const mobileHeight = 550;

    set((state) => ({
      components: state.components.map((component) => {
        const newComponent = {
          ...component,
          style: {
            ...component.style,
            width: `${mobileWidth}px`,
            height: `${mobileHeight}px`,
            left: `${component.x}px`,
            top: `${component.y}px`,
          },
        };

        return newComponent;
      }),
    }));
    console.log('Active view: Mobile');
  },
  // Scroll to Zoom a component 
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
