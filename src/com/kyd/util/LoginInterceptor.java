package com.kyd.util;

import java.util.Map;

import com.kyd.model.User;
import com.opensymphony.xwork2.ActionInvocation;
import com.opensymphony.xwork2.Action;
import com.opensymphony.xwork2.interceptor.AbstractInterceptor;

public class LoginInterceptor extends AbstractInterceptor {

    private static final long serialVersionUID = 824494329561647852L;

    @Override
    public void destroy() {
    }

    @Override
    public void init() {
    }

    @Override
    public String intercept(ActionInvocation actionInvocation) throws Exception {
            Map session = actionInvocation.getInvocationContext().getSession();
            User user = null;
            if(session != null ){
            	user = (User)(session.get("userVo"));
            }
            if (user == null ) {
                    return Action.INPUT;
            } else {
                    return actionInvocation.invoke();
            }
    }
}


