var inValue = document.getElementById("in-value");
var queue = document.getElementById("queue");
var leftIn = document.getElementById("left-in");
var rightIn = document.getElementById("right-in");
var leftOut = document.getElementById("left-out");
var rightOut = document.getElementById("right-out");
var st = document.getElementById("sort");
var searchValue = document.getElementById("search-value");
var searchBtn = document.getElementById("search-btn");
 //使用数组来存储所有的节点值，然后根据数组来进行渲染
var num = [];

/**
* 事件绑定函数，兼容不同的浏览器
*
*/
function addEvent(element,type,func) {
	if(!element)	return false;
	try {
		element.addEventListener(type, func,false);
	} catch(e) {
		try {
			element.attachEvent('on'+type, func);
		} catch(e) {
			element['on' + type] = func;
		}
	}
}

/**
*页面渲染函数
*
*/
function renderChart(number) {
	queue.innerHTML = "";
	for(var i = 0; i<number.length; i++) {
		var another= document.createElement("a");
		another.style.width = (2 + number[i].length)*10 + "px";
		another.setAttribute("class", "item");
		another.setAttribute("value", number[i]);
		another.innerHTML = number[i];
		queue.appendChild(another);
	}
}

function getStr() {
	str = inValue.value.trim();
	if(!str) {
		alert('不能为空');
		inValue.focus();
	}
	var tempStr = str.split(/[,，．\." "＂＂\r\t\n\s、]+/);
	return tempStr;
}

/**
*从右边增加新元素
*
*/
function fadeInRight() {
	var newValue = getStr();
	for(let i = 0; i < newValue.length; i++) {
		num.push(newValue[i]);
	}
	renderChart(num);
}

/**
*从左边增加新元素
*
*/
function fadeInLeft() {
	var newValue = getStr();
	for(let i = 0; i < newValue.length; i++) {
		num.unshift(newValue[i]);
	}
	renderChart(num);
}

/**
*
*删除队列右侧第一个元素，并弹窗显示元素中数值；
*/
function fadeOutRight() {
	num.pop();
	renderChart(num);
}

/**
*
*取并删除队列左侧第一个元素，并弹窗显示元素中数值；
*/
function fadeOutLeft() {
	num.shift();
	renderChart(num);
}

/**
*
* 点击元素本身会删除该元素
*/
function deleteSelf(e) {
	var node = e.target;
	queue.removeChild(node);
}

/**
* 模糊匹配
*
*/
function seachValues() {
	var str = searchValue.value.trim();
	var nodes = queue.childNodes;
	for(let i = 0; i < nodes.length; i++) {
		var temp = nodes[i].innerHTML;
		if(temp.indexOf(str) !== -1) {
			nodes[i].style.backgroundColor = "blue";
		}
	}  
}

/**
* 绑定所有的的事件
*
*/
function addAllEvent() {
	 addEvent(leftIn,'click',fadeInLeft); 
	 addEvent(rightIn,'click',fadeInRight); 
	 addEvent(leftOut,'click',fadeOutLeft); 
	 addEvent(rightOut,'click',fadeOutRight); 
	 addEvent(queue,'click',deleteSelf); 
	 addEvent(searchBtn,'click',seachValues); 
}

function init() {
	addAllEvent();
}
init();