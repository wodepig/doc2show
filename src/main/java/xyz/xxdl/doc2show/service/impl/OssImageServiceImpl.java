package xyz.xxdl.doc2show.service.impl;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import xyz.xxdl.doc2show.pojo.DocItem;
import xyz.xxdl.doc2show.service.ImageService;

@Service
@Qualifier("ossImageService")
public class OssImageServiceImpl implements ImageService {
    @Override
    public String convertImage(String imgUrl, DocItem docItem) {
        return null;
    }
}
