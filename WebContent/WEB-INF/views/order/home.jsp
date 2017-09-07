<script src="${pageContext.request.contextPath}/resources/app/js/order/home.js" async></script>

<table>
	<tr>
		<td><spring:message code="label.common.item_cd" /></td>
		<td><input type='text' id='item_cd' value='' /></td>
	</tr>
	<tr>
		<td><spring:message code="label.common.item_name" /></td>
		<td><span id="item_name"></span></td>
	</tr>
	<tr>
		<td><spring:message code="label.common.item_category" /></td>
		<td><span id="item_category_name"></span></td>
	</tr>
	<tr>
		<td><spring:message code="label.order.quantity" /></td>
		<td><input type='text' id='order_quantity' value='' class="number" /></td>
	</tr>
</table>

<button id="save"><spring:message code="label.common.save" /></button>

<input type="hidden" id="shop_cd" value="<sec:authentication property="principal.user.shop.code"/>"></input>
