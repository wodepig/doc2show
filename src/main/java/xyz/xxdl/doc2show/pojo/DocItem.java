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
     * 保存路径
     */
    private String savePath;
    /**
     * 页面主体
     */
    private String pageBody;
    /**
     * 导航栏/菜单栏
     */
    private String sidebar;
    /**
     * ***************
     */
    /**
     * 协议://域名
     */
    private String host;
}
