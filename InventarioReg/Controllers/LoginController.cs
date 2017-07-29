
using sistemainventario.Helper;
using sistemainventario.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace sistemainventario.Controllers
{
    
    public class LoginController : Controller
    {
        private login login = new login();
        // GET: Login
        [NoLogin]
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult Acceder(string Usuario, string Password)
        {
            var rm = login.Acceder(Usuario, Password);
            if (rm.response)
            {
                
                var aux = Json(rm.result);               
                SessionHelper.AddUserToSession(aux);
                rm.href = Url.Content("~/inicio");
                rm.result = null;
            }
            return Json(rm);
        }
        public ActionResult Logout()
        {
            // Eliminar la sesion actual
            SessionHelper.DestroyUserSession();
            return Redirect("~/login");
        }
    }
}