<template>
  <div id="app">
	  <keep-alive>
	  	<router-view></router-view>
	  </keep-alive>
    
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
*{margin: 0;padding: 0;}
</style>
