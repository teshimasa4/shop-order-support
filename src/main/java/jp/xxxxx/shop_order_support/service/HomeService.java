package jp.xxxxx.shop_order_support.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import jp.xxxxx.shop_order_support.entity.User;
import jp.xxxxx.shop_order_support.mapper.UserMapper;

@Service
public class HomeService {

	@Autowired
    private UserMapper userMapper;

	@Transactional(readOnly = true)
	public List<User> findAll() {
		return userMapper.findAll();
	}
}
