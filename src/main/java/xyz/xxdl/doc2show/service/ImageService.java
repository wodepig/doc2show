package xyz.xxdl.doc2show.service;

import xyz.xxdl.doc2show.pojo.DocItem;

public interface ImageService {
    /**
     * 转换图片
     * @param imgUrl 图片下载路径
     * @param imgName 图片文件名
     * @param docItem
     * @return
     */
    String convertImage(String imgUrl,String imgName, DocItem docItem);
}
