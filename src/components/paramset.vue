<template>
	<div class="paramset" id="paramset" style="height: 100%;">
		<div class="settop">
			<div :class="setactive==1?'settopactive':''" @click="changeset(1)">仪器设置</div>
			<div :class="setactive==2?'settopactive':''" @click="changeset(2)">其他参数</div>
			<div :class="setactive==3?'settopactive':''" @click="changeset(3)">重量系数</div>
		</div>
		<!--仪器设置-->
		<div class="cont" v-if='setactive==1'>
			<form @submit.prevent="sureset">
				<!--仪表设置-->
				<div class="setcont">
					<div>
						<label for="PlaceType">传感器安装方式：</label>
						<select id="PlaceType" v-model.number="setform.PlaceType">
							<option value='0'>交叉安装</option>
							<option value='1'>平行安装</option>
							<option value='2'>单排安装</option>
						</select>
					</div>
					<div>
						<label for="SenseDis">传感器布设距离：</label>
						<input type="number" id="SenseDis" v-model.trim.number="setform.SenseDis" />
					</div>
					<div>
						<label for="WaveShark">波形变动比：</label>
						<input type="number" id="WaveShark" v-model.trim.number="setform.WaveShark" />
					</div>
					<div>
						<label for="SpeedType">速度测试方式：</label>
						<select id="SpeedType" v-model.number="setform.SpeedType">
							<option value="0">触发</option>
							<option value="1">重量</option>
						</select>
					</div>
					<div>
						<label for="MinWavWidth">最小波宽：</label>
						<input type="number" id="MinWavWidth" v-model.trim.number="setform.MinWavWidth" />
					</div>
					<div>
						<label for="DATarget">DA调整目标点：</label>
						<input type="number" id="DATarget" v-model.trim.number="setform.DATarget" />
					</div>
					<div>
						<label for="DADelay">DA调整时间：</label>
						<input type="number" id="DADelay" v-model.trim.number="setform.DADelay" />
					</div>
					<div>
						<label for="TestWay">测量方式：</label>
						<select id="TestWay" v-model.number="setform.TestWay">
							<option value="0">平顶</option>
							<option value="1">积分</option>
						</select>
					</div>
					<div class="settxt">
						仪表设置
					</div>
				</div>
				<!--串口设置-->
				<div class="setcont">
					<div class="setcontport">
						<div class="portone">
							<div>车辆数据：</div>
							<label for="CarData">串口号：</label>
							<select id="CarData" v-model.number="setform.CarData">
								<option value="0">1</option>
								<option value="1">2</option>
								<option value="2">3</option>
								<option value="3">4</option>
								<option value="4">5</option>
								<option value="5">6</option>
								<option value="6">7</option>
								<option value="7">8</option>
							</select>
						</div>
						<div>
							<label for="CarBuad">串口波特率：</label>
							<select id="CarBuad" v-model.number="setform.CarBuad">
								<option value="0">2400</option>
								<option value="1">4800</option>
								<option value="2">9600</option>
								<option value="3">38400</option>
								<option value="4">57600</option>
								<option value="5">115200</option>
							</select>
						</div>
					</div>
					<div class="setcontport">
						<div class="portone">
							<div>前抓拍：</div>
							<label for="FrontCap">串口号：</label>
							<select id="FrontCap" v-model.number="setform.FrontCap">
								<option value="0">1</option>
								<option value="1">2</option>
								<option value="2">3</option>
								<option value="3">4</option>
								<option value="4">5</option>
								<option value="5">6</option>
								<option value="6">7</option>
								<option value="7">8</option>
							</select>
						</div>
						<div>
							<label for="FrontBuad">串口波特率：</label>
							<select id="FrontBuad" v-model.number="setform.FrontBuad">
								<option value="0">2400</option>
								<option value="1">4800</option>
								<option value="2">9600</option>
								<option value="3">38400</option>
								<option value="4">57600</option>
								<option value="5">115200</option>
							</select>
						</div>
					</div>
					<div class="setcontport">
						<div class="portone">
							<div>后抓拍：</div>
							<label for="BackCap">串口号：</label>
							<select id="BackCap" v-model.number="setform.BackCap">
								<option value="0">1</option>
								<option value="1">2</option>
								<option value="2">3</option>
								<option value="3">4</option>
								<option value="4">5</option>
								<option value="5">6</option>
								<option value="6">7</option>
								<option value="7">8</option>
							</select>
						</div>
						<div>
							<label for="BackBuad">串口波特率：</label>
							<select id="BackBuad" v-model.number="setform.BackBuad">
								<option value="0">2400</option>
								<option value="1">4800</option>
								<option value="2">9600</option>
								<option value="3">38400</option>
								<option value="4">57600</option>
								<option value="5">115200</option>
							</select>
						</div>
					</div>
					<div class="settxt">串口参数</div>
				</div>
				<!--配车参数-->
				<div class="setcont">
					<div>
						<label for="AxisMaxDis">最大轴距：</label>
						<input type="number" id="AxisMaxDis" v-model.trim.number="setform.AxisMaxDis" />
					</div>
					<div>
						<label for="AxisMinDis">最小轴距：</label>
						<input type="number" id="AxisMinDis" v-model.trim.number="setform.AxisMinDis" />
					</div>
					<div>
						<label for="SpeedMax">最大速度：</label>
						<input type="number" id="SpeedMax" v-model.trim.number="setform.SpeedMax" />
					</div>
					<div>
						<label for="SpeedMin">最小速度：</label>
						<input type="number" id="SpeedMin" v-model.trim.number="setform.SpeedMin" />
					</div>
					<div>
						<label for="AxisMaxCnt">最大轴数：</label>
						<input type="number" id="AxisMaxCnt" v-model.trim.number="setform.AxisMaxCnt" />
					</div>
					<div>
						<label for="WeightDiff">重量差值比：</label>
						<input type="number" id="WeightDiff" v-model.trim.number="setform.WeightDiff" />
					</div>
					<!--<div class="surebut surebutother">确认设置</div>-->
					<div class="settxt">配车参数</div>
				</div>
				<!--交互参数-->
				<div class="weightset setcontip">
					<div class="flexl">
						<div>
							<label for="UploadAddr">服务器IP：</label>
							<input type="text" id="UploadAddr" v-model.trim="setform.UploadAddr" />
						</div>
						<div>
							<label for="UploadPort">端口号：</label>
							<input type="number" id="UploadPort" v-model.trim.number="setform.UploadPort" />
						</div>
					</div>

					<div class="weighttxt">交互参数</div>
					<!--<p class="surebut surebutt">确认</p>-->
				</div>
				<!--<div class="surebut" @click="sureset">确认设置</div>-->
				<input type="submit" class="surebut" value="确认设置" />
			</form>
		</div>
		<!--其他参数-->
		<div class="cont" v-if='setactive==2'>
			<div class="add flexr" @click="addmodeshow">
				<div class="fleximg addimg">
					<img src="../assets/add.png" />
				</div>
				<div class="addtxt">增加</div>
			</div>
			<div class="otherparam">
				<div class="title titletop">
					<div>车道号</div>
					<div>通道传感器</div>
					<div>行驶方向</div>
					<div>车道名</div>
					<div>站点编号</div>
					<div>操作</div>
				</div>

				<div class="otherparamdown">
					<!-- <div class="title titledown" v-for="(item,index) in 10"> -->
					<div class="title titledown" v-for="(item,index) in roadlist">
						<div>{{item.Id}}</div>
						<div>{{item.SenseNum | arrtostring}}</div>
						<div>{{item.Direct | direct}}</div>
						<div>{{item.RoadName}}</div>
						<div>{{item.RoadCode}}</div>
						<!-- <div>车道号</div>
						<div>通道传感器</div>
						<div>行驶方向</div>
						<div>车道名</div>
						<div>站点编号</div> -->
						<div class="changebt fleximg">
							<span @click="closechangemode(index)">修改</span>
							<span @click="cancelsensor(index)">删除</span>
						</div>
					</div>
				</div>
			</div>
			<!--修改通道信息模态框-->
			<div class="changemode" v-if="ischangemodeshow">
				<div class="changecont" @click.stop='sensorpreshownone'>
					<div class="imgflex caimg" @click="closechangemode">
						<img src="../assets/cha.png" />
					</div>
					<div class="setcont">
						<div class="settxt">车道号{{roadexchangeform.Id}}</div>
						<div class="flexl">
							<label>通道传感器：</label>
							<div class="sensork" @click.stop='sensorpreshows'>{{roadexchangeform.SenseNum | arrtostring}}
								<div class="sensorpre" v-show='sensorpreshow' @click.stop='stopmp'>
									<div v-for="item in 32" class="sensorchangeitem flexl">
										<label :for="'sensornum'+item" class="sensorlb">{{item}}</label>
										<input class="checkboxs" @change="sensorchange" type="checkbox" :name="'sensornum'+item" :id="'sensornum'+item" :value="item" v-model="roadexchangeform.SenseNum" />
									</div>
								</div>
							</div>
						</div>
						<div>
							<label for="exdirect">行驶方向：</label>
							<select id="exdirect" v-model.number="roadexchangeform.Direct" @click.stop='stopmp'>
								<option value='0'>正向</option>
								<option value='1'>逆向</option>
							</select>
						</div>
						<div>
							<label for="exroadname">车道名：</label>
							<input type="text" id="exroadname" v-model.trim="roadexchangeform.RoadName" @click.stop='stopmp' />
						</div>
						<div>
							<label for="exroadnum">站点编号：</label>
							<input type="number" id="exroadnum" v-model.trim="roadexchangeform.RoadCode" @click.stop='stopmp' />
						</div>
						<div class="surebut surebutother" @click="surexchange">确认修改</div>
					</div>
				</div>
			</div>

			<div class="changemode" v-if='isaddmodeshow'>
				<div class="changecont" @click="addsensorpreshowno">
					<div class="imgflex caimg" @click="addmodeshow">
						<img src="../assets/cha.png" />
					</div>
					<div class="setcont">
						<div>
							<label for="exid">车道号：</label>
							<select id="exid" v-model.number="roadaddform.Id">
								<option v-for="item in 16" :value="item">{{item}}</option>
							</select>
						</div>
						<div class="flexl">
							<label>通道传感器：</label>
							<div class="sensork" @click.stop="addsensorpreshows">{{roadaddform.SenseNum | arrtostring}}
								<div class="sensorpre" v-if="addsensorpreshow" @click.stop="stopmp()" >
									<div v-for="item in 32" class="sensorchangeitem flexl">
										<label :for="'sensornum'+item" class="sensorlb">{{item}}</label>
										<input class="checkboxs" type="checkbox" @change="addsensorcheckbox" :name="'sensornum'+item" :id="'sensornum'+item" :value="item" v-model="roadaddform.SenseNum"  @click="stopmp()"/>
									</div>
								</div>
							</div>
						</div>
						<div>
							<label for="exdirect">行驶方向：</label>
							<select id="exdirect" v-model.number="roadaddform.Direct">
								<option value='0'>正向</option>
								<option value='1'>逆向</option>
							</select>
						</div>
						<div>
							<label for="exroadname">车道名：</label>
							<input type="text" id="exroadname" v-model.trim="roadaddform.RoadName" @click="stopmp()" />
						</div>
						<div>
							<label for="exroadnum">站点编号：</label>
							<input type="number" id="exroadnum" v-model.trim="roadaddform.RoadCode" @click="stopmp()"/>
						</div>
						<div class="surebut surebutother" @click="sureadd">确认增加</div>
					</div>
				</div>
			</div>
		</div>
		<!--重量系数-->
		<div class="cont" v-if='setactive==3'>
			<div class="weightset">
				<div class="weighttxt">传感器系数</div>

				<div class="flexl">
					<div class="weightcoefficient">重量系数</div>
					<div class="weightright">
						<div class="numlist flexl">
							<div v-for="item in weighingform.slice(0,16)">{{item.Id}}</div>
						</div>
						<div class="numlist flexl">
							<input v-for="(item,index) in weighingform.slice(0,16)" type="number" @change="fixedto2(index,'weigh',item.WeightParam)" v-model.trim.number="item.WeightParam"/>
						</div>
					</div>
				</div>
				<div class="flexl integral ">
					<div class="weightcoefficient">积分系数</div>
					<div class="weightright">
						<div class="numlist flexl">
							<input v-for="(item,index) in weighingform.slice(0,16)" type="number" @change="fixedto2(index,'calc',item.CalcParam)" v-model.trim.number="item.CalcParam"/>
						</div>
					</div>

				</div>
				<div class="flexl weightset16">
					<div class="weightcoefficient">重量系数</div>
					<div class="weightright">
						<div class="numlist flexl">
