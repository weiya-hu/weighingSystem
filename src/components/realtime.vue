<template>
	<div class="realtime" style="height: 100%;">
		<div>
			<!--0-16通道-->
			<div class="flexl channel">
				<div class="channeltxt">通道号</div>
				<div class="channelnum flexl">
					<div v-for="(item,index) in adarrrow1">{{index+1}}</div>
				</div>
			</div>
			<div class="flexl advalue">
				<div class="channeltxt">ADValue：</div>
				<div class="channelnum channelnuma flexl">
					<div v-for="(item,index) in adarrrow1" class="adcAvg">{{item.AdcAvg | tofixed}}</div>
				</div>
			</div>
			<div class="flexl advalue">
				<div class="channeltxt">DAValue：</div>
				<div class="channelnum channelnuma flexl">
					<div v-for="(item,index) in adarrrow1">{{item.Dac}}</div>
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
					<div v-for="(item,index) in adarrrow2">{{index+1}}</div>
				</div>
			</div>
			<div class="flexl advalue">
				<div class="channeltxt">ADValue：</div>
				<div class="channelnum channelnuma flexl">
					<div v-for="(item,index) in adarrrow2" class="adcAvg">{{item.AdcAvg | tofixed}}</div>
				</div>
			</div>
			<div class="flexl advalue">
				<div class="channeltxt">DAValue：</div>
				<div class="channelnum channelnuma flexl">
					<div v-for="(item,index) in adarrrow2">{{item.Dac}}</div>
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
					<div style="flex: 0.7;">时间</div>
					<div style="flex: 0.3;">车型</div>
					<div style="flex: 0.4;">车牌</div>
					<div style="flex: 1.6;">轴距(m)</div>
					<div class="zweight">轴重(KG)</div>
					<div style="flex:0.8;">速度(KM/h)</div>
					<div style="flex: 0.7;">总重(KG)</div>
					<div style="flex: 0.6;">车辆状态</div>
					<div style="flex: 0.6;">车道号</div>
					<div style="flex: 0.6;">传感器</div>
					
				</div>
				<div class="contitempre">
					<div v-for="(item,index) in currentcar" class="contitem flexl">
						<div style="flex: 0.7;white-space: normal;">{{item.Time | dateformate}}</div>
						<div style="flex: 0.3;">{{item.PubCarCode}}</div>
						<div style="flex: 0.4;">{{item.ChePai}}</div>
						<div style="flex: 1.6;" class="zdis" :class="item.ZhouJu && (item.ZhouJu.length>6 || item.ZhouZhong.length>6)?'ftsz':''">
							<div v-for="(itm,inx) in item.ZhouJu" class="disitem">
								<div class="inx fleximg">{{inx+1}}</div>
								<div>{{itm | tofixed}}</div>
							</div>
						</div>
						<div style="flex: 2;" class="zdis zweight" :class="item.ZhouJu && (item.ZhouJu.length>6 || item.ZhouZhong.length>6)?'ftsz':''">
							<div v-for="(itm,inx) in item.ZhouZhong" class="disitem">
								<div class="indx inx fleximg">{{inx+1}}</div>
								<div>{{itm | parseint}}</div>
							</div>

						</div>
						<div style="flex:0.8;">{{item.Speed | tofixed}}</div>
						<div style="flex:0.7;">{{item.Weight | parseint}}</div>
						<div style="flex:0.6;">{{item.Direct | direct}}</div>
						<div style="flex:0.6;" class="zdis zweight">
							<div v-for="(itm,inx) in item.RoadNum" class="disitem">
								<div>{{itm}}</div>
							</div>
						</div>
						<div style="flex:0.6;" class="zdis zweight">
							<div>{{item.Row}}/</div>
							<div v-for="(itm,inx) in item.Seneor" class="disitem">
								<div>{{itm}}</div>
							</div>
						</div>
						
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {

		props: ['banner'],
		data() {
			return {
				logo: 'this.src="' + require('../assets/noimg.png') + '"',
				height: '',
				currentcar: [],
				ada: {},
				adarr: [],//adda值的32个通道数据的数组
				adarrrow1:[],//adda值第一排的16个通道数据的数组
				adarrrow2:[],//adda值第二排的16个通道数据的数组
			}
		},
		mounted() {
			console.log('realtime')
			let that = this
			this.bannerHeight()
			this.history()
		},
		beforeCreate() {
			let app = this;
		},
		methods: {
			bannerHeight() {
				this.height = (`${document.documentElement.clientWidth}` * 0.54).toFixed(2) + 'px';
			},
			history() {
				let data = {
					TimeStart:parseInt(new Date(new Date().setHours(0, 0, 0, 0)) / 1000+'000000') ,
					TimeEnd:parseInt(Date.parse(new Date())+'000000'),
					From: 0,
					To: 10,
					Zhou: 0,
					Type: "his"
				}
				console.log(JSON.stringify(data))
				this.$socket.emit('history', JSON.stringify(data));
			},
		},
		created() {
			for(let i = 0; i < 32; i++) {
				this.adarr.push(0)
			}
			for(let i = 0; i < 16; i++) {
				this.adarrrow1.push(0);
				this.adarrrow2.push(0)
			}
//			localStorage.setItem('adarr', JSON.stringify(this.adarr));
//			localStorage.setItem('adarrrow1', JSON.stringify(this.adarrrow1));
//			localStorage.setItem('adarrrow2', JSON.stringify(this.adarrrow2));
		},
		sockets: {
			//这里是监听connect事件
			connect() {
				// 获取每台客服端生成的id
				this.websocketid = this.$socket.id;
				console.log('链接服务器');
			},
			his(data) {
				console.log(this.currentcar)
				let dat=JSON.parse(data)
				if(dat.Data){
					if(this.currentcar.length == 0) {
						this.currentcar = dat.Data
						console.log(this.currentcar)
						if(this.currentcar.length > 10) {
							this.currentcar = this.currentcar.splice(0, 10)
							console.log(this.currentcar)
						}
					}
				}
			},
			tf(data) {
				console.log(JSON.parse(data))
				this.currentcar.unshift(JSON.parse(data))
				console.log(this.currentcar)
				if(this.currentcar.length > 10) {
					this.currentcar = this.currentcar.splice(0, 10)
					console.log(this.currentcar)
				}
			},
			adda(data) {
				//			  	console.log(JSON.parse(data))
				this.ada = JSON.parse(data)
				let ada = JSON.parse(data)
				let adarr = JSON.parse(JSON.stringify(this.adarr));
				let adarrrow1 = JSON.parse(JSON.stringify(this.adarrrow1));
				let adarrrow2 = JSON.parse(JSON.stringify(this.adarrrow2))
				if(ada.Row==1){
					adarrrow1[ada.Id - 1]=ada
				}else if(ada.Row==2){
					adarrrow2[ada.Id - 1]=ada
				}
				adarr[ada.Id - 1] = JSON.parse(data)
				this.adarr = adarr
				this.adarrrow1 = adarrrow1
				this.adarrrow2 = adarrrow2
				
//				console.log(this.adarr)
//				localStorage.setItem('adarr', JSON.stringify(this.adarr));
//				localStorage.setItem('adarrrow1', JSON.stringify(this.adarrrow1));
//				localStorage.setItem('adarrrow2', JSON.stringify(this.adarrrow1));
//				console.log(localStorage.getItem('adarr'))
			},
			// 监听断开连接，函数
			disconnect() {
				console.log('断开服务器连接');
			},
			// 服务端指定有msg监听的客服端，可接对应发来的收消息，data服务端传的消息
			msg(data) {

			}
		},
		filters: {
			tofixed: function(value) {
				if(value) {
					return value.toFixed(2)
				} else {
					return
				}

			},
			parseint:function(val){
				return parseInt(val)
			},
			dateformate: function(val) {
				let num = String(val).substring(0, 13) - 0;
				let date = new Date(num);
				let year = String(date.getFullYear());
				let month = date.getMonth() + 1 < 10 ? "0" + date.getMonth() + 1 : date.getMonth() + 1;
				let day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
				let hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
				let minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
				let second = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
				return hour + ":" + minute + ":" + second;
			},
//			direct: function(val) {
//				return val == 1 ? '正向' : val == 2 ? '逆向' : val
//			},
			direct: function(val) {
				let drivingStatus=''
				switch (val){
				  case 0:
				    drivingStatus = "正向行驶";
				    break;
				  case 1:
				    drivingStatus = "逆向行驶";
				    break;
				  case 2:
				    drivingStatus = "同向跨车道";
				    break;
				  case 3:
				    drivingStatus = "压单边行驶";
				    break;
				  case 4:
				    drivingStatus = "跨中线行驶";
				    break;
				}
				return drivingStatus
				
			},
			adv: function(val, flag) {
				let that = this
				if(flag) {
					let adarr = JSON.parse(localStorage.getItem('adarr'));
					let m = adarr.find(mm => mm.Id == val)
					console.log(m)
					if(m) {
						return m.AdcAvg.toFixed(2)
					} else {
						return
					}
				} else {
					let adarr = JSON.parse(localStorage.getItem('adarr'));
					let m = adarr.find(mm => mm.Id == val + 16)
					console.log(m)
					if(m) {
						return m.AdcAvg.toFixed(2)
					} else {
						return
					}
				}
			},
			dav: function(val, flag) {
				let that = this
				if(flag) {
					let adarr = JSON.parse(localStorage.getItem('adarr'));
					let m = adarr.find(mm => mm.Id == val)
					console.log(m)
					if(m) {
						return m.Dac
					} else {
						return
					}
				} else {
					let adarr = JSON.parse(localStorage.getItem('adarr'));
					let m = adarr.find(mm => mm.Id == val + 16)
					console.log(m)
					if(m) {
						return m.Dac
					} else {
						return
					}
				}
			},
		}
	}
