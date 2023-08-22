package xyz.xxdl.doc2show.service.impl;

import cn.hutool.core.codec.Base64;
import cn.hutool.core.io.FileUtil;
import com.vladsch.flexmark.html.renderer.ResolvedLink;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import xyz.xxdl.doc2show.config.SysConstant;
import xyz.xxdl.doc2show.factory.ImageProviderFactory;
import xyz.xxdl.doc2show.pojo.DocConfig;
import xyz.xxdl.doc2show.pojo.DocItem;
import xyz.xxdl.doc2show.service.ImageService;
import xyz.xxdl.doc2show.utils.FileUtils;
import xyz.xxdl.doc2show.utils._DocUtil;

@Service
@Slf4j
@Qualifier("noneImageServiceImpl")
public class NoneImageServiceImpl implements ImageService, InitializingBean {
    @Autowired
    private DocConfig docConfig;
    @Override
    public String convertImage(ResolvedLink link, String imgUrl, String imgName, DocItem docItem) {
        String url = link.getUrl();
        url = FileUtils.isBase64(url);
        if (Base64.isBase64(url)){
            return link.getUrl();
        }else {
            return _DocUtil.getAbsoluteUrl(docItem.getHost(), url);
        }

    }

    @Override
    public void afterPropertiesSet() throws Exception {
        ImageProviderFactory.register(SysConstant.IMAGE_SAVE_TYPE_NONE,this);
    }
}
