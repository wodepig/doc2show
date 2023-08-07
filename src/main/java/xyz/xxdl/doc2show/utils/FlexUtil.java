package xyz.xxdl.doc2show.utils;

import lombok.extern.slf4j.Slf4j;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import xyz.xxdl.doc2show.pojo.DocItem;
import xyz.xxdl.doc2show.pojo.DocLink;

import java.io.IOException;
import java.net.URL;
import java.util.*;

@Slf4j
public class FlexUtil {
    /**
     * 从主页中拿到待解析的链接
     * @param url 文章主页链接
     * @return DocLink
     */
//    public static List<DocLink> allLink(DocItem docItem) {
//        String url = docItem.getUrl();
//        log.info("从{}主文档中获取链接...",url);
//        List<DocLink> list = new ArrayList<>();
//        Map<String,Map<String,String>> map = new LinkedHashMap<>();
//        Map<String,String> value = new LinkedHashMap<>();
//        Document doc = Jsoup.parse(new URL(url),10000);
//        doc.setBaseUri(defaultDomain);
//        // 获得左侧导航栏
//        Elements sidebars = doc.select(".sidebar-links");
//        for (Element sidebar : sidebars) {
//            Elements groups = sidebar.select(".sidebar-group");
//            for (Element gruop : groups) {
//                // sidebar的分组名
//                String groupName = gruop.select(".sidebar-heading").text();
//                info("整理",groupName,"中的链接...");
//                // 组内链接
//                Elements links = gruop.select("a");
//                for (Element link : links) {
//                    String href = link.attr("abs:href");
//                    if (href.contains("#")){
//                        continue;
//                    }
//                    value.put(checkFileName(link),href);
//                }
//                map.put(groupName,value);
//                value= new HashMap<>();
//            }
//
//        }
//        info("共获取了",map.size()+"","个有效链接");
//        return map;
//    }

}
