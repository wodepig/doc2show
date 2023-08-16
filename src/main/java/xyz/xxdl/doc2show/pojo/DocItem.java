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
     * 标识
     */
    private String name;
    /**
     * 是否开启
     */
    private Boolean enable;
    /**
     * 图片缓存
     */
    private Boolean cache;
    /**
     * 缓存文件名
     */
    private String cacheFileName;
    /**
     * 文档保存根目录
     */
    private String savePath;
    /**
     * 图片保存类型
     */
    private String imgSaveType = "local";
    private String imgSavePath = "";
    /**
     * 页面主体的class样式
     */
    private String pageBody;
    /**
     * 导航栏/菜单栏的class样式
     */
    private String sidebar;
    /**
     * *************** 非配置项
     */
    /**
     * 协议://域名
     */
    private String host;
    /**
     * 工作目录:/mds/项目名
     */
    private String workDir;

    /**
     * 是否是获得链接的处理
     */
    private Boolean getLink = true;
}
