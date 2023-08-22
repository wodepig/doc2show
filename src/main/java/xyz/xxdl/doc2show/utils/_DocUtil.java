package xyz.xxdl.doc2show.utils;

import cn.hutool.core.img.ImgUtil;
import cn.hutool.core.io.FileUtil;
import cn.hutool.core.util.StrUtil;
import cn.hutool.core.util.URLUtil;
import cn.hutool.http.HttpUtil;
import com.vladsch.flexmark.html.renderer.ResolvedLink;
import com.vladsch.flexmark.html2md.converter.FlexmarkHtmlConverter;
import com.vladsch.flexmark.parser.Parser;
import com.vladsch.flexmark.util.data.MutableDataSet;
import lombok.extern.slf4j.Slf4j;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.beans.factory.annotation.Autowired;
import xyz.xxdl.doc2show.enums.DocEnum;
import xyz.xxdl.doc2show.flexmark.HtmlConverterTextExtension;
import xyz.xxdl.doc2show.pojo.DocConfig;
import xyz.xxdl.doc2show.pojo.DocItem;
import xyz.xxdl.doc2show.pojo.DocLink;
import xyz.xxdl.doc2show.service.ImageService;
import xyz.xxdl.doc2show.service.impl.AllImageServiceImpl;
import xyz.xxdl.doc2show.service.impl.LocalImageServiceImpl;
import xyz.xxdl.doc2show.service.impl.OssImageServiceImpl;

import java.io.File;
import java.io.IOException;
import java.net.URL;
import java.util.*;

@Slf4j
public class _DocUtil {
    @Autowired
    public static  ImageService localImageService;
    @Autowired
    public static ImageService ossImageService;
    @Autowired
    public static ImageService allImageService;



    @Autowired
    static DocConfig docConfig;



    /**
     * 将docLink转换成md字符串
     * @param docLink
     * @param docItem
     * @return
     */
    public static String link2Md(DocLink docLink,DocItem docItem){
        log.info("从{}中获取完整的html",docLink.getHref());
        // 完整的html
        Elements select = JsoupUtil.fromUrlAndClass(docLink.getHref(), docItem.getPageBody(),docItem);
        String html = select.html();
        MutableDataSet options = new MutableDataSet()
                .set(Parser.EXTENSIONS, Arrays.asList(HtmlConverterTextExtension.create(docItem)));

        String markdown = FlexmarkHtmlConverter.builder(options).build().convert(html);
        return markdown;
    }

    public static String convertImage(ResolvedLink link,DocItem docItem){
        String type = docItem.getImgSaveType() == null ? docConfig.getImgSaveType() : docItem.getImgSaveType();


        switch (type){
            case "local":
                return localImageService.convertImage(link,null,null,docItem);
            case "oss":
                return ossImageService.convertImage(link,null,null,docItem);
            case "all":
                return  allImageService.convertImage(link,null,null,docItem);
        }
        return "";

    }
    public static void saveMdStr(String mdStr,DocLink docLink,File savePath){
        File file = FileUtil.touch(
                FileUtil.file(savePath, docLink.getGroup(),docLink.getTitle())
                + ".md"
        );
        log.info("写入文件到{}",file.getPath());
        FileUtil.writeUtf8String(mdStr,file);
    }

    public static void main(String[] args) {

        System.out.println(FileUtil.file("c://a/config/" , "/mds","c",".md").getPath());
    }
    /**
     * 获得所有的待爬取的链接(排序后的)
     * @param docItem
     * @return
     */
    public static List<DocLink> allLinks(DocItem docItem){
        log.info("获取{}下的所有待爬取的链接",docItem.getName());
        Elements select = JsoupUtil.fromUrlAndClass(docItem.getUrl(), docItem.getSidebar(),docItem);
        log.info("解析{}中的所有链接",docItem.getSidebar());
        List<DocLink> list = new ArrayList<>();
        for (int i = 0; i < select.size(); i++) {
            if (i == 0){
                continue;
            }
            Element element = select.get(i);
            Elements links = element.select("a[href]");
            if (!links.isEmpty()) {
                String groupName = element.previousElementSibling().text().trim();

                for (Element link : links) {
                    String title = link.text();
                    String url = link.attr("href");
                    url = getAbsoluteUrl(docItem.getHost(),url);
                    if (url.contains("#")){
                        continue;
                    }
                    list.add(new DocLink(url,title,groupName));
                }
            }

        }
        return list;
    }

    /**
     * 获取绝对链接
     * @param baseUrl 基础链接
     * @param relativeUrl 相对链接或绝对链接
     * @return 完整链接
     */
    public static String getAbsoluteUrl(String baseUrl, String relativeUrl) {
        if (relativeUrl.startsWith("http")){
            return relativeUrl;
        }
        try {
            URL url = new URL(new URL(baseUrl), relativeUrl);
            return url.toString();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return "";
    }


}
