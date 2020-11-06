package com.example.birlasoft.BankingSystem.dao;

public interface DBQueryServiceInterface {
	public static final String createAccountQuery = "insert into user_details(customer_id,name,email,contact,password,acc_number,balance) values(?,?,?,?,?,?,?)";
	public static final String getDetailsQuery = "select customer_id,name,acc_number,email,contact,balance from user_details where customer_id= ?";
	public static final String addBalanceQuery = "update user_details set balance = balance+? where customer_id = ?";
	public static final String withdrawQuery = "update user_details set balance = balance-? where customer_id = ?";
	public static final String userLogin= "select * from user_details where email=? and password=?";
}
