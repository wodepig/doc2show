package xyz.xxdl.doc2show.service.impl;

import com.vladsch.flexmark.html.renderer.ResolvedLink;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import xyz.xxdl.doc2show.config.SysConstant;
import xyz.xxdl.doc2show.factory.ImageProviderFactory;
import xyz.xxdl.doc2show.pojo.DocConfig;
import xyz.xxdl.doc2show.pojo.DocItem;
import xyz.xxdl.doc2show.service.ImageService;

@Service
@Qualifier("allImageService")
public class AllImageServiceImpl implements ImageService, InitializingBean {

    @Autowired
    private DocConfig docConfig;
    @Autowired
    public static  ImageService localImageService;
    @Autowired
    public static ImageService ossImageService;
    @Override
    public String convertImage(ResolvedLink link,String imgUrl, String imgName, DocItem docItem) {
        ossImageService.convertImage(link,imgUrl,imgName,docItem);
        String filePath = localImageService.convertImage(link, imgUrl, imgName, docItem);
        return filePath;
    }

    @Override
    public void afterPropertiesSet() throws Exception {
        ImageProviderFactory.register(SysConstant.IMAGE_SAVE_TYPE_ALL,this);
    }
}
