package xyz.xxdl.doc2show.utils;

import cn.hutool.core.io.FileUtil;
import cn.hutool.core.util.StrUtil;
import cn.hutool.core.util.URLUtil;
import cn.hutool.http.HttpRequest;
import cn.hutool.http.HttpUtil;
import cn.hutool.json.JSONArray;
import cn.hutool.json.JSONObject;
import cn.hutool.json.JSONUtil;
import lombok.extern.slf4j.Slf4j;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.select.Elements;
import xyz.xxdl.doc2show.pojo.DocItem;

import java.util.HashMap;
import java.util.Map;

@Slf4j
public class JsoupUtil {

    private static Map<String,Map<String,String>> proxyMap = new HashMap<>();
    /**
     * 从url和classnama获得Elements
     * @param url
     * @param className
     * @return
     */
    public static Elements fromUrlAndClass(String url,String className, DocItem docItem){
        log.info("从{}中获得{}的所有元素",url,className);
        if (StrUtil.isBlank(url)){
            return  new Elements();
        }
        String html = "";
        if (url.startsWith("http")){
            Map<String, String> proxy = getProxy(docItem);
            HttpRequest request = HttpRequest.get(url)
                    .setFollowRedirects(true);
            if (proxy.size() == 2){
                request.setHttpProxy(proxy.get("ip"),Integer.parseInt(proxy.get("port")));
            }
            html = request.execute().body();
        }else {
             html = FileUtil.readUtf8String(url);
        }
        Document doc = Jsoup.parse(html);
        return doc.select(className);
    }

    public static Map<String,String> getProxy(DocItem docItem){
        Map<String, String> map = proxyMap.get(docItem.getName());
       if (map != null){
           return map;
       }else {
            map = new HashMap<>();

           try {


               if (!docItem.getEnableProxy()) {
                   return map;
               }
               String s = HttpUtil.get(docItem.getProxy());
               JSONObject entries = JSONUtil.parseObj(s);
               Integer code = entries.getInt("code");
               if (code == 0) {
                   JSONArray data = entries.getJSONArray("data");
                   JSONObject jsonObject = data.getJSONObject(0);
                   map.put("ip", jsonObject.getStr("ip"));
                   map.put("port", jsonObject.getStr("port"));
                   log.info("本次使用代理:{}:{}", jsonObject.getStr("ip"), jsonObject.getStr("port"));
               } else {
                   log.warn("代理接口响应报错:{}", entries.getStr("msg"));
               }

           } catch (Exception e) {
               log.error("获取代理信息报错:{}", e.getMessage());
           }
           proxyMap.put(docItem.getName(), map);
           return map;
       }
    }
}
