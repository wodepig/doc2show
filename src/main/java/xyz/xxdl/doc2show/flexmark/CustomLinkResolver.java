package xyz.xxdl.doc2show.flexmark;

import com.vladsch.flexmark.html.renderer.ResolvedLink;
import com.vladsch.flexmark.html2md.converter.HtmlLinkResolver;
import com.vladsch.flexmark.html2md.converter.HtmlLinkResolverFactory;
import com.vladsch.flexmark.html2md.converter.HtmlNodeConverterContext;
import org.jetbrains.annotations.Nullable;
import org.jsoup.nodes.Node;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import xyz.xxdl.doc2show.enums.DocEnum;
import xyz.xxdl.doc2show.pojo.DocConfig;
import xyz.xxdl.doc2show.pojo.DocItem;
import xyz.xxdl.doc2show.utils._DocUtil;

import java.util.Set;

@Component
public class CustomLinkResolver implements HtmlLinkResolver {
    @Autowired
    private DocConfig docConfig;
    private DocItem docItem;
        public CustomLinkResolver(HtmlNodeConverterContext context,DocItem docItem) {
            this.docItem = docItem;
        }

        @Override
        public ResolvedLink resolveLink(Node node, HtmlNodeConverterContext context, ResolvedLink link) {
            if (!link.getLinkType().getName().equals("IMAGE")){
                return link;
            }
            String url = _DocUtil.convertImage(link,docItem);
            return link.withUrl(url);
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
