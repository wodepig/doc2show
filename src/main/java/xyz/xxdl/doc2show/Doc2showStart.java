package xyz.xxdl.doc2show;

import cn.hutool.core.io.FileUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;
import xyz.xxdl.doc2show.pojo.DocConfig;
import xyz.xxdl.doc2show.pojo.DocItem;
import xyz.xxdl.doc2show.pojo.DocLink;
import xyz.xxdl.doc2show.utils._DocUtil;

import java.io.File;
import java.util.List;

/**
 * Package: xyz.xxdl.doc2show
 *
 * @Description:
 * @date: 2023/8/22 17:25
 * @author: dddgoal@163.com
 */
@Component
@Slf4j
public class Doc2showStart implements ApplicationRunner {
    @Autowired
    private DocConfig config;
    @Override
    public void run(ApplicationArguments args) throws Exception {
        start();
    }
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
        log.info("文档: {} 的保存路径为:{}",docItem.getName(),savePath);
        docItem.setWorkDir(savePath.getAbsolutePath());
        // 1. 获取待爬取的链接
        List<DocLink> list = _DocUtil.allLinks(docItem);
        for (DocLink docLink : list) {
            try {
                // 2. 抓取页面
                String mdStr = _DocUtil.link2Md(docLink, docItem);
                // 3. 输出
                _DocUtil.saveMdStr(mdStr,docLink,savePath);
            }catch (Exception e){
                log.error("{}抓取时报错:{}",docLink.getHref(),e.getMessage());
            }

        }
    }
}
