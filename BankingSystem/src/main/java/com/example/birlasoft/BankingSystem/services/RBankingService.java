package com.example.birlasoft.BankingSystem.services;

import com.example.birlasoft.BankingSystem.dao.DatabaseConnection;
import com.example.birlasoft.BankingSystem.dao.*;
import com.example.birlasoft.BankingSystem.entity.RBankingDetails;
// com.example.birlasoft.BankingSystem.entity.SetResponseEntity;
import com.example.birlasoft.BankingSystem.entity.AddWithdrawBalanceEntity;
import com.example.birlasoft.BankingSystem.utils.AppConstants;
import com.example.birlasoft.Exception.OutOfBalanceException;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.sql.Types;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;
public class RBankingService implements AppConstants{
	public String createAccount(RBankingDetails accountDetails) throws ClassNotFoundException {
		Timestamp timestamp=new Timestamp(System.currentTimeMillis());
		Random rand=new Random();
		long customerId=timestamp.getTime();
		long accountNumber=Long.parseLong(Integer.toString(AppConstants.bankId)+Long.toString(customerId)+Integer.toString(rand.nextInt(90)+10));
		accountDetails.setAccountNumber(accountNumber);
		accountDetails.setCustomerId(customerId);
		Connection con = null;  
		String mesg = null;
		try {
			con=DatabaseConnection.getConnection();
			PreparedStatement stmt = con.prepareStatement(DBQueryServiceInterface.createAccountQuery);
			stmt.setString(1,Long.toString(accountDetails.getCustomerId()));
			stmt.setString(2, accountDetails.getName());
			stmt.setString(3, accountDetails.getEmail());
			stmt.setString(4, Long.toString(accountDetails.getContactNumber()));
			stmt.setString(5, accountDetails.getPassword());
			stmt.setString(6, Long.toString(accountDetails.getAccountNumber()));
			stmt.setString(7, Long.toString(0));
			
			int line = stmt.executeUpdate();
			
			
			if (line >0) {
				System.out.println(line + " Lines Updated");
			} else {
				mesg = "Error! There is Some Error in user registration.";
			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			try {
				DatabaseConnection.closeConnection(con);
			} catch (Exception e) {
				System.out.println("Exception in closing");
			}
		}
		
		return mesg;
		
		}
	
	public List<RBankingDetails> getDetails(long customerId) throws SQLException {
		Connection con=null;
		List<RBankingDetails> details = null;
		try {
			con=DatabaseConnection.getConnection();
			PreparedStatement stmt=con.prepareStatement(DBQueryServiceInterface.getDetailsQuery);
			stmt.setString(1,Long.toString(customerId));
			ResultSet rs= stmt.executeQuery();
			details=new ArrayList<RBankingDetails>();
			while(rs.next()) {
				RBankingDetails bankingDetails = new RBankingDetails();
				bankingDetails.setCustomerId(Long.parseLong(rs.getString("customer_id")));
				bankingDetails.setAccountNumber(Long.parseLong(rs.getString("acc_number")));
				bankingDetails.setName(rs.getString("name"));
				bankingDetails.setEmail(rs.getString("email"));
				bankingDetails.setContactNumber(Long.parseLong(rs.getString("contact")));
				bankingDetails.setBalance(rs.getDouble("balance"));
				
				details.add(bankingDetails);
			}
		}
		catch(Exception e) {
			
			System.out.println("User Details Successfully Fetched");
		} finally {
			DatabaseConnection.closeConnection(con);
		}
		
		return details;
	}
	
	public String addBalanceAmount(AddWithdrawBalanceEntity add) throws SQLException {
		Connection con=null;
		String msg=null;
		try {
			con=DatabaseConnection.getConnection();
			PreparedStatement stmt=con.prepareStatement(DBQueryServiceInterface.addBalanceQuery);
			stmt.setDouble(1,add.getBalance());
			stmt.setString(2, Long.toString(add.getCustomerId()));
			int line = stmt.executeUpdate();
			
			
			if (line >0) {
				msg="Amount Added Successfully";
			} else {
				msg = "Error! There is Some Error in user registration.";
			}

		}
		catch(Exception e) {
			msg="Server Error";
			System.out.println("Adding Balance Interrupted");
		}
		finally {
			DatabaseConnection.closeConnection(con);
		}
		return msg;
	}
	
	public int withdrawAmount(AddWithdrawBalanceEntity withdraw) throws SQLException ,OutOfBalanceException{
		Connection con=null;
		int code=401;
		try {
			con=DatabaseConnection.getConnection();
			CallableStatement stmt=con.prepareCall(DBQueryServiceInterface.withdrawQuery);
			stmt.setString(1, Long.toString(withdraw.getCustomerId()));
			stmt.setDouble(2,withdraw.getBalance());
			
			stmt.registerOutParameter(3, Types.DOUBLE);
			stmt.registerOutParameter(4, Types.INTEGER);
			ResultSet rs=stmt.executeQuery();
			
			if(rs.next()) {
				int responseCode=rs.getInt("response_code");
				System.out.println(responseCode);
				if(responseCode==200) {
					code=200;
				}
				else if(responseCode==402) {
					throw new OutOfBalanceException("Insufficient Balance");
				}
				else {
					code=401;
				}
			}

		}
		catch(Exception e) {
			System.out.println("Adding Balance Interrupted");
		}
		finally {
			DatabaseConnection.closeConnection(con);
		}
		return code;
	}
	
	public String loginBankUser(RBankingDetails login) throws SQLException {
		Connection con=null;
		String msg=null;
		try {
			con=DatabaseConnection.getConnection();
			PreparedStatement stmt=con.prepareStatement(DBQueryServiceInterface.userLogin);
			stmt.setString(1, login.getEmail());
			stmt.setString(2, login.getPassword());
			ResultSet rs=stmt.executeQuery();
			if(rs.next()) {
				msg="Login Successful";
			}
			else {
				msg="Invalid Credentials !";
			}
		}
		catch(Exception e) {
			msg="Error while login";
		}
		finally {
			DatabaseConnection.closeConnection(con);
		}
		return msg;
	}
}
