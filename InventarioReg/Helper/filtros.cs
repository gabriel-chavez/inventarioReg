
using sistemainventario.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace sistemainventario.Helper
{
    public class filtros
    {

    }
    // Si no estamos logeado, regresamos al login
    public class AutenticadoAttribute : ActionFilterAttribute
    {
        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            base.OnActionExecuting(filterContext);

            if (!SessionHelper.ExistUserInSession())
            {
                filterContext.Result = new RedirectToRouteResult(new RouteValueDictionary(new
                {
                    controller = "Login",
                    action = "Index"
                }));
            }
        }
    }

    // Si estamos logeado ya no podemos acceder a la página de Login
    public class NoLoginAttribute : ActionFilterAttribute
    {
        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            base.OnActionExecuting(filterContext);

            if (SessionHelper.ExistUserInSession())
            {
                filterContext.Result = new RedirectToRouteResult(new RouteValueDictionary(new
                {
                    controller = "Tareas",
                    action = "Index"
                }));
            }
        }
    }
    [Autenticado]
    public class PersmisoAttribute : ActionFilterAttribute
    {
        int menu;
        public PersmisoAttribute(int _menu)
        {
            this.menu = _menu;
        }
        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            base.OnActionExecuting(filterContext);
            
            if (!SessionHelper.existemenu(menu, false))
            {
                filterContext.Result = new RedirectToRouteResult(new RouteValueDictionary(new
                {
                    controller = "Error",
                    action = "Index"
                }));
            }
        }
    }
    [Autenticado]
    public class AdminAttribute : ActionFilterAttribute
    {      
        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            base.OnActionExecuting(filterContext);

            if (!SessionHelper.esAdmin())
            {
                filterContext.Result = new RedirectToRouteResult(new RouteValueDictionary(new
                {
                    controller = "Error",
                    action = "Index"
                }));
            }
        }
    }
    //public class PermisoVerAttribute : ActionFilterAttribute
    //{
    //    public override void OnActionExecuting(ActionExecutingContext filterContext)
    //    {
    //        base.OnActionExecuting(filterContext);
    //        var tarea = new tareas();            
    //        if (responsable.ObtenerArea(SessionHelper.GetIdUser())!=tarea.)
    //        {
    //            filterContext.Result = new RedirectToRouteResult(new RouteValueDictionary(new
    //            {
    //                controller = "Error",
    //                action = "Index"
    //            }));
    //        }
    //    }
    //}
}