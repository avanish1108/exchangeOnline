using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace ExchangeOnline.Models
{
	public class Help
	{   [Key]
		public int HelpId { get; set; }
		[Required(ErrorMessage ="Email is Required.")]
		[EmailAddress(ErrorMessage ="Invalid Email Address.")]
		public string Email { get; set; }
		[Required(ErrorMessage ="Mobile Number is Required.")]
		[Phone(ErrorMessage ="Invalid Mobile Number.")]
		public string Mobile { get; set; }
		[Required(ErrorMessage ="message is Required.")]
		[MaxLength(120,ErrorMessage = "Maximum length is 120.")]
		public string Message { get; set; }
	}
}