</script>

<style scoped>
	.realtime {
		width: 100%;
		background: #2E405E;
		color: #F8FFFF;
		font-size: 0.16rem;
		padding: 0.2rem;
		box-sizing: border-box;
		overflow: scroll;
	}
	
	.channel {
		padding: 0.1rem .05rem;
		background: #507FCB;
	}
	
	.channeltxt {
		width: 1.5rem;
	}
	
	.channelnum {
		width: 100%;
	}
	
	.channelnum>div {
		width: 6.25%;
		box-sizing: border-box;
	}
	
	.adcAvg {
		font-size: 0.14rem
	}
	/*.channelnuma>div{border-right: 1px solid #999999;}*/
	
	.advalue {
		background: #F8FFFF;
		color: #2E405E;
		padding: .05rem;
		border: 1px solid #999;
		box-sizing: border-box;
	}
	
	.currenttxt {
		font-size: 0.20rem;
		color: #F8FFFF;
		text-align: left;
		padding: 0.1rem;
	}
	
	.currentdown {
		background: #F8FFFF;
		height: 7.2rem;
	}
	
	.currentdowntitle {
		background: #507FCB;
		color: #F8FFFF;
		height: 9.09%;
	}
	
	.currentdowntitle>div {
		font-size: 0.2rem;
		box-sizing: border-box;
	}
	
	.contitempre {
		height: 90.9%;
		color: #2e405e;
	}
	
	.contitem {
		width: 100%;
		height: 10%;
		border-bottom: 1px solid #999999;
		box-sizing: border-box;
	}
	
	.contitem>div {
		flex: 1;
		font-size: 0.18rem;
		box-sizing: border-box;
	}
	
	.realtime .zweight {
		flex: 2;
		overflow: scroll;
		white-space: nowrap;
	}
	
	.zdis>div {
		margin: 0.05rem;
	}
	
	.history .ftsz {
		font-size: 0.14rem
	}
	
	.zdis {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		align-content: space-around;
		overflow: scroll;
		white-space: nowrap;
	}
	
	 ::-webkit-scrollbar {
		width: 0 !important;
		height: 0;
	}
	
	.inx {
		font-size: 0.14rem;
		background: #507FCB;
		border-radius: 50%;
		color: #F8FFFF;
		margin-right: 0.02rem;
		width: 0.16rem;
		height: 0.16rem;
	}
	
	.realtime .indx {
		background: #00A57C;
	}
	
	.disitem {
		display: flex;
		justify-content: flex-start;
		align-items: center;
	}
</style>