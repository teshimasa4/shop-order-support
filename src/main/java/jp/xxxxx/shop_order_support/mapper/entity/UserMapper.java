package jp.xxxxx.shop_order_support.mapper.entity;

import org.apache.ibatis.annotations.Param;

import jp.xxxxx.shop_order_support.entity.User;

public interface UserMapper {
	User findOne(@Param("code") String code);
}
