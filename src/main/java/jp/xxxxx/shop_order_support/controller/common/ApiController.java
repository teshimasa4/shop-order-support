package jp.xxxxx.shop_order_support.controller.common;

import java.io.IOException;

import org.codehaus.jackson.JsonGenerationException;
import org.codehaus.jackson.map.JsonMappingException;
import org.codehaus.jackson.map.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import jp.xxxxx.shop_order_support.service.common.ApiService;


@RestController
@RequestMapping(value = "/api")
public class ApiController {

	@Autowired
    private ObjectMapper objectMapper;

	@Autowired
    private ApiService apiService;

	@RequestMapping(value = "/item", method = RequestMethod.GET, produces = "application/json;charset=UTF-8")
	public String item(@RequestParam("shop_cd") String shopCd, @RequestParam("item_cd") String itemCd) throws JsonGenerationException, JsonMappingException, IOException {
		return objectMapper.writeValueAsString(apiService.findOneItem(shopCd, itemCd));
	}
}
