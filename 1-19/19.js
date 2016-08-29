var invalue = document.getElementById("in-value");
var queue = document.getElementById("queue");
var leftin = document.getElementById("left-in");
var rightin = document.getElementById("right-in");
var leftout = document.getElementById("left-out");
var rightout = document.getElementById("right-out");
var st = document.getElementById("sort");
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
		another.style.height = number[i] + "px";
		another.setAttribute("class", "item");
		another.setAttribute("value", number[i]);
		queue.appendChild(another);
	}
}

/**
*从右边增加新元素
*
*/
function fadeInRight() {
	console.log('this is fade in right');
	if(!/^[0-9]+$/.test(invalue.value) || invalue.value < 10 || invalue.value > 100) {
		alert("请输入10-100的数字");
		invalue.value = null;
		invalue.focus();
		return false;
	}
	else if(num.length > 60) {
		alert("最多只能添加60个元素");
	} else
		num.push(invalue.value);
	renderChart(num);
}

/**
*从左边增加新元素
*
*/
function fadeInLeft() {
	if(!/^[0-9]+$/.test(invalue.value) || invalue.value < 10 || invalue.value > 100) {
		alert("请输入10-100之间的数字");
		invalue.value = null;
		invalue.focus();
	}
	else if(num.length > 60) {
		alert("最多只能添加60个元素");
	} else {
		num.unshift(invalue.value);
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
*使用冒泡排序对对数组进行排序
*/

function sortNum() {
var p = 0;
	for(var i = 0; i < num.length; i++) {	
		for(var j = 1; j < num.length - i; j++) {
			if(num[j-1] > num[j]) {
				var temp = num[j];
				num[j] = num[j-1];
				num[j-1] = temp;
			}
		}
	}
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
* 绑定所有的的事件
*
*/
function addAllEvent() {
	 addEvent(leftin,'click',fadeInLeft); 
	 addEvent(rightin,'click',fadeInRight); 
	 addEvent(leftout,'click',fadeOutLeft); 
	 addEvent(rightout,'click',fadeOutRight); 
	 addEvent(queue,'click',deleteSelf); 
	 addEvent(st,'click',sortNum); 
}

function init() {
	addAllEvent();
}
init();