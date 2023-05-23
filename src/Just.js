
import Layout from "./Mycomponent";
import Button from "./button1";

const Components = {
  Layout: Layout,
  Button: Button,
};

const RenderComponents = (props) => {
  const Component = Components[props.component];
  return Component(props);
};

export default RenderComponents;
