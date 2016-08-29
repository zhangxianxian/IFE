/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};
var flag = false; //标记table是否需要重新渲染
/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
	var city = document.getElementById("aqi-city-input").value;
	var num = document.getElementById("aqi-value-input").value;
	if(!city.trim())
		city = trimStr(city);
	if(!num.trim())
		num = trimStr(num);
	if(!/^[\u4e00-\u9fa5aA-Za-z]+$/.test(city)) {
		alert("请输入正确的城市名称,只能包括英文和汉字");
		document.getElementById("aqi-city-input").focus();
		return false;
	}
	if(!/^[1-9]\d*$/.test(num)) {
		alert("请输入正确的数字，只能输入正整数");
		document.getElementById("aqi-value-input").focus();
		return false;
	}
	aqiData[city] = num;
	flag = true;
	return true;
}

function trimStr(str) {
	return str.replace(/(^\s*)|(\s*$)/g,"");
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
	var table = document.getElementById("aqi-table"); //创建一个文档碎片节点，将所有节点添加在这里
	var aqiFragment = document.createDocumentFragment();
	for (var data in aqiData) {
		var newtr = document.createElement("tr");
		var tdcity = document.createElement("td");
		tdcity.innerHTML = data; 
		var tdnum = document.createElement("td");
		tdnum.innerHTML = aqiData[data];
		var tdbtn = document.createElement("td");
		var btn = document.createElement("button");
		btn.innerHTML = "删除";
		tdbtn.appendChild(btn);
		newtr.appendChild(tdcity);
		newtr.appendChild(tdnum);
		newtr.appendChild(tdbtn);
		aqiFragment.appendChild(newtr);
	}
	if(flag) { //新增内容，需要重新渲染
		table.getElementsByTagName("tbody")[0].innerHTML = "";  //先清空表体的内容
		table.getElementsByTagName("tbody")[0].appendChild(aqiFragment); //最后将文档碎片节点一次性加入table中
	}
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
 if(addAqiData())
 	 alert("添加成功");
 renderAqiList();
}

/**
 * 事件绑定函数
 * 兼容不同的浏览器 
 */
function addEvent(element,type,func) {  
	 if(!element)	return false;
	 try {	// Chrome、FireFox、Opera、Safari、IE9.0及其以上版本
	 	element.addEventListener(type,func,false); //false 表示事件是在冒泡的时候执行，即使用事件捕获
	 } catch(e) {
	 	try {// IE8.0及其以下版本
	 		element.attachEvent("on"+type,func); 
	 	} catch(e) { // 早期浏览器
	 		element['on'+type] = func;
	 	}
	 }
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(event) {
  var city = event.target.parentNode.parentNode.childNodes[0].innerHTML; //通过target事件属性来获取触发事件的元素
  delete aqiData[city]; //删除数据
  renderAqiList();
}

function init() {
  // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
  var btn = document.getElementById("add-btn");
  addEvent(btn,'click',addBtnHandle);
  // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
  var tab = document.getElementById("aqi-table");
  addEvent(tab,'click',delBtnHandle);
}

init();