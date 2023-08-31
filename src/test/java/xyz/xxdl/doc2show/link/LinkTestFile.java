package xyz.xxdl.doc2show.link;

import cn.hutool.json.JSONUtil;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import xyz.xxdl.doc2show.BaseTest;
import xyz.xxdl.doc2show.pojo.DocItem;
import xyz.xxdl.doc2show.pojo.DocLink;
import xyz.xxdl.doc2show.utils.JsoupUtil;
import xyz.xxdl.doc2show.utils._DocUtil;

import java.util.ArrayList;
import java.util.List;

import static xyz.xxdl.doc2show.utils._DocUtil.getAbsoluteUrl;

public class LinkTestFile{
    /**
     * 取得待爬取的链接
     */
    static class LinkTest1 extends BaseTest {
        public static void main(String[] args) {
            DocItem docItem = getDocItem();
            // 本地文件中读取链接信息
            docItem.setUrl(docItem.getWorkDir() + "/linkTest1.html");
            List<DocLink> list = _DocUtil.allLinks(docItem);
            for (DocLink docLink : list) {
                System.out.println(JSONUtil.toJsonStr(docLink));
            }
        }
    }
    /**
     * 取得待爬取的链接
     */
    static class LinkTest extends BaseTest {
        public static void main(String[] args) {
            DocItem docItem = getDocItem();
            // 从url中获取文档链接
            List<DocLink> list = _DocUtil.allLinks(docItem);
            for (DocLink docLink : list) {
                System.out.println(JSONUtil.toJsonStr(docLink));
            }
        }
    }

}
