using ExchangeOnline.Context;
using ExchangeOnline.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.IO;
using System.Linq;
using System.Net;
using System.Text.RegularExpressions;
using System.Web;
using System.Web.Mvc;

namespace ExchangeOnline.Controllers
{
	public class MainController : Controller
	{
		#region variable declaration
		ExchangeOnlineContext db;
		//List<AD> adList;
		#endregion

		#region variable defination
		public MainController()
		{
			db = new ExchangeOnlineContext();
			//adList = new List<AD>();
		}
		#endregion
		//string imageList;
		// GET: Main
		public ActionResult Index(string searchTitle, string searchCity)
		{
			//adList = db.Ads.OrderBy(a=>a.ADid).ToList();
			var adList = (from a in db.Ads select a).Take(20);
			if (!String.IsNullOrEmpty(searchTitle))
			{
				adList = adList.Where(s => s.Title.Contains(searchTitle));
			}
			if (!String.IsNullOrEmpty(searchCity))
			{
				adList = adList.Where(s => s.City.Contains(searchCity));
			}

			return View(adList);
		}
		[HttpPost]
		public ActionResult getAutoComplete(string Prefix) { 
			var Title = (from c in db.Ads
						 where c.Title.StartsWith(Prefix)
						 select new { c.ADid, c.Title, c.Brand, c.Description, c.Mobile, c.Price, c.Categories, c.Image, c.State, c.City, c.Pincode });
			return Json(Title, JsonRequestBehavior.AllowGet);
		}

		[HttpGet]
		public ActionResult Postadd()
		{
			if (Session["Email"] != null)
			{
				return View();
			}
			else
			{
				return RedirectToAction("Login", "UserAccount");
			}
		}
		[HttpPost]
		[ValidateAntiForgeryToken]
		public ActionResult Postadd(AD ad, HttpPostedFileBase[] file)
		{
			string imgList = string.Empty;
			//try
			//{

			if (ModelState.IsValid)
			{
				foreach (HttpPostedFileBase files in file)
				{
					if (files != null)
					{
						files.SaveAs(HttpContext.Server.MapPath("~/Upload/") + files.FileName);
						imgList += files.FileName + ",";
					}
				}

				ad.Image = imgList;
				db.Ads.Add(ad);
				db.SaveChanges();
				return RedirectToAction("Index");

			}
			else
			{
				var errors = ModelState.Select(x => x.Value.Errors)
									   .Where(y => y.Count > 0)
									   .ToList();
			}
			return View(ad);
			//}
			//catch (Exception)
			//{

			//	throw;
			//}


		}
		[HttpGet]
		public ActionResult ViewProduct(int? id)
		{
			try
			{
				if (id == null)
					return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
				AD ad = db.Ads.Find(id);
				if (ad == null)
					return HttpNotFound();
				return View(ad);
			}
			catch (Exception)
			{
				throw;
			}
		}

		public ActionResult ViewOurProduct(string email)
		{
			List<AD> adList = new List<AD>();
			if (email == null)
				return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
			adList = db.Ads.Where(s => s.Email == email).ToList();
			if (adList == null)
				return HttpNotFound();
			return View(adList);
		}
		[HttpGet]
		public ActionResult Help()
		{

			return View();

		}
		[HttpPost]
		public ActionResult Help(Help help)
		{
			try
			{
				if (ModelState.IsValid)
				{
					db.Helps.Add(help);
					db.SaveChanges();
					ViewBag.Message = "we are solve your problem in feaw hours.";
					return RedirectToAction("Index", "Main");
				}
				return View(help);
			}
			catch (Exception)
			{
				throw;
			}
		}
		[HttpGet]
		public ActionResult EditProduct(int? id)
		{
			if (Session["Email"] != null)
			{
				if (id == null)
					return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
				AD ad = db.Ads.Find(id);
				if (ad == null)
					return HttpNotFound();
				return View(ad);
			}
			else
			{
				return RedirectToAction("Login", "UserAccount");
			}
		}

		// POST: Product/Edit/5
		[HttpPost]
		[ValidateAntiForgeryToken]
		public ActionResult EditProduct(AD ad)
		{
			try
			{
				if (ModelState.IsValid)
				{
					db.Entry(ad).State = EntityState.Modified;
					db.SaveChanges();
					ViewBag.Message = "record Updated Successfully";
					return RedirectToAction("Index");
				}
				return View(ad);
			}
			catch
			{
				return View();
			}
		}
		[HttpGet]
		public ActionResult DeleteProduct(int id)
		{
			AD ad = db.Ads.Find(id);
			db.Ads.Remove(ad);
			db.SaveChanges();
			ViewBag.Message = "record deleted Successfully";
			return RedirectToAction("Index");
		}
		public ActionResult ViewMessage(string email)
		{
			List<Reply> help = new List<Reply>();
			if (email == null)
				return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
			help = db.Replys.Where(s => s.UserEmail ==email).ToList();
			if (help == null)
				return HttpNotFound();
			return View(help);
		}


	}
}