package xyz.xxdl.doc2show.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;

/**
 * Package:xxdl.xyz.config
 * Description:
 *
 * @date:2023.07.30 17:10
 * @author:wodepig dddgoal@163.com
 */
@Component
public class Heloo {
    @Autowired
    private DocConfig docConfig;
    @PostConstruct
    private void test(){
        System.out.println();
    }
}
