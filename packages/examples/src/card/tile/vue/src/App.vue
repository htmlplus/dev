<template>
  <div>  
    <div class="container">    
      <plus-grid justify-content="evenly" gutter="md">      
        <plus-grid-item xs="12" sm="auto">        
          <plus-card tile></plus-card>        
        </plus-grid-item>      
        <plus-grid-item xs="12" sm="auto">        
          <plus-card tile outlined></plus-card>        
        </plus-grid-item>      
        <plus-grid-item xs="12" sm="auto">        
          <plus-card tile elevation="5"></plus-card>        
        </plus-grid-item>      
      </plus-grid>    
    </div>  
  </div>
</template>

<style scoped>
  .container {
    padding: 2rem 0;
    background-color: #eeeeee;
  }
  plus-card {
    height: 8rem;
    width: 8rem;
    margin: auto;
  }
</style>

