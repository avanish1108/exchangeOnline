using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Configuration;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace ExchangeOnline.Models
{
	public class AdminLogin
	{
		[Key]
		public string AdminId { get;set; }
		[Required(ErrorMessage = "Email is required")] 
		public string Email { get; set; }
		[Required(ErrorMessage = "Password is required")]
		public string password { get; set; }
		

	}
}