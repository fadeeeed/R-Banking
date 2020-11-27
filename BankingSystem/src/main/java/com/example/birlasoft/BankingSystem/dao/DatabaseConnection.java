package com.example.birlasoft.BankingSystem.dao;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DatabaseConnection {
	public static Connection getConnection() throws SQLException, ClassNotFoundException{
		Class.forName("com.mysql.cj.jdbc.Driver");
		//Connection con = DriverManager.getConnection("jdbc:mysql://localhost:3306/Bank", "root", "27898");
	

		Connection con=DriverManager.getConnection("jdbc:mysql://b5fcc297a66b3a:0ec4a567@us-cdbr-east-02.cleardb.com/heroku_fe2dc889c924c0a?reconnect=true","b5fcc297a66b3a","0ec4a567");
		System.out.println(con);
		return con;
	}

	public static void closeConnection(Connection con) throws SQLException{
		con.close();
	}

}
