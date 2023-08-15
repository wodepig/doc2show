package link;

import cn.hutool.core.io.FileUtil;
import com.vladsch.flexmark.html2md.converter.FlexmarkHtmlConverter;
import com.vladsch.flexmark.parser.Parser;
import com.vladsch.flexmark.util.data.MutableDataSet;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.select.Elements;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import xyz.xxdl.doc2show.Doc2showApplication;
import xyz.xxdl.doc2show.flexmark.HtmlConverterTextExtension;
import xyz.xxdl.doc2show.pojo.DocConfig;
import xyz.xxdl.doc2show.pojo.DocItem;
import xyz.xxdl.doc2show.utils.JsoupUtil;
import xyz.xxdl.doc2show.utils._DocUtil;

import java.util.Arrays;

@SpringBootTest(classes = Doc2showApplication.class)
public class LocalImgTest {

    @Autowired
    private DocConfig docConfig;

    @Test
    public void localTest(){
        System.out.println();
    }
    public static void main(String[] args) {
        DocItem docItem = new DocItem();
        docItem.setUrl("https://doc.iocoder.cn/intro");
        docItem.setName("RuoYiVuePro");
        docItem.setEnable(true);
        docItem.setCache(true);
        docItem.setCacheFileName("RuoYiVuePro");
        docItem.setSavePath("RuoYiVuePro");
        docItem.setPageBody(".theme-vdoing-wrapper");
        docItem.setSidebar(".sidebar-links");
        docItem.setHost("https://doc.iocoder.cn");
        docItem.setWorkDir("C:\\Users\\admindc\\Documents\\ideaProject\\doc2show\\test_file");
        docItem.setGetLink(false);

        docItem.setUrl("C:\\Users\\admindc\\Documents\\ideaProject\\doc2show\\test_file\\imgtest.html");
        Elements elements = JsoupUtil.fromUrlAndClass(docItem.getUrl(), docItem.getPageBody());
        String html = elements.html();
        System.out.println();
        MutableDataSet options = new MutableDataSet()
                .set(Parser.EXTENSIONS, Arrays.asList(HtmlConverterTextExtension.create(docItem)));

        String markdown = FlexmarkHtmlConverter.builder(options).build().convert(html);
        System.out.println();
    }
}
