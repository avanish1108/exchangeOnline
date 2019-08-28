using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ExchangeOnline.Models
{     [Table("SignUp")]
	public class SignUp
	{
		[Key]
		public int id { get; set; }
		[Required(ErrorMessage ="First Name is Required.")]
		[MinLength(3)]
		[MaxLength(10)]
		[RegularExpression("^[a-zA-Z]{1,20}$", ErrorMessage = "Kindly Enter only Alphabet.")]
		public string FName { get; set; }
		[Required(ErrorMessage ="Last Name is Required.")]
		[MinLength(3)]
		[MaxLength(10)]
		[RegularExpression("^[a-zA-Z]{1,20}$", ErrorMessage = "Kindly Enter only Alphabet.")]
		public string LName { get; set; }
		[Required (ErrorMessage ="Email is Required.")]
		[EmailAddress(ErrorMessage ="Invalid email address. ")]
		[Remote("IsUserExists","UserAccount",ErrorMessage = "EmailId already exists in database.")]
		public string Email { get; set; }
		[Required(ErrorMessage ="Mobile number is Required.")]
		[Phone(ErrorMessage ="Invalid mobile number.")]
		//[RegularExpression("^[0-9]*$", ErrorMessage = "Mobile Number must be numeric")]
		public string MobileNo { get; set; }
		[Required(ErrorMessage ="Password is Requred.")]
		[MinLength(8,ErrorMessage ="Password must be 8 degit.")]
		[RegularExpression("^(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).*$", ErrorMessage = "password must be 1 uppercase,1 lowercase and 1 special character.")]
		public string Password { get; set; }
	}
}