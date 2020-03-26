<template>
	<div class="debug" style="height: 100%;">
		 <div class="midchart fleximg">
		 	<div id="myChart" :style="{width: '100%', height: '7rem'}"></div>
		 	<div class="dbugmode">调试模式</div>
		 </div>
		 <div class="passagewaypre">
		 	<div class="passageway" :class="tdNum[index]?'passagewayactive':''" v-for="(item,index) in 32" @click="channell(index)">通道{{item}}</div>
		 	<div class="redbtn">
		 		<div class="sure" @click="submit">提交</div>
		 		<div class="sure" @click="clear">清空</div>
		 	</div>
		 </div>
	</div>
</template>

<script>
	export default {
	    props:['banner'],
	    data(){
	        return{
	            logo: 'this.src="' + require('../assets/noimg.png') + '"',
	            height:'',
	            tdNum:[],//通道是否被选中
	            cchannel:[],//要提交的通道id
	        }
	    },
	    mounted(){
	        this.drawLine();
	    },
	    methods:{
	    	submit(){
	    		let data={
	    			channel:this.cchannel,
	    			type:'live'
	    		}
	    		console.log(JSON.stringify(data))
	    		this.$socket.emit('req', JSON.stringify(data));
	    	},
	    	clear(){
	    		
	    	},
	    	channell(index){
	    		let arr=JSON.parse(JSON.stringify(this.tdNum))
	    		let ary=[]
//	    		arr[index]=!arr[index]
	    		for(let i=0;i<32;i++){
	    			if(i==index){
	    				arr[i]=true
	    			}else{
	    				arr[i]=false
	    			}
	        	}
	    		this.tdNum=arr
	    		for(let i=0;i<arr.length;i++){
	    			if(arr[i]){
	    				let obj={id:i+1}
	    				ary.push(obj)
	    			}
	    		}
	    		this.cchannel=ary
	    	},
	        drawLine(){
	        	for(let i=0;i<32;i++){
	        		this.tdNum.push(false)
	        	}
	        	console.log(this.tdNum)
		        // 基于准备好的dom，初始化echarts实例
		        let myChart = this.$echarts.init(document.getElementById('myChart'))
		        // 绘制图表
		        myChart.setOption({
		        	tooltip: {
						trigger: 'axis',
						axisPointer: {
							type: 'cross',
							crossStyle: {
								color: '#999'
							}
						}
					},
					dataZoom: [
			            {
			                type: 'slider',
			                show: true,
							//start: 94,
							//end: 100,
			                handleSize: 8
			            },
			            {
			                type: 'inside',
			                start: 94,
			                end: 100
			            },
			            {
			                type: 'slider',
			                show: true,
			                yAxisIndex: 0,
			                filterMode: 'empty',
			                width: 12,
			                height: '70%',
			                handleSize: 8,
			                showDataShadow: false,
			                left: '93%'
			            }
			        ],
					xAxis: {
						type: 'category',
						axisTick: {length:5},
						axisLabel : {//坐标轴刻度标签的相关设置。
			                rotate:"45"
			            },
			            data: [1,2,3,4,5,6,7,8,9,10,11,12]
		            },
		            yAxis: {
		            	 scale: true
		            },
//		            title: { text: '调试模式' },
		            series: [{
		                name: '',
		                type: 'line',
		                data: []
		            }]
		        });
		    }
	    },
	    created(){
	        console.log('history')
	    },
		sockets: {
			//这里是监听connect事件
			connect(){
			    console.log('链接服务器');
			},
			reply(msg){
				
			}
		},
	 }
</script>
	
<style scoped>
	.debug{width: 100%;background: #2E405E;display: flex;justify-content: center;align-content: flex-start;}
	.passagewaypre{width: 2rem;display: flex;justify-content: center;align-content: flex-start;flex-wrap: wrap;
		overflow-y: scroll;position: relative;padding-bottom: 0.65rem;}
	.passageway{background: linear-gradient(top,#DDDDE4 0%, #000028 20%,#000028 80%,#DDDDE4 100%);font-size: 0.18rem;
		color: #FAFAFA;width: 70%;padding: 0.1rem 0;margin: 0.1rem 0;border-radius: 0.06rem;}
	.passagewayactive{background: linear-gradient(top,#DDDDE4 0%, #1840A8 20%,#1840A8 80%,#DDDDE4 100%)}
	.midchart{width: 100%;border-right: 2px solid #CED4DF;overflow-y: scroll;background:#2E405E;position: relative;}
	#myChart{background: #F8FFFF;}
	.sure{background: linear-gradient(top,#DDDDE4 0%, #FF0000 20%,#FF0000 80%,#DDDDE4 100%);font-size: 0.20rem;
		color: #FAFAFA;width: 40%;padding: 0.1rem 0;margin:0 0.1rem ;border-radius: 0.06rem;}
	.redbtn{position: fixed;bottom: 0;right: 0;width: 1.68rem;background: #2E405E;display: flex;justify-content: center;
		align-items: center;box-sizing: border-box;padding: 0.1rem 0;}
	.dbugmode{color: #F8FFFF;font-size: 0.3rem;text-align: center;position: absolute;top: 0.5rem;left: 0;width: 100%;}
</style>