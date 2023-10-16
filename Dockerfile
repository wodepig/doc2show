package com.soflyit.system.domain;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.soflyit.flyta.common.core.annotation.Excel;
import com.soflyit.flyta.common.core.web.domain.BaseEntity;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * 角色和菜单关联6对象 sys_role_menu
 *
 * @author soflyit
 * @date 2023-09-13 10:37:45
 */
@TableName(value = "sys_role_menu")
@ApiModel
@Data
@EqualsAndHashCode(callSuper = true)
public class SysRoleMenu extends BaseEntity {
    private static final long serialVersionUID = 1L;

    /**
     * hi
     */
    @Excel(name = "hi")
    @TableField(value = "role_id")
    @ApiModelProperty("hi")
    private Long roleId;

    /**
     * hi
     */
    @Excel(name = "hi")
    @TableField(value = "menu_id")
    @ApiModelProperty("hi")
    private Long menuId;

}
