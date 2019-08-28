using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ExchangeOnline.Models
{
	public class Helpreplyvm
	{
		public List<Help> helplist { get; set; }
		public Help help { get; set; }
		public Reply reply { get; set; }
	}
}