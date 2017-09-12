using InventarioReg.Models;
using sistemainventario.Helper;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Dynamic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace InventarioReg.Controllers
{
    public class TranferenciasController : Controller
    {
        // GET: Tranferencias
        public ActionResult Index()
        {
            int idUsuario = SessionHelper.GetIdUser();
            var oficina = Oficinas.obtenerPorUsuario(idUsuario);
            
            var asignados = Items.ListarAsignadosDetalle(oficina.IdOficina);
            var noasignados = Items.ListarNoAsignadosDetalle(oficina.IdOficina);
            

            List<ExpandoObject> joinData = new List<ExpandoObject>();
            /*****para usar el objeto dynamico en RAZOR*****/
            foreach (var item in asignados)
            {
                IDictionary<string, object> itemExpando = new ExpandoObject();
                foreach (PropertyDescriptor property
                         in
                         TypeDescriptor.GetProperties(item.GetType()))
                {
                    itemExpando.Add(property.Name, property.GetValue(item));
                }
                joinData.Add(itemExpando as ExpandoObject);
            }
            ViewBag.asignados = joinData;

            List<ExpandoObject> joinData2 = new List<ExpandoObject>();
            foreach (var item in noasignados)
            {
                IDictionary<string, object> itemExpando = new ExpandoObject();
                foreach (PropertyDescriptor property
                         in
                         TypeDescriptor.GetProperties(item.GetType()))
                {
                    itemExpando.Add(property.Name, property.GetValue(item));
                }
                joinData2.Add(itemExpando as ExpandoObject);
            }
            ViewBag.noasignados = joinData2;

            return View();
        }
    }
}