<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>

<html>
<head>
	<meta name="viewport" content="width=device-width, initial-scale=1.0">

	<link href="<c:url value="/resources/bootstrap/css/bootstrap-responsive.min.css" />" rel="stylesheet">
	<link href="<c:url value="/resources/jquery/css/jquery-ui-1.12.1.min.css" />" rel="stylesheet">
	<link href="<c:url value="/resources/app/css/common.css" />" rel="stylesheet">

	<script src="<c:url value="/resources/jquery/js/jquery-3.2.1.min.js" />"></script>
	<script src="<c:url value="/resources/jquery/js/jquery-ui-1.12.1.min.js" />"></script>
	<script src="<c:url value="/resources/app/js/common.js" />"></script>

	<c:set var="titleKey">
		<tiles:insertAttribute name="title" ignore="true" />
	</c:set>

	<title><spring:message code="${titleKey}" text="Shop Order Support" /></title>

</head>
<body>
	<div id="header">
		<tiles:insertAttribute name="header" />
	</div>
	<div id="body">
		<tiles:insertAttribute name="body" />
	</div>
	<div id="footer">
		<tiles:insertAttribute name="footer" />
	</div>
</body>
</html>