package com.example.birlasoft.BankingSystem.dao;

public interface DBQueryServiceInterface {
	public static final String createAccountQuery = "call createAccount(?,?,?,?,?,?,?,?)";
	public static final String getDetailsQuery = "select customer_id,name,acc_number,email,contact,balance from user_details where customer_id= ?";
	public static final String addBalanceQuery = "update user_details set balance = balance+? where customer_id = ?";
	public static final String withdrawQuery = "call withdraw(?,?,?,?)";
	public static final String userLogin= "select * from user_details where email=? and password=?";
}
