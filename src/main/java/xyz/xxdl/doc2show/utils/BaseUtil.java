package xyz.xxdl.doc2show.utils;


import org.apache.commons.lang3.StringUtils;
import org.jsoup.Jsoup;

import org.jsoup.nodes.Element;
import org.jsoup.safety.Safelist;



/**
 * Package: xxdl.xyz.utils
 * Description:
 *
 * @date: 2023/3/1 12:38
 * @author: 邓昌/dddgoal@163.com
 */
public class BaseUtil extends ConfigUtil {
    public static String filePath=System.getProperty("user.dir")+"/mds";
    // 文件名后缀
    private static String fileSuffix=".md";

    public static String defaultDomain;

    public static void info(String ...str){
        StringBuilder out = new StringBuilder();
        for (String s : str) {
            out.append(s).append(" ");
        }
        FileUtils.saveMsg("info",out.toString() );

    }
    public static void warn(String ...str){
            String out = "";
            for (String s : str) {
                out = out+s+",";
            }
            FileUtils.saveMsg("warn",out  );
    }
    public static void error(String ...str){
        String out = "";
        for (String s : str) {
            out = out+s+",";
        }
        FileUtils.saveMsg("error",out  );
       throw new RuntimeException(out);
    }






public static String checkFileName(Element element){

    String title = element.childNode(0).toString();
    return Jsoup.clean(title, Safelist.none());
}










    /**
     * 初始化主域名
     * @param url 地址
     */
    public static void defaultHtmlDomain(String url){

        defaultDomain = getUrlDomain(url);
        if (StringUtils.isBlank(defaultDomain)) {

            error("地址解析错误,请检查",url);
        }
    }

    public static String getUrlDomain(String url){

        if (StringUtils.isBlank(url)) {
            error("地址不能为空",url);
        }
        if (url.startsWith("/")){
            // /开头的是没有主域名的
            return defaultDomain;
        }
        if (!url.contains("http")||!url.contains("https")){
            // 补充协议头
            url = "http://"+url ;
        }
        url = url.replace("//","/");
        String [] arr = url.split("/");
        return arr[0]+"//"+arr[1]+"/";
    }

    public static String getUrlPath(String domain ,String url){
        if (domain==null){

             domain = getUrlDomain(url);
        }
        url = url.replace(domain,"");
        if (url.startsWith("/")){
            url = url.substring(1);
        }
        return url;
    }
}
