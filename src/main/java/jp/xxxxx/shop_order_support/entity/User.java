package jp.xxxxx.shop_order_support.entity;

import java.io.Serializable;

import jp.xxxxx.shop_order_support.entity.base.Base;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
public class User extends Base implements Serializable {

	private static final long serialVersionUID = 1L;

	private String code;
	private String password;
	private String name;
	private String shopCd;
	private Boolean enabled;

	private String shopName;
}