<!-- 							<div v-for="item in 16">{{item+16}}</div> -->
							<div v-for="item in weighingform.slice(16,32)">{{item.Id}}</div>
						</div>
						<div class="numlist flexl">
							<input v-for="(item,index) in weighingform.slice(16,32)" type="number" @change="fixedto2(index+16,'weigh',item.WeightParam)" v-model.trim.number="item.WeightParam"/>
						</div>
					</div>
				</div>
				<div class="flexl integral ">
					<div class="weightcoefficient">积分系数</div>
					<div class="weightright">
						<div class="numlist flexl">
							<!-- <input v-for="item in 16" type="text" /> -->
							<input v-for="(item,index) in weighingform.slice(16,32)" type="number" @change="fixedto2(index+16,'calc',item.CalcParam)" v-model.trim.number="item.CalcParam"/>
						</div>
					</div>

				</div>
				<div class="surebut surebutt" @click="sureweighbt">确认</div>
			</div>

		</div>
	</div>
</template>

<script>
	export default {
		props: ['click'],
		data() {
			return {
				logo: 'this.src="' + require('../assets/noimg.png') + '"',
				height: '',
				setactive: 1, //选择设置
				setform: { //仪器设置中仪表设置的数据
					Type: '',
					//      	仪表设置
					PlaceType: '',
					SenseDis: '',
					WaveShark: '',
					SpeedType: '',
					MinWavWidth: '',
					DATarget: '',
					DADelay: '',
					TestWay: '',
					//      	串口参数
					CarData: '',
					CarBuad: '',
					FrontCap: '',
					FrontBuad: '',
					BackCap: '',
					BackBuad: '',
					//      	配车参数
					AxisMaxDis: '',
					AxisMinDis: '',
					SpeedMax: '',
					SpeedMin: '',
					AxisMaxCnt: '',
					WeightDiff: '',
					//					交互参数
					UploadAddr: '',
					UploadPort: ''
				},
				roadlist: [], //其他参数的数据
				//修改通道信息表
				roadexchangeform: {
					Id: '',
					SenseNum: [],
					Direct: '',
					RoadName: '',
					RoadCode: ''
				},
				//增加通道信息表
				roadaddform: {
					Id: '',
					SenseNum: [],
					Direct: '',
					RoadName: '',
					RoadCode: ''
				},
				sensorpreshow: false, //修改通道传感器的多选框是否显示
				addsensorpreshow: false, //增加通道传感器的多选框是否显示
				ischangemodeshow: false, //车道号修改页面的mode是否显示
				isaddmodeshow: false,//车道号增加页面的mode是否显示
				weighingform:[]
			}
		},
		created() {
			console.log('history')
			let data = {
				type: 'get'
			}
			this.$socket.emit('sparm', JSON.stringify(data));
			let arr=[]
			for(let i=1;i<33;i++){
				let itm={Id: i,WeightParam: '',CalcParam: ''};
				arr.push(itm)
			}
			this.weighingform=arr
			
		},
		mounted() {
			console.log('paramset')
			console.log(this.click)
			let that = this
			this.$nextTick(function() {})
		},
		methods: {
			//阻止冒泡
			stopmp() {
				console.log()
			},
			sensorpreshows() {
				console.log(1000)
				this.sensorpreshow = !this.sensorpreshow
			},
			addsensorpreshows(){
				console.log(1000)
				this.addsensorpreshow = !this.addsensorpreshow
			},
			addsensorpreshowno(){
				this.addsensorpreshow=false
			},
			sensorpreshownone() {
				this.sensorpreshow = false
			},
			bannerHeight() {
				this.height = (`${document.documentElement.clientWidth}` * 0.54).toFixed(2) + 'px';
			},
			//通道传感器checkbox改变触发函数，排序
			sensorchange() {
				let SenseNum = JSON.parse(JSON.stringify(this.roadexchangeform.SenseNum))
				SenseNum.sort(function(a, b) {
					return(a - b)
				})
				this.roadexchangeform.SenseNum = SenseNum
			},
			//增加通道传感器checkbox改变触发函数，排序
			addsensorcheckbox(){
				console.log(this.roadaddform.SenseNum)
				let SenseNum = JSON.parse(JSON.stringify(this.roadaddform.SenseNum))
				SenseNum.sort(function(a, b) {
					return(a - b)
				})
				this.roadaddform.SenseNum = SenseNum

			},
			//点击切换3个不同的设置
			changeset(id) {
				console.log(id)
				let cnum=this.setactive,that=this;
				if(cnum==1){
					let localsetform = localStorage.getItem('localsetform')
					console.log(this.CompareJsonObj(JSON.parse(localsetform), this.setform))
					console.log(JSON.parse(localsetform))
					console.log(this.setform)
					if(this.CompareJsonObj(JSON.parse(localsetform), this.setform)) {
						this.setactive = id
					} else {
						this.$confirm('是否保存设置?', '提示', {
							confirmButtonText: '确定',
							cancelButtonText: '取消',
							type: 'warning'
						}).then(() => {
							if(that.sureset()){
								that.setactive = id
							}else{//保存失败没写。饶工没有返回失败的情况
								
							}
						}).catch(() => {
							that.$message({
								type: 'info',
								message: '已取消保存设置'
							});
							that.setactive = id
						});
					}
				}else{
					that.setactive = id
				}
				
			},
			//删除通道信息
			cancelsensor(index) {
				this.$confirm('是否确认删除？').then(_ => {
					let roadlist = JSON.parse(JSON.stringify(this.roadlist))
					roadlist.splice(index, 1);
					this.roadlist = roadlist;
					let data = {
						Type: 'set',
						Data:this.roadlist
					}
					this.$socket.emit('roadset', JSON.stringify(data));
				  })
				  .catch(_ => {});
			},
			//是否显示修改模态框、修改通道信息
			closechangemode(idx) {
				console.log(idx)
				this.ischangemodeshow = !this.ischangemodeshow
				if(!isNaN(idx)) {
					this.roadexchangeform = JSON.parse(JSON.stringify(this.roadlist[idx]))
				}
				console.log(this.roadexchangeform.Id)
			},
			//是否显示增加通道信息模态框
			addmodeshow() {
				this.isaddmodeshow = !this.isaddmodeshow
				console.log(this.isaddmodeshow)
			},
			//确认修改
			surexchange() {
				let id = this.roadexchangeform.Id;
				console.log(this.roadexchangeform)
				this.roadlist[id - 1] = JSON.parse(JSON.stringify(this.roadexchangeform))
				let data = {
					Type: 'set',
					Data:this.roadlist
				}
				this.$socket.emit('roadset', JSON.stringify(data));
			},
			//确认增加
			sureadd(){
				let roadlist=JSON.parse(JSON.stringify(this.roadlist))
				let roadidlist=this.getArrayProps(roadlist,'Id').concat(this.roadaddform.Id).sort(function(a, b) {
					return(a - b)
				})
				let idx=(roadidlist || []).findIndex((item) => item === this.roadaddform.Id);
				roadlist.splice(idx,0,this.roadaddform)
				console.log(roadlist)
				this.roadlist=roadlist
				let data = {
					Type: 'set',
					Data:this.roadlist
				}
				
				this.$socket.emit('roadset', JSON.stringify(data));
				
			},
			//获取对象数组中某一项的数组集合
			getArrayProps(array, key) {
				var key = key || "Id";
				var res = [];
				if (array) {
					array.forEach(function(t) {
						res.push(t[key]);
					});
				}
				return res;
			},
			//确认设置
			sureset() {
				console.log(this.setform)
				//仪器设置中有数据没有设置时的提示
				if(this.setform.PlaceType < 0) {
					this.$alert('请选择传感器安装方式!', '错误提示', {
						confirmButtonText: '确定'
					});
					return false
				}
				if(this.setform.SenseDis == '') {
					this.$alert('请设置传感器布设距离!', '错误提示', {
						confirmButtonText: '确定'
					});
					return false
				}
				if(this.setform.WaveShark == '') {
					this.$alert('请设置波形变动比!', '错误提示', {
						confirmButtonText: '确定'
					});
					return false
				}
				if(this.setform.SpeedType < 0) {
					this.$alert('请选择速度测试方式!', '错误提示', {
						confirmButtonText: '确定'
					});
					return false
				}
				if(this.setform.MinWavWidth == '') {
					this.$alert('请设置最小波宽!', '错误提示', {
						confirmButtonText: '确定'
					});
					return false
				}
				if(this.setform.DATarget == '') {
					this.$alert('请设置DA调整目标点!', '错误提示', {
						confirmButtonText: '确定'
					});
					return false
				}
				if(this.setform.DADelay == '') {
					this.$alert('请设置DA调整时间!', '错误提示', {
						confirmButtonText: '确定'
					});
					return false
				}
				if(this.setform.TestWay < 0) {
					this.$alert('请选择测量方式!', '错误提示', {
						confirmButtonText: '确定'
					});
					return false
				}
				if(this.setform.CarData < 0) {
					this.$alert('请选择车辆数据串口号!', '错误提示', {
						confirmButtonText: '确定'
					});
					return false
				}
				if(this.setform.CarBuad < 0) {
					this.$alert('请选择车辆数据串口波特率!', '错误提示', {
						confirmButtonText: '确定'
					});
					return false
				}
				if(this.setform.FrontCap < 0) {
					this.$alert('请选择前抓拍串口号!', '错误提示', {
						confirmButtonText: '确定'
					});
					return false
				}
				if(this.setform.FrontBuad < 0) {
					this.$alert('请选择前抓拍串口波特率!', '错误提示', {
						confirmButtonText: '确定'
					});
					return false
				}
				if(this.setform.BackCap < 0) {
					this.$alert('请选择后抓拍据串口号!', '错误提示', {
						confirmButtonText: '确定'
					});
					return false
				}
				if(this.setform.BackBuad < 0) {
					this.$alert('请选择后抓拍串口波特率!', '错误提示', {
						confirmButtonText: '确定'
					});
					return false
				}

				if(this.setform.AxisMaxDis == '') {
					this.$alert('请设置最大轴距!', '错误提示', {
						confirmButtonText: '确定'
					});
					return false
				}
				if(this.setform.AxisMinDis == '') {
					this.$alert('请设置最小轴距!', '错误提示', {
						confirmButtonText: '确定'
					});
					return false
				}
				if(this.setform.SpeedMax == '') {
					this.$alert('请设置最大速度!', '错误提示', {
						confirmButtonText: '确定'
					});
					return false
				}
				if(this.setform.SpeedMin == '') {
					this.$alert('请设置最小速度!', '错误提示', {
						confirmButtonText: '确定'
					});
					return false
				}
				if(this.setform.AxisMaxCnt == '') {
					this.$alert('请设置最大轴数!', '错误提示', {
						confirmButtonText: '确定'
					});
					return false
				}
				if(this.setform.WeightDiff == '') {
					this.$alert('请设置重量差值比!', '错误提示', {
						confirmButtonText: '确定'
					});
					return false
				}

				if(this.setform.UploadAddr == '') {
					this.$alert('请设置服务器IP!', '错误提示', {
						confirmButtonText: '确定'
					});
					return false
				}
				if(this.setform.UploadPort == '') {
					this.$alert('请设置端口号!', '错误提示', {
						confirmButtonText: '确定'
					});
					return false
				}
				//若都填了就向服务器传输设置的数据
				let data = JSON.parse(JSON.stringify(this.setform)),
					that = this;
				data.Type = 'set'
				console.log(JSON.stringify(data))
				this.$socket.emit('sparm', JSON.stringify(data));
				return true
			},
			//判断两个对象知否相等，下面5个方法共同作用达到比对的功能
			isObj(object) {
				return object && typeof(object) == 'object' && Object.prototype.toString.call(object).toLowerCase() == "[object object]";
			},
			isArray(object) {
				return object && typeof(object) == 'object' && object.constructor == Array;
			},
			getLength(object) {
				var count = 0;
				for(var i in object) count++;
				return count;
			},
			CompareObj(objA, objB, flag) {
				if(this.getLength(objA) != this.getLength(objB)) return false;
				for(var key in objA) {
					if(!flag) //flag为false，则跳出整个循环
						break;
					if(!objB.hasOwnProperty(key)) { //是否有自身属性，而不是继承的属性
						flag = false;
						break;
					}
					if(!this.isArray(objA[key])) { //子级不是数组时,比较属性值
						if(this.isObj(objA[key])) {
							if(this.isObj(objB[key])) {
								if(!flag) //这里跳出循环是为了不让递归继续
									break;
								flag = this.CompareObj(objA[key], objB[key], flag);
							} else {
								flag = false;
								break;
							}
						} else {
							if(String(objB[key]) != String(objA[key])) { //排除数字比较的类型差异
								flag = false;
								break;
							}
						}
					} else {
						if(!this.isArray(objB[key])) {
							flag = false;
							break;
						}
						var oA = objA[key],
							oB = objB[key];
						if(oA.length != oB.length) {
							flag = false;
							break;
						}
						for(var k in oA) {
							if(!flag) //这里跳出循环是为了不让递归继续
								break;
							flag = this.CompareObj(oA[k], oB[k], flag);
						}
					}
				}
				return flag;
			},
			CompareJsonObj(objA, objB) {
				if(!this.isObj(objA) || !this.isObj(objB)) return false; //判断类型是否正确
				if(this.getLength(objA) != this.getLength(objB)) return false; //判断长度是否一致
				return this.CompareObj(objA, objB, true); //默认为true
			},
			fixedto2(idx,isweigh,val){
				console.log(idx,isweigh,val)
				let weighingform=JSON.parse(JSON.stringify(this.weighingform))
				if(isweigh=='weigh'){
					weighingform[idx].WeightParam=Number(val).toFixed(2)
					this.weighingform=weighingform
				}else if(isweigh=='calc'){
					weighingform[idx].CalcParam=Number(val).toFixed(2)
					this.weighingform=weighingform
				}
				console.log(Number(val).toFixed(2))
			},
			//重量系数确认按钮
			sureweighbt(){
				let weighingform=JSON.parse(JSON.stringify(this.weighingform))
				for(let i = weighingform.length - 1; i >= 0; i--){
					if(weighingform[i].WeightParam==="" && weighingform[i].CalcParam===""){
						console.log(i)
						weighingform.splice(i,1)
					}else{
						weighingform[i].WeightParam=Number(weighingform[i].WeightParam) 
						weighingform[i].CalcParam=Number(weighingform[i].CalcParam)
					} 
				}
				let data = {
					Type: 'set',
					Data:weighingform
				}
				this.$socket.emit('cparm', JSON.stringify(data));
				return true
			}
		},
		sockets: {
			sparm(data) {
				console.log(JSON.parse(data))
				let dat = JSON.parse(data)
				this.setform = dat
				//本地存储最新的从服务器传过来的仪器设置数据（stringify形式）
				//和页面的setform对比提醒是否保存上传设置，和点击到其他页面时是否保存页面修改的setform
				localStorage.setItem('localsetform', data);
				if(dat.Type == 'success') {
					this.$message({
						type: 'success',
						message: '设置成功!'
					});
				}
			},
			roadset(data) {
				console.log('设置2')
				let dat = JSON.parse(data)
				console.log(dat)
				this.roadlist = dat.Data;
				if(dat.Type == 'success') {
					console.log('成功')
					this.$message({
						type: 'success',
						message: '操作成功!'
					});
					this.roadaddform={
						Id: '',
						SenseNum: [],
						Direct: '',
						RoadName: '',
						RoadCode: ''
					}
					this.isaddmodeshow = false;
					this.ischangemodeshow = false
				}
			},
			cparm(data) {
				let dat=JSON.parse(data).Data
				let weighingform=JSON.parse(JSON.stringify(this.weighingform))
				console.log('设置3') 
				console.log(dat)
				for(let i=0;i<dat.length;i++){
					let idx=dat[i].Id;
					dat[i].WeightParam=Number(dat[i].WeightParam).toFixed(2)
					dat[i].CalcParam=Number(dat[i].CalcParam).toFixed(2)
					weighingform[idx-1]=dat[i]
				}
				this.weighingform=weighingform
				localStorage.setItem('localweighform', JSON.stringify(this.weighingform));
				if(JSON.parse(data).Type == 'success') {
					console.log('成功')
					this.$message({
						type: 'success',
						message: '操作成功!'
					});
				}
			},
		},
		filters: {
			tofixed: function(value) {
				if(value) {
					return value.toFixed(2)
				} else {
					return
				}
			},
			direct: function(val) {
				return val == 0 ? '正向' : val == 1 ? '逆向' : val
			},
			arrtostring: function(val) {
				return val.join("，")
			}
		},
		watch: {
			//监听设置页面点击到不同的设置，提醒是否保存当前设置
			setactive(val, oldval) {
				console.log(val, oldval)
				if(val == 2) {
					let data = {
						type: 'get'
					}
					this.$socket.emit('roadset', JSON.stringify(data));
					console.log('发送了设置2')
				};
				if(val == 3) {
					let data = {
						type: 'get'
					}
					this.$socket.emit('cparm', JSON.stringify(data));
					console.log('发送了设置3')
				};
				
			},
			//监听父组件有没有从设置页面点击到其他页面，再比对设置数据有没有改变或者改了忘了上传，提醒保存设置
			click(val, oldval) {
				let that = this;
				//如果传过来的是1就是要从设置页面跳转到其他页面了
				if(val) {
					console.log('home传过来1',this.setactive)
					if(this.setactive == 1) {
						console.log('设置在仪器设置')
						let localsetform = localStorage.getItem('localsetform')
						if(this.CompareJsonObj(JSON.parse(localsetform), this.setform)) {
							this.$emit('isok', true);
						} else {
							this.$confirm('是否保存设置?', '提示', {
								confirmButtonText: '确定',
								cancelButtonText: '取消',
								type: 'warning'
							}).then(() => {
								if(that.sureset()) {
									that.$emit('isok', true);
								} else {
									that.$emit('isok', false);
								}
							}).catch(() => {
								that.$message({
									type: 'info',
									message: '已取消保存设置'
								});
								that.$emit('isok', true);
							});
						}
					} else if(this.setactive == 2) {
						that.$emit('isok', true);
					} else if(this.setactive == 3) {
						that.$emit('isok', true);
					}
				}
			}
		}
	}
