package jp.xxxxx.shop_order_support.common.security.service;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import jp.xxxxx.shop_order_support.common.security.data.UserDetails;
import jp.xxxxx.shop_order_support.entity.UserEntity;
import jp.xxxxx.shop_order_support.mapper.entity.UserMapper;

@Service
@Transactional
public class UserDetailsService implements org.springframework.security.core.userdetails.UserDetailsService {

	@Autowired
    private UserMapper userMapper;

	@Override
	public UserDetails loadUserByUsername(String code) throws UsernameNotFoundException {

		UserEntity user = userMapper.findOne(code);
		if(user == null) {
			throw new UsernameNotFoundException(code);
		}

		return new UserDetails(user, getAuthorities());
	}

	private Collection<GrantedAuthority> getAuthorities() {
		return AuthorityUtils.createAuthorityList("ROLE_USER");
	}
}
