import { Element } from '@htmlplus/element';
import { Breadcrumb } from "TODO";

const BreadcrumbDefault = () => {
  return <>    
    <div className="center">      
      <Breadcrumb separator="/">        
        <a href="#">          HTMLPLUS</a>        
        <a href="#">          Core</a>        
        <a href="#">          UI Components</a>        
        <span>          Breadcrumb</span>        
      </Breadcrumb>      
    </div>    
  </>;
};

export default BreadcrumbDefault;