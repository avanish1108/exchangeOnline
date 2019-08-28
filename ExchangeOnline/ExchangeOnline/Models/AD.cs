using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace ExchangeOnline.Models
{
	public class AD
	{
		[Key]
		public int ADid { get; set; }
		[Required(ErrorMessage ="Title is Required.")]
		[MinLength(3)]
		[MaxLength(20)]
		public string Title { get; set; }
		[Required(ErrorMessage ="Brand is Required.")]
		[MinLength(3)]
		[MaxLength(20)]
		public string Brand { get; set; }
		[Required(ErrorMessage ="Description is Required.")]
		[MinLength(10,ErrorMessage ="It must be minimum 10 character.")]
		[MaxLength(120,ErrorMessage ="It will be maximum 120 charcter.")]
		public string Description { get; set; }
		[Required(ErrorMessage = "Mobile Number is Required.")]
		[Phone(ErrorMessage ="Invalid Mobile Number.")]
		public string Mobile { get; set; }
		[Required(ErrorMessage = "Email is Required.")]
		[EmailAddress(ErrorMessage ="Invalid Email Address")]
		public string Email { get; set; }
		[Required(ErrorMessage ="Price is Required.")]
		[RegularExpression("^[0-9]*$", ErrorMessage = "Price must be numeric")]
		public int Price { get; set; }
		[Required(ErrorMessage ="Categories is Required")]
		public string Categories { get; set; }
		public string Image { get; set; }
		[Required(ErrorMessage = "State is Required")]
		public string State { get; set; }
		[Required(ErrorMessage ="City is Required")]
		public string City { get; set; }
		[Required(ErrorMessage ="Pincode is Required")]
		public int Pincode { get;set; }
	}
}