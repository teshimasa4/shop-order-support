package jp.xxxxx.shop_order_support.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;


@Controller
@RequestMapping(value = "/order")
public class OrderController {

	@RequestMapping(value = "/", method = RequestMethod.GET)
	public String home() {
		return "order/home";
	}
}