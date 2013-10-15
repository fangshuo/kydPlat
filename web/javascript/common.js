/**
 * 根据url 弹出一个新窗口
 * 
 * @param {} url
 */
 function openMaxWindow(url) {
	var winheight = screen.availHeight - 55;
	var winwidth = screen.availWidth - 10;
	var param = "height="
			+ winheight
			+ ",width="
			+ winwidth
			+ ",top=0,left=0,toolbar=no,menubar=no,scrollbars=yes,resizable=no,location=no,status=no,titlebar=no";
	window.open(url, "", param);
  }

/**
 * 将数字格式化成#.## 
 * 1--1.00
 * 3.333 --3.33
 * @param {} value
 * @return {}
 */
function formatNambToDouble(value)
{
	return Number(value).toFixed(2);
}

/**
 * 将数字格式化成#.## 并重新赋值
 * 1--1.00
 * 3.333 --3.33
 * @param {} value
 * @return {}
 */
function checkedAndFromt(obj)
{
	if(testNum(obj.value))
	{
		var a = Number(obj.value).toFixed(2);
		obj.value = a;
		return a;
	}else
	{
		obj.value = "";
		return false;
	}
}



/**
 * 正则表达式匹配，浮点数
 * @param {} s
 * @return {Boolean}
 */
function testFloat(s){ 
	var regu ="^-?([1-9]\d*\.\d*|0\.\d*[1-9]\d*|0?\.0+|0)$";
    var re = new RegExp(regu); 
    if (re.test(s)) { 
        return true; 
    } else { 
        return false; 
    } 
}



/**
 * 可输入 1或1.00
 * 正则表达式匹配，小数(小数点后保留两位)，以及整数
 * @param {} s
 * @return {Boolean}
 */
function testNum(s){ 
	//alert(s);
	var regu ="^[0-9,]+[\.]{0,1}[0-9]{0,2}$";
    var re = new RegExp(regu); 
    if (re.test(s)) { 
        return true; 
    } else { 
    	Ext.MessageBox.alert('错误!!!','请正确填写,小数点后保留两位或整数！！！');
        return false; 
    } 
}


/**
 * 将数字金额变成中文大写金额返回
 * @param {} Num
 */

function Arabia_to_Chinese(Num){
   for(i=Num.length-1;i>=0;i--)
   {
    Num = Num.replace(",","")//替换tomoney()中的“,”
    Num = Num.replace(" ","")//替换tomoney()中的空格
   }
   Num = Num.replace("￥","")//替换掉可能出现的￥字符
   if(isNaN(Num)) { //验证输入的字符是否为数字
    alert("请检查小写金额是否正确");
    return;
   }
   //---字符处理完毕，开始转换，转换采用前后两部分分别转换---//
   part = String(Num).split(".");
   newchar = ""; 
   //小数点前进行转化
   for(i=part[0].length-1;i>=0;i--){
   if(part[0].length > 10){ alert("位数过大，无法计算");return "";}//若数量超过拾亿单位，提示
    tmpnewchar = ""
    perchar = part[0].charAt(i);
    switch(perchar){
    case "0": tmpnewchar="零" + tmpnewchar ;break;
    case "1": tmpnewchar="壹" + tmpnewchar ;break;
    case "2": tmpnewchar="贰" + tmpnewchar ;break;
    case "3": tmpnewchar="叁" + tmpnewchar ;break;
    case "4": tmpnewchar="肆" + tmpnewchar ;break;
    case "5": tmpnewchar="伍" + tmpnewchar ;break;
    case "6": tmpnewchar="陆" + tmpnewchar ;break;
    case "7": tmpnewchar="柒" + tmpnewchar ;break;
    case "8": tmpnewchar="捌" + tmpnewchar ;break;
    case "9": tmpnewchar="玖" + tmpnewchar ;break;
    }
    switch(part[0].length-i-1){
    case 0: tmpnewchar = tmpnewchar +"元" ;break;
    case 1: if(perchar!=0)tmpnewchar= tmpnewchar +"拾" ;break;
    case 2: if(perchar!=0)tmpnewchar= tmpnewchar +"佰" ;break;
    case 3: if(perchar!=0)tmpnewchar= tmpnewchar +"仟" ;break;
    case 4: tmpnewchar= tmpnewchar +"万" ;break;
    case 5: if(perchar!=0)tmpnewchar= tmpnewchar +"拾" ;break;
    case 6: if(perchar!=0)tmpnewchar= tmpnewchar +"佰" ;break;
    case 7: if(perchar!=0)tmpnewchar= tmpnewchar +"仟" ;break;
    case 8: tmpnewchar= tmpnewchar +"亿" ;break;
    case 9: tmpnewchar= tmpnewchar +"拾" ;break;
    }
    newchar = tmpnewchar + newchar;
   }
   //小数点之后进行转化
   if(Num.indexOf(".")!=-1){
   if(part[1].length > 2) {
    alert("小数点之后只能保留两位,系统将自动截段");
    part[1] = part[1].substr(0,2)
    }
   for(i=0;i<part[1].length;i++){
    tmpnewchar = ""
    perchar = part[1].charAt(i)
    switch(perchar){
    case "0": tmpnewchar="零" + tmpnewchar ;break;
    case "1": tmpnewchar="壹" + tmpnewchar ;break;
    case "2": tmpnewchar="贰" + tmpnewchar ;break;
    case "3": tmpnewchar="叁" + tmpnewchar ;break;
    case "4": tmpnewchar="肆" + tmpnewchar ;break;
    case "5": tmpnewchar="伍" + tmpnewchar ;break;
    case "6": tmpnewchar="陆" + tmpnewchar ;break;
    case "7": tmpnewchar="柒" + tmpnewchar ;break;
    case "8": tmpnewchar="捌" + tmpnewchar ;break;
    case "9": tmpnewchar="玖" + tmpnewchar ;break;
    }
    if(i==0)tmpnewchar =tmpnewchar + "角";
    if(i==1)tmpnewchar = tmpnewchar + "分";
    newchar = newchar + tmpnewchar;
   }
   }
   //替换所有无用汉字
   while(newchar.search("零零") != -1)
    newchar = newchar.replace("零零", "零");
   newchar = newchar.replace("零亿", "亿");
   newchar = newchar.replace("亿万", "亿");
   newchar = newchar.replace("零万", "万");
   newchar = newchar.replace("零元", "元");
   newchar = newchar.replace("零角", "");
   newchar = newchar.replace("零分", "");

   if (newchar.charAt(newchar.length-1) == "元" || newchar.charAt(newchar.length-1) == "角")
    newchar = newchar+"整"
   return newchar;
  }


/**
 * 传入yyyy-mm-dd 返回yyyy-mm-dd HH:ii:ss
 * @param {} date
 */  
  function getDate(date)
  {
  	var d = new Date();
	var h = d.getHours().toString();
	var i = d.getMinutes().toString();
	var s = d.getSeconds().toString();
	
	if(h.length<2)
	{
		h=0+h;
	}
	if(i.length<2)
	{
		i=0+i;
	}
	if(s.length<2)
	{
		s=0+s;
	}
	var nyr = date.format("Y-m-d").toString();
	var rqStr = nyr+' '+h+':'+i+':'+s;
	return rqStr;
  }