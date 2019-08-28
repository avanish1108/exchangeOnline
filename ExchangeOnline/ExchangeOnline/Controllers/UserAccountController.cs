using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using ExchangeOnline.Context;
using ExchangeOnline.Models;
namespace ExchangeOnline.Controllers
{
    public class UserAccountController : Controller
    {
		private ExchangeOnlineContext db = new ExchangeOnlineContext();
        // GET: SignUp
		[HttpGet]
        public ActionResult SignUp()
        {
            return View();
        }
		[HttpPost]
		public ActionResult SignUp(SignUp Signup)
		{
             try
			{
				if (ModelState.IsValid)
				{
					using (ExchangeOnlineContext db = new ExchangeOnlineContext()) { 
						db.Signups.Add(Signup);
					db.SaveChanges();
					}
					ModelState.Clear();

					ViewBag.Message = Signup.FName + "" + Signup.LName + "Successsful Register.";
						return RedirectToAction("Index","Main");
					
				}
				return View(Signup);
			}
			catch(Exception) {
				throw;
			}
		}
		[HttpGet]
		public ActionResult Login()
		{
			return View();
		}
          [HttpPost]
		public ActionResult Login(SignUp Signup)
		{
			using (ExchangeOnlineContext db = new ExchangeOnlineContext())
			{
				var user = db.Signups.FirstOrDefault(u=>u.Email==Signup.Email && u.Password==Signup.Password);
				if (user != null)
				{
					Session["id"] = user.id.ToString();
					Session["Email"] = user.Email.ToString();
					if (Session["id"] != null)
					{
						return RedirectToAction("Index", "Main");
					}
					else
					{
						return RedirectToAction("Login");
					}
				}
				else
				{
					ModelState.AddModelError("", "Email And password is wrong.");
				}

				
			}
			return View();
		}
		[HttpGet]
		public JsonResult IsUserExists(string email)
		{
			//check if any of the UserName matches the UserName specified in the Parameter using the ANY extension method.  
			return Json(!db.Signups.Any(x => x.Email == email), JsonRequestBehavior.AllowGet);
		}
		public ActionResult Logout()
		{
				Session.Abandon();
			return RedirectToAction("Index","Main");
		}
	}
}