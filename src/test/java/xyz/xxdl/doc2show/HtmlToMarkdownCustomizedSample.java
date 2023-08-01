package xyz.xxdl.doc2show;

import com.vladsch.flexmark.ext.tables.TablesExtension;
import com.vladsch.flexmark.html.renderer.NodeRenderingHandler;
import com.vladsch.flexmark.html.renderer.ResolvedLink;
import com.vladsch.flexmark.html2md.converter.*;
import com.vladsch.flexmark.parser.Parser;
import com.vladsch.flexmark.util.ast.NodeVisitor;
import com.vladsch.flexmark.util.data.DataHolder;
import com.vladsch.flexmark.util.data.DataKey;
import com.vladsch.flexmark.util.data.MutableDataHolder;
import com.vladsch.flexmark.util.data.MutableDataSet;
import org.jetbrains.annotations.NotNull;
import org.jetbrains.annotations.Nullable;
import org.jsoup.nodes.Element;
import org.jsoup.nodes.Node;

import java.util.Arrays;
import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

public class HtmlToMarkdownCustomizedSample {
    static class CustomLinkResolver implements HtmlLinkResolver {
        private String s;
        public CustomLinkResolver(HtmlNodeConverterContext context,String s) {
            this.s = s;
        }

        @Override
        public ResolvedLink resolveLink(Node node, HtmlNodeConverterContext context, ResolvedLink link) {
            // convert all links from http:// to https://
            if (link.getUrl().startsWith("http:")) {
                return link.withUrl("https:" + link.getUrl().substring("http:".length()));
            }
            return link;
        }

        static class Factory implements HtmlLinkResolverFactory {
            private String s;

            public Factory(String s) {
                this.s = s;
            }

            @Nullable
            @Override
            public Set<Class<?>> getAfterDependents() {
                return null;
            }

            @Nullable
            @Override
            public Set<Class<?>> getBeforeDependents() {
                return null;
            }

            @Override
            public boolean affectsGlobalScope() {
                return false;
            }

            @Override
            public HtmlLinkResolver apply(HtmlNodeConverterContext context) {
                return new CustomLinkResolver(context,s);
            }
        }
    }

    static class HtmlConverterTextExtension implements FlexmarkHtmlConverter.HtmlConverterExtension {
        private String s;
        public static   HtmlConverterTextExtension create(String s) {
            return new HtmlConverterTextExtension(s);
        }

        public HtmlConverterTextExtension(String s) {
            this.s = s;
        }

        @Override
        public void rendererOptions(@NotNull MutableDataHolder options) {
            System.out.println();
        }

        @Override
        public void extend(FlexmarkHtmlConverter.@NotNull Builder builder) {
            builder.linkResolverFactory(new CustomLinkResolver.Factory(s));
            builder.htmlNodeRendererFactory(new CustomHtmlNodeConverter.Factory());
        }
    }

    static class CustomHtmlNodeConverter implements HtmlNodeRenderer {
        private DataHolder options;
        public CustomHtmlNodeConverter(DataHolder options) {
            this.options = options;
        }


        @Override
        public Set<HtmlNodeRendererHandler<?>> getHtmlNodeRendererHandlers() {
            Set<HtmlNodeRendererHandler<?>> handlers = new HashSet<>();

            // 添加自定义的 NodeRenderingHandler
            return new HashSet<>(Collections.singletonList(
                    new HtmlNodeRendererHandler<>("kbd", Element.class, this::processKbd)
            ));
            /*return new HashSet<>(Collections.singletonList(
                    new HtmlNodeRendererHandler<>("kdb", Element.class, this::processKbd)
            ));*/

        }

        private void processKbd(Element node, HtmlNodeConverterContext context, HtmlMarkdownWriter out) {
            System.out.println();
            //out.append("<<");
            //context.renderChildren(node, false, null);
            //.append(">>");
        }

        static class Factory implements HtmlNodeRendererFactory {
            @Override
            public HtmlNodeRenderer apply(DataHolder options) {
                return new CustomHtmlNodeConverter(options);
            }
        }
    }

    public static void main(String[] args) {

        MutableDataSet options = new MutableDataSet()
                .set(Parser.EXTENSIONS, Arrays.asList( HtmlConverterTextExtension.create("9999")))
        // 添加转换参数
        .set(FlexmarkHtmlConverter.CODE_INDENT,"100")
        .set(FlexmarkHtmlConverter.EOL_IN_TITLE_ATTRIBUTE,"888")
        // 无序列表的分割
        .set(FlexmarkHtmlConverter.UNORDERED_LIST_DELIMITER,'*');
        String html = "<ul>\n" +
                "  <li>\n" +
                "    <p>Add: live templates starting with <code>.</code> <kbd>kbd<li>1</li></kbd> <a href='http://example.com'>link</a></p>\n" +
                "    <table>\n" +
                "      <thead>\n" +
                "        <tr><th> Element       </th><th> Abbreviation    </th><th> Expansion                                               </th></tr>\n" +
                "      </thead>\n" +
                "      <tbody>\n" +
                "        <tr><td> Abbreviation  </td><td> <code>.abbreviation</code> </td><td> <code>*[]:</code>                                                 </td></tr>\n" +
                "        <tr><td> Code fence    </td><td> <code>.codefence</code>    </td><td> ``` ... ```                                       </td></tr>\n" +
                "        <tr><td> Explicit link </td><td> <code>.link</code>         </td><td> <code>[]()</code>                                                  </td></tr>\n" +
                "      </tbody>\n" +
                "    </table>\n" +
                "  </li>\n" +
                "</ul>";
        String markdown = FlexmarkHtmlConverter.builder(options).build().convert(html);

        System.out.println("HTML:");
        System.out.println(html);

        System.out.println("\nMarkdown:");
        System.out.println(markdown);
    }
}
