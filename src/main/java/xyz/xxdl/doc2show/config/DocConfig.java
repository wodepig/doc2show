package xyz.xxdl.doc2show.config;

import lombok.Data;
import org.springframework.boot.SpringBootConfiguration;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

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
    private String imgSaveType;
    /**
     * 文档保存位置
     */
    private String docPath;
    private String docSaveType;
    private  Boolean filePrefix;
    private  Boolean needOut;

}
