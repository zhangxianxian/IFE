/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) { //格式化
  var y = dat.getFullYear();
  var m = dat.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = dat.getDate();
  d = d < 10 ? '0' + d : d;
  return y + '-' + m + '-' + d;
}
function randomBuildData(seed) { 
  var returnData = {};
  var dat = new Date("2016-01-01"); 
  var datStr = ''
  for (var i = 1; i < 92; i++) { //生成3个月的数据
    datStr = getDateStr(dat); 
    returnData[datStr] = Math.ceil(Math.random() * seed); //随机产生数据
    dat.setDate(dat.getDate() + 1); //日期加1，达到一个月的最大天数后月份会自动加1
  }
  return returnData;
}

var aqiSourceData = {
  "北京": randomBuildData(500),
  "上海": randomBuildData(300),
  "广州": randomBuildData(200),
  "深圳": randomBuildData(100),
  "成都": randomBuildData(300),
  "西安": randomBuildData(500),
  "福州": randomBuildData(100),
  "厦门": randomBuildData(100),
  "沈阳": randomBuildData(500)
};

// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
  nowSelectCity: 1,
  nowGraTime: "day"
};

/**
 * 渲染图表
 */
function renderChart() {
  var chartWidth;
  if(pageState.nowGraTime === "day")
    chartWidth = "10px";
  else if(pageState.nowGraTime === "week")
    chartWidth = "25px";
  else if(pageState.nowGraTime === "month")
    chartWidth = "50px";

  var chartColor = function(height) {
   if(height >= 0 && height < 75) {
      return "#66ff66";
    } else if(height >= 75 && height < 150) {
      return "#ff3eff";
    } else if(height >= 150 && height < 225) {
      return "#9f88ff";
    } else if(height >= 225 && height < 300) {
      return "#ffb7dd";
    } else if(height >= 300 && height < 375) {
      return "#009fcc";
    } else if(height >= 375 && height <= 500) {
      return "#ffaa33";
    } else {
      return "#000000";
    }
  };
  var chart = document.getElementsByClassName("aqi-chart-wrap")[0];
  chart.innerHTML = "";
  var fragment = document.createDocumentFragment();
  for(var item in chartData) {
    var span = document.createElement("span");
    span.style.width = chartWidth;
    span.style.height = chartData[item] + "px";
    span.style.backgroundColor = chartColor(chartData[item]);
    span.title = item + ",空气质量指数:" + chartData[item];
    span.style.display = "inline-block";
    span.style.marginLeft = "2px";
    fragment.appendChild(span);
  }
  chart.appendChild(fragment);
}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange() {
  // 确定是否选项发生了变化 
  var gra_time = document.getElementById("form-gra-time").getElementsByTagName("input");
  // 设置对应数据
  for(var i = 0; i < gra_time.length; i++) {
    if(gra_time[i].checked) { //该选项被选中
      if(gra_time[i].value === pageState.nowGraTime) //没有变化
        break;
      else { pageState.nowGraTime = gra_time[i].value; //发送变化，更新值
        // alert("您选择的单位是：" + pageState.nowGraTime);
        }
    }
  }
  initAqiChartData();
  // 调用图表渲染函数
  renderChart();
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange() {
  // 确定是否选项发生了变化 
  var city_selects = document.getElementById("city-select");
  if(city_selects.selectedIndex === pageState.nowSelectCity) 
      return false;
  pageState.nowSelectCity = city_selects.selectedIndex;
  // alert("当前选择城市：" + city_selects[pageState.nowSelectCity].value );
  // 设置对应数据
  initAqiChartData();
  // 调用图表渲染函数
  renderChart();
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
  var gra_select = document.getElementById("form-gra-time").getElementsByTagName("input");
  for(var i = 0 ; i < gra_select.length ; i++) {
    gra_select[i].onclick = graTimeChange; 
  }
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
  // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
  var city_select = document.getElementById("city-select");
  city_select.innerHTML = "";
  var all_city =  Object.getOwnPropertyNames(aqiSourceData);
  for(var i = 0; i < all_city.length; i++) {
       city_select.innerHTML += "<option>" + all_city[i] + "</option>";
  }
  city_select.onchange = citySelectChange;
}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
  // 将原始的源数据处理成图表需要的数据格式
  // 处理好的数据存到 chartData 中
  chartData = {};
  var dataTemp = 0;
  var dayTemp = 0;
  var dayIndex = 0;
  var weekIndex = 1;
  var beginDay = "2016-01-01";
  var nextDay = function(day) {
     var beginDay_temp = new Date(day);
     beginDay_temp.setDate(beginDay_temp.getDate() + 1);
     return beginDay_temp;
  }
  var city_data = function() { //根据pageState的索引值找出对应的城市名字，然后根据城市名字，找到该城市对应的数据
    var index = pageState.nowSelectCity;
    var cityName = Object.getOwnPropertyNames(aqiSourceData)[index];
    return aqiSourceData[cityName]; 
  }();
  var city_data_len = Object.getOwnPropertyNames(city_data).length;
  if(pageState.nowGraTime === "day") { //以天为单位
    chartData = city_data;
  }
  else if(pageState.nowGraTime === "week") { //以周为单位
    for(var item in city_data ) {
      dataTemp += city_data[item];
      dayTemp ++;
      dayIndex ++;
      if(new Date(item).getDay() === 0 || dayIndex >= city_data_len) { 
        // getDay() === 0 表示当前日期表示周日，一个星期结束，dayIndex >= city_data_len表示已经到最后一个日期
        //将本周的平均污染数据输入chartData
        chartData[beginDay+"至"+item+"，第"+weekIndex+"周"] = Math.round(dataTemp / dayTemp);
        
        //记录周数，本周总的污染数和本周的实际天数清零
        weekIndex++; 
        dataTemp = 0;
        dayTemp = 0;
        //下一周开始的时间
        beginDay = getDateStr(nextDay(item));
      }
    }
  }else if(pageState.nowGraTime === "month") {//以月为单位
    for(var item in city_data) {
      dataTemp += city_data[item];
      dayTemp ++;
      dayIndex ++;
      if(nextDay(item).getMonth() > new Date(item).getMonth()) {
        //表示开始下一个月 或者 三个月均已计算完毕
        chartData[beginDay+"至"+item+"，"+(new Date(item).getMonth()+1)+"月"] = Math.round(dataTemp/dayTemp);
        dataTemp = 0;
        dayTemp = 0;
        beginDay = getDateStr(nextDay(item));
      }
    }
  }
}

/**
 * 初始化函数
 */
function init() {
  initGraTimeForm();
  initCitySelector();
  initAqiChartData();
}

init();