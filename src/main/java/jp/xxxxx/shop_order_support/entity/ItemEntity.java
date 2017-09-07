package jp.xxxxx.shop_order_support.entity;

import org.codehaus.jackson.map.annotate.JsonSerialize;
import org.codehaus.jackson.map.annotate.JsonSerialize.Inclusion;

import jp.xxxxx.shop_order_support.entity.base.Base;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
@JsonSerialize(include = Inclusion.NON_NULL)
public class ItemEntity extends Base {

	private static final long serialVersionUID = 1L;

	private String code;
	private String name;
}
