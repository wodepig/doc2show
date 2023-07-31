package xyz.xxdl.doc2show.pojo;

import lombok.Data;

/**
 * Package:xxdl.xyz.config
 * Description:
 *
 * @date:2023.07.30 17:59
 * @author:wodepig dddgoal@163.com
 */
@Data
public class DocItem {
    /**
     * 抓取url
     */
    private String url;
    /**
     * 保存路径
     */
    private String savePath;
}
