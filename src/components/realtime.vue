<template>
	<div class="realtime" style="height: 100%;">
		<div>
			<!--0-16通道-->
			<div class="flexl channel">
				<div class="channeltxt">通道号</div>
				<div class="channelnum flexl">
					<div v-for="(item,index) in adarr.slice(0,16)">{{index+1}}</div>
				</div>
			</div>
			<div class="flexl advalue">
				<div class="channeltxt">ADValue：</div>
				<div class="channelnum channelnuma flexl">
					<div v-for="(item,index) in adarr.slice(0,16)" class="adcAvg">{{item.AdcAvg | tofixed}}</div>
				</div>
			</div>
			<div class="flexl advalue">
				<div class="channeltxt">DAValue：</div>
				<div class="channelnum channelnuma flexl">
					<div v-for="(item,index) in adarr.slice(0,16)">{{item.Dac}}</div>
				</div>
			</div>
			<!--<div class="flexl advalue">
				<div class="channeltxt">W(10KG)：</div>
				<div class="channelnum channelnuma flexl">
					<div v-for="item in 16">{{item}}</div>
				</div>
			</div>-->
			<!--16-32通道-->
			<div class="flexl channel">
				<div class="channeltxt">通道号</div>
				<div class="channelnum flexl">
					<div v-for="(item,index) in adarr.slice(16,32)">{{index+17}}</div>
				</div>
			</div>
			<div class="flexl advalue">
				<div class="channeltxt">ADValue：</div>
				<div class="channelnum channelnuma flexl">
					<div v-for="(item,index) in adarr.slice(16,32)" class="adcAvg">{{item.AdcAvg | tofixed}}</div>
				</div>
			</div>
			<div class="flexl advalue">
				<div class="channeltxt">DAValue：</div>
				<div class="channelnum channelnuma flexl">
					<div v-for="(item,index) in adarr.slice(16,32)">{{item.Dac}}</div>
				</div>
			</div>
			<!--<div class="flexl advalue">
				<div class="channeltxt">W(10KG)：</div>
				<div class="channelnum channelnuma flexl">
					<div v-for="item in 10">{{item}}</div>
				</div>
			</div>-->
		</div>
		<!--当前车辆信息-->
		<div>
			<div class="currenttxt">当前车辆信息</div>
			<div class="currentdown">
				<div class="flexl currentdowntitle">
					<div style="flex: 0.8;">时间</div>
					<div style="flex: 0.5;">车型</div>
					<div style="flex: 1.6;">轴距(m)</div>
					<!--<div class="zweight">轴重(KG)</div>-->
					<div style="flex:0.7;">速度(KM/h)</div>
					<div style="flex: 0.7;">总重(KG)</div>
					<div style="flex: 0.6;">车辆状态</div>
				</div>
				<div class="contitempre">
					<div v-for="(item,index) in currentcar" class="contitem flexl">
						<div style="flex: 0.8;">{{item.Time | dateformate}}</div>
						<div style="flex: 0.5;">{{item.AxisCnt}}</div>
						<div style="flex: 1.6;" class="zdis">
							<div v-for="(itm,inx) in item.Dis" class="disitem">
								<div class="inx fleximg">{{inx+1}}</div>
								<div >{{itm.Lenth | tofixed}}</div>
							</div>
						</div>
						<!--<div class="zdis zweight">
							<div v-for="(itm,inx) in item.Zhou" class="disitem">
								<div class="indx inx fleximg">{{inx+1}}</div>
								<div>{{itm.Weight | tofixed}}</div>
							</div>
							
						</div>-->
						<div style="flex:0.7;">{{item.Speed | tofixed}}</div>
						<div style="flex:0.7;">{{item.Weight | tofixed}}</div>
						<div style="flex:0.6;">{{item.Direct | direct}}</div>
					</div>
				</div>
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
	            currentcar:[],
	            ada:{},
	            adarr:[]
	        }
	    },
	    mounted(){
	    	console.log('realtime')
	        let that=this
	        this.bannerHeight()
	       
	    },
	    beforeCreate() {
          let  app = this;
        },
	    methods:{
	        bannerHeight(){
	            this.height = (`${document.documentElement.clientWidth}`*0.54).toFixed(2)+'px';
	        }
	    },
	    created(){
	    	for(let i=0;i<32;i++){
	        	this.adarr.push(0)
	        }
	    	localStorage.setItem('adarr', JSON.stringify(this.adarr));
	    },
	    sockets: {
		//这里是监听connect事件
		  connect(){
		    // 获取每台客服端生成的id
		    this.websocketid = this.$socket.id;
		    console.log('链接服务器');
		  },
		  tf(data){
		  	console.log(JSON.parse(data))
		  	this.currentcar.unshift(JSON.parse(data))
		  	console.log(this.currentcar)
		  	if(this.currentcar.length>10){
		  		this.currentcar=this.currentcar.splice(0,10)
		  		console.log(this.currentcar)
		  	}
		  },
		  adda(data){
		  	console.log(JSON.parse(data))
		  	this.ada=JSON.parse(data)
		  	let ada=JSON.parse(data)
		  	let adarr=JSON.parse(JSON.stringify(this.adarr))
			adarr[ada.Id-1]=JSON.parse(data)
			this.adarr=adarr
			console.log(this.adarr)
			localStorage.setItem('adarr', JSON.stringify(this.adarr));
		  },
		  // 监听断开连接，函数
		  disconnect(){
		    console.log('断开服务器连接');
		  },
		  // 服务端指定有msg监听的客服端，可接对应发来的收消息，data服务端传的消息
		  msg(data){
		
		  }
		},
		filters: {
		  tofixed: function (value) {
		  	if(value){
		  		return value.toFixed(2)
		  	}else{
		  		return
		  	}
		    
		  },
		  dateformate:function(val){
		  	let num=String(val).substring(0,13)-0;
			let date=new Date(num);
		    let year=String(date.getFullYear()) ; 
		    let month=date.getMonth()+1<10?"0"+date.getMonth()+1:date.getMonth()+1; 
		    let day=date.getDate()<10?"0"+date.getDate():date.getDate(); 
		    let hour=date.getHours()<10?"0"+date.getHours():date.getHours(); 
		    let minute=date.getMinutes()<10?"0"+date.getMinutes():date.getMinutes(); 
		    let second=date.getSeconds()<10?"0"+date.getSeconds():date.getSeconds(); 
		    return  hour+":"+minute+":"+second; 
		  },
		  direct:function(val){
		  	return val==1?'正向':val==2?'逆向':val
		  },
		  adv:function(val,flag){
		  	let that=this
		  	if(flag){
			  	let adarr=JSON.parse(localStorage.getItem('adarr'));
				let m=adarr.find(mm=>mm.Id==val)
				console.log(m)
				if(m){
					return m.AdcAvg.toFixed(2)
				}else{
					return
				}
			}else{
				let adarr=JSON.parse(localStorage.getItem('adarr'));
				let m=adarr.find(mm=>mm.Id==val+16)
				console.log(m)
				if(m){
					return m.AdcAvg.toFixed(2)
				}else{
					return
				}
			}
		  },
		  dav:function(val,flag){
		  	let that=this
		  	if(flag){
		  		let adarr=JSON.parse(localStorage.getItem('adarr'));
				let m=adarr.find(mm=>mm.Id==val)
				console.log(m)
				if(m){
					return m.Dac
				}else{
					return
				}
		  	}else{
		  		let adarr=JSON.parse(localStorage.getItem('adarr'));
				let m=adarr.find(mm=>mm.Id==val+16)
				console.log(m)
				if(m){
					return m.Dac
				}else{
					return
				}
		  	}
		  },
		}
	 }
