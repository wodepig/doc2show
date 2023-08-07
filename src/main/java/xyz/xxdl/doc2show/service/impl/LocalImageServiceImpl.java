package xyz.xxdl.doc2show.service.impl;

import cn.hutool.core.io.FileUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import xyz.xxdl.doc2show.pojo.DocConfig;
import xyz.xxdl.doc2show.pojo.DocItem;
import xyz.xxdl.doc2show.service.ImageService;
@Service
@Slf4j
@Qualifier("localImageService")
public class LocalImageServiceImpl implements ImageService {
    @Autowired
    private DocConfig docConfig;
    @Override
    public String convertImage(String imgUrl, DocItem docItem) {
        log.info("保存图片到本地");
        //.assets
        String assets = FileUtil.file(docItem.getWorkDir(),".assets").getAbsolutePath();
        Boolean useCache = docItem.getCache();
        if (!useCache){
            log.info("不使用缓存,重新下载所有图片");

        }else {

        }
        return null;
    }
}
