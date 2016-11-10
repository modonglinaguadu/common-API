/*

ajax({
	type:"jsonp", //get post jsonpost
	url: "http://map.baidu.com",
	data:"city=bj&xx=yy",
	success: function(data){
		
	}
	error:function(){
		
	}
});
*/

function ajax(param){
	
	if(param.data && !/^(\w+=\w+)?(&\w+=\w+)*$/.test(param.data)) {
		throw new Error("参数格式错误");
	}
	
	if(param.type == "jsonp") {
		var cbkname = "callback"+new Date().getTime() + Math.floor(Math.random()*1000000);
		window[cbkname] = function(data){
			param.success(data);
			document.body.removeChild(_script);
			delete window[cbkname];
		}
		var _script = document.createElement("script");
		_script.src = param.url+"?"+param.data+"&callback="+cbkname;
		_script.onerror = function(){
			console.log("请求失败，请检查地址或参数");
		}
		document.body.appendChild(_script);
		
	} else if(/^post|get$/.test(param.type) ) {
		if(window.ActiveXObject) {
			var req = new ActiveXObject("Msxml2.XMLHTTP");
		} else {
			var req = new XMLHttpRequest();
		}
		if(param.type == "get") {
			req.open(param.type, param.url+"?"+param.data,true);
		} else {
			req.open(param.type, param.url, true);
			//没有这句话，服务器无法正确的解析客户端提交的数据
			req.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		}
			
		if(param.success) {
			req.onreadystatechange = function(){
				if(req.readyState == 4) {
					if(req.status == 200) {
						param.success(req.responseText);	
					} else {
						param.error();
					}
				}
			}
		}
		if(param.type == "get"){
			req.send();
		} else {
			req.send(param.data);
		}
	} else {
		console.log("参数错误，请输入正确的请求类型")
	}
	
}

