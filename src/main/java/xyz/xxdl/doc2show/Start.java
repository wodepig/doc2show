package xyz.xxdl.doc2show;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import xxdl.xyz.config.DocConfig;



@SpringBootApplication
public class Start {
    @Autowired
    private DocConfig docConfig;

    public static void main(String[] args) {
        SpringApplication.run(Start.class, args);
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
