package xyz.xxdl.doc2show.config;

import cn.hutool.core.lang.Dict;
import cn.hutool.setting.yaml.YamlUtil;
import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.util.List;

/**
 * Package:xxdl.xyz.config
 * Description:
 *
 * @date:2023.07.30 17:58
 * @author:wodepig dddgoal@163.com
 */
@Component

//@ConfigurationProperties(prefix = "dosList")
public class DocList {
    private List<DocItem> docItemList;

    @PostConstruct
    private void DocList() {
        Dict dict = YamlUtil.loadByPath("../config.yml");
        System.out.println(dict);
    }
}
