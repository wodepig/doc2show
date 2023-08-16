package xyz.xxdl.doc2show.pojo;

import com.aliyun.oss.OSS;
import com.aliyun.oss.OSSClient;
import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

/**
 * Package:xxdl.xyz.config
 * Description:
 *
 * @date:2023.07.30 17:53
 * @author:wodepig dddgoal@163.com
 */
@Component
@Data
@ConfigurationProperties(prefix = "oss")
public class OssConfig {
   /**
    * Oss实例对象
    */
   private OSSClient ossClient;
   private String  endpoint;
   private String  accessKeyId;
   private String  accessKeySecret;
   private String  bucketName;

   /**
    * 访问域名
    */
   private String  url;
}
