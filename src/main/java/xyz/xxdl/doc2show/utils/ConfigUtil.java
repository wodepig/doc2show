package xyz.xxdl.doc2show.utils;

import com.aliyun.oss.OSSClient;
import io.github.furstenheim.CopyDown;

import java.util.HashMap;
import java.util.Map;
import java.util.ResourceBundle;
import java.util.regex.Pattern;

/**
 * Package:xxdl.xyz.utils
 * Description: 一些通用的配置项
 *
 * @date:2023.03.13 21:27
 * @author:wodepig dddgoal@163.com
 */
public class ConfigUtil {
    public static CopyDown converter = new CopyDown();
    protected static String[] docUrl;
    protected static Map<String,String> docSavePath;
    public static OSSClient ossClient;
    public static String bucketName;
    public static String ossPath;
    // 需要控制台打印
    protected static Boolean needOut;
    protected static Boolean needSizePre;
    public   static Pattern IMG_URL = Pattern
            .compile(".(jpeg|png|jpg|bmp)");
    public   static Pattern I_URL = Pattern
            .compile("[a-zA-z]+://[^\\s]*");
    public   static Pattern MD_URL = Pattern
            .compile("(?<=\\!\\[.{1,888}\\]\\()(.+)(?=\\))");

    static {
        ResourceBundle rb = ResourceBundle.getBundle("application");
        // Endpoint以杭州为例，其它Region请按实际情况填写。
        String endpoint = rb.getString("oss.endpoint");
// 使用刚刚创建的accessKeyId和accessKeySecret
        String accessKeyId = rb.getString("oss.accessKeyId");
        String accessKeySecret = rb.getString("oss.accessKeySecret");
        bucketName = rb.getString("oss.bucketName");
        ossPath = rb.getString("oss.path");

// 创建OSSClient实例。
        ossClient = new OSSClient(endpoint, accessKeyId, accessKeySecret);
        needOut = rb.getString("config.need.out").equals("true");
        needSizePre = rb.getString("config.file.prefix").equals("true");
        docUrl = rb.getString("main.doc.url").split(",");
        String[] savePath = rb.getString("main.doc.save").split(",");
        docSavePath = new HashMap<>();
        for (int i = 0; i < docUrl.length; i++) {
            docSavePath.put(docUrl[i], savePath[i]);
        }


    }


}
