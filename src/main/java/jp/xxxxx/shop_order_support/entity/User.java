package jp.xxxxx.shop_order_support.entity;

import jp.xxxxx.shop_order_support.entity.base.Base;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
public class User extends Base {
	private String code;
	private String password;
	private String name;
	private String shopCd;
}
