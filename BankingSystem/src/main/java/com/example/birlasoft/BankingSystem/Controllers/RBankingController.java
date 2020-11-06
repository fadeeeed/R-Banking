/**
 * 
 */
package com.example.birlasoft.BankingSystem.Controllers;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.birlasoft.BankingSystem.entity.RBankingDetails;
import com.example.birlasoft.BankingSystem.entity.addBalanceEntity;
import com.example.birlasoft.BankingSystem.services.RBankingService;

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
	public String addBalance (@RequestBody addBalanceEntity add) {
		String msg=null;
		try {
			RBankingService bankingService = new RBankingService();
			msg=bankingService.addBalanceAmount(add);
			
		}
		catch(Exception e) {
			e.printStackTrace();
		}
		return msg;
	}
	
	@PostMapping("/withdraw")
	public String withdraw(@RequestBody addBalanceEntity withdraw) {
		String msg=null;
		try {
			RBankingService bankingService=new RBankingService();
			msg=bankingService.withdrawAmount(withdraw);
		}
		catch(Exception e) {
			e.printStackTrace();
		}
		return msg;
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
