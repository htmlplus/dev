import { Icon } from "@htmlplus/react";

const IconRotate = () => {
  return <div className="ex-icon-rotate">    
    <div className="center">      
      <Icon rotate="0">        home</Icon>      
      <Icon rotate="90">        home</Icon>      
      <Icon rotate="180">        home</Icon>      
      <Icon rotate="270">        home</Icon>      
    </div>    
    <style>{".ex-icon-rotate .center {  text-align: center;}.ex-icon-rotate plus-icon {  margin: 0 1rem;}"}</style></div>;
};

export default IconRotate;