package com.kyd.web.action.xtgl;

import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import org.apache.struts2.ServletActionContext;

import com.kyd.model.User;
import com.kyd.service.xtgl.IUserManagerService;
import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.ActionSupport;
import com.opensymphony.xwork2.ModelDriven;

public class UserManagerAction  extends ActionSupport implements ModelDriven<User> {
	//
	private String uid;
	private int limit;
	private int start; 
	private int totalCount=0;

    private boolean success = true;

	
	private List users = new ArrayList(); 

	protected IUserManagerService userManagerService;
	
	private User model = new User();


    


	public void setModel(User model) {
		this.model = model;
	}


	public boolean isSuccess() {
		return success;
	}


	public void setSuccess(boolean success) {
		this.success = success;
	}


	public void setUserManagerService(IUserManagerService userManagerService) {
		this.userManagerService = userManagerService;
	}


	/**
	 * 初始化方法
	 * @return
	 * @throws Exception
	 */
	public String initPage() throws Exception
	{	
		Map session = ActionContext.getContext().getSession();
		session.put("user", session.get("user"));
		return SUCCESS;
	}
	
	/**
	 * 设置响应类型，获取输出流，
	 * @return
	 * @throws Exception
	 */
	public PrintWriter getWriter()throws Exception
	{
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=UTF-8"); 
		PrintWriter out= response.getWriter();
		return out;
	}
	public String getAAA(){
		return SUCCESS;
	}
	
	/**
	 * 修改密码
	 * @return
	 * @throws Exception
	 */
	public String updatePass() throws Exception{
		
		User u = new User();
		u.setUser_id(getModel().getUser_id());
		u.setJpass(getModel().getJpass());
		u.setXpass(getModel().getXpass());
		u.setQrpass(getModel().getQrpass());
		
		
		if(userManagerService.findUserIdAndPass(getModel().getUser_id(), getModel().getJpass())!=1){
				PrintWriter out = this.getWriter();
				out.print("{success:true,msg:'"+"您输入的密码不正确！！！"+"'}");
				out.flush();
	    		out.close();
		}else{		
			userManagerService.updatePass(u);//修改密码
	    	PrintWriter out = this.getWriter();
			out.print("{success:true,msg:'"+"修改密码成功！！！"+"'}");
			out.flush();
    		out.close();
		}
	
		return SUCCESS;	
	}
	
	/**
	 * 查询用户信息
	 * @return
	 * @throws Exception
	 */
	public String userManager() throws Exception
	{		
		if("".equals(uid)||null==uid)
		{
			uid = "%";
		}else
		{
			uid += "%";
		}
		totalCount = userManagerService.findUserTotal();
		users = userManagerService.findAllUser(start,limit+start,uid);	
		return SUCCESS;
	}
	
	/**
	 * 修改用户信息
	 * @return
	 * @throws Exception
	 */
	public String updateUser() throws Exception
	{
		User u = new User();
		u.setUser_id(getModel().getUser_id());
		u.setUser(getModel().getUser());
		u.setPass(getModel().getPass());
		u.setPid(getModel().getPid());
		u.setSex(getModel().getSex());
		u.setEmail(getModel().getEmail());
		
		userManagerService.updateUser(u);

		return SUCCESS;	
	}
	
	/**
	 * 保存用户信息
	 * @return
	 * @throws Exception
	 */
	public String saveUser() throws Exception
	{
		User u = new User();
		u.setUser_id(getModel().getUser_id());
		u.setUser(getModel().getUser());
		u.setPass(getModel().getUser_id());
		u.setEmail(getModel().getEmail());
		u.setSex(getModel().getSex());
		u.setBmdm(getModel().getBmdm());
		
		if(userManagerService.getvalidateName(getModel().getUser_id()))//根据用户ID查询该用户是否存在
		{
			
			PrintWriter out = this.getWriter();
			out.print("{success:true,msg:'"+"该用户ID已存在！！！"+"'}");
			out.flush();
    		out.close();
		}else{
			userManagerService.addUser(u);
			PrintWriter out = this.getWriter();
			out.print("{success:true,msg:'"+"添加用户信息成功！！！"+"'}");
			out.flush();
    		out.close();
		}
		
		return SUCCESS;	
	}
	
	/**
	 * 删除用户信息
	 * @return
	 * @throws Exception
	 */
	public String deleteUser() throws Exception
	{
		User u = new User();
//		u.setUser_id(user_id);
//		u.setUser(user);
		u.setUser_id(getModel().getUser_id());
		u.setUser(getModel().getUser());
		userManagerService.deleteUser(u);
		return SUCCESS;	
	}
	
	
	
	public int getLimit() {
		return limit;
	}

	public void setLimit(int limit) {
		this.limit = limit;
	}

	public int getStart() {
		return start;
	}

	public void setStart(int start) {
		this.start = start;
	}

	

	public int getTotalCount() {
		return totalCount;
	}


	public void setTotalCount(int totalCount) {
		this.totalCount = totalCount;
	}


	public List getUsers() {
		return users;
	}


	public void setUsers(List users) {
		this.users = users;
	}



	public User getModel() {
		// TODO Auto-generated method stub
		return model;
	}


	public String getUid() {
		return uid;
	}


	public void setUid(String uid) {
		this.uid = uid;
	}
}
