<h2>
	<a href="${pageContext.request.contextPath}/">Shop Order Support System</a>
</h2>

<p class="user_info">
	<sec:authentication property="principal.user.name"/>
	@
	<sec:authentication property="principal.user.shop.name"/>
</p>
