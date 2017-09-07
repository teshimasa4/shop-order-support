package jp.xxxxx.shop_order_support.common.security.data;

import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;

import jp.xxxxx.shop_order_support.entity.UserEntity;

public class UserDetails extends org.springframework.security.core.userdetails.User {

	private static final long serialVersionUID = 1L;
	private UserEntity user;

	public UserDetails(UserEntity user, Collection<? extends GrantedAuthority> authorities) {
		super(user.getCode(), user.getPassword(), (user.getEnabled() && user.getShop().getEnabled()), true, true, true, authorities);
		this.user = user;
	}

	public UserEntity getUser() {
        return this.user;
    }
}
