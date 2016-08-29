var aqiData = [
  ["北京", 90],
  ["上海", 50],
  ["福州", 10],
  ["广州", 50],
  ["成都", 90],
  ["西安", 100]
];

(function() {

  /*
  在注释下方编写代码
  遍历读取aqiData中各个城市的数据
  将空气质量指数大于60的城市显示到aqi-list的列表中
  */
 	var list = document.getElementById("aqi-list");//获取html文件中的ul对象
 	var result = [];
 	for(var i = 0; i < aqiData.length; i++) {
 		if(aqiData[i][1] > 60){
 			result.push(aqiData[i]);
 		}
 	}
 	result.sort(function(a,b) { //逆序
 		return b[1] - a[1];
 	});
 	for(var i = 0; i < result.length; i++) {
 		list.innerHTML += "<li>第" + (i+1) +"名：" + result[i][0] + "," + result[i][1] +"</li>"; //输出
 	}
})();