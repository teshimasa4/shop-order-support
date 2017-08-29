<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>

<html>
<head>
	<meta name="viewport" content="width=device-width, initial-scale=1.0">

	<!-- bootstrap -->
	<link href="<c:url value="/resources/bootstrap/css/bootstrap-3.3.7.min.css" />" rel="stylesheet">

	<!-- jquery -->
	<script src="<c:url value="/resources/jquery/js/jquery-3.2.1.min.js" />"></script>

	<!-- slimMenu -->
	<link href="<c:url value="/resources/jquery/css/slimmenu.min.css" />" rel="stylesheet">
	<script src="<c:url value="/resources/jquery/js/jquery.slimmenu.min.js" />"></script>

	<!-- app -->
	<link href="<c:url value="/resources/app/css/common.css" />" rel="stylesheet">
	<script src="<c:url value="/resources/app/js/common.js" />"></script>

	<c:set var="titleKey">
		<tiles:insertAttribute name="title" ignore="true" />
	</c:set>

	<title><spring:message code="${titleKey}" /></title>

</head>
<body>
	<div data-role="page">
		<div data-role="header">
			<tiles:insertAttribute name="header" />
		</div>

		<h3>
			<spring:message code="${titleKey}" />
		</h3>

		<div role="main" class="ui-content">
			<tiles:insertAttribute name="body" />
		</div>

		<div data-role="footer">
			<tiles:insertAttribute name="footer" />
		</div>
	</div>
</body>
</html>