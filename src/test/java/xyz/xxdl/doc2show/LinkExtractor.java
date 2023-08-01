package xyz.xxdl.doc2show;

import cn.hutool.http.HttpRequest;
import cn.hutool.http.HttpUtil;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

public class LinkExtractor {
    public static void main(String[] args) {
        // 指定要抓取的网页链接
        String url = "https://doc.iocoder.cn/intro";
        String baseUrl = "https://doc.iocoder.cn/mall/build/";

        // 发送GET请求获取网页内容
        String html =  HttpRequest.get(baseUrl)
                .header("User-Agent", "Mozilla/5.0 (compatible; Baiduspider/2.0; +http://www.baidu.com/search/spider.html)")
                .execute()
                .body();
        System.out.println(html);
        // 使用Jsoup解析HTML页面
        Document doc = Jsoup.parse(html);

        // 提取具有.sidebar类的链接
        Elements links = doc.select(".sidebar a");

        // 遍历链接并输出
        for (Element link : links) {
            String href = link.absUrl("href");
            System.out.println(href);
        }
    }
}
