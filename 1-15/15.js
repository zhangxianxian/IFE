 /**
   * getData方法
   * 读取id为source的列表，获取其中城市名字及城市对应的空气质量
   * 返回一个数组，格式见函数中示例
   */
  function getData() {
    var data = [];
    var sourceData = document.getElementById("source").getElementsByTagName("li");
    for(var i = 0; i < sourceData.length; i++) {
      var item = [];
      var str = sourceData[i].innerHTML;
      var index = str.indexOf("空气质量"); 
      var city = str.slice(0,index);      //get city name
      var num = sourceData[i].getElementsByTagName("b")[0].innerHTML; //get  the number 
      item.push(city);
      item.push(num);
      data.push(item);
    }
    return data;
  }

  /**
   * sortAqiData
   * 按空气质量对data进行从小到大的排序
   * 返回一个排序后的数组
   */
  function sortAqiData(data) {
    data.sort(function(a,b) {
      return a[1] - b[1]; //升序
    });
    return data;
  }

  /**
   * render
   * 将排好序的城市及空气质量指数，输出显示到id位resort的列表中
   * 格式见ul中的注释的部分
   */
  function render(data) {
    var sequence = ["一","二","三","四","五","六","七"];
    list = document.getElementById("resort");
    for(var i = 0; i < data.length; i++)
    list.innerHTML += "<li>第" + sequence[i] + "名：" + data[i][0] +"空气质量: " + "<b>" + data[i][1] + "</b></li>"
  }

  function btnHandle() {
    var aqiData = getData();
    aqiData = sortAqiData(aqiData);
    render(aqiData);
  }

  function init() {
    // 在这下面给sort-btn绑定一个点击事件，点击时触发btnHandle函数
    document.getElementById("sort-btn").onclick = btnHandle;
  }

  init();