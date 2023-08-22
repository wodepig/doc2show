package xyz.xxdl.doc2show.factory;

import xyz.xxdl.doc2show.service.ImageService;

import java.util.HashMap;
import java.util.Map;

/**
 * Package: xyz.xxdl.doc2show.factory
 *
 * @Description:
 * @date: 2023/8/22 16:37
 * @author: dddgoal@163.com
 */
public class ImageProviderFactory {
    private static Map<String, ImageService> map = new HashMap<>();

    public static void register(String key,ImageService service){
        map.put(key,service);
    }
    public static ImageService get(String key){
        return map.get(key);
    }
}
