<template>
	<div class="history" style="height: 100%;">
		<div class="condition flexl">
			<div class="timeselect flexl">
				<div>时间选择：</div>
				<!--<el-time-picker
				    is-range
				    v-model="timevalue"
				    range-separator="至"
				    start-placeholder="开始时间"
				    end-placeholder="结束时间"
				    placeholder="选择时间范围">
				</el-time-picker>-->
				<el-date-picker v-model="timevalue" @change='timechange' value-format="timestamp" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" style="width: 5rem;">
				</el-date-picker>
			</div>
			<div class="cheselect flexl">
				<div>车轴数选择：</div>
				<el-select style="width: 1.2rem;" v-model="zhouvalue" @change='zhouchange' clearable placeholder="请选择">
					<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
			</div>
			<div class="find" @click="find">查询</div>
		</div>
		<!--<div class="form">
			<div class="titl">
				<div>编号</div>
				<div>车道</div>
				<div>车重</div>
				<div>轴距</div>
				<div>速度</div>
				<div>轴数</div>
				<div>轴型</div>
				<div>车型</div>
				<div>日期</div>
				<div>时间</div>
				<div>当量轴次</div>
				<div>轴间距组</div>
				<div>轴重组</div>
				<div>左测量</div>
				<div>右测量</div>
				<div>加速度</div>
			</div>
			<div v-for="item in 10" class="item">
				<div v-for="item in 16"></div>
			</div>
		</div>-->
		<div class="currentdown">
			<div class="flexl currentdowntitle">
				<div style="flex: 0.9;">时间</div>
				<div style="flex: 0.4;">车型</div>
				<div style="flex: 1.6;">轴距(m)</div>
				<div style="flex: 2;" class="zweight">轴重(KG)</div>
				<div style="flex:0.7;">速度(KM/h)</div>
				<div style="flex: 0.7;">总重(KG)</div>
				<div style="flex: 0.6;">车辆状态</div>
			</div>
			<div class="contitempre">
				<div v-for="(item,index) in historylist" class="contitem flexl">
					<div style="flex: 0.9;font-size: 0.16rem;">{{item.Time | dateformate}}</div>
					<div style="flex: 0.4;">{{item.AxisCnt}}</div>
					<div style="flex: 1.6;" class="zdis" :class="item.ZhouJu && (item.ZhouJu.length>6 || item.ZhouZhong.length>6)?'ftsz':''">
						<div v-for="(itm,inx) in item.ZhouJu" class="disitem">
							<div class="inx fleximg">{{inx+1}}</div>
							<div>{{itm | tofixed}}</div>
						</div>
					</div>
					<div style="flex: 2;" class="zdis zweight" :class="item.ZhouJu && (item.ZhouJu.length>6 || item.ZhouZhong.length>6)?'ftsz':''">
						<div v-for="(itm,inx) in item.ZhouZhong" class="disitem">
							<div class="indx inx fleximg">{{inx+1}}</div>
							<div>{{itm | tofixed}}</div>
						</div>
						
					</div>
					<div style="flex:0.7;">{{item.Speed | tofixed}}</div>
					<div style="flex:0.7;">{{item.Weight | tofixed}}</div>
					<div style="flex:0.6;">{{item.Direct | direct}}</div>
				</div>
			</div>
		</div>
		<div class="fleximg botbtn">
			<div @click="prepage">上一页</div>
			<div class="pagenum">{{pagenum}}/{{allpage}}</div>
			<div @click="nextpage">下一页</div>
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
				timevalue: [],
				options: [{
					value: '2',
					label: '2'
				}, {
					value: '3',
					label: '3'
				}, {
					value: '4',
					label: '4'
				}, {
					value: '5',
					label: '5'
				}, {
					value: '6',
					label: '6'
				}],
				zhouvalue: '',
				historylist: '',
				pagenum: 1,
				allpage: ''
			}
		},
		mounted() {

			let that = this
			this.$nextTick(function() {
				this.find()
			})
			this.bannerHeight()
		},
		methods: {
			todetail(id) {
				this.$emit('change', id)
			},
			bannerHeight() {
				this.height = (`${document.documentElement.clientWidth}` * 0.54).toFixed(2) + 'px';
			},
			find() {
				let data = {
					TimeStart:this.timevalue[0]?parseInt(this.timevalue[0]+'000000'):parseInt(new Date(new Date().toLocaleDateString()).getTime()+'000000'),
					TimeEnd:this.timevalue[1]?parseInt(this.timevalue[1]+'000000'): parseInt((new Date()).getTime()+'000000'),
					From: 12 * (this.pagenum - 1),
					To: 12 * this.pagenum,
					Zhou: this.zhouvalue ? Number(this.zhouvalue) : 0,
					Type: "his"
				}
				console.log(JSON.stringify(data))
				this.$socket.emit('history', JSON.stringify(data));
			},
			prepage() {
				if(this.pagenum == 1) {
					this.$notify({
						message: '这已经是第一页了',
						duration: 2000,
						position: 'bottom-right'
					});
				} else {
					this.pagenum = this.pagenum - 1;
					this.find()
				}

			},
			nextpage() {
				if(this.pagenum >= this.allpage) {
					this.$notify({
						message: '没有更多了',
						duration: 2000,
						position: 'bottom-right'
					});
				} else {
					this.pagenum = this.pagenum + 1;
					this.find()
				}
			},
			timechange() {
				console.log(this.timevalue)
			},
			zhouchange(e) {
				console.log(this.zhouvalue ? this.zhouvalue : 0)
			}
		},
		sockets: {
			his(data) {
				console.log(JSON.parse(data))
				let dat = JSON.parse(data)
				this.allpage = Math.ceil(dat.Count / 12)
				this.historylist = dat.Data
			}
		},
		created() {
			console.log('history')
		},
		filters: {
			tofixed: function(value) {
				if(value) {
					return value.toFixed(2)
				} else {
					return
				}

			},
			dateformate: function(val) {
				let num = String(val).substring(0, 13) - 0;
				let date = new Date(num);
				let year = String(date.getFullYear());
				let month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
				let day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
				let hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
				let minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
				let second = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
				return year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
			},
			direct: function(val) {
				return val == 1 ? '正向' : val == 2 ? '逆向' : val
			}
		}
	}
