using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity;
using ExchangeOnline.Models;

namespace ExchangeOnline.Context
{
		public class ExchangeOnlineContext : DbContext
		{
		public ExchangeOnlineContext() : base("ExchangeOnlineContext")
		{

		}
			public DbSet<AD> Ads { get; set; }
		    public DbSet<SignUp> Signups { get; set; }
		    public DbSet<AdminLogin> adminLogin { get; set; }
		    public DbSet<Help> Helps { get; set; }
		    public DbSet<Reply> Replys { get; set; }
		//protected override void OnModelCreating(DbModelBuilder modelBuilder)
		//{
		//	base.OnModelCreating(modelBuilder);
		//}

	}
	
}