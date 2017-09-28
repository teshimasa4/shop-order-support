package jp.xxxxx.shop_order_support.controller.order;

import java.io.IOException;
import java.util.List;

import org.codehaus.jackson.JsonParseException;
import org.codehaus.jackson.map.JsonMappingException;
import org.codehaus.jackson.map.ObjectMapper;
import org.codehaus.jackson.type.TypeReference;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import jp.xxxxx.shop_order_support.form.order.OrderForm;


@Controller
@RequestMapping(value = "/order")
public class OrderRegistController {

	@RequestMapping(value = "/regist", method = RequestMethod.GET)
	public String regist() {
		return "order/regist";
	}

	@RequestMapping(value = "/regist/orders", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	@ResponseBody
	@ResponseStatus(HttpStatus.CREATED)
	public String registOrders(@RequestBody String forms) throws JsonParseException, JsonMappingException, IOException {

		ObjectMapper mapper = new ObjectMapper();
        List<OrderForm> orderForm = mapper.readValue(forms, new TypeReference<List<OrderForm>>() {});

        // TODO

		return "{\"status\": \"success\"}";
	}
}

