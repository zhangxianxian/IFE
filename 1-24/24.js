
var nodes = [];
var root = document.getElementById('container');
var seletedNode ; //全局变量，用来存放需要被选中的节点

/**
*
*前序 firstChild会解析两个标签之间的空白为text元素，所以使用firstElementChild
*/
var preOrder = function(rt) {
		if(rt !== null)	{
			nodes.push(rt);
			preOrder(rt.firstElementChild);
			if(rt.firstElementChild !== null) {
				//遍历所有的兄弟节点
				var current = rt.firstElementChild.nextElementSibling;
				while (current !== rt.lastElementChild && current !== null) {
					preOrder(current);
					current = current.nextElementSibling;
				}
			preOrder(rt.lastElementChild);
			}	
		}
}

/**
*
*后序
*/
var afterOrder = function(rt) {
		if(rt !== null)	{
			afterOrder(rt.firstElementChild);
			//先遍历所有的兄弟节点
			if(rt.firstElementChild !== null) {
				var current = rt.firstElementChild.nextElementSibling;
				while (current !== rt.lastElementChild && current !== null) {
					afterOrder(current);
					current = current.nextElementSibling;
				}
			afterOrder(rt.lastElementChild);
			}	
			//访问父节点
			nodes.push(rt);
		}
}

var tracer = function(nos) {
		let i = 0;
		nos[i].style.backgroundColor = '#ff9966';
		var timer = setInterval(function(){
			i++;
			if(i < nos.length) {
				nos[i-1].style.backgroundColor = '#ffffff';
				nos[i].style.backgroundColor = '#ff9966';
			} else {
				clearInterval(timer);
				nos[i-1].style.backgroundColor = '#ffffff';
			}
		}, 1000);
	
} 

var tracerSearch = function(nos,num) {
		let i = 0;
		nos[i].style.backgroundColor = '#ff9966';
		var timer = setInterval(function(){
			i++;
			if(i < nos.length) {
				nos[i-1].style.backgroundColor = '#ffffff';
				nos[i].style.backgroundColor = '#ff9966';
				console.log(nos[i].childNodes[0].nodeValue);
				if(nos[i].childNodes[0].nodeValue.trim() === num) {
					nos[i].style.backgroundColor = '#ff3300';
					clearInterval(timer);
				}
			} else {
				clearInterval(timer);
				nos[i-1].style.backgroundColor = '#ffffff';
				alert('没有找到相应的节点');
			}
		}, 1000);
	
} 

/**
* 在重新查找之前，先清空背景色
*
*/
var clearColors = function() {
	var alls = document.getElementsByClassName("outer");
	for(let i = 0; i < alls.length; i++) {
		alls[i].style.backgroundColor = '#fff';
	}
}

document.getElementById('pre').onclick = function() {
	nodes = [];
	preOrder(root);
	tracer(nodes);
}

document.getElementById('after').onclick = function() {
	nodes = [];
	afterOrder(root);
	tracer(nodes);
}

document.getElementById('pre-search').onclick = function() {
	nodes = [];
	var value = document.getElementById('search-in').value.trim();
	clearColors();
	preOrder(root);
	tracerSearch(nodes,value);
}

document.getElementById('after-search').onclick = function() {
	nodes = [];
	var value = document.getElementById('search-in').value.trim();
	clearColors();
	afterOrder(root);
	tracerSearch(nodes,value);
}

document.getElementById('delete-btn').onclick = function() {
	deleteSelf();
}

document.getElementById('add-btn').onclick = function() {
	addNode();
}

var selected = function(e) {
	clearColors();
	e.target.style.backgroundColor = '#ff3300';
	seletedNode = e.target;
}

var addNode = function() {
	var node = document.createElement('div');
	node.className = 'item' + ' outer';
	node.innerHTML = document.getElementById('new-in').value;
	seletedNode.appendChild(node);
}

var deleteSelf = function() {
	seletedNode.parentNode.removeChild(seletedNode);
}
root.addEventListener('click', selected,false);
