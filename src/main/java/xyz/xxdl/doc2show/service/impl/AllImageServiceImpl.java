package xyz.xxdl.doc2show.service.impl;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import xyz.xxdl.doc2show.pojo.DocItem;
import xyz.xxdl.doc2show.service.ImageService;

@Service
@Qualifier("allImageService")
public class AllImageServiceImpl implements ImageService {
    @Override
    public String convertImage(String imgUrl,String imgName, DocItem docItem) {
        return null;
    }
}
