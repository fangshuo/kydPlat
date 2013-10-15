package com.kyd.util;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

import sun.misc.BASE64Encoder;
/**
 * 安全加解密(DES/MD5/BASE64)
 */
public class SecurityUtils {

	/**
	 * password 加密 MD5
	 * 
	 * @param strInput
	 *            输入字符串
	 * @return String
	 * @throws Exception
	 */
	public final static String encryptPassword(String password) {
		SecurityException sEx;
		try {
			MessageDigest messageDigest = MessageDigest.getInstance("MD5");
			BASE64Encoder encoder = new BASE64Encoder();
			return encoder.encode(messageDigest.digest(password.getBytes()));
		} catch (NoSuchAlgorithmException e) {
			sEx = new SecurityException("没有找到MD5,请查看您的JDK版本: " + e.getMessage());
		}
		throw sEx;
	}
	/**
	 * password 加密 MD5
	 * 
	 * @param strInput
	 *            输入字符串
	 * @return String
	 * @throws Exception
	 */
//	public final static String encryptPassword1(String password) {
//		SecurityException sEx;
//		try {
//			MessageDigest messageDigest = MessageDigest.getInstance("MD5");
//			weblogic.utils.encoders.BASE64Encoder encoder = new weblogic.utils.encoders.BASE64Encoder();
//			return encoder.encodeBuffer(messageDigest.digest(password.getBytes()));
//		} catch (NoSuchAlgorithmException e) {
//			sEx = new SecurityException("没有找到MD5,请查看您的JDK版本: " + e.getMessage());
//		}
//		throw sEx;
//	}
	public static void main(String[] args) {
		System.out.println(SecurityUtils.encryptPassword("123456"));
	}
}
