import { Switch } from "@htmlplus/react";

const SwitchLabels = () => {
  return <>    
    <preview>      
      <Switch checked>        
        <span slot="on">          Yes</span>        
        <span slot="off">          No</span>        
      </Switch>      
    </preview>    
  </>;
};

export default SwitchLabels;