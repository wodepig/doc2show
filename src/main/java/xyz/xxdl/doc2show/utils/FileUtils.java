package xyz.xxdl.doc2show.utils;

import cn.hutool.core.codec.Base64;
import cn.hutool.core.img.ImgUtil;
import cn.hutool.core.io.FileUtil;
import cn.hutool.core.date.DateUtil;
import cn.hutool.core.io.file.FileNameUtil;
import cn.hutool.core.util.StrUtil;
import cn.hutool.core.util.URLUtil;
import cn.hutool.http.HttpUtil;
import com.aliyun.oss.ClientException;
import com.aliyun.oss.OSSClient;
import com.aliyun.oss.OSSException;
import com.aliyun.oss.model.PutObjectRequest;
import com.aliyun.oss.model.PutObjectResult;
import com.vladsch.flexmark.html.renderer.ResolvedLink;
import io.github.furstenheim.CopyDown;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import xyz.xxdl.doc2show.pojo.DocItem;
import xyz.xxdl.doc2show.pojo.OssConfig;

import java.awt.*;
import java.io.*;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.*;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;


public class FileUtils extends BaseUtil{



    public static String isBase64(String urlOrBase64){
        List<String> split = StrUtil.split(urlOrBase64, ",");
        if (split.size() == 1) {
            urlOrBase64 = split.get(0);
        } else {
            urlOrBase64 = split.get(1);
        }
        return urlOrBase64;
    }
    /**
     * 从link中拿到文件名,保存路径和(下载路径|base64)
     * @param link
     * @param docItem
     * @return
     */
    public static Map<String,String> link2Map(ResolvedLink link,DocItem docItem){
        Map<String,String> map = new HashMap<>();
        String urlOrBase64 = link.getUrl();
        String filePath = docItem.getImgSavePath();
        String fileName = "";
        boolean isBase64 = Base64.isBase64(isBase64(urlOrBase64));
        if (isBase64){

            fileName = StrUtil.sub(urlOrBase64,-1,-10) + ".png";
        }else {
            // 相对链接或绝对链接
            urlOrBase64 = _DocUtil.getAbsoluteUrl(docItem.getHost(),urlOrBase64);
            fileName = FileUtils.getFileName(docItem.getWorkDir(),urlOrBase64);
        }
        map.put("fileName",fileName);
        map.put("filePath",filePath);
        map.put("urlOrBase64",urlOrBase64);
        return map;
    }

    public static byte[] urlOrBase64(String urlOrBase64){
        byte[] bytes = Base64.decode(urlOrBase64);
        if (urlOrBase64.startsWith("http")){
            bytes = HttpUtil.downloadBytes(urlOrBase64);
        }
        return bytes;
    }
    public static String saveOss(byte[] bytes, String objectName, OssConfig ossConfig){
        OSSClient ossClient = ossConfig.getOssClient();

        // 创建PutObjectRequest对象。
        PutObjectRequest putObjectRequest = new PutObjectRequest(ossConfig.getBucketName(), objectName, new ByteArrayInputStream(bytes));

        // 创建PutObject请求。
        PutObjectResult result = ossClient.putObject(putObjectRequest);
        return objectName;
    }
    /**
     * 保存文件到本地
     * @param bytes
     * @param file
     * @return
     */
    public static String saveLocal(byte[] bytes,File file){
        File touch = FileUtil.touch(file);
        return FileUtil.writeBytes(bytes,touch).getAbsolutePath();
    }
    /**
     * 保存图片到本地,验证是否时候缓存
     * @param str base64或图片链接
     * @return
     */
   /* public static String saveLocal(String str,String filePath, String fileName, Boolean cache){

        File file = FileUtil.file(filePath, fileName);
        if (cache){
            Boolean hasFileLocal = CacheUtil.hasFileLocal(fileName, filePath, null);
            if (hasFileLocal){
                return file.getAbsolutePath();
            }else {

                return saveLocal(Base64.encode(bytes),filePath,fileName,false);
            }
        }else {
            File touch = FileUtil.touch(file);
//            return FileUtil.writeBytes(bytes,touch).getAbsolutePath();
            return FileUtil.writeBytes(bytes,touch).getAbsolutePath();
        }

    }*/





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


    /**
     * 获取文件名
     * @param str 保存路径,
     * @param url 绝对链接或相对链接
     * @return
     */
    public static String getFileName(String str, String url) {
        String fileName = "";
        if (url.startsWith("http")){
            URL imgUrl = URLUtil.url(url);
            // 为了方便的获取图片的上级路径,把所有链接都转换为file进行处理
            return getFileName(str,imgUrl.getPath());
        }else {
            File file = FileUtil.file(str, url);
            fileName =  FileNameUtil.getName(file);
            if (fileName.length() < 8){
                // 文件名过短时添加上级路径组成新文件名
                fileName = file.getParentFile().getName() + "_" + fileName;
            }
        }
     return fileName;
    }
}
