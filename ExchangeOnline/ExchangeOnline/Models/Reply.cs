using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace ExchangeOnline.Models
{
	public class Reply
	{
		[Key]
		public int Rid { get; set; }
		public string UserEmail { get; set; }
		public string ReplyMessage { get; set; }
	}
}