
import RenderComponents from './Just';

const Layout = ((props, ref) => {
  function dragOver(e) {
    e.preventDefault();
    e.target.classList.add('drag-over');
  }
  function dragLeave(e) {
    e.preventDefault();
    e.target.classList.remove('drag-over');
  }
  return (
    <div
    ref={ref}
    id={props.id}
    onClick={props.onClick}
    style={props.style}
    onWaitingCapture={props.onScroll}
    onDrop={props.drop}
    className={props.className}
    onDragLeave={dragLeave}
    onDragOver={dragOver}
    >
      {props?.children?.map((item) => (
        <RenderComponents {...item} />
      ))}

    </div>
  );
});

export default Layout;
