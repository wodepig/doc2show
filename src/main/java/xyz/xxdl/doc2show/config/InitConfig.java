package xyz.xxdl.doc2show.config;

import cn.hutool.core.bean.BeanUtil;
import cn.hutool.core.io.FileUtil;
import cn.hutool.setting.yaml.YamlUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import xyz.xxdl.doc2show.pojo.DocConfig;
import xyz.xxdl.doc2show.pojo.DocItem;
import xyz.xxdl.doc2show.pojo.OssConfig;

import javax.annotation.PostConstruct;
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

    @Order(1)
    @PostConstruct
    private void DocList() {
        docConfig.setOssConfig(ossConfig);
        log.debug("设置oss值:{}",ossConfig);
        String jarDir="";
        if (isRunningFromJAR()) {
            log.info("本项目从jar包启动");
            // 获取 JAR 包所在的路径
            String path = System.getProperty(SysConstant.SYS_JAR_PROPERTY);
            log.debug("jar包所在路径:{}",path);
            jarDir = FileUtil.getParent(path,4);
        }else {
            log.info("本项目从IDEA包启动");
            String path  =  FileUtil.getAbsolutePath("");
            log.debug("所在路径:{}",path);
            jarDir = FileUtil.getParent(path,2);
        }
        log.info("项目路径为: {}",jarDir);
        docConfig.setWorkDir(jarDir);
        // 构建 YAML 文件路径
        String yamlPath = FileUtil.getAbsolutePath(FileUtil.file(jarDir, SysConstant.DOC_CONFIG_FILE));
        log.info("读取{}配置文件",SysConstant.DOC_CONFIG_FILE);
        List<DocItem> docItemList = new ArrayList<>();
        // 加载 YAML 文件并获取 LinkedHashMap 对象
        Map map = YamlUtil.loadByPath(yamlPath, Map.class);
        log.debug("读取结果:{}",map);
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
        log.info("开始验证信息的正确性");
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
