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
	public List<SetResponseEntity> createUserAccount(@RequestBody RBankingDetails accountDetails) {
		SetResponseEntity entity=new SetResponseEntity();
		List<SetResponseEntity> response=new ArrayList<SetResponseEntity>();
		try {
			RBankingService bankingService = new RBankingService();
			response=bankingService.createAccount(accountDetails);
			
			System.out.println(accountDetails.getName());
		} catch (Exception e) {
			entity.setMsg("Error While Registering in Controller");
			entity.setResponseCode(401);
		}
		return response;
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
	public List<SetResponseEntity> addBalance (@RequestBody AddWithdrawBalanceEntity add) {
		List<SetResponseEntity> response=new ArrayList<SetResponseEntity>();
		SetResponseEntity entity=new SetResponseEntity();
		try {
			RBankingService bankingService = new RBankingService();
			response=bankingService.addBalanceAmount(add);
		}
		catch(Exception e) {
			entity.setMsg("Error while Adding Balance");
			entity.setResponseCode(401);
		}
		return response;
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
	public List<SetResponseEntity> loginUser(@RequestBody RBankingDetails login) {
		
		List<SetResponseEntity> response=new ArrayList<SetResponseEntity>();
		SetResponseEntity entity=new SetResponseEntity();
		try {
			RBankingService bankingService = new RBankingService();
			response=bankingService.loginBankUser(login);
		}
		catch(Exception e) {
			entity.setMsg("Error While Login");
			entity.setResponseCode(401);
		}
		return response;
	}
}
