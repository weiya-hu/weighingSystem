<template>
	<div class="staticweight">
		<div class="bigview">{{weightdata.Weight | getFloat() || 0}} kg</div>
		<div class="btn flexa">
			<div>预置皮重</div>
			<div>称重</div>
		</div>
		<div class="btn flexa">
			<div @click="reset">重置</div>
			<div @click="setzero">置零</div>
		</div>
		<div class="weightset flexa">
			<div class="weighttxt">重量系数设定</div>
			<div class="weightxtlb">重量系数</div>
			<!--<div class="weightParm">{{weightdata.WeightParm | tofixed4}}</div>-->
			<input type="number" name="" id="" value=""  v-model="WeightParm"/>
			<div class="weightxtlb">校准重量</div>
			<input type="number" name="" id="" value=""  v-model="trueweigh"/>
			<div class="butn" @click="setweight">计算重量系数</div>
			<div class="butn" @click="calparm">设定重量系数</div>
		</div>
		<div class="datastate" :class="isdataactive?'datastateactive':''"></div>
		<div class="datastate datastatedown" :class="datastatedownactive=='green'?'datastatedowngreen':datastatedownactive=='red'?'datastatedownred':''"></div>
	</div>
</template>

<script>
	export default {
    data(){
        return{
            weightdata:{},
            trueweigh:'',
            WeightParm:'',
            isdataactive:false,
            datastatedownactive:'gray'
        }
    },
    mounted(){
    	console.log('staticweigh') 
    },
    beforeCreate() {
    	
    },
    methods:{
    	getFloat(num, n) {
				n = n ? parseInt(n) : 0;
				if(n <= 0) {
					return Math.round(num);
				}
				num = Math.round(num * Math.pow(10, n)) / Math.pow(10, n); //四舍五入
				num = Number(num).toFixed(n); //补足位数
				return num;
			},
			setzero(){
				let data={Type:'setzero'}
				this.$socket.emit('staticweight', JSON.stringify(data));
			},
			setweight(){
				let data={
					Type: 'setweight',
					RealWeight:Number(this.trueweigh) 
				}
				this.$socket.emit('staticweight', JSON.stringify(data));
			},
			calparm(){
				let data={
					Type: 'calparm',
					WeightParm:Number(this.WeightParm)
				}
				this.$socket.emit('staticweight', JSON.stringify(data));
			},
			reset(){
				let data={
					Type: 'reset'
				}
				this.$socket.emit('staticweight', JSON.stringify(data));
			}
	  },
	  created(){
	    
	  },
	  sockets: {
		//这里是监听connect事件
		  connect(){
		    // 获取每台客服端生成的id
		    this.websocketid = this.$socket.id;
		    console.log('链接服务器');
		  },
		  staticweight(data) {
		  	console.log('staticweight')
		  	let dat=JSON.parse(data)
		  	console.log(dat)
		  	let that=this
		  	if(dat.Type=="report"){
		  		that.weightdata=dat;
		  		that.isdataactive=true;
		  		if(dat.DataStable==1){
			  		that.datastatedownactive='green'
		  		}else if(dat.DataStable==0){
			  		that.datastatedownactive='red'
		  		}
		  		if(that.trueweigh=='' && that.WeightParm==''){
		  			that.trueweigh=dat.RealWeight;
		  			that.WeightParm = that.getFloat(dat.WeightParm, 4)
		  		}
		  		setTimeout(function(){
		  			that.isdataactive=false;
		  			that.datastatedownactive='gray'
		  		},500)
		  	}
		  	
		  	
		  	if(dat.Type=="setzero" && dat.Status=='success'){
		  		this.$message({
						type: 'success',
						message: '置零成功!'
					});
		  	}else if(dat.Type=="setzero" && dat.Status=='fail'){
		  		this.$message({
						type: 'fail',
						message: '置零失败!'
					});
		  	}
		  	
		  	
		  	if(dat.Type=="setweight" && dat.Status=='success'){
		  		this.$message({
						type: 'success',
						message: '发送重量成功!'
					});
					this.WeightParm=this.getFloat(dat.WeightParm, 4)
		  	}else if(dat.Type=="setweight" && dat.Status=='fail'){
		  		this.$message({
						type: 'fail',
						message: '发送重量失败!'
					});
		  	}
		  	
		  	if(dat.Type=="calparm" && dat.Status=='success'){
		  		this.$message({
						type: 'success',
						message: '发送设定重量信号成功!'
					});
		  	}else if(dat.Type=="calparm" && dat.Status=='fail'){
		  		this.$message({
						type: 'fail',
						message: '发送设定重量信号失败!'
					});
		  	}
		  	
		  	if(dat.Type=="reset" && dat.Status=='success'){
		  		this.$message({
						type: 'success',
						message: '重置成功!'
					});
		  	}else if(dat.Type=="reset" && dat.Status=='fail'){
		  		this.$message({
						type: 'fail',
						message: '重置失败!'
					});
		  	}
			},

		  // 监听断开连接，函数
		  disconnect(){
		    console.log('断开服务器连接');
		  }
		},
		filters: {
		  tofixed2: function (value) {
		  	if(value){
		  		return value.toFixed(2)
		  	}else{
		  		return 0
		  	}
		  },
		  tofixed4: function (value) {
		  	if(value){
			  	value = Math.round(value * Math.pow(10, 4)) / Math.pow(10, n); //四舍五入
					value = Number(value).toFixed(4); //补足位数
					return value;
				}else{
		  		return
		  	}
		  },
		  getFloat:function(num, n) {
				n = n ? parseInt(n) : 0;
				if(n <= 0) {
					return Math.round(num);
				}
				num = Math.round(num * Math.pow(10, n)) / Math.pow(10, n); //四舍五入
				num = Number(num).toFixed(n); //补足位数
				return num;
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
		  }
		}
	}
