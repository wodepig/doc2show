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
}
