package xyz.xxdl.doc2show;

import cn.hutool.core.io.FileUtil;
import cn.hutool.core.util.StrUtil;
import cn.hutool.http.HttpRequest;
import cn.hutool.http.HttpUtil;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

import java.io.IOException;
import java.net.URL;

public class LinkExtractor {
    public static void main(String[] args) {
        // 指定要抓取的网页链接
        String url = "https://doc.iocoder.cn/intro";
        String baseUrl = "https://doc.iocoder.cn/";

        // 发送GET请求获取网页内容
       /* String html =  HttpRequest.get(baseUrl)
                .header("User-Agent", "Mozilla/5.0 (compatible; Baiduspider/2.0; +http://www.baidu.com/search/spider.html)")
                .execute()
                .body();*/
        String html = FileUtil.readUtf8String("C:\\Users\\admindc\\Documents\\ideaProject\\doc2show\\test_file\\intro.html");
//        System.out.println(html);
        // 使用Jsoup解析HTML页面
        Document doc = Jsoup.parse(html);

        // 提取具有.sidebar类的链接
        Elements links = doc.select(".sidebar a");
        doc.setBaseUri(baseUrl);
        // 遍历链接并输出
        for (Element link : links) {
            String href = link.attr("abs:href");
            String absoluteUrl = getAbsoluteUrl(baseUrl, href);
            // 过滤掉空链接和非HTTP/HTTPS链接
            if (StrUtil.isNotBlank(absoluteUrl) && (absoluteUrl.startsWith("http://") || absoluteUrl.startsWith("https://"))) {

                // 遍历链接并输出有效链接
                System.out.println(absoluteUrl);
            }
        }
    }
    private static String getAbsoluteUrl(String baseUrl, String relativeUrl) {
        try {
            URL url = new URL(new URL(baseUrl), relativeUrl);
            return url.toString();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return "";
    }
}
