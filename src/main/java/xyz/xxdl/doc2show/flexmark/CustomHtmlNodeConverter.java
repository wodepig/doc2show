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
            return new HashSet<>(Collections.singletonList(
                    new HtmlNodeRendererHandler<>(null, Element.class, this::processKbd)
            ));
        }

        private void processKbd(Element node, HtmlNodeConverterContext context, HtmlMarkdownWriter out) {
            //out.append("<<");
            //context.renderChildren(node, false, null);
            //.append(">>");
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