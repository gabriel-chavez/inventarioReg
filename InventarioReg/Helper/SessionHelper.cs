using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.UI.WebControls;
using System.Configuration;
using System.Web.Security;
using System.Web.Helpers;
using Proyecto.Models;
using Newtonsoft.Json;
using System.Web.Mvc;
using System.Web.Script.Serialization;
using sistemainventario.Helper;
using sistemainventario.Models;
using InventarioReg.Models;

namespace sistemainventario.Helper
{
    [Autenticado]
    public class SessionHelper
    {
        public static bool ExistUserInSession()
        {
            return HttpContext.Current.User.Identity.IsAuthenticated;
        }
        public static void DestroyUserSession()
        {
            FormsAuthentication.SignOut();
        }
        public static string GetUser()
        {
            //int user_id = 0;
            string id = "";
            if (HttpContext.Current.User != null && HttpContext.Current.User.Identity is FormsIdentity)
            {
                FormsAuthenticationTicket ticket = ((FormsIdentity)HttpContext.Current.User.Identity).Ticket;
                if (ticket != null)
                {
                    // id = Convert.ToInt32(ticket.UserData);
                    // id = ticket.UserData;
                    id = ticket.UserData;
                }
            }
            return id;            
        }
        public static int GetIdUser()
        {
            //int user_id = 0;
            int id = 0;
            if (HttpContext.Current.User != null && HttpContext.Current.User.Identity is FormsIdentity)
            {
                FormsAuthenticationTicket ticket = ((FormsIdentity)HttpContext.Current.User.Identity).Ticket;
                if (ticket != null)
                {
                    var serializer = new JavaScriptSerializer();
                    serializer.RegisterConverters(new[] { new DynamicJsonConverter() });
                    dynamic obj = serializer.Deserialize(ticket.UserData, typeof(object));
                    id =Convert.ToInt32(obj.Data.IdUsuario);
                }
            }
            return id;
        }
        public static string GetNameUser()
        {
            //int user_id = 0;
            string nombre="";
            if (HttpContext.Current.User != null && HttpContext.Current.User.Identity is FormsIdentity)
            {
                FormsAuthenticationTicket ticket = ((FormsIdentity)HttpContext.Current.User.Identity).Ticket;
                if (ticket != null)
                {
                    var serializer = new JavaScriptSerializer();
                    serializer.RegisterConverters(new[] { new DynamicJsonConverter() });
                    dynamic obj = serializer.Deserialize(ticket.UserData, typeof(object));
                    nombre = (obj.Data.Nombre);
                }
            }
            return nombre;
        }        
        public static dynamic GetMenuUser()
        {                        

            var usuario = new Usuarios();
            usuario = usuario.ObtenerporId(SessionHelper.GetIdUser());
            var serializer = new JavaScriptSerializer();
            serializer.RegisterConverters(new[] { new DynamicJsonConverter() });
            dynamic obj=null;
            
                obj = serializer.Deserialize(usuario.Roles, typeof(object));
            
            
            return obj;
        }
        public static void AddUserToSession(JsonResult datos)
        {
            //JsonResult datos1 = Json(datos.Data);
            string json = JsonConvert.SerializeObject(datos);
            bool persist = true;
            var cookie = FormsAuthentication.GetAuthCookie("usuario", persist);

            cookie.Name = FormsAuthentication.FormsCookieName;
            cookie.Expires = DateTime.Now.AddMonths(3);

            var ticket = FormsAuthentication.Decrypt(cookie.Value);
            var newTicket = new FormsAuthenticationTicket(ticket.Version, ticket.Name, ticket.IssueDate, ticket.Expiration, ticket.IsPersistent, json);

            cookie.Value = FormsAuthentication.Encrypt(newTicket);
            HttpContext.Current.Response.Cookies.Add(cookie);
        }
        public static bool existemenu(int menu, bool principal) //menu principal true
        {
            var menuUsuario = sistemainventario.Helper.SessionHelper.GetMenuUser();
            int op;
            bool existe = false; 
            if(menuUsuario!=null)
            {
                foreach (var item in menuUsuario)
                {
                    if (principal)
                        op = Convert.ToInt32(item.Substring(0, 1));
                    else
                        op = Convert.ToInt32(item);

                    if (op == menu)
                        return true;
                }
            }            
            return existe;
        }
        public static bool esAdmin()
        {
            var usuario = new Usuarios();
            usuario = usuario.ObtenerporId(SessionHelper.GetIdUser());
            if (usuario.Tipo == 1)
                return true;
            else
                return false;            
        }
    }
}