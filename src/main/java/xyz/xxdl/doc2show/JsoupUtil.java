package xyz.xxdl.doc2show;

import cn.hutool.core.io.FileUtil;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import xxdl.xyz.utils.BaseUtil;
import java.io.IOException;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;

import static xxdl.xyz.utils.FileUtils.saveImg;


/**
 * Package:xxdl.xyz
 * Description: JsoupUtil
 *
 * @date:2023.03.05 14:12
 * @author:wodepig dddgoal@163.com
 */
public class JsoupUtil extends BaseUtil {
    /**
     * 从主页中拿到待解析的链接
     * @param url 文章主页链接
     * @return 分组名,文件名和url
     */
    public static  Map<String,Map<String,String>> allLink(String url) throws IOException {
        info("从",url,"主文档中获取链接...");
        Map<String,Map<String,String>> map = new LinkedHashMap<>();
        Map<String,String> value = new LinkedHashMap<>();
        Document doc = Jsoup.parse(new URL(url),10000);
        doc.setBaseUri(defaultDomain);
        // 获得左侧导航栏
        Elements sidebars = doc.select(".sidebar-links");
        for (Element sidebar : sidebars) {
            Elements groups = sidebar.select(".sidebar-group");
            for (Element gruop : groups) {
                // sidebar的分组名
                String groupName = gruop.select(".sidebar-heading").text();
                info("整理",groupName,"中的链接...");
                // 组内链接
                Elements links = gruop.select("a");
                for (Element link : links) {
                    String href = link.attr("abs:href");
                    if (href.contains("#")){
                        continue;
                    }
                    value.put(checkFileName(link),href);
                }
                map.put(groupName,value);
                value= new HashMap<>();
            }

        }
        info("共获取了",map.size()+"","个有效链接");
        return map;
    }

    /**
     * 转换图片链接
     * @param url 需要爬虫的文章链接
     * @return html文档
     * @throws IOException
     */
    public static String convertImgAndHtml(String url)throws IOException{

        Document doc = Jsoup.parse(new URL(url),5000);
        doc.setBaseUri(defaultDomain);
        // 文章主体
        Elements main = doc.select(".content-wrapper");
        // 移除右面导航和下面导航
        main.select(".right-menu-wrapper").remove();
        main.select(".page-nav-wapper").remove();
        Element h1ImgSrc = main.select("h1>img").first();
        if (h1ImgSrc!=null){
            // 把base64设置空
            h1ImgSrc.attr("src","");
        }
        info("获得文章中的所有图片");
        // 获得文章中的所有图片
        Elements imgs = main.select("img");
        for (Element img : imgs) {
            String oldSrc = img.attr("abs:src");
            if (oldSrc.contains(".gif")){
                continue;
            }
            img.attr("src",saveImg(oldSrc,true));
        }
        // 移除所有的带#的属性
        Elements select = main.select("[href]");
        for (Element element : select) {
            if (element.attr("href").contains("#")){
               element.remove();

            }
        }


       return main.html();
    }

    public static void main(String[] args)throws IOException {
        String s = FileUtil.readString(filePath + "/test.html", StandardCharsets.UTF_8);
        Document doc = Jsoup.parse(s);
        // 文章主体
        Elements main = doc.select(".content-wrapper");
        // 移除右面导航和下面导航
        main.select(".right-menu-wrapper").remove();
        main.select(".page-nav-wapper").remove();
        Elements select = main.select("[href]");
        for (Element element : select) {

            if (element.attr("href").contains("#")){
                element.remove();
                //element.removeAttr("href");
            }
        }
        //String convert = converter.convert(s);
        System.out.println();
    }
}
