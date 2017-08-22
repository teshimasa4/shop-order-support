package jp.xxxxx.shop_order_support.controller;

import static org.springframework.web.bind.annotation.RequestMethod.GET;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import jp.xxxxx.shop_order_support.entity.User;
import jp.xxxxx.shop_order_support.service.HomeService;


@Controller
public class HomeController {

	@Autowired
	HomeService homeService;

	@RequestMapping(value = "/", method = GET)
	public String home(Model model) {

		List<User> userList = homeService.findAll();

		model.addAttribute("welcomeMesssage", "Hello!!");
		model.addAttribute("userName", userList.get(0).getName());
		return "home/home";
	}
}
