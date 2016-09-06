var tagIn = document.getElementById("tag-in");
var inValue = document.getElementById('in-value');
var submitBtn = document.getElementById("submit-btn");
var tags = document.getElementById('tags');
var hobbies = document.getElementById('hobbies');
 //使用数组来存储所有的节点值，然后根据数组来进行渲染
var tagsValue = [];
var hobbiesValue = [];

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
*
* 点击元素本身会删除该元素
*/
function deleteSelf(e) {
	var node = e.target;
	queue.removeChild(node);
}

/**
*
* 获取tags值，不能重复最多十个
*/
var getTags = function() {
	tagIn.oninput  = function () {
			var str = tagIn.value;
			if(/[,，" "\s\r\n]/.test(str[str.length-1])) {
				var tempStr = str.trim().split(/[,，" "\s\n\r]+/);
				console.log(tempStr);
				for(let i = 0; i < tempStr.length; i++) {
					if(tempStr[i]==="") 
						{tempStr.splice(i, 1);}
				}
				console.log(tempStr);
				for(let i = 0; i < tempStr.length; i++) {

					if(tagsValue.length < 10) {
						//不能添加已有的项目

						if(tagsValue.indexOf(tempStr[i]) === -1) { 
							tagsValue.push(tempStr[i]);
						}
					} else {
						//不能添加已有的项目
						console.log(tagsValue.length);
						if(tagsValue.indexOf(tempStr[i]) === -1) {
							//已达到最大数量，先删除最前面，再添加新的
							tagsValue.shift();
							tagsValue.push(tempStr[i]);
						}
					}
				}
				addTags();
			}
			// console.log(tagIn.value);
	};
	
}

var addTags = function() {
	tags.innerHTML = "";
	for(let i = 0; i < tagsValue.length; i++) {
		var another= document.createElement("a");
		another.style.backgroundColor = '#6adcff';
		another.setAttribute("class", "item");
		another.setAttribute("value", tagsValue[i]);
		another.innerHTML = tagsValue[i];
		tags.appendChild(another);
		addEvent(another,'mouseover',hoverTag); 
		addEvent(another,'mouseleave',mouseoutTag); 
		addEvent(another,'click',deleteTag); 
	}
}

var hoverTag = function(e) {
	e.target.innerHTML = "点击删除" + e.target.innerHTML;
	e.target.style.backgroundColor = "#ff2f6f";
}

var mouseoutTag = function(e) {
	e.target.innerHTML = e.target.innerHTML.substr(4);
	e.target.style.backgroundColor = "#6adcff";
}

var deleteTag = function(e) {
	tags.removeChild(e.target);
}

/**
*获取textarea中输入的兴趣爱好，不能重复，最多10个，多于10个的时候删除前面的
*
*/
var getHobbies = function() {
	var str = inValue.value.trim();
	if(!str) {
		alert('不能为空');
		inValue.focus();
	}
	var tempStr = str.split(/[,，．\." "＂＂\r\t\n\s、]+/);
	for(let i = 0; i < tempStr.length; i++) {
		if(hobbiesValue.length < 10) {
			//不能添加已有的项目
			if(hobbiesValue.indexOf(tempStr[i]) === -1) { 
				hobbiesValue.push(tempStr[i]);
			}
		} else { 
			if(hobbiesValue.indexOf(tempStr[i]) === -1) {
				//已达到最大数量，先删除最前面，再添加新的
				hobbiesValue.shift();
				hobbiesValue.push(tempStr[i]);
			}
		}
	}
}

/**
*
*添加兴趣爱好
*/
var addHobbies = function() {
	getHobbies();
	hobbies.innerHTML = "";
	for(let i = 0; i < hobbiesValue.length; i++) {
		console.log(hobbiesValue[i]);
		var another= document.createElement("a");
		another.style.backgroundColor = '#ffb463';
		another.setAttribute("class", "item");
		another.setAttribute("value", hobbiesValue[i]);
		another.innerHTML = hobbiesValue[i];
		hobbies.appendChild(another);
	}
}

/**
* 绑定所有的的事件
*
*/
function addAllEvent() {
	 addEvent(submitBtn,'click',addHobbies); 
}

function init() {
	addAllEvent();
	getTags();
}
init();