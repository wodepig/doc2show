package xyz.xxdl.doc2show;

import cn.hutool.core.util.StrUtil;
import cn.hutool.http.HttpRequest;
import cn.hutool.http.HttpUtil;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

import java.io.IOException;
import java.net.URL;

public class HutoolLinkExtractor2 {
    public static void main(String[] args) {
        String baseUrl = "https://doc.iocoder.cn/intro";
        String url = "https://doc.iocoder.cn";

        try {
            // 发送GET请求获取网页内容

           String html =  HttpRequest.get(baseUrl)
                    .header("User-Agent", "Mozilla/5.0 (compatible; Baiduspider/2.0; +http://www.baidu.com/search/spider.html)")
                   .execute()
                    .body();


            // 使用Jsoup解析HTML页面
            Document document = Jsoup.parse(html);

            // 选择类为.sitebar的元素
            Elements sidebarElements = document.select(".sidebar");
            Elements linksA = sidebarElements.select("a");
            for (Element element : linksA) {
                String href = element.absUrl("href");
                String absoluteUrl = getAbsoluteUrl(baseUrl, href);
                // 过滤掉空链接和非HTTP/HTTPS链接
                if (StrUtil.isNotBlank(absoluteUrl) && (absoluteUrl.startsWith("http://") || absoluteUrl.startsWith("https://"))) {

                    // 遍历链接并输出有效链接
                    System.out.println(absoluteUrl);
                }
            }





        } catch (Exception e) {
            e.printStackTrace();
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
