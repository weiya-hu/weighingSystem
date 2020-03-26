<template>
	<div class="product" style="height: 100%;">
		产品介绍
	</div>
</template>

<script>
	export default {
	    props:['banner'],
	    data(){
	        return{
	            logo: 'this.src="' + require('../assets/noimg.png') + '"',
	            height:''
	        }
	    },
	    mounted(){
	    	
	        let that=this
	        this.$nextTick(function () {
	        })
	        this.bannerHeight()
	    },
	    methods:{
	        todetail(id){
	            this.$emit('change',id)
	        },
	        bannerHeight(){
	            this.height = (`${document.documentElement.clientWidth}`*0.54).toFixed(2)+'px';
	        }
	    },
	    created(){
	        console.log('history')
	    },
	 }
</script>
	
<style scoped>
	.product{width: 100%;background: #f1f3f5;}
	
</style>