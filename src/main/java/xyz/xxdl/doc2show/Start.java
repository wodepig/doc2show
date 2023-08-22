package xyz.xxdl.doc2show;

import cn.hutool.core.io.FileUtil;
import com.vladsch.flexmark.html2md.converter.FlexmarkHtmlConverter;
import com.vladsch.flexmark.parser.Parser;
import com.vladsch.flexmark.util.data.MutableDataSet;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import xyz.xxdl.doc2show.flexmark.CustomHtmlNodeConverter;
import xyz.xxdl.doc2show.flexmark.CustomLinkResolver;
import xyz.xxdl.doc2show.flexmark.HtmlConverterTextExtension;
import xyz.xxdl.doc2show.pojo.DocConfig;
import xyz.xxdl.doc2show.pojo.DocItem;
import xyz.xxdl.doc2show.pojo.DocLink;
import xyz.xxdl.doc2show.utils._DocUtil;

import javax.annotation.PostConstruct;
import java.io.File;
import java.util.Arrays;
import java.util.List;

@Slf4j
//@Component
public class Start {

    @Autowired
    private DocConfig config;
    @Order(100)
    @PostConstruct
    public void start(){
        log.info("开始爬取数据");
        for (DocItem docItem : config.getDocItemList()) {
            log.info("[{}]({}) 开始............",docItem.getName(),docItem.getUrl());
            if (!docItem.getEnable()){
                log.info("[{}]({}) 未开启",docItem.getName(),docItem.getUrl());
                continue;
            }
            startItem(docItem);
            log.info("[{}]({}) 结束............",docItem.getName(),docItem.getUrl());
        }
    }


    public void startItem(DocItem docItem){
        File savePath = FileUtil.file(config.getWorkDir() , config.getDocPath() , docItem.getSavePath());
        log.info("{}的保存路径为:{}",docItem.getName(),savePath);
        docItem.setWorkDir(savePath.getAbsolutePath());
        // 1. 获取待爬取的链接
        List<DocLink> list = _DocUtil.allLinks(docItem);
        for (DocLink docLink : list) {
            // 2. 抓取页面
            String mdStr = _DocUtil.link2Md(docLink, docItem);
            // 3. 输出
            _DocUtil.saveMdStr(mdStr,docLink,savePath);
        }
    }
}
