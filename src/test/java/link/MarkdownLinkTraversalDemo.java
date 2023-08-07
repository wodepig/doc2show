package link;

import cn.hutool.core.io.FileUtil;
import com.vladsch.flexmark.ast.Link;
import com.vladsch.flexmark.ast.Text;
import com.vladsch.flexmark.ast.TextBase;
import com.vladsch.flexmark.ext.autolink.AutolinkExtension;
import com.vladsch.flexmark.html2md.converter.FlexmarkHtmlConverter;
import com.vladsch.flexmark.parser.Parser;
import com.vladsch.flexmark.util.ast.Node;
import com.vladsch.flexmark.util.data.MutableDataSet;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import xyz.xxdl.doc2show.pojo.DocLink;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class MarkdownLinkTraversalDemo {
    public static void main(String[] args) {
        MutableDataSet options = new MutableDataSet();
        String html = FileUtil.readUtf8String("C:\\Users\\admindc\\Documents\\ideaProject\\doc2show\\test_file\\intro.html");
        Document doc = Jsoup.parse(html);
//        html = doc.select(".sidebar-links").html();
        Elements select = doc.select(".sidebar-links");
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
                        if (url.contains("#")){
                            continue;
                        }
                        list.add(new DocLink(url,title,groupName));
                    }
                }

        }


        for (DocLink docLink : list) {
            System.out.println(docLink.getGroup() + " "  + docLink.getTitle() + " " + docLink.getHref());
        }
        String markdown = FlexmarkHtmlConverter.builder().build().convert(html);
        //String markdown = "[Example 1](https://example.com)\n" +
               // "[Example 2](https://example.org)";
//        System.out.println(markdown);
        /*Parser parser = Parser.builder()
                .extensions(Arrays.asList(AutolinkExtension.create()))
                .build();*/

//        Node document = parser.parse(markdown);

//        traverseLinks(document);
    }

    public static void traverseLinks(Node node) {
        System.out.println("节点类型" + node.getNodeName());
        if (node instanceof TextBase){
            TextBase text = (TextBase)node;
            System.out.println(text);
            System.out.println("我是标题title" +text.toAstString(false));
        }
        if (node instanceof Link) {
            Link linkNode = (Link) node;
            String url = linkNode.getUrl().toString();
            String text = linkNode.getText().toString();
            Node parent = node.getParent().getGrandParent();
//            System.out.println("Link Text: " + text);
//            System.out.println("Link URL: " + url);
        }

        for (Node child : node.getChildren()) {
            traverseLinks(child);
        }
    }
}
