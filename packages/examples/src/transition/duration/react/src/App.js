import { Element } from '@htmlplus/element';
import { Grid } from "TODO";
import { Grid.Item } from "TODO";
import { Transition } from "TODO";
import { Grid.Item } from "TODO";
import { Transition } from "TODO";
import { Grid.Item } from "TODO";
import { Transition } from "TODO";
import { Grid.Item } from "TODO";
import { Transition } from "TODO";
import { Grid.Item } from "TODO";
import { Transition } from "TODO";
import { Grid.Item } from "TODO";
import { Transition } from "TODO";

const TransitionDuration = () => {
  return <>    
    <Grid justifyContent="evenly" gutter="md">      
      <Grid.Item xs="12" sm="6" md="4" xl="auto">        
        <Transition name="fade-in" repeat="infinite" duration="slower">
          HTMLPLUS
        </Transition>        
      </Grid.Item>      
      <Grid.Item xs="12" sm="6" md="4" xl="auto">        
        <Transition name="fade-in" repeat="infinite" duration="slow">
          HTMLPLUS
        </Transition>        
      </Grid.Item>      
      <Grid.Item xs="12" sm="6" md="4" xl="auto">        
        <Transition name="fade-in" repeat="infinite" duration="normal">
          HTMLPLUS
        </Transition>        
      </Grid.Item>      
      <Grid.Item xs="12" sm="6" md="4" xl="auto">        
        <Transition name="fade-in" repeat="infinite" duration="fast">
          HTMLPLUS
        </Transition>        
      </Grid.Item>      
      <Grid.Item xs="12" sm="6" md="4" xl="auto">        
        <Transition name="fade-in" repeat="infinite" duration="faster">
          HTMLPLUS
        </Transition>        
      </Grid.Item>      
      <Grid.Item xs="12" sm="6" md="4" xl="auto">        
        <Transition name="fade-in" repeat="infinite" duration="2.5s">
          HTMLPLUS
        </Transition>        
      </Grid.Item>      
    </Grid>    
  </>;
};

export default TransitionDuration;