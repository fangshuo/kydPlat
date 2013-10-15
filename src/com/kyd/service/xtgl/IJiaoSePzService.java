package com.kyd.service.xtgl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public interface IJiaoSePzService {

	public List getTree(Map map, String bj);

	public HashMap submitData(List list, String jsdm);

	public HashMap saveData(List list, String jsdm);

	public HashMap changeData(String id, String mc, String leaf);

	public HashMap delData(String id, String leaf);
}