</script>
	
<style scoped>
	.realtime{width: 100%;background: #2E405E;color: #F8FFFF;font-size: 0.16rem;padding: 0.2rem;box-sizing: border-box;overflow: scroll;}
	.channel{padding: 0.1rem  .05rem;background: #507FCB;}
	.channeltxt{width: 1.5rem;}
	.channelnum{width: 100%;}
	.channelnum>div{width: 6.25%;box-sizing: border-box;}
	.adcAvg{font-size: 0.14rem}
	/*.channelnuma>div{border-right: 1px solid #999999;}*/
	.advalue{background: #F8FFFF;color: #2E405E;padding: .05rem;border: 1px solid #999;box-sizing: border-box;}
	.currenttxt{font-size: 0.20rem;color: #F8FFFF; text-align: left;padding: 0.1rem;}
	.currentdown{background: #F8FFFF;height: 7.2rem;}
	.currentdowntitle{background: #507FCB;color: #F8FFFF;height:9.09%;}
	.currentdowntitle>div{font-size: 0.2rem;box-sizing: border-box;}
	.contitempre{height: 90.9%;color: #2e405e;}
	.contitem{width: 100%;height:10%;border-bottom: 1px solid #999999;box-sizing: border-box;}
	.contitem>div{flex: 1;font-size: 0.18rem;box-sizing: border-box;}
	.realtime .zweight{flex: 2;}
	.zdis>div{margin: 0.05rem;}
	.zdis{display: flex;flex-wrap: wrap;justify-content:center;align-content: space-around;}
	.inx{font-size: 0.14rem;background: #507FCB;border-radius: 50%;color: #F8FFFF;margin-right: 0.02rem;
    	width: 0.16rem;height: 0.16rem;}
    .realtime .indx{background: #00A57C;}
	.disitem{display: flex;justify-content: flex-start;align-items: center;}
</style>