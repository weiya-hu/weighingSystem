<template>
  <div class="home" :style="'height:'+height">
  	
  	<div class="menu">
	    <div class="fleximg realtimepre realtimepretop" @click='list(1)' :class="num==1?'realtimepreactive':''">
	    	<div class="realtimeimg fleximg">
	    		<img src="../assets/realtime1.png"/>
	    	</div>
	    	<div class="realtimetxt">
	    		实时车辆
	    	</div>
	    </div>
	    <div class="fleximg realtimepre" @click='list(2)' :class="num==2?'realtimepreactive':''">
	    	<div class="realtimeimg fleximg">
	    		<img src="../assets/history1.png"/>
	    	</div>
	    	<div class="realtimetxt">
	    		历史查询
	    	</div>	
	    </div>
	    <div class="fleximg realtimepre" @click='list(3)' :class="num==3?'realtimepreactive':''">
	    	<div class="realtimeimg fleximg">
	    		<img src="../assets/set1.png"/>
	    	</div>
	    	<div class="realtimetxt">
	    		参数设置
	    	</div>
	    </div>
	    <!--<div class="fleximg realtimepre" @click='list(6)' :class="num==6?'realtimepreactive':''">
	    	<div class="realtimeimg fleximg">
	    		<img src="../assets/jtcz.png"/>
	    	</div>
	    	<div class="realtimetxt">
	    		静态称重
	    	</div>
	    </div>-->
	    <div class="logo" @click="debugmode">
	  		<div class="logoimg">
	  			<img src="../assets/kj1.png"/>
	  		</div>
	  	</div>
  		<div class="date">{{date}}</div>
  	</div>
  	<div class="right fleximg">
  		<Realtime v-if='num===1'></Realtime>
  		<History v-if='num===2'></History>
  		<!--修改的数据不会保留，除非用户点击上传保留，避免用户看到已经改变的数据以为已经保存，实际没有保存-->
  		<!--<Paramset v-show='num===3' :click='hometoset' @isok='settohome'></Paramset>-->
  		<Paramset v-if='num===3'></Paramset>
  		<!--<Product v-show='num===4'></Product>-->
  		<Debug v-if='num===5'></Debug>
  		<Staticweigh v-if='num===6'></Staticweigh>
  	</div>
  </div>
  
</template>
<script>
import Realtime from './realtime';
import History from './history';
import Paramset from './paramset';
import Product from './product';
import Debug from './debug';
import Staticweigh from './staticweigh';
export default {
	
  name: 'Home',
  data() {
		return {
			height:'',//页面高度
			num:1,
			numflag:1,
			date:'',
			hometoset:0,//home页面传给设置页面的数据
		}
	},
	components: {
    Realtime,History,Paramset,Product,Debug,Staticweigh
  },
	created() {
		let that=this;
    window.addEventListener('resize', function(){
			that.height=(document.documentElement.clientHeight).toFixed(2)+'px';
    });
	},
	destroyed() {
		let that=this;
    window.removeEventListener('resize', function(){
			that.height=(document.documentElement.clientHeight).toFixed(2)+'px';
    })
	},
	mounted() {
		this.videoHeight()
		this.curentdate()
	},
  methods:{
  	handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
	  handleClose(key, keyPath) {
	    console.log(key, keyPath);
	  },
	  list(id){
	  	this.num=id;
//	  	if(this.num==3){
//	  		this.hometoset=1;
//	  		console.log(this.hometoset)
////	  		this.num=id;
//	  	}else{
//	  		this.num=id;
//	  		this.hometoset=0;
//	  		console.log(this.num)
//	  		console.log(this.hometoset)
//	  	}
	  },
	  settohome(msg){
	  	console.log(msg)
	  	if(msg){
	  		this.num=this.numflag
	  	}
	  },
	  videoHeight() {
	  	this.$nextTick(()=>{
				this.height=(document.documentElement.clientHeight).toFixed(2)+'px';
	  	})
		},
		debugmode(){
			console.log('mode')
			this.num=5
		},
		curentdate(){
			let that=this
			setInterval(
	    	function(){
					let date=new Date();
			    let year=String(date.getFullYear()) ; 
			    let month=date.getMonth()+1<10?"0"+(date.getMonth()+1):date.getMonth()+1; 
			    let day=date.getDate()<10?"0"+date.getDate():date.getDate(); 
			    let hour=date.getHours()<10?"0"+date.getHours():date.getHours(); 
			    let minute=date.getMinutes()<10?"0"+date.getMinutes():date.getMinutes(); 
			    let second=date.getSeconds()<10?"0"+date.getSeconds():date.getSeconds(); 
					that.date=year+"-"+month+"-"+day+" "+hour+":"+minute+":"+second;
	    	},1000)
		}
  },
	sockets: {
		//这里是监听connect事件
		  connect(){
		    // 获取每台客服端生成的id
		    this.websocketid = this.$socket.id;
		    console.log('链接服务器');
		  },
		  // 监听断开连接，函数
		  disconnect(){
		    console.log('断开服务器连接');
		  },
		  // 服务端指定有msg监听的客服端，可接对应发来的收消息，data服务端传的消息
		  msg(data){
		
		  }
	},
	
}
</script>

<style scoped>
	.home{display: flex;justify-content: flex-start;align-content: flex-start;box-sizing: border-box;}
	.menu{width: 3rem;height:100%;border-right: 1px solid #e6e6e6;background:#507FCB ;position: relative;box-sizing: border-box;}
	.realtimeimg{width: 0.3rem;margin-right: 0.28rem;}
	.realtimetxt{color: #FAFAFA;font-size: 0.22rem;}
	.realtimepre{width: 85%;margin: 0.40rem auto;background: linear-gradient(top,#DDDDE4 0%, #000028 20%,#000028 80%,#DDDDE4 100%);
		padding: 0.4rem 0;border-radius: 10px;}
	.realtimepretop{margin-top: 0.9rem;}
	.home .realtimepreactive{background: linear-gradient(top,#DDDDE4 0%, #1840A8 20%,#1840A8 80%,#DDDDE4 100%)}
	.home .el-menu{border-right:none;}
	.right{width: 100%;height:100%;overflow-y: scroll;overflow-x: auto;}
	.right::-webkit-scrollbar {display:none}
	.logo{position:absolute;bottom: 0.3rem;left: 50%;transform: translateX(-50%);z-index: 12;}
	.logoimg{display: flex; justify-content: center;align-items: center; width: 1rem;}
	.logoimg img{width: 100%;}
	.date{position: absolute;top: 0.3rem;left: 50%;transform: translateX(-50%);font-size: 0.16rem;width: 100%;text-align: center;
		color: #FAFAFA;}
</style>