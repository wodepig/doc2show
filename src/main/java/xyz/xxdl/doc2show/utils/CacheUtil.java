package xyz.xxdl.doc2show.utils;

import cn.hutool.core.io.FileUtil;
import cn.hutool.json.JSONUtil;

import java.util.HashMap;
import java.util.Map;

/**
 * Package:xxdl.xyz.utils
 * Description:
 *
 * @date:2023.03.02 21:56
 * @author:wodepig dddgoal@163.com
 */
public class CacheUtil extends BaseUtil{

   private static Map<String,String> cacheMap ;
    public static Boolean hasKey(String key){
        cacheMap = initMap();
        return  cacheMap.containsKey(key);
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
