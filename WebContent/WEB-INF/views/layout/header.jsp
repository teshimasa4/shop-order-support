<script src="${pageContext.request.contextPath}/resources/app/js/layout/header.js" /></script>

<h2>
	<a href="${pageContext.request.contextPath}/">Shop Order Support System</a>
</h2>

<ul id="navigation" class="slimmenu">
	<li><a href="${pageContext.request.contextPath}/">home</a></li>
	<li><a href="${pageContext.request.contextPath}/order/input/">order</a></li>
	<li><a href=""></a></li>
	<li>
		<form:form action="${pageContext.request.contextPath}/logout" method="post" id="logout">
			<a id="logout">logout</a>
		</form:form>
	</li>
</ul>
