package jp.xxxxx.shop_order_support.repository;

import org.apache.ibatis.annotations.Param;

import jp.xxxxx.shop_order_support.entity.User;

public interface UserRepository {
	User findOne(@Param("code") String code);
}
