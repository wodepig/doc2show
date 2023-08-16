package xyz.xxdl.doc2show;

import com.aliyun.oss.OSS;
import com.aliyun.oss.OSSClient;
import com.aliyun.oss.OSSClientBuilder;
import com.vladsch.flexmark.html.renderer.LinkType;
import com.vladsch.flexmark.html.renderer.ResolvedLink;
import xyz.xxdl.doc2show.pojo.DocConfig;
import xyz.xxdl.doc2show.pojo.DocItem;
import xyz.xxdl.doc2show.pojo.OssConfig;

public class BaseTest {

    public static DocConfig getDocConfig(){
        DocConfig docConfig = new DocConfig();
        docConfig.setOssConfig(getOssConfig());
        return docConfig;
    }
    public static OssConfig getOssConfig(){
        OssConfig ossConfig = new OssConfig();
        ossConfig.setEndpoint("oss-cn-beijing.aliyuncs.com");
        ossConfig.setAccessKeyId("");
        ossConfig.setAccessKeySecret("");
        ossConfig.setBucketName("opensource-test");
        OSSClient ossClient = new OSSClient(ossConfig.getEndpoint(), ossConfig.getAccessKeyId(), ossConfig.getAccessKeySecret());
        ossConfig.setOssClient(ossClient);
        return ossConfig;
    }
public static ResolvedLink getResolvedLinkBase64(){
        ResolvedLink link = new ResolvedLink(LinkType.IMAGE,"data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAABH1JREFUSA3tVl1oHFUUPmdmd2ltklqbpJDiNnXFmgbFktho7YMPNiJSSZM0+CAYSkUELVhM6YuwIPpgoOKDqOBDC0XE2CQoNtQXBUFTTcCi+Wlh1V2TQExsUzcltd3M9Tt3ZjZzZ2fT+OJTL8yeM+eee757fmeJbq//KQL8X3DUSFOcfr7cRsRtxNQMWueeVzOkaITIGqQHNg5y8+jNW9ldM7A6nTpAjuolUikAwq7CE3WcM2RRDz+XGVgN3FptU/aUSlvq9Pa3iZ1+sgAqJyyAFqkipd9dqiwHF3P65YycLWc/6sqGrvoEoIp6DOFaX5h6+dnfjkWprwqsPk0dUGq5vySwDImC10KxFHgGL1SWoc92O3eVht09qdXNH11I2SsTsJYqMWzihqGMi+A+Garf3BAuuLI5oGlULyNfyB/HYNujwktOfRrMr5t77NmevqaUopx0grnKAyvVpmwUDB4x6FPXuGvYLTDwWsejwgtgkYKPqRJg8SV6xaiZ3ZTppGneS4yfH5/66fZSDHv+QZci/+h5c5UHtpy67JUqGppM0sh0Nc1dW6/N1W5Yoqat8/TU/VnadmdeW2PLLSyh0cvxBs3KbqTmwYPpxN4do/mzE8nEpvX/UMu2Wbp74zUAK5q6WkHns7V0eWkdPbPzd3rxkTGybadYySumVzhcaJFbs5UrEkQ/+CK8gF5dnh/6ciIZ73gwQ927L1IitoxKLXYP3SjYdOrHHfTZhRRlFyrorafPk20B3HPD1y2G3qKZME5Jcf3t/HUC13/8tSd++vqFveMUTwAUxSUFI1QekR1+bIze3D9MF2aq6cPvG72CgnldWCFqyRw3lwH8ZMerjTD9ElRO7Gv44wNpC90aASqGfVlz/Rx17srQ57/UU26hkhQqUB7dBR71WmzQhHUnblGmVOEw0jhbV1n9OlXUDCIRGaNV5Jp43N516fN7JmnTHdfp7Hgy0luO4aMhtkLL8Bi3bUWYvzh5Mn1dTxrL6QmGuRhGL/TiTTxRoEdTszSaq9GR0NGA3KdkOz3hqSV3MIDhQ5IVX/Ivx3umBti2es2h4eZby7x8br1rkf7Mo90AqC8aQ3sJeNzqFRu+vSANAQe3PL7l0HGOAdwDCeZYvNKeoZp1Qfs6Aipndh86HmFRi0LAnEO47wsqM6cdfjh3jBPUzhZy7nvlUfFsamED1VQt6aISHVymXZ/B2aCtIG8AI8xfobj2d3en1wWVhOeHELKmLQ1s211s88comkv4UCwWyF787mJdYXtNfhKAXVqnKTq8QZvGAGGOfaTo5pGZ/PwbUCr5+DPr/1J92JNHr9aOl/F3iI5+O1nfybsGxoimvZ3ViWSluDITw3P37mypheDIPY0tw7+O/5ApbkYw+zpfaUVu32Pi98+defdUhEpZkRFq0aqyNh9FuL9hpYbEm6iwi0z2REd09ZmyENEbuhjDWzKvZXTqKYaBIr3tt5kuPtQBZFvEUwHt60vfCNu41XsksH9Ij1BMMz1Y0OOunHNShFIP5868g5zeXmuLwL9T4b6Q2+KejgAAAABJRU5ErkJggg==");
        return link;
    }
    public static ResolvedLink getResolvedLinkRelativeUrl(){
    ///img/快速启动/快速启动.png
        ///img/接口文档/01.png
        return new ResolvedLink(LinkType.IMAGE,"img/接口文档/01.png");
    }
    public static ResolvedLink getResolvedLinkAbsolutelyUrl(){
    ///https://static.iocoder.cn/images/Yudao/2022-02-04/31.png?imageView2/2/format/webp/w/1280
        //https://static.iocoder.cn/ruoyi-vue-pro-biz.png
        return new ResolvedLink(LinkType.IMAGE,"https://static.iocoder.cn/images/Yudao/2022-02-04/31.png?imageView2/2/format/webp/w/1280");
    }
    public static DocItem getDocItem(){
        DocItem docItem = new DocItem();
        docItem.setUrl("https://doc.iocoder.cn/intro");
        docItem.setName("RuoYiVuePro");
        docItem.setEnable(true);
        docItem.setCache(false);
        docItem.setCacheFileName("RuoYiVuePro");
        docItem.setSavePath("RuoYiVuePro");
        docItem.setPageBody(".theme-vdoing-wrapper");
        docItem.setSidebar(".sidebar-links");
        docItem.setHost("https://doc.iocoder.cn");
        docItem.setWorkDir("C:\\Users\\admindc\\Documents\\ideaProject\\doc2show\\test_file");
        docItem.setGetLink(false);
        return docItem;
    }
}
