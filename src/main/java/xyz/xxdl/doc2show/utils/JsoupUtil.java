package xyz.xxdl.doc2show.utils;

import cn.hutool.core.util.StrUtil;
import cn.hutool.core.util.URLUtil;
import cn.hutool.http.HttpUtil;
import lombok.extern.slf4j.Slf4j;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.select.Elements;

@Slf4j
public class JsoupUtil {

    /**
     * 从url和classnama获得Elements
     * @param url
     * @param className
     * @return
     */
    public static Elements fromUrlAndClass(String url,String className){
        log.info("从{}中获得{}的所有元素",url,className);
        if (StrUtil.isBlank(url)){
            return  new Elements();
        }

        // todo 代理
        String html = HttpUtil.get(url);
        Document doc = Jsoup.parse(html);
        Elements select = doc.select(className);
         return select;
    }
}
