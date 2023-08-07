package xyz.xxdl.doc2show.flexmark;

import org.jsoup.nodes.Element;
import org.jsoup.nodes.Node;
import org.jsoup.nodes.TextNode;
import org.jsoup.select.NodeVisitor;

public class VisitorSample {
    int wordCount;

    public void visit(Node node) {
        if (node instanceof TextNode) {
            visitTextNode((TextNode) node);
        } else if (node instanceof Element) {
            visitElement((Element) node);
        }

        // Descending into children
        for (Node child : node.childNodes()) {
            visit(child);
        }
    }

    private void visitTextNode(TextNode textNode) {
        // This is called for all TextNode nodes.
        String text = textNode.text();
        wordCount += text.split("\\W+").length;
    }

    private void visitElement(Element element) {
        // This is called for all Element nodes.
        // Add your logic here to handle specific element types.
    }

    void countWords(Node document) {
        wordCount = 0;
        visit(document);
        System.out.println("Word Count: " + wordCount);
    }
}
