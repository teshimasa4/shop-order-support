package jp.xxxxx.shop_order_support.common.aspect;


import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.util.StopWatch;

@Component
@Aspect
public class MethodLoggingAspect {

	private static final Logger LOGGER = LoggerFactory.getLogger(MethodLoggingAspect.class);

	@Around("execution(* jp.xxxxx.shop_order_support..*.*(..))")
	public Object log(ProceedingJoinPoint jp) throws Throwable {

		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String user;

		if(authentication != null && authentication.getPrincipal() instanceof UserDetails) {
			user = UserDetails.class.cast(authentication.getPrincipal()).getUsername();
		} else {
			user = "";
		}

		StopWatch stopWatch = new StopWatch();
		LOGGER.info("[MethodLogging]" + jp.getTarget().getClass().toString() + "." + jp.getSignature().getName() + "() start. " + "[" + user + "]");

		try {
			Object result;
			stopWatch.start();
			result = jp.proceed();
			stopWatch.stop();

			LOGGER.info("[MethodLogging]" + jp.getTarget().getClass().toString() + "." + jp.getSignature().getName() + "() end. " + "[" + stopWatch.getTotalTimeMillis() + "ms]");

			return result;
		} catch (Exception e) {
			LOGGER.info("[MethodLogging]" + jp.getTarget().getClass().toString() + "." + jp.getSignature().getName() + "() throw Exception.");
			throw e;
		}
	}
}
