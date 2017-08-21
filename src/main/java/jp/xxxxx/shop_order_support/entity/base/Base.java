package jp.xxxxx.shop_order_support.entity.base;

import java.sql.Timestamp;

import lombok.Data;

@Data
public class Base {
	private Integer versionNo;
	private String createUserCd;
	private Timestamp createTime;
	private String updateUserCd;
	private Timestamp updateTime;
}
