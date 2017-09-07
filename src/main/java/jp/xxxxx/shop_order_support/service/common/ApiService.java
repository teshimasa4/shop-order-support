package jp.xxxxx.shop_order_support.service.common;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import jp.xxxxx.shop_order_support.data.common.ItemData;
import jp.xxxxx.shop_order_support.mapper.common.ApiMapper;

@Service
@Transactional
public class ApiService {

	@Autowired
    private ApiMapper apiMapper;

	public ItemData findOneItem(String shopCd, String itemCd) {
		return apiMapper.findOneItem(shopCd, itemCd);
	}
}
