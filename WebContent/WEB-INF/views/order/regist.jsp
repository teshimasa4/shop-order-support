<script src="${pageContext.request.contextPath}/resources/app/js/order/common.js"></script>
<script src="${pageContext.request.contextPath}/resources/app/js/order/regist.js"></script>

<table id="regist_data" class="table table-striped">
	<thead>
		<tr>
			<th></th>
			<th><spring:message code="label.common.item_nm" /></th>
			<th><spring:message code="label.common.item_category" /></th>
			<th><spring:message code="label.order.quantity" /></th>
			<th><spring:message code="label.order.input.time" /></th>
			<th></th>
		</tr>
	</thead>
	<tbody>
		<tr></tr>
	</tbody>
</table>

<button id="regist" class="btn btn-primary"><spring:message code="label.common.regist" /></button>