<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>

<html>
<head>
	<meta name="viewport" content="width=device-width, initial-scale=1.0">

	<!-- bootstrap -->
	<link href="${pageContext.request.contextPath}/resources/bootstrap/css/bootstrap-3.3.7.min.css" rel="stylesheet">

	<!-- jquery -->
	<script src="${pageContext.request.contextPath}/resources/jquery/js/jquery-3.2.1.min.js"></script>

	<!-- drawer -->
	<link href="${pageContext.request.contextPath}/resources/jquery/css/drawer.min-3.2.2.css" rel="stylesheet">
	<script src="${pageContext.request.contextPath}/resources/jquery/js/iscroll-5.2.0.js"></script>
	<script src="${pageContext.request.contextPath}/resources/jquery/js/drawer.min-3.2.2.js"></script>



	<!-- app -->
	<link href="${pageContext.request.contextPath}/resources/app/css/common/common.css" rel="stylesheet">
	<script src="${pageContext.request.contextPath}/resources/app/js/common/common.js"></script>

	<link href="${pageContext.request.contextPath}/resources/app/css/layout/layout.css" rel="stylesheet">
	<script src="${pageContext.request.contextPath}/resources/app/js/layout/layout.js"></script>

	<script src="${pageContext.request.contextPath}/resources/app/js/common/service-worker-registration.js" async></script>
	<script src="${pageContext.request.contextPath}/resources/app/js/common/indexedDB-registration.js" async></script>

	<c:set var="titleKey">
		<tiles:insertAttribute name="title" ignore="true" />
	</c:set>

	<title><spring:message code="${titleKey}" /></title>

</head>
<body class="drawer drawer--left">

	<header role="banner">
		<button type="button" class="drawer-toggle drawer-hamburger">
			<span class="sr-only">toggle navigation</span>
			<span class="drawer-hamburger-icon"></span>
		</button>
		<nav class="drawer-nav" role="navigation">
			<ul class="drawer-menu">
				<li><a class="drawer-brand" href="${pageContext.request.contextPath}/">home</a></li>
				<li><a class="drawer-menu-item" href="${pageContext.request.contextPath}/order/input/">order</a></li>

				<li>
					<form:form action="${pageContext.request.contextPath}/logout" method="post" id="logout">
						<a id="logout" class="drawer-menu-item">logout</a>
					</form:form>
				</li>
			</ul>
		</nav>
	</header>

	<main role="main">

		<div data-role="page">
			<div data-role="header">
				<tiles:insertAttribute name="header" />
				<div class="subtitle">
					<h3><spring:message code="${titleKey}" /></h3>
				</div>
			</div>

			<div role="main" class="ui-content">
				<tiles:insertAttribute name="body" />
			</div>

			<div data-role="footer">
				<tiles:insertAttribute name="footer" />
			</div>
		</div>

		<input type="hidden" id="shop_cd" value="<sec:authentication property="principal.user.shop.code"/>"></input>
		<input type="hidden" id="user_cd" value="<sec:authentication property="principal.user.code"/>"></input>

	</main>
</body>
</html>