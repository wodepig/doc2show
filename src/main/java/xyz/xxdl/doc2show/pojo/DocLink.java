package xyz.xxdl.doc2show.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
public class DocLink {
    private String href;
    private String title;
    private String group;

    public DocLink(String href, String title, String group) {
        this.href = href;
        this.title = title;
        this.group = group;
    }
}
