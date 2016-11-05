
	//能点击的选择进度的进度条
	//HTML样式写法：外面一层div，里面一层div
	//css样式：内层div宽度设为百分比,里面一层定位为absolute，外面一层定位为relative
	/*
	 例子：
	 	<div class="progress">
			<div></div>
		</div>
	 */
	/*
	 现有功能：
	 	1、传参更改进度条进度		setProgress
	 	2、点击更改进度条进度		clickProgress
	 	3、拉动更改进度条进度	（暂时没有兼容移动端）	movePregress
	 	4、放回更改后的进度		getProgress
	 */
	
(function(){
	/*
		//如果你使用了commonJs，那么请你把这段注释打开
		//里面的路径你根据你电脑的情况而写
		var $ = require("jqurey");
	*/
	
	//参数，传里面一层对象，如上面例子中progress包含的div,因为是基于jQuery开发，请传jQuery对象；
	function ProgressBar($obj){
		this.$obj = $obj;
		this.init();
	}
	
	//初始化
	ProgressBar.prototype.init = function(){
		this.$progress = this.$obj.parent();
		//当前进度 是小数点
		this.per = 0;
	}
	
	//进度条进度
	//参数，请传入百分数，百分数加上百分号,例如50%
	ProgressBar.prototype.setProgress=function(percent){
		this.$obj.css({"width":percent});
		this.per = (parseFloat(percent)/100);
		return this;
	}
	
	//点击更改进度条进度
	ProgressBar.prototype.clickProgress = function(cbk){
		var percent
		var self = this;
		this.$progress.on("click",function(e){
			percent = 100*e.offsetX/self.$progress.width();
			var str = percent+"%";
			self.setProgress(str);
			this.per=percent/100;
			if(cbk){
				cbk();
			}
		})
		return this;
	}
	//按住拉动进度条
	ProgressBar.prototype.movePregress = function(){
		var self = this;
		var percent
		this.$progress.on("mousedown",function(){
			self.$progress.on("mousemove",function(e){
				percent = 100*e.offsetX/self.$progress.width();
				var str = percent+"%";
				self.progress(str);
				this.per=percent/100;
			})
		})
		$(window).on("mouseup",function(){
			self.$progress.unbind("mousemove");
		})
		return this;
	}
	//返回进度条进度（返回小数，不是百分数）
	ProgressBar.prototype.getProgress = function(){
		return this.per;
	}
	
	
	
	
	/*下面都是模块检测，用于检测commonJs和amd和全局*/
	if(typeof module ==="object"&& module && module.exports ==="object"){
		module.exports = ProgressBar;
	}else if(typeof define ==="function"&&define.amd){
		/*
		//如果你是使用require.js，那就把这段注释打开，把下面那段去掉，当然，你的config文档里定义jQuery的名字要和这里的一样
		define(["jquery"],function($){
			return ProgressBar;
		})
		*/
		define([],function(){
			return ProgressBar;
		})
	}
	if(typeof window === "object" && typeof window.document === "object"){
		window.ProgressBar = ProgressBar;
	}
	
}());
