package xyz.xxdl.doc2show;

import cn.hutool.core.thread.ThreadUtil;
import cn.hutool.core.util.StrUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import xxdl.xyz.config.DocConfig;
import xxdl.xyz.utils.BaseUtil;
import xxdl.xyz.utils.ConfigUtil;
import xxdl.xyz.utils.FileUtils;

import javax.annotation.PostConstruct;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.atomic.AtomicInteger;

/**
 * Hello world!
 *
 */
public class App extends ConfigUtil
{ ;



    public static void main(String[] args) throws Exception{
        for (String s : docUrl) {
            start(s);
        }
    }
    public static  void start( String docUrl ) throws Exception {
        if (StrUtil.isBlank(docUrl)){
            return;
        }
        BaseUtil.defaultHtmlDomain(docUrl);
        Map<String,Map<String,String>> map = JsoupUtil.allLink(docUrl);
        Map<String,Map<String,String>> map1 = new HashMap<>();
        Set<String> strings = map.keySet();
        int i =1;
        int titleSize = 100;
        int folderSize = 100;
        for (String string : strings) {
            i++;
            map1.put(string,map.get(string));
            if (i>2){
                break;
            }
        }
        Set<String> folders = map.keySet();
        for (String folder : folders) {
            folderSize += 10;
            Map<String, String> article = map.get(folder);
            Set<String> titles = article.keySet();
            for (String title : titles) {
                titleSize += 10;
                String url = article.get(title);
                convert(docUrl,needSizePre?folderSize+"."+folder:folder,
                        needSizePre?titleSize+"."+title:title,url);
            }
            titleSize = 100;
        }


    }

    /**
     * 爬取
     * @param docUrl 文档主页
     * @param folder 文件夹/分组
     * @param title 标题
     * @param url 地址
     */
    private static void convert(String docUrl,String folder,String title,String url){
        ThreadUtil.execAsync(()->{
            try {
                BaseUtil.info("开始抓取..."+folder+"中的  ",title,",url",url);
                // 解析url
                String htmlStr = JsoupUtil.convertImgAndHtml(url);
                String file = converter.convert(htmlStr);
                //保存为本地文件
                FileUtils.md2local(folder,title,file);
                BaseUtil.info("标题 ",title,"抓取结束");
            }catch (Exception e){
                System.out.println("报错啦");
            }
        });

    }
}
