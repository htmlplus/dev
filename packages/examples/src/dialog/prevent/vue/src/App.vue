<template>
  <div>  
    <div class="center">    
      <plus-dialog-toggler connector="dialog-prevent">
        Open
      </plus-dialog-toggler>    
    </div>  
    <plus-dialog animation="fade" connector="dialog-prevent" @plusOpen="ensure('open', $event)" @plusClose="ensure('close', $event)">    
      <plus-dialog-content>      
        <plus-dialog-header>        Dialog Title</plus-dialog-header>      
        <plus-dialog-body>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
        </plus-dialog-body>      
        <plus-dialog-footer>        
          <plus-dialog-toggler>          Close</plus-dialog-toggler>        
        </plus-dialog-footer>      
      </plus-dialog-content>    
    </plus-dialog>  
  </div>
</template>

<script>
  export default {
    methods: {
      ensure(type, event) {
        if (window.confirm(`Are you sure you want to ${type} it?`)) return;
        event.preventDefault();
      }
  
    }
  };
</script>

<style scoped>
  .center {
    text-align: center;
  }
</style>

