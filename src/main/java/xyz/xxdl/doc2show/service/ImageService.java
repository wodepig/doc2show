package xyz.xxdl.doc2show.service;

import xyz.xxdl.doc2show.pojo.DocItem;

public interface ImageService {
    String convertImage(String imgUrl, DocItem docItem);
}
