package jp.xxxxx.shop_order_support.mapper.common;

import org.apache.ibatis.annotations.Param;

import jp.xxxxx.shop_order_support.data.common.ItemData;

public interface ApiMapper {
	ItemData findOneItem(@Param("shop_code") String shopCd, @Param("item_code") String itemCd);
}
