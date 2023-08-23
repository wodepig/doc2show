package xyz.xxdl.doc2show.extend;

import cn.hutool.core.io.FileUtil;
import cn.hutool.core.util.HashUtil;
import com.vladsch.flexmark.html.renderer.ResolvedLink;
import com.vladsch.flexmark.html2md.converter.*;
import com.vladsch.flexmark.parser.Parser;
import com.vladsch.flexmark.util.data.DataHolder;
import com.vladsch.flexmark.util.data.MutableDataHolder;
import com.vladsch.flexmark.util.data.MutableDataSet;
import org.jetbrains.annotations.NotNull;
import org.jetbrains.annotations.Nullable;
import org.jsoup.nodes.Element;
import org.jsoup.nodes.Node;
import xyz.xxdl.doc2show.BaseTest;
import xyz.xxdl.doc2show.pojo.DocItem;
import xyz.xxdl.doc2show.pojo.DocLink;
import xyz.xxdl.doc2show.utils._DocUtil;

import java.io.File;
import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

public class HtmlToMarkdownCustomizedSample extends BaseTest {
    static class CustomLinkResolver implements HtmlLinkResolver {
        public CustomLinkResolver(HtmlNodeConverterContext context) {
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
                return new CustomLinkResolver(context);
            }
        }
    }

    static class HtmlConverterTextExtension implements FlexmarkHtmlConverter.HtmlConverterExtension {
        public static HtmlConverterTextExtension create() {
            return new HtmlConverterTextExtension();
        }

        @Override
        public void rendererOptions(@NotNull MutableDataHolder options) {

        }

        @Override
        public void extend(FlexmarkHtmlConverter.@NotNull Builder builder) {
            builder.linkResolverFactory(new CustomLinkResolver.Factory());
            builder.htmlNodeRendererFactory(new CustomHtmlNodeConverter.Factory());
        }
    }

    static class CustomHtmlNodeConverter implements HtmlNodeRenderer {
        public CustomHtmlNodeConverter(DataHolder options) {

        }

        @Override
        public Set<HtmlNodeRendererHandler<?>> getHtmlNodeRendererHandlers() {
            Set<HtmlNodeRendererHandler<?>> set = new HashSet<>();
            set.add(new HtmlNodeRendererHandler<>("h1", Element.class, this::processKbd));
            set.add(new HtmlNodeRendererHandler<>("h2", Element.class, this::processKbd));
            set.add(new HtmlNodeRendererHandler<>("h3", Element.class, this::processKbd));
            set.add(new HtmlNodeRendererHandler<>("h4", Element.class, this::processKbd));
            set.add(new HtmlNodeRendererHandler<>("code", Element.class, this::processCode));
            set.add(new HtmlNodeRendererHandler<>("link", Element.class, this::processCode));
//            set.add(new HtmlNodeRendererHandler<>("h3", Element.class, this::processKbd));
            return set;

        }
        private void processLink(Element node, HtmlNodeConverterContext context, HtmlMarkdownWriter out) {
            System.out.println();
        }

        private void processCode(Element node, HtmlNodeConverterContext context, HtmlMarkdownWriter out) {
            System.out.println();
        }
        private void processKbd(Element node, HtmlNodeConverterContext context, HtmlMarkdownWriter out) {
//             out.append(node.text());
//            node.removeAttr("id");
//            node.select("a").remove();
            String s = node.nodeName().toLowerCase();
            int h = Integer.parseInt(s.replace("h", ""));
            for (int i = 1; i < h; i++) {
                out.append("#");
            }
//            out.append(" ");
//            context.renderChildren(node, false, null);
//            out.append("<<");
            out.append(node.text());
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
                .set(Parser.EXTENSIONS, Collections.singletonList(HtmlConverterTextExtension.create()));

        DocItem docItem = getDocItem();
        String html = FileUtil.readUtf8String(docItem.getWorkDir() + "/ruoyi_功能组件.html");
        String markdown = FlexmarkHtmlConverter.builder(options).build().convert(html);
        DocLink docLink = new DocLink("","简单md","组名");
        _DocUtil.saveMdStr(markdown,docLink,new File(docItem.getWorkDir()));
    }
}