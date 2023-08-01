package xyz.xxdl.doc2show.utils;

import lombok.extern.slf4j.Slf4j;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import xyz.xxdl.doc2show.pojo.DocItem;

import java.io.IOException;
import java.net.URL;
import java.util.*;

@Slf4j
public class DocUtil {
    public static List<String> allLinks(DocItem docItem){
        log.info("获取{}下的所有待爬取的链接",docItem.getName());
        List<String> list = new ArrayList<>();
        return null;
    }


}
