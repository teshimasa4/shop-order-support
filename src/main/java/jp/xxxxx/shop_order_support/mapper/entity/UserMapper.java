package jp.xxxxx.shop_order_support.mapper.entity;

import org.apache.ibatis.annotations.Param;

import jp.xxxxx.shop_order_support.entity.UserEntity;

public interface UserMapper {
	UserEntity findOne(@Param("code") String code);
}
