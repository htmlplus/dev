<template>
  <div>  
    <plus-grid justify-content="center" gutter="md">    
      <plus-grid-item xs="12" sm="auto">      
        <button @click="show('sm')">        Small dialog</button>      
      </plus-grid-item>    
      <plus-grid-item xs="12" sm="auto">      
        <button @click="show('lg')">        Large dialog</button>      
      </plus-grid-item>    
      <plus-grid-item xs="12" sm="auto">      
        <button @click="show('xl')">        Extra large dialog</button>      
      </plus-grid-item>    
    </plus-grid>  
    <plus-dialog animation="fade" :open="open" :size="size" @plusClose="hide()">    
      <plus-dialog-content>      
        <plus-dialog-header>        Dialog Title</plus-dialog-header>      
        <plus-dialog-body>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
        </plus-dialog-body>      
        <plus-dialog-footer>        
          <button @click="hide()">          Close</button>        
        </plus-dialog-footer>      
      </plus-dialog-content>    
    </plus-dialog>  
  </div>
</template>

<script>
  export default {
    data() {
      return {
        open: false,
        size: 'md'
      };
    },
  
    methods: {
      hide() {
        this.open = false;
      },
  
      show(size) {
        this.size = size;
        this.open = true;
      }
  
    }
  };
</script>

<style scoped>
  plus-grid-item {
    text-align: center;
  }
</style>

