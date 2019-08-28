using ExchangeOnline.Context;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using ExchangeOnline.Models;

namespace ExchangeOnline.Controllers
{
	public class ProductAdvController : Controller
	{
		#region variable declaration
		ExchangeOnlineContext db;
		//List<AD> adList;
		#endregion

		#region variable defination
		public ProductAdvController()
		{
			db = new ExchangeOnlineContext();
			//adList = new List<AD>();
		}
		#endregion
		// GET: ProductAdv
		[HttpGet]
		public ActionResult ProductFilter(string searchTitle, string searchBrand,int? searchMinPrice,int? searchMaxPrice,string searchState,string searchCity,int? searchPinCode,string selectCategories)
		{
			var adList = from a in db.Ads select a;
			if (!String.IsNullOrEmpty(searchTitle))
			{
				adList = adList.Where(s => s.Title.Contains(searchTitle));
			}
			if (!String.IsNullOrEmpty(searchBrand))
			{
				adList = adList.Where(s => s.Brand.Contains(searchBrand));
			}
			if (searchMinPrice!=null && searchMaxPrice>0)
			{
				adList = adList.Where(x => x.Price >= searchMinPrice);
			}
			if (searchMaxPrice!=null && searchMaxPrice>0 && searchMaxPrice> searchMinPrice)
			{
				adList = adList.Where(x => x.Price <= searchMaxPrice);
			}
			if (!String.IsNullOrEmpty(searchState))
			{
				adList = adList.Where(s => s.State.Contains(searchState));
			}
			if (!String.IsNullOrEmpty(searchCity))
			{
				adList = adList.Where(s => s.City.Contains(searchCity));
			}
			if (searchPinCode!=null)
			{
				adList = adList.Where(s => s.Pincode==(searchPinCode));
			}
			if (!String.IsNullOrEmpty(selectCategories))
			{
				adList = adList.Where(s => s.Categories.Contains(selectCategories));
			}
			
			//if (!String.IsNullOrEmpty(searchMinPrice))
			//{
			//}
			//if (!String.IsNullOrEmpty(searchMaxPrice))
			//{

			//}
			return View(adList);
		}
		
	}
}