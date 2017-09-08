<script src="${pageContext.request.contextPath}/resources/app/js/order/input.js" async></script>

<table>
	<tr>
		<td><spring:message code="label.common.item_cd" /></td>
		<td><input type='text' id='item_cd' value='' /></td>
	</tr>
	<tr>
		<td><spring:message code="label.common.item_nm" /></td>
		<td><span id="item_nm"></span></td>
	</tr>
	<tr>
		<td><spring:message code="label.common.item_category" /></td>
		<td><span id="item_category_nm"></span></td>
	</tr>
	<tr>
		<td><spring:message code="label.order.quantity" /></td>
		<td><input type='text' id='order_quantity' value='' class="number" /></td>
	</tr>
</table>

<button id="save"><spring:message code="label.common.save" /></button>




<input type="hidden" id="item_category_cd" value=""></input>
