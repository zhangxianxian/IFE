
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

var invalue = document.getElementById("in-value");
var queue = document.getElementById("queue");
var leftin = document.getElementById("left-in");
var rightin = document.getElementById("right-in");
var leftout = document.getElementById("left-out");
var rightout = document.getElementById("right-out");

/**
*从右边增加新元素
*
*/
function fadeInRight() {
	console.log('this is fade in right');
	if(!/^[0-9]+$/.test(invalue.value)) {
		alert("请输入数字");
		invalue.value = null;
		invalue.focus();
	}else {
		var another= document.createElement("a");
		another.innerHTML = invalue.value;
		another.style.width = (2 + invalue.value.length)*10 + "px";
		another.setAttribute("class", "item");
		queue.appendChild(another);
	}
}

/**
*从左边增加新元素
*
*/
function fadeInLeft() {
	if(!/^[0-9]+$/.test(invalue.value)) {
		alert("请输入数字");
		invalue.value = null;
		invalue.focus();
	} else {
		var another= document.createElement("a");
		another.innerHTML = invalue.value;
		another.style.width = (2 + invalue.value.length)*10 + "px";
		another.setAttribute("class", "item");
		queue.insertBefore(another,queue.firstChild);
	}
}

/**
*
*删除队列右侧第一个元素，并弹窗显示元素中数值；
*/
function fadeOutRight() {
	var node = queue.getElementsByTagName("a")[queue.getElementsByTagName("a").length-1];
	queue.removeChild(node);
	alert("已删除数据:"+node.innerHTML);	
}

/**
*
*取并删除队列左侧第一个元素，并弹窗显示元素中数值；
*/
function fadeOutLeft() {
	var node = queue.getElementsByTagName("a")[0];
	queue.removeChild(node);
	alert("已删除数据:"+node.innerHTML);
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
}

function init() {
	addAllEvent ();
}
init();