<script src="${pageContext.request.contextPath}/resources/app/js/order/common.js"></script>
<script src="${pageContext.request.contextPath}/resources/app/js/order/input.js"></script>

<table class="table">
	<tbody>
		<tr>
			<td><spring:message code="label.common.item_cd" /></td>
			<td><input type='text' id='item_cd' value='' /></td>
		</tr>
		<tr class="info">
			<td><spring:message code="label.common.item_nm" /></td>
			<td><span id="item_nm"></span></td>
		</tr>
		<tr class="info">
			<td><spring:message code="label.common.item_category" /></td>
			<td><span id="item_category_nm"></span></td>
		</tr>
		<tr>
			<td><spring:message code="label.order.quantity" /></td>
			<td><input type='text' id='order_quantity' value='' class="number" /></td>
		</tr>
	</tbody>
</table>

<button id="save" class="btn btn-primary"><spring:message code="label.common.save" /></button>

<input type="hidden" id="item_category_cd" value=""></input>
