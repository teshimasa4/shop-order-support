package jp.xxxxx.shop_order_support.entity.base;

import java.io.Serializable;
import java.sql.Timestamp;

import lombok.Data;

@Data
public class Base implements Serializable {

	private static final long serialVersionUID = 1L;

	private Integer versionNo;
	private String createUserCd;
	private Timestamp createTime;
	private String updateUserCd;
	private Timestamp updateTime;
}
