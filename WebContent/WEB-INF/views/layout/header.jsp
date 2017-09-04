<script src="${pageContext.request.contextPath}/resources/app/js/common/header.js" /></script>

<h2>
	<a href="${pageContext.request.contextPath}/">Shop Order Support System</a>
</h2>

<ul id="navigation" class="slimmenu">
	<li><a href="${pageContext.request.contextPath}/">HOME</a></li>
	<li><a href="">SAMPLE</a></li>
	<li><a href="">ABOUT</a></li>
	<li>
		<form:form action="${pageContext.request.contextPath}/logout" method="post" name="logout">
			<a href="javascript:logout.submit()">logout</a>
		</form:form>
	</li>
</ul>