</script>

<style scoped>
	.history {
		width: 100%;
		background: #2E405E;
		color: #F8FFFF;
		box-sizing: border-box;
		overflow-y: scroll;
	}
	
	.form {
		overflow-x: scroll;
	}
	
	.titl {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		width: 100%;
	}
	
	.titl>div {
		width: 1.2rem;
		text-align: center;
		flex-shrink: 0;
		padding: 0.1rem 0;
		border-right: 1px solid #f8ffff;
		background: #507FCB;
		color: #F8FFFF;
		font-size: 0.16rem
	}
	
	::-webkit-scrollbar {
		display: none;
	}
	
	.item {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		width: 100%;
	}
	
	.item>div {
		width: 1.2rem;
		text-align: center;
		flex-shrink: 0;
		height: 0.3rem;
		border-right: 1px solid #507FCB;
		border-bottom: 1px solid #507FCB;
		background: #F8FFFF;
		color: #507FCB;
	}
	
	.condition {
		padding: 0.1rem 0;
	}
	
	.condition>div {
		margin: 0 0.5rem;
	}
	
	.timeselect>div:nth-child(1),
	.cheselect>div:nth-child(1) {
		font-size: 0.16rem;
		margin-right: 0.2rem;
	}
	
	.find {
		font-size: 0.16rem;
		background: #507FCB;
		padding: 0.1rem 0.2rem;
		border-radius: 4px;
		letter-spacing: 4px;
	}
	
	..currenttxt {
		font-size: 0.20rem;
		color: #F8FFFF;
		text-align: left;
		padding: 0.1rem;
	}
	
	.currentdown {
		background: #F8FFFF;
		height: 9rem;
	}
	
	.currentdowntitle {
		background: #507FCB;
		color: #F8FFFF;
		height: 7.69%;
	}
	
	.currentdowntitle>div {
		font-size: 0.2rem;
		box-sizing: border-box;
	}
	
	.contitempre {
		height: 100%;
		color: #2e405e;
	}
	
	.contitem {
		width: 100%;
		height: 7.69%;
		border-bottom: 1px solid #999999;
		box-sizing: border-box;
		overflow: scroll; 
		white-space: nowrap;
	}
	
	.contitem>div {
		flex: 1;
		font-size: 0.18rem;
		box-sizing: border-box;
	}
	
	.history .zweight {
		flex: 2;
	}
	
	.zdis>div {
		margin: 0.05rem;
	}
	.history .ftsz{font-size: 0.14rem}
	.zdis {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		align-content: space-around;
		overflow: scroll;
		white-space: nowrap;
	}
	::-webkit-scrollbar {
    		 width: 0 !important;height: 0;
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
	
	.history .indx {
		background: #00A57C;
	}
	
	.disitem {
		display: flex;
		justify-content: flex-start;
		align-items: center;
	}
	
	.botbtn>div {
		font-size: 0.16rem;
		background: #507FCB;
		padding: 0.05rem 0.1rem;
		border-radius: 4px;
		letter-spacing: 1px;
		margin: 0.1rem 0.5rem;
	}
	
	.history .pagenum {
		background: #F8FFFF;
		color: #333333;
		font-size: 0.16rem;
		border-radius: 4px;
	}
</style>