package page;

import cn.hutool.core.io.FileUtil;
import cn.hutool.http.HttpUtil;
import com.vladsch.flexmark.html2md.converter.FlexmarkHtmlConverter;
import com.vladsch.flexmark.parser.Parser;
import com.vladsch.flexmark.util.data.MutableDataSet;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.select.Elements;
import xyz.xxdl.doc2show.HtmlToMarkdownCustomizedSample;
import xyz.xxdl.doc2show.flexmark.HtmlConverterTextExtension;
import xyz.xxdl.doc2show.pojo.DocItem;

import java.util.Arrays;

public class PageDemo {
    public static void main(String[] args) {
        String html = FileUtil.readUtf8String("C:\\Users\\admindc\\Documents\\ideaProject\\doc2show\\test_file\\pageBody.html");
        System.out.println("原始长度" + html.length());
        Document doc = Jsoup.parse(html);
//        html = doc.select(".sidebar-links").html();
        String select = doc.select(".theme-vdoing-wrapper").html();
        System.out.println("内容长度" + select.length());
//        System.out.println(select);
        DocItem item = new DocItem();
        MutableDataSet options = new MutableDataSet()
                .set(Parser.EXTENSIONS, Arrays.asList(HtmlConverterTextExtension.create(item)));

        String markdown = FlexmarkHtmlConverter.builder(options).build().convert(select);
        System.out.println("md的长度: "  + markdown.length());
        System.out.println(markdown);
    }
}
