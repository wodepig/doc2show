package xyz.xxdl.doc2show.enums;

import lombok.AllArgsConstructor;
import lombok.Data;


@AllArgsConstructor
public enum DocEnum {
     LOCAL("local"),
     OSS("oss");
    private String type;

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
}