</script>

<style scoped>
	.staticweight{width: 100%;height: 100%; background: #2E405E;overflow: scroll;position: relative;}
	.bigview{width: 70%;height: 2rem;background: #FFFFFF;margin: 0.5rem auto 0.6rem;
		color: #333333;font-size: 1rem;line-height: 2rem;box-shadow: 0 0 10px rgba(255,255,255,1);}
	.btn{width: 70%;margin: 0.6rem auto;}
	.btn>div{background: linear-gradient(top,#DDDDE4 0%, #1840A8 20%,#1840A8 80%,#DDDDE4 100%);font-size: 0.20rem;
		color: #FAFAFA;width: 3rem;padding: 0.3rem 0;margin:0 0.1rem ;border-radius: 0.06rem;cursor: pointer;}
	.weightset {border: 0.02rem solid #F8FFFF;width: 90%;margin: 0.41rem auto;position: relative;
		padding: 0.4rem 0.1rem 0.3rem;box-sizing: border-box;color: #FFFFFF;}
	.weighttxt {position: absolute;top: -0.23rem;left: 0.14rem;font-size: 0.3rem;color: #F8FFFF;
		background: #2E405E;padding: 0 0.1rem;}
	 ::-webkit-scrollbar {
    		 width: 0 !important;height: 0;
   	}
   .weightxtlb{font-size: 0.25rem}
   input{width: 2rem;height: 0.5rem;font-size: 0.3rem;padding-left: 0.1rem;border-radius: 0.06rem;}
   .weightParm{width: 2rem;height: 0.5rem;font-size: 0.3rem;padding:0 0.1rem;border-radius: 0.06rem;
   	background: #FFFFFF;}
   .butn{font-size: 0.18rem;padding: 0.2rem;background: #1840A8;border-radius: 0.06rem;cursor: pointer;}
   .datastate{position: absolute;top: 0.9rem;right: 5%;width: 0.4rem;height: 0.4rem;
   		background: gray;border-radius: 50%;}
   	.datastateactive{background:#95F204}
   	.datastatedown{top: 1.7rem;}
   	.datastatedownred{background:red}
   	.datastatedowngreen{background:#95F204}
</style>