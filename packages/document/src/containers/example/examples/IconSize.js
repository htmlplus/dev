import { Icon } from "@htmlplus/react";

const IconSize = () => {
  return <div className="ex-icon-size">    
    <div className="center">      
      <Icon size="1x">        home</Icon>      
      <Icon size="2x">        home</Icon>      
      <Icon size="3x">        home</Icon>      
    </div>    
    <style>{".ex-icon-size .center {  text-align: center;}.ex-icon-size plus-icon {  margin: 0 1rem;  vertical-align: middle;}"}</style></div>;
};

export default IconSize;