package xyz.xxdl.doc2show.utils;

import cn.hutool.core.io.FileUtil;
import cn.hutool.core.date.DateUtil;
import cn.hutool.core.util.StrUtil;
import com.aliyun.oss.ClientException;
import com.aliyun.oss.OSSClient;
import com.aliyun.oss.OSSException;
import com.aliyun.oss.model.PutObjectRequest;
import com.aliyun.oss.model.PutObjectResult;
import io.github.furstenheim.CopyDown;
import org.apache.commons.lang3.StringUtils;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

import java.io.*;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;


public class FileUtils extends BaseUtil{




    public static void md2local(String folder,String fileName,String str){
        folder = StrUtil.cleanBlank(folder);
        fileName = StrUtil.cleanBlank(fileName);
        File touch = FileUtil.touch(filePath + "/RuoYiVuePro/"+folder+"/"+fileName+".md");
        FileUtil.writeUtf8String(str,touch);
    }

    public static void saveMsg(String msgType,String msg){
        if (needOut){
            System.out.println(msgType+"_"+msg);
        }
        String today = DateUtil.today();
        FileUtil.appendString(msg+"\n",
                filePath+"/log/"+today+"/"+msgType+".txt",
                StandardCharsets.UTF_8);
    }



    /**
     * 保存图片到自己的oss中
     * @param url 可能是 img/%E9%A1%B9%E7%9B%AE%E7%BB%93%E6%9E%84/01.png,也可能是https://doc.iocoder.cn/img/%E9%A1%B9%E7%9B%AE%E7%BB%93%E6%9E%84/01.png
     * @return oss访问路径
     */
    public static String saveImg(String url){
        return saveImg(url,false);
    }

    /**
     * 图片链接是否完整
     * @param url 旧图片链接
     * @param fullUrl 是否完整
     * @return 新图片链接
     */
    public static String saveImg(String url,Boolean fullUrl){
        String path;
        if (!fullUrl){
            String domain = getUrlDomain(url);
             path =getUrlPath(domain,url);
            url = domain+path;
        }else {
            path= getUrlPath(null,url);
        }

        // 本地文件缓存,判断是否上传过
        if (CacheUtil.hasKey(url)){
            info("命中缓存: ",url);
            return CacheUtil.getKey(url);
        }
        // url解码
        String pathInOss;
        try {
            pathInOss = URLDecoder.decode(path, "UTF-8");
        } catch (UnsupportedEncodingException e) {
            pathInOss=path;
        }
        // 转换保存路径,oss不能以/开头
        pathInOss=ossPath+pathInOss;
        // 上传网络流到oss中

        try {
            InputStream inputStream = new URL(url).openStream();
            // 创建PutObjectRequest对象。
            PutObjectRequest putObjectRequest = new PutObjectRequest(bucketName, pathInOss, inputStream);
            // 设置该属性可以返回response。如果不设置，则返回的response为空。
            putObjectRequest.setProcess("true");
            // 创建PutObject请求。
            PutObjectResult result = ossClient.putObject(putObjectRequest);
            String uri = result.getResponse().getUri();
            // 如果上传成功，则返回200。
            //info(result.getResponse().getStatusCode()+"");
            //info(uri);
            CacheUtil.setKey(url,uri);
            info("新增缓存,key:",url,"value:",uri);
            return uri;
        } catch (OSSException oe) {
            System.out.println("Caught an OSSException, which means your request made it to OSS, "
                    + "but was rejected with an error response for some reason.");
            System.out.println("Error Message:" + oe.getErrorMessage());
            System.out.println("Error Code:" + oe.getErrorCode());
            System.out.println("Request ID:" + oe.getRequestId());
            System.out.println("Host ID:" + oe.getHostId());
        } catch (ClientException | MalformedURLException ce) {
            System.out.println("Caught an ClientException, which means the client encountered "
                    + "a serious internal problem while trying to communicate with OSS, "
                    + "such as not being able to access the network.");
            System.out.println("Error Message:" + ce.getMessage());
        } catch (IOException e) {
            System.out.println("不知道什么异常 "+
                    e.getMessage());
        }
        return url;
    }



}
