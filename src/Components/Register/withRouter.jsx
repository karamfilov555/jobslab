import React from "react";
import { useNavigate } from "react-router-dom";

// Custom HOC to pass navigate function to class component
export function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    let navigate = useNavigate();
    return <Component {...props} navigate={navigate} />;
  }

  return ComponentWithRouterProp;
}
