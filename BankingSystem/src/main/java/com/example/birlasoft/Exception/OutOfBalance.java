/**
 * 
 */
package com.example.birlasoft.Exception;

/**
 * @author root
 *
 */

public class OutOfBalance extends Exception {
	/**
	 * 
	 */
	private static final long serialVersionUID = 4263376762628814809L;
	String str;
	OutOfBalance(String str){
		this.str=str;
	}
	public String toString() {
		return (str);
	}
}
