import React from 'react';

function dragStart(e) {
    e.dataTransfer.setData('item', e.target.id);
    console.log(e.target.id, 'gdgdgdd');
    return true;
}

const Button = ((props, ref) => {
    return (
        <div className="" ref={ref}>
            <button {...props} draggable="true" onDragStart={dragStart}>
                {props.value}
            </button>
        </div>
    );
});
Button.displayName = 'Button';

export default Button;