</script>
<style scoped>
	.paramset {
		width: 100%;
		background: #2E405E;
		display: flex;
		justify-content: center;
		align-items: flex-start;
		box-sizing: border-box;
		border: 0.04rem solid #CED4DF;
		border-top: none;
		overflow: scroll;
		position: relative;
		padding-top: 0.58rem;
	}
	
	.cont {
		width: 100%;
		box-sizing: border-box;
		border-radius: 4px;
		color: #F8FFFF;
		position: relative;
	}
	
	.settop {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		border-bottom: 0.04rem solid #CED4DF;
		width: 100%;
		color: rgba(0, 0, 0, .65);
		position: fixed;
		top: 0;
		left: 2.5rem;
		background: #2E405E;
		z-index: 9;
	}
	
	.settop>div {
		background: #2E405E;
		color: #F8FFFF;
		font-size: 0.3rem;
		padding: 0 0.12rem;
		height: 0.54rem;
		line-height: 0.54rem;
	}
	
	.paramset .settopactive {
		color: #2E405E;
		background: #CED4DF;
		border-top-right-radius: 0.06rem;
	}
	
	.setcont {
		display: flex;
		justify-content: flex-start;
		align-content: flex-start;
		flex-wrap: wrap;
		border: 0.02rem solid #F8FFFF;
		width: 96%;
		margin: 0.41rem auto;
		position: relative;
		padding: 0.4rem 0;
	}
	
	#paramset .setcontport {
		width: 100%;
		box-sizing: border-box;
		display: flex;
		justify-content: flex-start;
		align-content: flex-start;
		flex-wrap: nowrap;
		margin-right: 0;
	}
	
	.portone {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		margin-right: 0.9rem;
		padding-left: 0.3rem;
	}
	
	.paramset .setcontport label {
		width: 1.8rem;
	}
	
	.paramset .portone div {
		font-size: 0.27rem;
		width: 1.65rem;
		box-sizing: border-box;
		text-align: right;
	}
	
	.setcont>div {
		margin-right: 0.9rem;
		padding: 0.2rem 0.1rem;
	}
	
	.paramset label {
		font-size: 0.27rem;
		width: 2.5rem;
		text-align: right;
		display: inline-block;
	}
	
	.settxt {
		position: absolute;
		top: -0.43rem;
		left: 0.1rem;
		font-size: 0.3rem;
		color: #F8FFFF;
		background: #2E405E;
	}
	
	select {
		width: 1.45rem;
		border-radius: 0.06rem;
		height: 0.4rem;
		outline: none;
		font-size: 0.18rem
	}
	
	option {
		font-size: 0.18rem
	}
	
	input {
		width: 1.45rem;
		border-radius: 0.06rem;
		height: 0.3rem;
		line-height: 0.3rem;
		outline: none;
		font-size: 0.20rem;
	}
	
	.surebut {
		margin: 0 auto 0.2rem;
		background: linear-gradient(top, #DDDDE4 0%, #1840A8 15%, #1840A8 85%, #DDDDE4 100%);
		/*padding: 0.2rem 0;*/
		border-radius: 10px;
		width: 1.5rem;
		font-size: 0.22rem;
		color: white;
		height: 0.65rem;
		line-height: 0.65rem;
		outline: none;
		border: none;
	}
	/*其他参数*/
	
	.otherparam {
		border: 0.02rem solid #F8FFFF;
		width: 96%;
		margin: 0.6rem auto 0.4rem;
		position: relative;
		border-radius: 0.06rem;
	}
	
	.title {
		display: flex;
		justify-content: center;
		align-items: center;
	}
	
	.title>div {
		flex: 1;
		font-size: 0.22rem;
		border-right: 1px solid #F8FFFF;
		border-bottom: 1px solid #F8FFFF;
	}
	
	.titletop>div {
		font-size: 0.28rem;
		padding: 0.1rem 0;
		background: #507FCB;
	}
	
	.titledown>div {
		background: #2E405E;
		color: #F8FFFF;
		height: 0.45rem;
		display: flex;
		align-items: center;
		justify-content: center;
		overflow: scroll;
	}
	
	.changebt>span {
		border: 1px solid #2E405E;
		border-radius: 0.04rem;
		background: #507FCB;
		color: #F8FFFF;
		font-size: 0.18rem;
		padding: 0.04rem 0.14rem;
		margin: 0 0.04rem;
	}
	
	.otherparamdown {
		height: 8rem;
		overflow: scroll;
	}
	
	#paramset .surebutother {
		margin: 0.15rem auto 0;
		padding: 0.05rem 0;
	}
	
	.changemode {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.5);
		z-index: 11;
	}
	
	.changecont {
		width: 40%;
		padding: 0.4rem 0.3rem 0.2rem;
		background: #2E405E;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translateX(-50%) translateY(-50%);
		border-radius: 0.1rem;
	}
	
	.changecont>div {
		border-radius: 0.1rem;
	}
	
	.caimg {
		width: 0.4rem;
		position: absolute;
		top: 0.1rem;
		right: 0.1rem;
	}
	/*重量系数*/
	
	.weightset {
		border: 0.02rem solid #F8FFFF;
		width: 96%;
		margin: 0.41rem auto;
		position: relative;
		padding: 0.4rem 0.1rem 0.3rem;
		box-sizing: border-box;
	}
	
	.weighttxt {
		position: absolute;
		top: -0.23rem;
		left: 0.14rem;
		font-size: 0.3rem;
		color: #F8FFFF;
		background: #2E405E;
		padding: 0 0.1rem;
	}
	
	.numlist {}
	
	.numlist>div {
		flex: 1;
		font-size: 0.16rem
	}
	
	.numlist>input {
		flex: 1;
		display: inline-block;
		width: 100%;
	}
	
	.weightcoefficient {
		width: 1.5rem;
		font-size: 0.26rem
	}
	
	.weightright {
		width: 100%;
	}
	
	.integral {
		margin-top: 0.1rem;
	}
	
	.weightset16 {
		margin-top: 0.2rem;
	}
	
	.surebutt {
		margin-top: 0.4rem;
		width: 1.2rem;
	}
	
	.setcontip {
		margin-top: 0.6rem;
		padding-bottom: 0.4rem;
	}
	
	.addimg {
		width: 0.2rem;
		margin-right: 0.06rem;
	}
	
	.addtxt {
		font-size: 0.2rem
	}
	
	.add {
		border: 1px solid #2E405E;
		border-radius: 0.04rem;
		background: #507FCB;
		color: #F8FFFF;
		font-size: 0.18rem;
		padding: 0.06rem 0.16rem;
		position: absolute;
		top: 0.1rem;
		right: 0.55rem;
	}
	
	.sensork {
		width: 1.45rem;
		border-radius: 0.06rem;
		height: 0.3rem;
		line-height: 0.3rem;
		outline: none;
		font-size: 0.20rem;
		background: #FFFFFF;
		border: 2px solid #C0C0C0;
		position: relative;
		color: #333333;
	}
	
	#paramset .sensorlb {
		color: #2E405E;
		font-size: 0.2rem;
		width: 50%;
		padding: 0 0.2rem;
		box-sizing: border-box;
	}
	
	.sensorchangeitem {
		background: #F8FFFF;
		border-bottom: 1px solid #C6D0D7;
	}
	
	.sensorpre {
		width: 100%;
		position: absolute;
		top: 0.31rem;
		left: 0;
		height: 2rem;
		overflow: scroll;
		background: #F8FFFF;
	}
	
	#paramset .checkboxs {
		width: 0.2rem;
		margin-left: 0.2rem;
	}
	.exid{height:2rem;overflow: scroll;}
</style>