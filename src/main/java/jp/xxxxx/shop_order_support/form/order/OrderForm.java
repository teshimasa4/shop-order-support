package jp.xxxxx.shop_order_support.form.order;

import java.io.Serializable;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;

import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown=true)
public class OrderForm implements Serializable {

	private static final long serialVersionUID = 1L;

	@JsonProperty("user_cd")
	private String userCd;
}
