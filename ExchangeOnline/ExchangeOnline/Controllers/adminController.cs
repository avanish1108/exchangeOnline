using ExchangeOnline.Context;
using ExchangeOnline.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;

namespace ExchangeOnline.Controllers
{
    public class adminController : Controller
    {
		private ExchangeOnlineContext db = new ExchangeOnlineContext();
		// GET: admin
		public ActionResult UserDetail()
        {
			if (Session["AdminEmail"] != null)
			{
				
				return View(db.Signups.ToList());
			}
			else
			{
				return RedirectToAction("AdminLogin", "admin");
			}
		}
		public ActionResult AdminADdetail()
		{
			if (Session["AdminEmail"] != null)
			{
				return View(db.Ads.ToList());
			}

			else
			{
				return RedirectToAction("AdminLogin", "admin");
			}
		}
		[HttpGet]
        public ActionResult AdminLogin()
		{
			return View();
		}
		[HttpPost]
		public ActionResult AdminLogin(AdminLogin adminLogin)
		{
			using (ExchangeOnlineContext db = new ExchangeOnlineContext())
			{
				var user = db.adminLogin.FirstOrDefault(u => u.Email == adminLogin.Email && u.password == adminLogin.password);
				if (user != null)
				{
					Session["AdminEmail"] = user.Email.ToString();
					if (Session["AdminEmail"] != null)
					{
						return RedirectToAction("UserDetail", "admin");
					}
					else
					{
						return RedirectToAction("AdminLogin");
					}
				}
				else
				{
					ModelState.AddModelError("", "Email And password is wrong.");
				}


			}
			return View();
		}

		public ActionResult HelpRequest()
		{
			if (Session["AdminEmail"] != null)
			{
				//Helpreplyvm hr = new Helpreplyvm();
				//hr.helplist = db.Helps.ToList();
				return View(db.Helps.ToList());
			}
			else
			{
				return RedirectToAction("AdminLogin", "admin");
			}
		}

		[HttpGet]
		public ActionResult AdminViewProduct(int? id)
		{
			try
			{
				if (Session["AdminEmail"]!=null) {
					if (id == null)
						return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
					AD ad = db.Ads.Find(id);
					if (ad == null)
						return HttpNotFound();
					return View(ad);
				}
				else
				{
					return RedirectToAction("AdminLogin", "admin");
				}
			}
			catch (Exception)
			{
				throw;
			}
		}
		public ActionResult AdminLogout()
		{
			Session.Abandon();
			return RedirectToAction("AdminLogin", "admin");
		}
		[HttpGet]
		public ActionResult MessageReply()
		{
			if (Session["AdminEmail"] != null)
			{
				return View();
			}
			else
			{
				return RedirectToAction("AdminLogin", "admin");
			}
			

		}
		[HttpPost]
		public ActionResult MessageReply(Reply reply)
		{
			if (ModelState.IsValid) { 
			db.Replys.Add(reply);
			db.SaveChanges();
			ViewBag.Message = "Record added sucessfully. ";
				return RedirectToAction("HelpRequest");
			}
			return View (reply);
		}

	}
}