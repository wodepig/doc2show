package xyz.xxdl.doc2show.image;

import cn.hutool.core.io.FileUtil;
import cn.hutool.core.util.StrUtil;
import cn.hutool.core.util.URLUtil;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import xyz.xxdl.doc2show.BaseTest;
import xyz.xxdl.doc2show.Doc2showApplication;
import xyz.xxdl.doc2show.service.ImageService;
import xyz.xxdl.doc2show.service.impl.AllImageServiceImpl;
import xyz.xxdl.doc2show.service.impl.LocalImageServiceImpl;
import xyz.xxdl.doc2show.service.impl.OssImageServiceImpl;

import java.io.File;
import java.lang.reflect.Field;
import java.net.URL;

/**
 * 测试图片的保存
 */
public class ImageTest extends BaseTest {
    public static void main(String[] args)throws Exception {
        imageTest(new LocalImageServiceImpl());
       imageTest(new OssImageServiceImpl());
//       imageTest(new AllImageServiceImpl());

    }


    /**
     * 保存图片
     */
    public static void imageTest(ImageService service)throws Exception{
        Class<? extends ImageService> aClass = service.getClass();
        Field docConfig = aClass.getDeclaredField("docConfig");
        docConfig.setAccessible(true);
        docConfig.set(service,getDocConfig());
        String base64Path = service.convertImage(getResolvedLinkBase64(), "", "", getDocItem());
        System.out.println("base64格式的图片保存路径: " + base64Path);
        String relativeUrl = service.convertImage(getResolvedLinkRelativeUrl(), "", "", getDocItem());
        System.out.println("相对链接格式的图片保存路径: " + relativeUrl);
        String absolutelyPath = service.convertImage(getResolvedLinkAbsolutelyUrl(), "", "", getDocItem());
        System.out.println("绝对链接的格式图片保存路径: " + absolutelyPath);
    }

}
