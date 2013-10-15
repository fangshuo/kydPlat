package com.kyd.service.xtgl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public interface IUserJsGlService {

	public List getTree(Map map, String lx);

	public HashMap submitData(List list, String userid);
}
