package xyz.xxdl.doc2show.pojo;

import lombok.Data;
import org.springframework.boot.SpringBootConfiguration;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * Package:xxdl.xyz.config
 * Description:
 *
 * @date:2023.07.29 20:38
 * @author:wodepig dddgoal@163.com
 */
@Component
@Data
@ConfigurationProperties(prefix = "main")
public class DocConfig {
    /**
     * 图片保存类型
     */
    private String imgSaveType = "local";
    /**
     * 文档保存位置
     */
    private String docPath = "/mds/";
    /**
     *
     */
    private String docSaveType;
    private  Boolean filePrefix = true;
    /**
     * 输出打印
     */
    private  Boolean needOut = false;
    /**
     * 工作目录,jar包的目录
     */
    private String workDir;

    private OssConfig ossConfig;
    /**
     * 待爬取的集合
     */
    private List<DocItem> docItemList;

    /**
     * 代理
     */
    private String proxy;

}
