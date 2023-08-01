package xyz.xxdl.doc2show;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import xxdl.xyz.config.DocConfig;



@SpringBootApplication
public class Start {
    @Autowired
    private DocConfig docConfig;

    public static void main(String[] args) {
        SpringApplication.run(Start.class, args);
    }

    public void startItem(DocItem docItem){
        // 1. 获取待爬取的链接
        // 2. 抓取页面
        // 3. 输出
        MutableDataSet options = new MutableDataSet()
                .set(Parser.EXTENSIONS, Arrays.asList(HtmlConverterTextExtension.create(docItem)));

        String markdown = FlexmarkHtmlConverter.builder(options).build().convert("");
    }
}
