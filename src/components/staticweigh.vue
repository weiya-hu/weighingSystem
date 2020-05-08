<template>
	<div class="staticweight">
		<div class="bigview">465464 kg</div>
		<div class="btn flexa">
			<div>预置皮重</div>
			<div>称重</div>
		</div>
		<div class="btn flexa">
			<div>去皮</div>
			<div>置零</div>
		</div>
		<div class="weightset flexa">
			<div class="weighttxt">重量系数设定</div>
			<div class="weightxtlb">重量系数</div>
			<input type="number" name="" id="" value="" />
			<div class="weightxtlb">真实重量</div>
			<input type="number" name="" id="" value="" />
			<div class="butn">计算重量系数</div>
			<div class="butn">设定重量系数</div>
		</div>
	</div>
</template>

<script>
</script>

<style scoped>
	.staticweight{width: 100%;height: 100%; background: #2E405E;overflow: scroll;}
	.bigview{width: 70%;height: 2rem;background: #FFFFFF;margin: 1.2rem auto 0.8rem;
		color: #333333;font-size: 1rem;line-height: 2rem;box-shadow: 0 0 10px rgba(255,255,255,1);}
	.btn{width: 70%;margin: 0.8rem auto;}
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
   .butn{font-size: 0.18rem;padding: 0.2rem;background: #1840A8;border-radius: 0.06rem;cursor: pointer;}
</style>