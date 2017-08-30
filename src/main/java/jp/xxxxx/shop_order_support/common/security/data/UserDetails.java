package jp.xxxxx.shop_order_support.common.security.data;

import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;

import jp.xxxxx.shop_order_support.entity.User;

public class UserDetails extends org.springframework.security.core.userdetails.User {

	private static final long serialVersionUID = 1L;
	private User user;

	public UserDetails(User user, Collection<? extends GrantedAuthority> authorities) {
		super(user.getCode(), user.getPassword(), (user.getEnabled() && user.getShop().getEnabled()), true, true, true, authorities);
		this.user = user;
	}

	public User getUser() {
        return this.user;
    }
}
