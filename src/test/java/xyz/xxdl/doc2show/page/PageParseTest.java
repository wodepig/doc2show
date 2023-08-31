package xyz.xxdl.doc2show.page;

import cn.hutool.core.io.FileUtil;
import cn.hutool.http.HttpUtil;
import cn.hutool.json.JSONArray;
import cn.hutool.json.JSONObject;
import cn.hutool.json.JSONUtil;
import com.vladsch.flexmark.html2md.converter.FlexmarkHtmlConverter;
import com.vladsch.flexmark.parser.Parser;
import com.vladsch.flexmark.util.data.MutableDataSet;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import xyz.xxdl.doc2show.BaseTest;
import xyz.xxdl.doc2show.flexmark.HtmlConverterTextExtension;
import xyz.xxdl.doc2show.pojo.DocItem;
import xyz.xxdl.doc2show.pojo.DocLink;
import xyz.xxdl.doc2show.service.impl.OssImageServiceImpl;
import xyz.xxdl.doc2show.utils._DocUtil;

import java.io.File;
import java.util.Arrays;
import java.util.List;

/**
 * 测试解析文件
 *
 */
public class PageParseTest extends BaseTest {

    public static void main(String[] args)throws Exception {

    }
    static class PageTest extends BaseTest {
        public static void main(String[] args) {
            DocItem docItem = getDocItem();
            // 也可以从本地文件中读取链接信息
            docItem.setUrl(docItem.getWorkDir() + "/linkTest.html");
            String html = FileUtil.readUtf8String(docItem.getUrl());
            String markdown = FlexmarkHtmlConverter.builder().build().convert(html);
        }
    }

    /**
     * 取得待爬取的链接
     */
    static class LinkTest extends BaseTest{
        public static void main(String[] args) {
             DocItem docItem = getDocItem();
             // 也可以从本地文件中读取链接信息
             docItem.setUrl(docItem.getWorkDir() + "/linkTest.html");
             List<DocLink> list = _DocUtil.allLinks(docItem);
             for (DocLink docLink : list) {
                 System.out.println(JSONUtil.toJsonStr(docLink));
             }
         }
    }
}
