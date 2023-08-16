package xyz.xxdl.doc2show.service.impl;

import cn.hutool.core.codec.Base64;
import cn.hutool.core.io.FileUtil;
import cn.hutool.core.io.file.FileNameUtil;
import cn.hutool.core.util.StrUtil;
import cn.hutool.core.util.URLUtil;
import cn.hutool.http.HttpUtil;
import com.vladsch.flexmark.html.renderer.ResolvedLink;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import xyz.xxdl.doc2show.pojo.DocConfig;
import xyz.xxdl.doc2show.pojo.DocItem;
import xyz.xxdl.doc2show.service.ImageService;
import xyz.xxdl.doc2show.utils.CacheUtil;
import xyz.xxdl.doc2show.utils.FileUtils;
import xyz.xxdl.doc2show.utils._DocUtil;

import java.io.File;
import java.util.List;
import java.util.Map;

@Service
@Slf4j
@Qualifier("localImageService")
public class LocalImageServiceImpl implements ImageService {
    @Autowired
    private DocConfig docConfig;
    @Override
    public     String convertImage(ResolvedLink link, String imgUrl, String imgName, DocItem docItem) {
        String assetsPath = FileUtil.file(docItem.getWorkDir(), ".assets").getAbsolutePath();
        docItem.setImgSavePath(assetsPath);
        Map<String, String> map = FileUtils.link2Map(link, docItem);
        String fileName =  map.get("fileName");
        File file = FileUtil.file(assetsPath, fileName);
        if (docItem.getCache()){
            Boolean hasFileLocal = CacheUtil.hasFileLocal(fileName, assetsPath, null);
            if (hasFileLocal){
                return file.getAbsolutePath();
            }
        }
            return FileUtils.saveLocal(FileUtils.urlOrBase64(map.get("urlOrBase64")),file);
    }
}
