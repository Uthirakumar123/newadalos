import React from 'react';

function dragStart(e) {
    e.dataTransfer.setData('item', e.target.id);
    console.log(e.target.id, 'gdgdgdd');
    return true;
}

const Button = ((props, ref) => {
    return (
        <div className="" ref={ref}>
            <div className='relative'>
                <button {...props} draggable="true" onDragStart={dragStart}>
                    {props.value}
                </button>
            </div>
            <div className=' absolute'>
                <svg width='100%' height='100%'>
                    {props.svgpath}
                </svg>
            </div>
        </div>
    );
});
Button.displayName = 'Button';

export default Button;