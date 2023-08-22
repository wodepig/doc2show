package xyz.xxdl.doc2show.flexmark;

import com.vladsch.flexmark.html2md.converter.*;
import com.vladsch.flexmark.util.data.DataHolder;
import org.jsoup.nodes.Element;
import xyz.xxdl.doc2show.pojo.DocItem;

import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

public class CustomHtmlNodeConverter implements HtmlNodeRenderer {
        private DataHolder options;
        private DocItem docItem;
        public CustomHtmlNodeConverter(DataHolder options,DocItem docItem) {
            this.options = options;
            this.docItem = docItem;
        }

        @Override
        public Set<HtmlNodeRendererHandler<?>> getHtmlNodeRendererHandlers() {
            Set<HtmlNodeRendererHandler<?>> set = new HashSet<>();
            set.add(new HtmlNodeRendererHandler<>("h1", Element.class, this::processH));
            set.add(new HtmlNodeRendererHandler<>("h2", Element.class, this::processH));
            set.add(new HtmlNodeRendererHandler<>("h3", Element.class, this::processH));
            set.add(new HtmlNodeRendererHandler<>("h4", Element.class, this::processH));
            set.add(new HtmlNodeRendererHandler<>("code", Element.class, this::processCode));
//            set.add(new HtmlNodeRendererHandler<>("h3", Element.class, this::processKbd));
            return set;
        }

    /**
     * 解析多等级标题标题
     * @param node
     * @param context
     * @param out
     */
        private void processH(Element node, HtmlNodeConverterContext context, HtmlMarkdownWriter out) {
            String s = node.nodeName().toLowerCase();
            int h = Integer.parseInt(s.replace("h", ""));
            for (int i = 1; i < h; i++) {
                out.append("#");
            }
            out.append(node.text());
        }

    /**
     * 解析代码
     * @param node
     * @param context
     * @param out
     */
    private void processCode(Element node, HtmlNodeConverterContext context, HtmlMarkdownWriter out) {
        System.out.println();
    }
        public static class Factory implements HtmlNodeRendererFactory {
            private DocItem docItem;

            public Factory(DocItem docItem) {
                this.docItem = docItem;
            }

            @Override
            public HtmlNodeRenderer apply(DataHolder options) {
                return new CustomHtmlNodeConverter(options,docItem);
            }
        }
    }