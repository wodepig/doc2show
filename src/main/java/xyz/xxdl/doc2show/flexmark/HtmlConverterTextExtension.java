package xyz.xxdl.doc2show.flexmark;

import com.vladsch.flexmark.html2md.converter.FlexmarkHtmlConverter;
import com.vladsch.flexmark.util.data.MutableDataHolder;
import org.jetbrains.annotations.NotNull;
import xyz.xxdl.doc2show.pojo.DocItem;

public   class HtmlConverterTextExtension implements FlexmarkHtmlConverter.HtmlConverterExtension {
        private   DocItem docItem;
        public static   HtmlConverterTextExtension create(DocItem docItem) {
            return new HtmlConverterTextExtension(docItem);
        }

    public HtmlConverterTextExtension(DocItem docItem) {
        this.docItem = docItem;
    }

    @Override
        public void rendererOptions(@NotNull MutableDataHolder options) {
        }

        @Override
        public void extend(FlexmarkHtmlConverter.@NotNull Builder builder) {
            builder.linkResolverFactory(new CustomLinkResolver.Factory(docItem));
            builder.htmlNodeRendererFactory(new CustomHtmlNodeConverter.Factory(docItem));
        }
    }