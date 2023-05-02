
import Layout from "./Mycomponent";

const Components = {
  Layout: Layout,
};

const RenderComponents = (props) => {
  const Component = Components[props.component];
  return Component(props);
};

export default RenderComponents;
