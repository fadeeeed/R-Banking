/**
 * 
 */
package com.example.birlasoft.BankingSystem.Controllers;

import java.util.ArrayList;
import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.birlasoft.BankingSystem.entity.RBankingDetails;
import com.example.birlasoft.BankingSystem.entity.SetResponseEntity;
import com.example.birlasoft.BankingSystem.entity.AddWithdrawBalanceEntity;
import com.example.birlasoft.BankingSystem.services.RBankingService;
import com.example.birlasoft.Exception.OutOfBalanceException;

/**
 * @author root
 * 
 */
@RestController
@RequestMapping("/RBanking")
@CrossOrigin
public class RBankingController {
	@PostMapping("/createAccount")
	public void createUserAccount(@RequestBody RBankingDetails accountDetails) {
		try {
			RBankingService bankingService = new RBankingService();
			bankingService.createAccount(accountDetails);
			System.out.println("AccountCreated");
			System.out.println(accountDetails.getName());
		} catch (Exception e) {
			System.out.println("Try Again");
		}
	}
	@GetMapping("/getDetails")
	public List<RBankingDetails> getUserDetails(@RequestParam long customerId ) {
		List<RBankingDetails> details = null;
		try {
			RBankingService bankingService = new RBankingService();
			details = bankingService.getDetails(customerId);
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return details;
	}
	
	@PostMapping("/addBalance")
	public int addBalance (@RequestBody AddWithdrawBalanceEntity add) {
		String msg=null;
		int code=-1;
		try {
			RBankingService bankingService = new RBankingService();
			msg=bankingService.addBalanceAmount(add);
			
			// If Balance is Updated Successfully
			if(msg=="Amount Added Successfully") {
				code=1;
			}
			else if(msg=="Error! There is Some Error in user registration."){
				code=0;
			}
			else {
				code=-1;
			}
		}
		catch(Exception e) {
			e.printStackTrace();
			code=-1;
		}
		return code;
	}
	
	@PostMapping("/withdraw")
	public List<SetResponseEntity> withdraw(@RequestBody AddWithdrawBalanceEntity withdraw) {
		List<SetResponseEntity> details=new ArrayList<SetResponseEntity>();
		SetResponseEntity bankingResponse=new SetResponseEntity();
		int code;
		try {
			RBankingService bankingService=new RBankingService();
			code=bankingService.withdrawAmount(withdraw);
			if(code==200) {
				bankingResponse.setMsg("Balance Updated Successfull");
				bankingResponse.setResponseCode(200);
			}
			else if(code==401) {
				bankingResponse.setMsg("Invalid Customer ID");
				bankingResponse.setResponseCode(401);
			}
		}
		catch(OutOfBalanceException oe) {
			bankingResponse.setMsg("Insufficient Amount in your Account");
			bankingResponse.setResponseCode(402);
		}
		catch(Exception e) {
			e.printStackTrace();
		}
		details.add(bankingResponse);
		return details;
	}
	
	@PostMapping("/login")
	public int loginUser(@RequestBody RBankingDetails login) {
		int code;
		
		try {
			RBankingService bankingService = new RBankingService();
			String msg=bankingService.loginBankUser(login);
			if(msg=="Login Successful") {
				code=1;
			}
			else {
				code=0;
			}
		}
		catch(Exception e) {
			code=-1;
			e.printStackTrace();
		}
		return code;
	}
}
