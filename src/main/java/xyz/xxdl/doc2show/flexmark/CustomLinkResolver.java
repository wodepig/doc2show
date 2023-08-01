package xyz.xxdl.doc2show.flexmark;

import com.vladsch.flexmark.html.renderer.ResolvedLink;
import com.vladsch.flexmark.html2md.converter.HtmlLinkResolver;
import com.vladsch.flexmark.html2md.converter.HtmlLinkResolverFactory;
import com.vladsch.flexmark.html2md.converter.HtmlNodeConverterContext;
import org.jetbrains.annotations.Nullable;
import org.jsoup.nodes.Node;
import xyz.xxdl.doc2show.pojo.DocItem;

import java.util.Set;

public class CustomLinkResolver implements HtmlLinkResolver {
    private DocItem docItem;
        public CustomLinkResolver(HtmlNodeConverterContext context,DocItem docItem) {
            this.docItem = docItem;
        }

        @Override
        public ResolvedLink resolveLink(Node node, HtmlNodeConverterContext context, ResolvedLink link) {
            // convert all links from http:// to https://
            if (link.getUrl().startsWith("http:")) {
                return link.withUrl("https:" + link.getUrl().substring("http:".length()));
            }
            return link;
        }

       public static class Factory implements HtmlLinkResolverFactory {
            private DocItem docItem;
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


           public Factory(DocItem docItem) {
               this.docItem = docItem;
           }

           @Override
            public HtmlLinkResolver apply(HtmlNodeConverterContext context) {
                return new CustomLinkResolver(context,docItem);
            }
        }
    }
