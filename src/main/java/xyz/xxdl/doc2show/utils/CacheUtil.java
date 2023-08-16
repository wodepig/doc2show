package xyz.xxdl.doc2show.utils;

import cn.hutool.core.io.FileUtil;
import cn.hutool.json.JSONUtil;
import com.aliyun.oss.OSS;
import com.aliyun.oss.OSSClient;
import com.aliyun.oss.OSSClientBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import xyz.xxdl.doc2show.pojo.DocConfig;
import xyz.xxdl.doc2show.pojo.DocItem;
import xyz.xxdl.doc2show.pojo.OssConfig;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Package:xxdl.xyz.utils
 * Description:
 *
 * @date:2023.03.02 21:56
 * @author:wodepig dddgoal@163.com
 */
@Component
public class CacheUtil extends BaseUtil{

    @Autowired
    public static   DocConfig docConfig;
   private static Map<String,String> cacheMap ;
   private static List<String> cacheMapLocal ;
    public static Boolean hasKey(String key){
        cacheMap = initMap();
        return  cacheMap.containsKey(key);
    }

    /**
     * 缓存中是否保存url
     * @param imgUrl
     * @param docItem
     * @return
     */
    public static Boolean hasKeyLocal(String imgUrl, String assetsPath,DocItem docItem){
        cacheMapLocal = initMapLocal(assetsPath);
        String[] split = imgUrl.split("/");
        imgUrl = split[split.length-1];
        if (cacheMapLocal.contains(imgUrl)){
            return true;
        }else {
            return false;
        }

    }

    public static Boolean hasFileOss(String objectName,  OssConfig ossConfig){
        // 创建OSSClient实例。
        OSSClient ossClient = ossConfig.getOssClient();
        return ossClient.doesObjectExist(ossConfig.getBucketName(), objectName);
    }
    /**
     * 本地是否有文件存在
     * @param fileName
     * @param filePath
     * @param docItem
     * @return
     */
    public static Boolean hasFileLocal(String fileName, String filePath, DocItem docItem){
        cacheMapLocal = initMapLocal(filePath);
        if (cacheMapLocal.contains(fileName)){
            return true;
        }else {
            return false;
        }
    }
    private static List<String> initMapLocal(String assetsPath) {
        if (cacheMapLocal !=null){
            return cacheMapLocal;
        }
        FileUtil.mkdir(assetsPath);
        try {
            return FileUtil.listFileNames(assetsPath);

        } catch (Exception e) {
            return  new ArrayList<>();
        }

    }

    public static void setKey(String key,String value){
        cacheMap.put(key,value);
        saveMap();

    }
    public static String getKey(String key){
        return cacheMap.get(key);
    }

    private static Map<String,String> initMap(){
        if (cacheMap !=null){
            return cacheMap;
        }
        try {
            String cacheFile =  FileUtil.readUtf8String(filePath.replace("/mds","/")+"/cache.txt");
            Map<String,String> map = JSONUtil.toBean(cacheFile, Map.class);
            return map;
        } catch (Exception e) {
           return new HashMap<>();
        }
    }
    private static void saveMap(){
        String s = JSONUtil.toJsonStr(cacheMap);
        s = s.replaceAll(",",",\n");
        FileUtil.writeUtf8String(s+"\n",filePath.replace("/mds","/")+"/cache.txt");
    }
    public static void main(String[] args) {
        initMap();
        System.out.println();
    }
}
