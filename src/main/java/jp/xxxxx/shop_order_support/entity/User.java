package jp.xxxxx.shop_order_support.entity;

public class User {

	private String userCd;
	private String password;
	private String name;
	private String shopCd;

	public String getUserCd() {
		return this.userCd;
	}
	public void setUserCd(String userCd) {
		this.userCd = userCd;
	}
	public String getPassword() {
		return this.password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getName() {
		return this.name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getShopCd() {
		return this.shopCd;
	}
	public void setShopCd(String shopCd) {
		this.shopCd = shopCd;
	}
}
