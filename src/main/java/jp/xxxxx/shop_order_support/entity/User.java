package jp.xxxxx.shop_order_support.entity;

import lombok.Data;

@Data
public class User {
	private String userCd;
	private String password;
	private String name;
	private String shopCd;
}
