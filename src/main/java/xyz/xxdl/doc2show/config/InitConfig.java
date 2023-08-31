package xyz.xxdl.doc2show.config;

import cn.hutool.core.bean.BeanUtil;
import cn.hutool.core.io.FileUtil;
import cn.hutool.core.util.StrUtil;
import cn.hutool.core.util.URLUtil;
import cn.hutool.setting.yaml.YamlUtil;
import com.aliyun.oss.OSSClient;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import xyz.xxdl.doc2show.pojo.DocConfig;
import xyz.xxdl.doc2show.pojo.DocItem;
import xyz.xxdl.doc2show.pojo.OssConfig;

import javax.annotation.PostConstruct;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * Package:xxdl.xyz.config
 * Description:
 *
 * @date:2023.07.30 17:58
 * @author:wodepig dddgoal@163.com
 */
@Component
@Slf4j
public class InitConfig {
    @Autowired
    private DocConfig docConfig;

    @Autowired
    private OssConfig ossConfig;

    private OSSClient creatOssClient(OssConfig ossConfig){
        try {
            OSSClient ossClient = new OSSClient(ossConfig.getEndpoint(),ossConfig.getAccessKeyId(),ossConfig.getAccessKeySecret());
            return ossClient;
        }catch (Exception e){
            log.error("创建OSS对象报错:{}",e.getMessage());
            return null;
        }

    }
    //@Order(1)
    @PostConstruct
    private void DocList() {
        docConfig.setOssConfig(ossConfig);
        log.info("设置oss值:{}",ossConfig);
        ossConfig.setOssClient(creatOssClient(ossConfig));
        String jarDir="";
        if (isRunningFromJAR()) {
            log.info("本项目从jar包启动");
            // 获取 JAR 包所在的路径
            String path = System.getProperty(SysConstant.SYS_JAR_PROPERTY);
            log.info("jar包所在路径:{}",path);
            jarDir = FileUtil.getParent(path,4);
        }else {
            log.info("本项目从IDEA包启动");
            String path  =  FileUtil.getAbsolutePath("");
            log.info("所在路径:{}",path);
            jarDir = FileUtil.getParent(path,2);
        }
        log.info("项目路径为: {}",jarDir);
        docConfig.setWorkDir(jarDir);
        String configPath = FileUtil.normalize(jarDir + "/config");
        // 构建 YAML 文件路径
        String yamlPath = FileUtil.getAbsolutePath(FileUtil.file(configPath, SysConstant.DOC_CONFIG_FILE));
        log.info("读取{}配置文件",SysConstant.DOC_CONFIG_FILE);
        List<DocItem> docItemList = new ArrayList<>();
        // 加载 YAML 文件并获取 LinkedHashMap 对象
        Map map = YamlUtil.loadByPath(yamlPath, Map.class);
        log.info("读取结果:{}",map);
        for (Object key : map.keySet()) {
            List list = (List) map.get(key);
            for (Object o : list) {
                DocItem item = BeanUtil.toBean(o,DocItem.class);
                docItemList.add(item);
            }
        }
        docConfig.setDocItemList(docItemList);
        log.info("读取完毕,发现{}个待爬取的网站",docItemList.size());
        validation();
    }

    private void validation(){
        log.info("开始验证信息的正确性...");
        log.info("原始信息:{}",docConfig);
        if (StrUtil.isBlank(docConfig.getImgSaveType())){
            log.warn("图片保存类型没有设置,退出系统");
            System.exit(0);
        }
        if (StrUtil.isBlank(docConfig.getDocPath())){
            docConfig.setDocPath("mds");
        }

        List<DocItem> docItemList = new ArrayList<>();
        // 初始化一些值
        for (DocItem docItem : docConfig.getDocItemList()) {
            if (StrUtil.isBlank(docItem.getName()) || StrUtil.isBlank(docItem.getUrl())){
                log.warn("名称或url为空,排除掉");
                continue;
            }
            if (StrUtil.isBlank(docItem.getPageBody()) || StrUtil.isBlank(docItem.getSidebar())){
                log.warn("主体或菜单为空,排除掉");
                continue;
            }
            if (docItem.getCache() == null){
                docItem.setCache(true);
            }
            if (StrUtil.isBlank(docItem.getCacheFileName())){
                docItem.setCacheFileName(docItem.getName());
            }
            if (StrUtil.isBlank(docItem.getSavePath())){
                docItem.setSavePath(docItem.getName());
            }
            if (docItem.getEnable() == null){
                docItem.setEnable(true);
            }
            if (docItem.getEnableProxy() == null){
                docItem.setEnableProxy(false);
            }
            if (docItem.getFilePrefix() == null){
                docItem.setFilePrefix(true);
            }
            if (docItem.getImgSaveType() == null){
                docItem.setImgSaveType(SysConstant.IMAGE_SAVE_TYPE_LOCAL);
            }
            if (StrUtil.isBlank(docItem.getHost())){
                try {
                    String host = URLUtil.getHost(new URL(docItem.getUrl())).toString();
                    docItem.setHost(host);
                } catch (MalformedURLException e) {
                    log.warn("{}的url不合法,跳过",docItem.getUrl());
                    continue;
                }
            }

            docItemList.add(docItem);
        }
        docConfig.setDocItemList(docItemList);
        log.info("结果信息:{}",docConfig);
    }

    /**
     * 是否从jar包运行
     * @return
     */
    private static boolean isRunningFromJAR() {
        String className = InitConfig.class.getName().replace('.', '/');
        String classJar = InitConfig.class.getResource("/" + className + ".class").toString();
        return classJar.startsWith("jar:");
    }
}
