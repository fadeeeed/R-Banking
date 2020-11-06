package com.example.birlasoft.BankingSystem.dao;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DatabaseConnection {
	public static Connection getConnection() throws SQLException, ClassNotFoundException{
		Class.forName("com.mysql.cj.jdbc.Driver");
		Connection con = DriverManager.getConnection("jdbc:mysql://localhost:3306/Bank", "root", "27898");
		return con;
	}

	public static void closeConnection(Connection con) throws SQLException{
		con.close();
	}

}
