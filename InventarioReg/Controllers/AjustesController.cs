using InventarioReg.Models;
using Newtonsoft.Json;
using Proyecto.Models;
using sistemainventario.Helper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace InventarioReg.Controllers
{
    public class AjustesController : Controller
    {
        // GET: Ajustes
        public ActionResult Index()
        {
            var usuario = SessionHelper.GetUser();
            var u = JsonConvert.DeserializeObject<dynamic>(usuario);
            int codRegional=u.Data.Regional;
            var oficinas = new List<Oficinas>();
            oficinas = Oficinas.Listar(codRegional);
            ViewBag.oficinas = oficinas;
            return View();
        }
        [HttpPost]
        public JsonResult ListarPermisos()
        {
            var usuario = SessionHelper.GetUser();
            var u = JsonConvert.DeserializeObject<dynamic>(usuario);
            int codRegional = u.Data.Regional;
            var permisosOficinas = PermisoTranferenciasOficina.Listar(codRegional);
            ResponseModel rm = new ResponseModel();
            rm.result = permisosOficinas;
            rm.SetResponse(true);
            rm.function="tablaPermisosOficinas";
            return Json(rm);
        }
        public JsonResult ListarAreas(int ifOficina)
        {
            var oficina = Oficinas.obtenerPorOficina(ifOficina);
            var rm = new ResponseModel();
            rm.SetResponse(true);
            return Json(rm);
        }
    }
}