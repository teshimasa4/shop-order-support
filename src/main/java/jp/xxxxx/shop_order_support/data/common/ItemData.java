package jp.xxxxx.shop_order_support.data.common;

import java.io.Serializable;
import java.sql.Timestamp;

import org.codehaus.jackson.annotate.JsonProperty;
import org.codehaus.jackson.map.annotate.JsonSerialize;
import org.codehaus.jackson.map.annotate.JsonSerialize.Inclusion;

import lombok.Data;

@Data
@JsonSerialize(include = Inclusion.NON_NULL)
public class ItemData implements Serializable {

	private static final long serialVersionUID = 1L;

	@JsonProperty("shop_cd")
	private String shopCd;

	@JsonProperty("item_cd")
	private String itemCd;

	@JsonProperty("item_name")
	private String itemName;

	@JsonProperty("item_category_cd")
	private String itemCategoryCd;

	@JsonProperty("item_category_name")
	private String itemCategoryName;

	@JsonProperty("date_specification")
	private Boolean dateSpecification;

	@JsonProperty("min_order_quantity")
	private int minOrderQuantity;

	@JsonProperty("unit_selling_price")
	private Double unitSellingPrice;

	@JsonProperty("unit_cost")
	private Double unitCost;

	@JsonProperty("lead_time")
	private Integer leadTime;

	@JsonProperty("last_update_time")
	private Timestamp lastUpdateTime;
}
