
import RenderComponents from './Just';

const Layout = ((props, ref) => {
  return (
    <div
      ref={ref}
      id={props.id}
      onClick={props.onClick}
      style={props.style}
      onWaitingCapture={props.onScroll}
      onDrop={props.drop}
      className={props.className}
    >
      {props?.children?.map((item) => (
        <RenderComponents {...item} />
      ))}
      
    </div>
  );
});

export default Layout;
