
var hkey_root,hkey_path,hkey_key;
hkey_root="HKEY_CURRENT_USER";
hkey_path="\\Software\\Microsoft\\Internet Explorer\\PageSetup\\";
//配置网页打印的页眉页脚为空


function pagesetup_null(){   
    try{
        var RegWsh = new ActiveXObject("WScript.Shell");           
        hkey_key="header";           
        RegWsh.RegWrite(hkey_root+hkey_path+hkey_key,"");
        hkey_key="footer";
        RegWsh.RegWrite(hkey_root+hkey_path+hkey_key,"");
        //&b 第&p页/共&P页 &b
    }catch(e){}

}


    //打印页面预览
    function printpreview(){
        pagesetup_null();
        //wb.printing.header = "居左显示&b居中显示&b居右显示页码，第&p页/共&P页";
        //wb.printing.footer = "居左显示&b居中显示&b居右显示页码，第&p页/共&P页";
        try{
            wb.execwb(7,1);
        }catch(e){
            alert("您的浏览器不支持此功能,请选择'文件'->'打印预览'");
        }
    }



function print()
{

  pagesetup_null();
  
  try{
        wb.execwb(6,1);
  	  }catch(e){
         alert("您的浏览器不支持此功能");
	}
}