
	/*多媒体引擎现提供功能有:
	 	1、自动播放(传入音乐路径) 	autoPlay(url)
	 	2、点击播放(传入音乐路径) 	clickPlay(url)
	 	3、暂停/继续播放 		playPause()
	 	4、加快播放速度		speedUp()
	 	5、减小播放速度（当速度小于0时就会倒退）		speedDown()
	 	6、音量		loudness(num)
	 	7、设置静音		mute()
	 	8、获取当前时间	getCurrentTime(cbk)		//用cbk获取当前播放时间
	 	9、获取总时间	getDuration(cbk)   //用cbk获取总时间
	 	10、更改播放时间（即进度）
	 */
	

(function(){
	/*
		//如果你使用了commonJs，那么请你把这段注释打开
		//里面的路径你根据你电脑的情况而写
		var $ = require("jqurey");
	*/
	
	
	
	//创建一个多媒体引擎构造函数
	//调用时，传入媒体对象(本引擎基于jQuery开发，所以请传入jQuery对象)
	function Engine($obj){
		this.$media = $obj
	}
	
	//初始化
	Engine.prototype.init=function(){
		
	}
	
	//自动播放功能
	//url为音乐播放路径
	Engine.prototype.autoPlay = function(url){
		this.$media.attr("src",url);
		this.$media[0].load();
		this.$media[0].play();
	}
	
	//点击播放功能
	//url为音乐播放路径
	Engine.prototype.clickPlay = function(url){
		this.$media.attr("src",url);
		this.$media[0].play();
	}
	
	//暂停和继续播放(可以返回播放状态， 0代表暂停， 1代表播放)
	Engine.prototype.playPause = function(){
		if(this.$media[0].paused){
			this.$media[0].play();
			return 1;
		}else{
			this.$media[0].pause();
			return 0;
		}
	}
	
	//加快播放速度
	Engine.prototype.speedUp = function(){
		var currenSpeed = this.$media[0].playbackRate;
		if(currenSpeed >= 2.0){
			this.$media[0].playbackRate = currenSpeed;
		}else{
			this.$media[0].playbackRate = currenSpeed + 0.5;
		}
	}
	//减小播放速度
	Engine.prototype.speedDown = function(){
		var currenSpeed = this.$media[0].playbackRate;
		if(currenSpeed <= -2.0){
			this.$media[0].playbackRate = currenSpeed;
		}else{
			this.$media[0].playbackRate = currenSpeed - 0.5;
		}
	}
	
	//音量
	//参数为音量大小，参数范围为0~1
	Engine.prototype.loudness = function(num){
		if(num>=0&&num<=1){
			this.$media[0].volume = num;
		}else{
			throw new Error("音量设置范围只能在0~1之间！");
		}
	}
	
	//设置静音
	Engine.prototype.mute = function(){
		if(this.$media[0].muted == true){
			this.$media[0].muted = false ;
		}else{
			this.$media[0].muted = true;
		}
		
	}

	//更改播放时间
	//传入调整后的时间
	Engine.prototype.changTime= function(time){
		this.$media[0].currentTime = time;
	}
	
	//获取当前时间
	Engine.prototype.getCurrentTime = function(cbk){
		var self = this;
		this.$media[0].addEventListener("timeupdate",function(){//建立监听
			var time = self.$media[0].currentTime;
			cbk(time);

		},true)
	}
	
	//返回总时间
	Engine.prototype.getDuration = function(cbk){
		var self = this;
		this.$media[0].addEventListener("canplay",function(){
			var allTime = self.$media[0].duration;
			cbk(allTime);
		})
	}
	
	
	
	
	
	
	
	/*下面都是模块检测，用于检测commonJs和amd和全局*/
	if(typeof module ==="object"&& module && module.exports ==="object"){
		module.exports = Engine;
	}else if(typeof define ==="function"&&define.amd){
		/*
		//如果你是使用require.js，那就把这段注释打开，把下面那段去掉，当然，你的config文档里定义jQuery的名字要和这里的一样
		define(["jquery"],function($){
			return Engine;
		})
		*/
		define([],function(){
			return Engine;
		})
	}
	if(typeof window === "object" && typeof window.document === "object"){
		window.Engine = Engine;
	}
	
	
}());
