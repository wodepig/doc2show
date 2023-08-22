package xyz.xxdl.doc2show.service;

import com.vladsch.flexmark.html.renderer.ResolvedLink;
import org.springframework.stereotype.Component;
import xyz.xxdl.doc2show.pojo.DocItem;
public interface ImageService {
    /**
     * 转换图片
     * @param link 绝对路径,相对路径,base64编码
     * @param imgUrl 图片下载路径
     * @param imgName 图片文件名
     * @param docItem
     * @return
     */
    String convertImage(ResolvedLink link,String imgUrl, String imgName, DocItem docItem);
}
