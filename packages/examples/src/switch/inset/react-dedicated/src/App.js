import { Switch } from "@htmlplus/react";

const SwitchInset = () => {
  return <>    
    <preview>      
      <Switch inset>        
        <span slot="on">          1</span>        
        <span slot="off">          0</span>        
      </Switch>      
    </preview>    
  </>;
};

export default SwitchInset;