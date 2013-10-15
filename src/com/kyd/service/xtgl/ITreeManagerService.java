package com.kyd.service.xtgl;

import java.util.List;

import com.kyd.model.Tree;

public interface ITreeManagerService {

	public List<Tree> getTree(String id, String pid);

}
