package xyz.xxdl.doc2show.service.impl;

import cn.hutool.core.io.FileUtil;
import cn.hutool.core.net.url.UrlBuilder;
import cn.hutool.core.util.StrUtil;
import cn.hutool.core.util.URLUtil;
import cn.hutool.http.HttpUtil;
import com.vladsch.flexmark.html.renderer.ResolvedLink;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import xyz.xxdl.doc2show.pojo.DocConfig;
import xyz.xxdl.doc2show.pojo.DocItem;
import xyz.xxdl.doc2show.pojo.OssConfig;
import xyz.xxdl.doc2show.service.ImageService;
import xyz.xxdl.doc2show.utils.CacheUtil;
import xyz.xxdl.doc2show.utils.FileUtils;

import java.util.Map;

@Service
@Qualifier("ossImageService")
public class OssImageServiceImpl implements ImageService {
    @Autowired
    private DocConfig docConfig;
    @Override
    public String convertImage(ResolvedLink link,String imgUrl, String imgName, DocItem docItem) {
        OssConfig ossConfig = docConfig.getOssConfig();
        docItem.setImgSavePath(".assets");
        Map<String, String> map = FileUtils.link2Map(link, docItem);
        // 填写不包含Bucket名称在内的Object完整路径，例如exampleobject.txt。
        String objectName = docItem.getImgSavePath() + "/" +  map.get("fileName");
        // 访问路径
        String shareUrl = ossConfig.getUrl();
        if (shareUrl == null){
            shareUrl = "https://" + ossConfig.getBucketName() + "." + ossConfig.getEndpoint();
        }
        if (docItem.getCache()){
            Boolean cacheHit = CacheUtil.hasFileOss(objectName,ossConfig);
            if (cacheHit){
                return  shareUrl + "/" + objectName;
            }
        }
        // 上传文件
        FileUtils.saveOss(FileUtils.urlOrBase64(map.get("urlOrBase64")),objectName,ossConfig);
        return  shareUrl + "/" + objectName;
    }
}
