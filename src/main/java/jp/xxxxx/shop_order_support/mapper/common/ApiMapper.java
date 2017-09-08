package jp.xxxxx.shop_order_support.mapper.common;

import org.apache.ibatis.annotations.Param;

import jp.xxxxx.shop_order_support.data.common.ItemData;

public interface ApiMapper {
	ItemData findOneItem(@Param("shop_cd") String shopCd, @Param("item_cd") String itemCd);
}
