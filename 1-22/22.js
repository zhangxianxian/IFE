
var nodes = [];
var root = document.getElementById('container');

/**
*
*前序 firstChild会解析两个标签之间的空白为text元素，所以使用firstElementChild
*/
var preOrder = function(rt) {
		if(rt !== null)	{
			nodes.push(rt);
			preOrder(rt.firstElementChild);
			preOrder(rt.lastElementChild);
		}
}

/**
*
*中序
*/
var midOrder = function(rt) {
		if(rt !== null)	{
			midOrder(rt.firstElementChild);
			nodes.push(rt);
			midOrder(rt.lastElementChild);
		}
}

/**
*
*后序
*/
var afterOrder = function(rt) {
		if(rt !== null)	{
			afterOrder(rt.firstElementChild);
			afterOrder(rt.lastElementChild);
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

document.getElementById('pre').onclick = function() {
	nodes = [];
	preOrder(root);
	tracer(nodes);
}

document.getElementById('middle').onclick = function() {
	nodes = [];
	midOrder(root);
	tracer(nodes);
}

document.getElementById('after').onclick = function() {
	nodes = [];
	afterOrder(root);
	tracer(nodes);
}
