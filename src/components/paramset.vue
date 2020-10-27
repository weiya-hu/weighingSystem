<template>
	<div class="paramset" id="paramset" style="height: 100%;">
		<div class="settop">
			<div :class="setactive==1?'settopactive':''" @click="changeset(1)" style="cursor: pointer;">其他参数</div>
			<!--现在把仪器设置暂时隐藏了-->
			<div :class="setactive==2?'settopactive':''" @click="changeset(2)" style="cursor: pointer;">数据修正</div>
			<div :class="setactive==3?'settopactive':''" @click="changeset(3)" style="cursor: pointer;">重量系数</div>
		</div>
		<!--其他参数-->
		<div class="cont" v-if='setactive==1'>
			<div class="add flexr" @click="addSensor">
				<div class="fleximg addimg">
					<img src="../assets/add.png" />
				</div>
				<div class="addtxt">新增传感器</div>
			</div>
			<el-table
	      :key="tableKey"
	      v-loading="listLoading"
	      :data="ruleForm.Sensor"
	      border
	      fit
	      height='300px'
	      highlight-current-row
	      style="width: 96%;margin: 0.56rem auto 0;"
	    >	
	      <!--<el-table-column label="ID" prop="eid" sortable="custom" align="center" width="80" :class-name="getSortClass('id')">
	        <template slot-scope="{row}">
	          <span>{{ row.eid}}</span>
	        </template>
	      </el-table-column>-->
	      <el-table-column label="传感器ID" min-width="100px" align="center" fixed="left">
	        <template slot-scope="{row}">
	          <span>{{ row.SensorID}}</span>
	        </template>
	      </el-table-column>
	      <el-table-column label="是否启用" min-width="100px" align="center">
	        <template slot-scope="{row}">
	          <el-tag v-if='row.Enable' type="primary">启用</el-tag>
	          <el-tag v-else='row.Enable' type="warning">不启用</el-tag>
	        </template>
	      </el-table-column>
	      <el-table-column label="向右顺向" min-width="100px" align="center">
	        <template slot-scope="{row}">
	          <span :style="row.ToRight?'':'color:#F56C6C'">{{ row.ToRight | boolean}}</span>
	        </template>
	      </el-table-column>
	      <el-table-column label="向右排数" min-width="100px" align="center">
	        <template slot-scope="{row}">
	          <span>{{ row.ToRightRow }}</span>
	        </template>
	      </el-table-column>
	      <el-table-column label="车道号" min-width="100px" align="center">
	        <template slot-scope="{row}">
	          <span>{{ row.RoadNum }}</span>
	        </template>
	      </el-table-column>
	      <el-table-column label="采样率" min-width="100px" align="center">
	        <template slot-scope="{row}">
	          <span>{{ row.Freq }}</span>
	        </template>
	      </el-table-column>
	      <el-table-column label="积分比率" min-width="100px" align="center">
	        <template slot-scope="{row}">
	          <span>{{ row.JFRatio}}</span>
	        </template>
	      </el-table-column>
	      <el-table-column label="平顶比率" min-width="100px" align="center">
	        <template slot-scope="{row}">
	          <span>{{ row.PDRatio }}</span>
	        </template>
	      </el-table-column>
	      <el-table-column label="触发入" min-width="80px" align="center">
	        <template slot-scope="{row}">
	          <span class="link-type">{{ row.TrigIn }}</span>
	        </template>
	      </el-table-column>
	      <el-table-column label="触发出" min-width="110px" align="center">
	        <template slot-scope="{row}">
	          <span class="link-type">{{ row.TrigOut }}</span>
	        </template>
	      </el-table-column>
	      <el-table-column label="目标DA值" min-width="110px" align="center">
	        <template slot-scope="{row}">
	        	<span class="link-type">{{ row.DATarget }}</span>
	        </template>
	      </el-table-column>
	      <el-table-column label="DAC使能" min-width="110px" align="center">
	        <template slot-scope="{row}">
	          <span :style="row.DACEnable?'':'color:#F56C6C'">{{ row.DACEnable | boolean}}</span>
	        </template>
	      </el-table-column>
	      <el-table-column label="操作" align="center" min-width="147" class-name="small-padding fixed-width" fixed="right">
	        <template slot-scope="{row,$index}">
	          <el-button type="primary" size="mini" @click="handleUpdate(row,$index)">
	            	修改
	          </el-button>
	          <el-button v-if="row.status!='deleted'" size="mini" type="danger" @click="handleDelete(row,$index)">
	            	删除
	          </el-button>
	        </template>
	      </el-table-column>
	    </el-table>
			
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="125px" class="demo-ruleForm" 
				style='background: #2E405E;width:96%;margin: 20px auto;box-sizing:border-box; padding: 20px 20px 10px 0;display: flex;justify-content: space-around;align-content: center;flex-wrap: wrap;'>
				<div style="width: 40%;padding: 2%;border: 1px solid #EEEEEE;border-radius: 10px;margin: 2%;position: relative;">
					<div style="position: absolute;top: -20px;left: 10px;color: #FFFFFF;background: #2E405E;padding: 10px;font-size: 14px;">
						录制波形
					</div>
				  <el-form-item label="录制使能" prop="RecEnable" style='text-align: left;color: #FFFFFF' required>
				    <el-select v-model="ruleForm.RecEnable">
				      <el-option label="是" :value="btrue"></el-option>
				      <el-option label="否" :value="bfalse"></el-option>
				    </el-select>
				  </el-form-item>
				  <el-form-item label="录制服务器" prop="RecAddress" required>
				    <el-input v-model="ruleForm.RecAddress"></el-input>
				  </el-form-item>
				  <el-form-item label="登录密码" prop="RecPassword" required>
				    <el-input v-model="ruleForm.RecPassword"></el-input>
				  </el-form-item>
				  <el-form-item label="录制数据库" prop="RecDB" required>
				    <el-input v-model="ruleForm.RecDB" type='number'></el-input>
				  </el-form-item>
				</div>
				<div style="width: 40%;padding: 2%;border: 1px solid #EEEEEE;border-radius: 10px;margin: 2%;position: relative;">
					<div style="position: absolute;top: -20px;left: 10px;color: #FFFFFF;background: #2E405E;padding: 10px;font-size: 14px;">
						MQTT
					</div>
				  <el-form-item label="MQTT地址" prop="MqttAddr" required>
				    <el-input v-model="ruleForm.MqttAddr"></el-input>
				  </el-form-item>
				  <el-form-item label="MQTT主题" prop="MqttTopic" required>
				    <el-input v-model="ruleForm.MqttTopic"></el-input>
				  </el-form-item>
				  <el-form-item label="MQTT用户名" prop="MqttUser" required>
				    <el-input v-model="ruleForm.MqttUser"></el-input>
				  </el-form-item>
				  <el-form-item label="MQTT密码" prop="MqttPass" required>
				    <el-input v-model="ruleForm.MqttPass"></el-input>
				  </el-form-item>
				</div>
				<div style="width: 40%;padding: 2%;border: 1px solid #EEEEEE;border-radius: 10px;margin: 2%;position: relative;">
					<div style="position: absolute;top: -20px;left: 10px;color: #FFFFFF;background: #2E405E;padding: 10px;font-size: 14px;">
						采集器
					</div>
				  <el-form-item label="采集器IP" prop="AdcBoardIP" required>
				    <el-input v-model="ruleForm.AdcBoardIP"></el-input>
				  </el-form-item>
				  <el-form-item label="采集器端口" prop="AdcBoardPort" required>
				    <el-input v-model="ruleForm.AdcBoardPort" type='number'></el-input>
				  </el-form-item>
				  <el-form-item label="数据接收端口" prop="AdcRecPort" required>
				    <el-input v-model="ruleForm.AdcRecPort" type='number'></el-input>
				  </el-form-item>
				</div>
				<div style="width: 40%;padding: 2%;border: 1px solid #EEEEEE;border-radius: 10px;margin: 2%;position: relative;">
					<div style="position: absolute;top: -20px;left: 10px;color: #FFFFFF;background: #2E405E;padding: 10px;font-size: 14px;">
						发送波形
					</div>
				  <el-form-item label="实时波形发送使能" prop="SendWaveEnable" style='text-align: left;' required>
				    <el-select v-model="ruleForm.SendWaveEnable">
				      <el-option label="是" :value="btrue"></el-option>
				      <el-option label="否" :value="bfalse"></el-option>
				    </el-select>
				  </el-form-item>
				  <el-form-item label="发送目标IP" prop="SendWaveIP" required>
				    <el-input v-model="ruleForm.SendWaveIP"></el-input>
				  </el-form-item>
				  <el-form-item label="发送端口" prop="SendWavePort" required>
				    <el-input v-model="ruleForm.SendWavePort" type='number'></el-input>
				  </el-form-item>
				</div>
				<div style="width: 90%; padding: 2%;border: 1px solid #EEEEEE;border-radius: 10px;margin: 2%;position: relative;">
					<div style="position: absolute;top: -20px;left: 10px;color: #FFFFFF;background: #2E405E;padding: 10px;font-size: 14px;">
						其他
					</div>
					<div style="display: flex;justify-content: space-around;align-items: center;">
						<el-form-item label="设备序列号" prop="DevSN" required>
					    <el-input v-model="ruleForm.DevSN" ></el-input>
					  </el-form-item>
					  <el-form-item label="传感器排数" prop="SensorRow" required>
					    <el-input v-model="ruleForm.SensorRow" type='number'></el-input>
					  </el-form-item>
					</div>
					<div style="display: flex;justify-content: space-around;align-items: center;">
						<el-form-item label="安装间距" prop="PlaceDistance" required>
					    <el-input v-model="ruleForm.PlaceDistance" type='number'></el-input>
					  </el-form-item>
					  <el-form-item label="敏感宽度" prop="SenstiveWidth" required>
					    <el-input v-model="ruleForm.SenstiveWidth" type='number'></el-input>
					  </el-form-item>
					</div>
					<div style="display: flex;justify-content: space-around;align-items: center;">
						<el-form-item label="速度变动比" prop="SpeedRation" required>
					    <el-input v-model="ruleForm.SpeedRation" type='number'></el-input>
					  </el-form-item>
					  <el-form-item label="最大轴数" prop="MaxAxisCount" required>
					    <el-input v-model="ruleForm.MaxAxisCount" type='number'></el-input>
					  </el-form-item>
					</div>
					<div style="display: flex;justify-content: space-around;align-items: center;">
						<el-form-item label="连轴增加值" prop="LianZhouAdd" required>
					    <el-input v-model="ruleForm.LianZhouAdd" type='number'></el-input>
					  </el-form-item>
					  <el-form-item label="结束判断距离" prop="EndDistance" required>
					    <el-input v-model="ruleForm.EndDistance" type='number'></el-input>
					  </el-form-item>
					</div>
					<div style="display: flex;justify-content: space-around;align-items: center;">
						<el-form-item label="最小速度" prop="MinSpeed" required>
					    <el-input v-model="ruleForm.MinSpeed" type='number'></el-input>
					  </el-form-item>
					  <el-form-item label="最大速度" prop="MaxSpeed" required>
					    <el-input v-model="ruleForm.MaxSpeed" type='number'></el-input>
					  </el-form-item>
					</div>
					<div style="display: flex;justify-content: space-around;align-items: center;">
						<el-form-item label="最小轴距" prop="MinAxisDistance" required>
					    <el-input v-model="ruleForm.MinAxisDistance" type='number'></el-input>
					  </el-form-item>
					  <el-form-item label="最大轴距" prop="MaxAxisDistance" required>
					    <el-input v-model="ruleForm.MaxAxisDistance" type='number'></el-input>
					  </el-form-item>
					</div>
					<div style="display: flex;justify-content: space-around;align-items: center;">
						<el-form-item label="重量差值比" prop="WeightRation" required>
					    <el-input v-model="ruleForm.WeightRation" type='number'></el-input>
					 </el-form-item>
					  <el-form-item label="解算方法" prop="SloveWay" required>
					    <!--<el-input v-model.number.trim="ruleForm.SloveWay" type='number'></el-input>-->
					    <el-select v-model="ruleForm.SloveWay">
					      <el-option label="平顶" :value='num0'></el-option>
					      <el-option label="积分" :value='num1'></el-option>
					    </el-select>
					  </el-form-item>
					</div>
					<div style="display: flex;justify-content: space-around;align-items: center;">
						<el-form-item label="波形宽度" prop="WavWidth" required>
					    <el-input v-model="ruleForm.WavWidth" type='number'></el-input>
					  </el-form-item>
					  <el-form-item label="触发点数" prop="TrigCnt" required>
					    <el-input v-model="ruleForm.TrigCnt" type='number'></el-input>
					  </el-form-item>
					</div>
					<div style="display: flex;justify-content: space-around;align-items: center;">
						<el-form-item label="包络总点数" prop="BaloAllCnt" required>
					    <el-input v-model="ruleForm.BaloAllCnt" type='number'></el-input>
					  </el-form-item>
					  <el-form-item label="包络检测点" prop="BaloCheckPoint" required>
					    <el-input v-model="ruleForm.BaloCheckPoint" type='number'></el-input>
					  </el-form-item>
					</div>
					<div style="display: flex;justify-content: space-around;align-items: center;">
						<el-form-item label="包络步进" prop="BaloStep" required>
					    <el-input v-model="ruleForm.BaloStep" type='number'></el-input>
					  </el-form-item>
					</div>
				</div>
			  
			  <el-form-item>
			    <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
			  </el-form-item>
			</el-form>
		
			<el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
	      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="80px" style="width: 400px; margin-left:50px;">
	        <el-form-item label="传感器ID" prop="SensorID" required>
				    <el-input v-model="temp.SensorID" disabled></el-input>
				  </el-form-item>
				  <el-form-item label="是否启用" prop='Enable' required>
	          <el-select v-model.boolean="temp.Enable" class="filter-item" placeholder="请选择">
	            <el-option label="是" :value="btrue"></el-option>
				      <el-option label="否" :value="bfalse"></el-option>
	          </el-select>
	        </el-form-item>
	        <el-form-item label="向右顺向" prop='ToRight' required>
	          <el-select v-model.boolean="temp.ToRight" class="filter-item" placeholder="请选择">
	            <el-option label="是" :value="btrue"></el-option>
				      <el-option label="否" :value="bfalse"></el-option>
	          </el-select>
	        </el-form-item>
	        <el-form-item label="向右排数" prop="ToRightRow" required>
				    <el-input v-model="temp.ToRightRow" type='number'></el-input>
				  </el-form-item>
				  <el-form-item label="车道号" prop="RoadNum" required>
				    <el-input v-model="temp.RoadNum" type='number'></el-input>
				  </el-form-item>
				  <el-form-item label="采样率" prop="Freq" required>
				    <el-input v-model="temp.Freq" type='number'></el-input>
				  </el-form-item>
				  <el-form-item label="积分比率" prop="JFRatio" required>
				    <el-input v-model="temp.JFRatio" type='number'></el-input>
				  </el-form-item>
				  <el-form-item label="平顶比率" prop="PDRatio" required>
				    <el-input v-model="temp.PDRatio" type='number'></el-input>
				  </el-form-item>
				  <el-form-item label="触发入" prop="TrigIn" required>
				    <el-input v-model="temp.TrigIn" type='number'></el-input>
				  </el-form-item>
				  <el-form-item label="触发出" prop="TrigOut" required>
				    <el-input v-model="temp.TrigOut" type='number'></el-input>
				  </el-form-item>
				  <el-form-item label="目标DA值" prop="DATarget" required>
				    <el-input v-model="temp.DATarget" type='number'></el-input>
				  </el-form-item>
				  <el-form-item label="DAC使能" prop='DACEnable' required>
	          <el-select v-model="temp.DACEnable" class="filter-item" placeholder="请选择">
	            <el-option label="是" :value="btrue"></el-option>
				      <el-option label="否" :value="bfalse"></el-option>
	          </el-select>
	        </el-form-item>
	      </el-form>
	      <div slot="footer" class="dialog-footer">
	        <el-button @click="dialogFormVisible = false">
	          	取消
	        </el-button>
	        <el-button type="primary" @click="dialogStatus==='add'?createData():updateData()">
	                         确定
	        </el-button>
	      </div>
	    </el-dialog>
		</div>
		<div class="cont" v-show='2'>
			<div class="flexl" style="background: #FFFFFF;margin: 4% 0 0 0;">
				<div class="flexl" style="text-align: left;background: #FFFFFF;color: #333333;font-size: 0.16rem;padding: 0.3rem 0.6rem;box-sizing: border-box;">
					<div>修正：</div>
					<el-radio-group v-model="rownum" class='flexl'  size="small">
		      	<el-radio-button :label="num0" >1通道</el-radio-button>
			      <el-radio-button :label="num1" >2通道</el-radio-button>
			    </el-radio-group>
				</div>
				<el-button type="primary" size="small" @click='senddata'>发送修正后数据</el-button>
			</div>
			
				<div style="text-align: left;background: #FFFFFF;color: #333333;font-size: 0.16rem;padding: 0.1rem 0.6rem;box-sizing: border-box;">速度修正曲线</div>
			<div id="mychart" style="height: 80%;background: #FFFFFF;"></div>
		
			
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
							<input v-for="(item,index) in weighingform.slice(0,16)" type="number" @change="fixedto2(index,'weigh',item.WeightParam)" v-model="item.WeightParam"/>
						</div>
					</div>
				</div>
				<div class="flexl integral ">
					<div class="weightcoefficient">积分系数</div>
					<div class="weightright">
						<div class="numlist flexl">
							<input v-for="(item,index) in weighingform.slice(0,16)" type="number" @change="fixedto2(index,'calc',item.CalcParam)" v-model="item.CalcParam"/>
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
							<input v-for="(item,index) in weighingform.slice(16,32)" type="number" @change="fixedto2(index+16,'weigh',item.WeightParam)" v-model="item.WeightParam"/>
						</div>
					</div>
				</div>
				<div class="flexl integral ">
					<div class="weightcoefficient">积分系数</div>
					<div class="weightright">
						<div class="numlist flexl">
							<!-- <input v-for="item in 16" type="text" /> -->
							<input v-for="(item,index) in weighingform.slice(16,32)" type="number" @change="fixedto2(index+16,'calc',item.CalcParam)" v-model="item.CalcParam"/>
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
			var validateTrigIn = (rule, value, callback) => {
        if (this.temp.TrigOut && (value-this.temp.TrigOut<20 || value<this.temp.TrigOut)){
          callback(new Error('触发入必须比触发出至少大20'));
        } else{
        	 callback();
        }
      };
      var validateTrigOut = (rule, value, callback) => {
        if (this.temp.TrigIn && (this.temp.TrigIn-value<20 || value>this.temp.TrigIn)){
          callback(new Error('触发出必须比触发入至少小20'));
        } else{
        	 callback();
        }
      };
			return {
				rownum:0,
				option:null,//chart的option
				mychart:null,//chart
				down:false,//在chart里面鼠标是否按下的标识
				tableKey: 0,//element表格里面的参数
	      list: null,
	      num0:0,
	      num1:1,
	      listLoading: false,
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
				
				temp: {
	        DACEnable: true,
					DATarget: 5000,
					Enable: true,
					Freq: 10000,
					RoadNum: 1,
					SensorID: 1,
					ToRight: true,
					ToRightRow: 1,
					TrigIn: 400,
					TrigOut: 380,
					PDRatio:1,
					JFRatio:1,
	      },
	      addtemp: {
	        DACEnable: true,
					DATarget: 5000,
					Enable: null,
					Freq: 10000,
					RoadNum: null,
					SensorID: null,
					ToRight: null,
					ToRightRow: null,
					TrigIn: 400,
					TrigOut: 380,
					PDRatio:1,
					JFRatio:1,
	      },
	      dialogFormVisible: false,
	      dialogStatus: '',
	      textMap: {
	        update: '修改',
	        add: '新增'
	      },
      	editindex:-1,//修改表格的下标
      	btrue:true,//真
      	bfalse:false,//假
      	num0:0,//数字0
      	num1:1,//数字1
      	
				sensorpreshow: false, //修改通道传感器的多选框是否显示
				addsensorpreshow: false, //增加通道传感器的多选框是否显示
				ischangemodeshow: false, //车道号修改页面的mode是否显示
				isaddmodeshow: false,//车道号增加页面的mode是否显示
				weighingform:[],//重量系数数据数组
				fenduvalue:'',//分度值
				ruleForm: {
          AdcBoardIP: "",
					AdcBoardPort: null,
					AdcRecPort: null,
					DevSN: "",
					EndDistance: null,
					LianZhouAdd: null,
					MaxAxisCount: null,
					MaxAxisDistance: null,
					MaxSpeed: null,
					MinAxisDistance: null,
					MinSpeed: null,
					MqttAddr: "",
					MqttPass: "",
					MqttTopic: "",
					MqttUser: "",
					PlaceDistance: null,
					RecAddress: "",
					RecDB: null,
					RecEnable: null,
					RecPassword: "",
					SendWaveEnable: null,
					SendWaveIP: "",
					SendWavePort: null,
					Sensor: [],
					SensorRow: null,
					SenstiveWidth: null,
					SpeedRation: null,
					WeightRation: null,
					WavWidth:null,
					TrigCnt:null,
					BaloAllCnt:4000,
					BaloCheckPoint:3000,
					BaloStep:5,
					SloveWay:0
        },
        rules: {
          name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          region: [
            { required: true, message: '请选择活动区域', trigger: 'change' }
          ],
          TrigIn:[
           { validator: validateTrigIn, trigger: 'change' },
          ],
          TrigOut:[
           { validator: validateTrigOut, trigger: 'change' },
          ]
          
        }
			}
		},
		
		created() {
			let data = {
				type: 'get'
			}
			this.$socket.emit('getcfg', JSON.stringify(data));
			this.$socket.emit('sparm', JSON.stringify(data));
			let arr=[]
			for(let i=1;i<33;i++){
				let itm={Id: i,WeightParam: '',CalcParam: ''};
				arr.push(itm)
			}
			this.weighingform=arr
		},
		mounted() {
			//对于请求过来的表格数据根据SensorID先排序然后再显示到页面上
			let that=this;
			this.ruleForm.Sensor.sort(this.compare('SensorID'))
//			this.chartinit()
//			this.$nextTick(() => {
//		        this.chartinit()
//		      })
			window.onresize = function(){ // 定义窗口大小变更通知事件
				that.mychart.resize()
    		setTimeout(function(){
    			that.mychart.resize()
    		},5000)
      };
		},
		methods: {
			senddata(){
				console.log(this.option.series)
			},
			//chart初始化
			chartinit(){
				console.log(80983490)
				this.mychart = this.$echarts.init(document.getElementById('mychart'))
				this.setoption()
			},
			setoption(){
				let that=this;
				this.option={
            tooltip: {
                trigger: 'axis',
                borderColor: 'red', //鼠标移动到图上面时，背景色
                padding: 0, //定义内边距
                formatter: function (params) { //params存的是对应的y轴数据
                    if (that.down) {
                        var bl = (h - 40 - 80) / (that.max-that.min); //比例尺
                        var v=((h - 60 - y) / bl).toFixed(0)*1; //实际高度
                        that.option.series[that.rownum].data[params[0].dataIndex] = v+that.min;
                        that.mychart.setOption(that.option);
                    }
                    var showHtm="";
                    showHtm=params[that.rownum].axisValue+'<br>';
                    for(var i=0;i<params.length;i++){
                        var name = params[i].seriesName;//名称
                        var value = params[i].value;//值
                        showHtm+=params[i].marker + " " +name+ ' ：'+value+ " " +'<br>'
                    }
                    return showHtm;
                }
            },
             dataZoom: [{
		            show: true
		        }, {
		            type: 'inside'
		        }],
            legend: {
		          data: ['1通道', '2通道']
		        },
            xAxis: {
                type: 'category',
                data: ['1', '2', '3', '4', '5', '6', '7', '1', '2', '3', '4', '5', '6', '7']
            },
            yAxis: {
                type: 'value',
                max: function(value) {
                    let max=Math.round((value.max+100)/10)*10 ;
                    that.max=max;
                    return max;
                },
                min: function(value) {
                    let min=Math.floor((value.min-100)/10)*10 ;
                    that.min=min;
                    return min;
                }
            },
            series: [{
                name:'1通道',
                data: [1, 2, 3, 9, 1, 14, 6, 2, 5, 1, 3, 4, 5, 17],
                type: 'line',
                smooth: true
            }, {
                name:'2通道',
                data: [2, 5, 1, 3, 4, 5, -7, 2, 3, 9, 1, 4, 6, 2],
                type: 'line',
                smooth: true
            }]
        };
        this.mychart.setOption(this.option);
        var canva = document.getElementsByTagName('canvas')[0];
        var canvas = $('canvas');
        var x, y;
        var h = canvas.height();
        this.down = false;
        
        canvas.on('mousemove', function (e) {
            var location = that.getLocation(canva,e.clientX, e.clientY);//忽略canvas临近标签的干扰
            // y = e.clientY;
            y = location.y;
//          console.log( that.option)
        })

        canvas.on('mousedown', function (e) {
            that.down = true;
        })
        canvas.on('mouseup', function (e) {
            that.down = false;
        })
			},
			getLocation(canva,x, y) {
        var bbox = canva.getBoundingClientRect();
        return {
            x: (x - bbox.left) * (canva.width / bbox.width),
            y: (y - bbox.top) * (canva.height / bbox.height)
        };
     	},
			//添加传感器
			addSensor(){
				this.temp = JSON.parse(JSON.stringify(this.addtemp)) 
				this.temp.SensorID=this.ruleForm.Sensor.length>0?this.ruleForm.Sensor[this.ruleForm.Sensor.length-1].SensorID+1:1
				this.dialogStatus = 'add'
				this.dialogFormVisible = true
	      this.$nextTick(() => {
	        this.$refs['dataForm'].clearValidate()
	      })
			},
			//其他参数 表格删除按钮
			handleDelete(row, index) {
	      this.$notify({
	        title: 'Success',
	        message: '删除成功',
	        type: 'success',
	        duration: 2000
	      })
	      this.ruleForm.Sensor.splice(index, 1)
	    },
			//其他参数 表格修改按钮
			handleUpdate(row,index) {
	      this.temp = Object.assign({}, row) // copy obj
	      this.editindex=index
	      this.dialogStatus = 'update'
	      this.dialogFormVisible = true
	      this.$nextTick(() => {
	        this.$refs['dataForm'].clearValidate()
	      })
	    },
			//其他参数 提交按钮
	    submitForm(formName) {
	     	let that=this
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let formdata={
		          AdcBoardIP: that.ruleForm.AdcBoardIP,
							AdcBoardPort:parseFloat(that.ruleForm.AdcBoardPort),
							AdcRecPort: parseFloat(that.ruleForm.AdcRecPort),
							DevSN: that.ruleForm.DevSN,
							EndDistance: parseFloat(that.ruleForm.EndDistance),
							LianZhouAdd: parseFloat(that.ruleForm.LianZhouAdd),
							MaxAxisCount: parseFloat(that.ruleForm.MaxAxisCount),
							MaxAxisDistance: parseFloat(that.ruleForm.MaxAxisDistance),
							MaxSpeed: parseFloat(that.ruleForm.MaxSpeed),
							MinAxisDistance: parseFloat(that.ruleForm.MinAxisDistance),
							MinSpeed: parseFloat(that.ruleForm.MinSpeed),
							MqttAddr: that.ruleForm.MqttAddr,
							MqttPass: that.ruleForm.MqttPass,
							MqttTopic: that.ruleForm.MqttTopic,
							MqttUser: that.ruleForm.MqttUser,
							PlaceDistance: parseFloat(that.ruleForm.PlaceDistance),
							RecAddress: that.ruleForm.RecAddress,
							RecDB: parseFloat(that.ruleForm.RecDB),
							RecEnable: that.ruleForm.RecEnable,
							RecPassword: that.ruleForm.RecPassword,
							SendWaveEnable: that.ruleForm.SendWaveEnable,
							SendWaveIP: that.ruleForm.SendWaveIP,
							SendWavePort: parseFloat(that.ruleForm.SendWavePort),
							Sensor: that.ruleForm.Sensor,
							SensorRow: parseFloat(that.ruleForm.SensorRow),
							SenstiveWidth: parseFloat(that.ruleForm.SenstiveWidth),
							SpeedRation: parseFloat(that.ruleForm.SpeedRation),
							SloveWay:that.ruleForm.SloveWay,
							WeightRation: parseFloat(that.ruleForm.WeightRation),
							WavWidth:parseFloat(that.ruleForm.WavWidth),
							TrigCnt:parseFloat(that.ruleForm.TrigCnt),
							BaloAllCnt:parseFloat(that.ruleForm.BaloAllCnt),
							BaloCheckPoint:parseFloat(that.ruleForm.BaloCheckPoint),
							BaloStep:parseFloat(that.ruleForm.BaloStep)
		        };
            this.$socket.emit('setcfg', JSON.stringify(formdata));
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      
      //修改页面的确定按钮
      updateData() {
	      this.$refs['dataForm'].validate((valid) => {
	        if (valid) {
	          const tempData ={
			        DACEnable: this.temp.DACEnable,
							DATarget:parseFloat(this.temp.DATarget),
							Enable: this.temp.Enable,
							Freq: parseFloat(this.temp.Freq),
							RoadNum: parseFloat(this.temp.RoadNum),
							SensorID: parseFloat(this.temp.SensorID),
							ToRight: this.temp.ToRight,
							ToRightRow: parseFloat(this.temp.ToRightRow),
							TrigIn: parseFloat(this.temp.TrigIn),
							TrigOut: parseFloat(this.temp.TrigOut),
							PDRatio:parseFloat(this.temp.PDRatio),
							JFRatio:parseFloat(this.temp.JFRatio)
			      };
	          this.ruleForm.Sensor.splice(this.editindex, 1,tempData)
	          this.dialogFormVisible = false
	          this.$notify({
              title: 'Success',
              message: '修改成功',
              type: 'success',
              duration: 2000
           })
	        }
	      })
	    },
	    
	    //新增页面的确定按钮
	    createData(){
	    	let hh=this.$refs['dataForm'].validate()
	    	this.$refs['dataForm'].validate((valid) => {
	        if (valid) {
	          const tempData ={
			        DACEnable: this.temp.DACEnable,
							DATarget:parseFloat(this.temp.DATarget),
							Enable: this.temp.Enable,
							Freq: parseFloat(this.temp.Freq),
							RoadNum: parseFloat(this.temp.RoadNum),
							SensorID: parseFloat(this.temp.SensorID),
							ToRight: this.temp.ToRight,
							ToRightRow: parseFloat(this.temp.ToRightRow),
							TrigIn: parseFloat(this.temp.TrigIn),
							TrigOut: parseFloat(this.temp.TrigOut),
							PDRatio:parseFloat(this.temp.PDRatio),
							JFRatio:parseFloat(this.temp.JFRatio)
			      };
	          this.ruleForm.Sensor.push(tempData)
	          this.dialogFormVisible = false
	          this.$notify({
              title: 'Success',
              message: '新增成功',
              type: 'success',
              duration: 2000
           })
	        }
	      })
	    },
//    resetForm(formName) {
//      this.$refs[formName].resetFields();
//    },

			//sort方法根据数组中对象的某一个属性值进行排序，
			compare(property){
			    return function(a,b){
			        var value1 = a[property];
			        var value2 = b[property];
			        return value1 - value2;
			    }
			},
			//阻止冒泡
			stopmp() {
			},
			//设置分度值
			fendusure(){
				let data={
		       Type:'set',
		       Fendu:Number(this.fenduvalue) 
				}
				this.$socket.emit('fendu', JSON.stringify(data));
			},
			sensorpreshows() {
				this.sensorpreshow = !this.sensorpreshow
			},
			addsensorpreshows(){
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
				let SenseNum = JSON.parse(JSON.stringify(this.roadaddform.SenseNum))
				SenseNum.sort(function(a, b) {
					return(a - b)
				})
				this.roadaddform.SenseNum = SenseNum

			},
			//点击切换3个不同的设置
			changeset(id) {
				let cnum=this.setactive,that=this;
				that.setactive = id
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
				this.ischangemodeshow = !this.ischangemodeshow
				if(!isNaN(idx)) {
					this.roadexchangeform = JSON.parse(JSON.stringify(this.roadlist[idx]))
				}
			},
			//是否显示增加通道信息模态框
			addmodeshow() {
				this.isaddmodeshow = !this.isaddmodeshow
			},
			//确认修改
			surexchange() {
				let id = this.roadexchangeform.Id;
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
				let weighingform=JSON.parse(JSON.stringify(this.weighingform))
				if(isweigh=='weigh'){
					weighingform[idx].WeightParam=Number(val).toFixed(2)
					this.weighingform=weighingform
				}else if(isweigh=='calc'){
					weighingform[idx].CalcParam=Number(val).toFixed(2)
					this.weighingform=weighingform
				}
			},
			//重量系数确认按钮
			sureweighbt(){
				let weighingform=JSON.parse(JSON.stringify(this.weighingform))
				for(let i = weighingform.length - 1; i >= 0; i--){
					if(weighingform[i].WeightParam==="" && weighingform[i].CalcParam===""){
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
			getcfg(data){
				let dat = JSON.parse(data),that=this;
				this.ruleForm=dat
				this.ruleForm.Sensor.sort(this.compare('SensorID'))
			},
			setcfg(data){
				if(data=='{status:success}'){
					this.$notify({
		        title: 'Success',
		        message: '设置成功',
		        type: 'success',
		        duration: 2000
		      })
				}
			},
//			fendu(data){
//				let dat = JSON.parse(data)
//				if(dat.Type=='get'){
//					this.fenduvalue=dat.Fendu
//				}
//				if(dat.Type=='set' && dat.Status=='success'){
//					this.$message({
//						type: 'success',
//						message: '设置分度值成功!'
//					});
//				}
//			},
//			sparm(data) {
//				let dat = JSON.parse(data)
//				this.setform = dat
//				//本地存储最新的从服务器传过来的仪器设置数据（stringify形式）
//				//和页面的setform对比提醒是否保存上传设置，和点击到其他页面时是否保存页面修改的setform
//				localStorage.setItem('localsetform', data);
//				if(dat.Type == 'success') {
//					this.$message({
//						type: 'success',
//						message: '设置成功!'
//					});
//				}
//			},
//			roadset(data) {
//				let dat = JSON.parse(data)
//				this.roadlist = dat.Data;
//				if(dat.Type == 'success') {
//					this.$message({
//						type: 'success',
//						message: '操作成功!'
//					});
//					this.roadaddform={
//						Id: '',
//						SenseNum: [],
//						Direct: '',
//						RoadName: '',
//						RoadCode: ''
//					}
//					this.isaddmodeshow = false;
//					this.ischangemodeshow = false
//				}
//			},
//			cparm(data) {
//				let dat=JSON.parse(data).Data
//				let weighingform=JSON.parse(JSON.stringify(this.weighingform))
//				for(let i=0;i<dat.length;i++){
//					let idx=dat[i].Id;
//					dat[i].WeightParam=Number(dat[i].WeightParam).toFixed(2)
//					dat[i].CalcParam=Number(dat[i].CalcParam).toFixed(2)
//					weighingform[idx-1]=dat[i]
//				}
//				this.weighingform=weighingform
//				localStorage.setItem('localweighform', JSON.stringify(this.weighingform));
//				if(JSON.parse(data).Type == 'success') {
//					this.$message({
//						type: 'success',
//						message: '操作成功!'
//					});
//				}
//			},
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
			},
			boolean(val){
				return val?'是':'否'
			}
		},
		watch: {
			//监听设置页面点击到不同的设置，提醒是否保存当前设置
			setactive(val, oldval) {
				console.log(val, oldval)
				if(val === 2) {
					console.log(this.rownum)
					this.$nextTick(() => {
		        this.chartinit()
		      })
					
				};
				
			},
		}
	}

</script>
<style>
	#paramset .el-form-item__label {
    text-align: right;
    vertical-align: middle;
    float: left;
    font-size: 14px;
    color: #FFFFFF;
    line-height: 40px;
    padding: 0 12px 0 0;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
	}
	#paramset .el-dialog{
		    position: relative;
    margin: 0 auto 50px;
    border-radius: 2px;
    -webkit-box-shadow: 0 1px 3px rgba(0,0,0,.3);
    box-shadow: 0 1px 3px rgba(0,0,0,.3);
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 50%;
    background: #2E405E;
	}
	#paramset .el-dialog__title {
    line-height: 24px;
    font-size: 18px;
    color: #FFFFFF;
	}
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
		white-space: nowrap;
		padding-top: 0.58rem;
	}
	
	.cont {
		width: 100%;
		box-sizing: border-box;
		border-radius: 4px;
		color: #F8FFFF;
		position: relative;
		height: 100%;
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
	
	/*.paramset label {
		font-size: 0.27rem;
		width: 2.5rem;
		text-align: right;
		display: inline-block;
	}*/
	
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
		white-space: nowrap;
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
		white-space: nowrap;
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
	
	.fendusure{margin: 0.1rem auto;}
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
		white-space: nowrap;
		background: #F8FFFF;
	}
	
	#paramset .checkboxs {
		width: 0.2rem;
		margin-left: 0.2rem;
	}
	.exid{height:2rem;overflow: scroll;white-space: nowrap;}
	 ::-webkit-scrollbar {
    		 width: 0 !important;height: 0;
   	}
</style>