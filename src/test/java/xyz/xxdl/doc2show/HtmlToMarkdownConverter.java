package xyz.xxdl.doc2show;

import com.vladsch.flexmark.html.HtmlRenderer;
import com.vladsch.flexmark.html2md.converter.FlexmarkHtmlConverter;
import com.vladsch.flexmark.parser.Parser;
import com.vladsch.flexmark.util.data.MutableDataSet;
import com.vladsch.flexmark.util.ast.Node;
import com.vladsch.flexmark.util.ast.NodeVisitor;
import com.vladsch.flexmark.util.ast.VisitHandler;
 public class HtmlToMarkdownConverter {
    public static void main(String[] args) {
        String html = "<p>This is <strong>bold</strong> and <em>italic</em> text.</p>";
         MutableDataSet options = new MutableDataSet();

        Parser parser = Parser.builder(options).build();
        HtmlRenderer renderer = HtmlRenderer.builder(options).build();
         Node document = parser.parse(html);
        String markdown = renderer.render(document);
         System.out.println(markdown);
    }
}