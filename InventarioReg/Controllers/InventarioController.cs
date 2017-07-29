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
    [Autenticado]
    public class InventarioController : Controller
    {
        // GET: Inventario
        Items _item = new Items();
        public ActionResult Index()
        {
            int idUsuario = SessionHelper.GetIdUser();
            var oficinas = Oficinas.obtenerPorUsuario(idUsuario);
            if (oficinas == null)
                ViewBag.oficina = "Sin asignar";
            else
                ViewBag.oficina = oficinas.Nombre;
            return View(new Items());
        }
        [HttpGet]
        public JsonResult AutocompletarNombre(string b,int t) //tipoItem, item
        {           
            var nombreActivos = new List<NombreActivo>();
            nombreActivos = NombreActivo.ListaNombre(b, t);
            var ret = new { total_count = nombreActivos.Count, incomplete_results = false, items = nombreActivos };            
            return Json(ret, JsonRequestBehavior.AllowGet);
        }
        [HttpGet]
        public JsonResult AutocompletarMarca(string b) //tipoItem, item
        {
            var marcaActivos = new List<MarcaActivo>();
            marcaActivos = MarcaActivo.ListaMarca(b);
            var ret = new { total_count = marcaActivos.Count, incomplete_results = false, items = marcaActivos };
            return Json(ret, JsonRequestBehavior.AllowGet);
        }
        [HttpGet]
        public JsonResult AutocompletarModelo(string b) //tipoItem, item
        {
            var modeloActivos = new List<ModeloActivo>();
            modeloActivos = ModeloActivo.ListaModelo(b);
            var ret = new { total_count = modeloActivos.Count, incomplete_results = false, items = modeloActivos };
            return Json(ret, JsonRequestBehavior.AllowGet);
        }
        public JsonResult Guardar(Items item)
        {
            var rm = new ResponseModel();
            if(ModelState.IsValid)
            {
                var hoy = DateTime.Now;
                int idUsuario = SessionHelper.GetIdUser();
                var oficina = Oficinas.obtenerPorUsuario(idUsuario);
                item.IdEstado = 1;
                item.IdOficina = oficina.IdOficina;
                item.FechaRegistro = hoy;
                item.IdUsuario = idUsuario;
                rm=item.Guardar();
                if(rm.response)
                {
                    //rm.href= Url.Content("self");
                    rm.function = "retornarTablaItems()";
                   // rm.function = "agregarcomIng";
                }
            }
            return Json(rm);
        }
        public string retornarInventario(string fechaIni, string fechaFin)
        {
            DateTime? ini=null, fin=null;
            if (fechaIni!=null && fechaFin!= null)
            {
                ini = Convert.ToDateTime(fechaIni);
                fin = Convert.ToDateTime(fechaFin + " 23:59:59");
            }
            

            int o = Oficinas.obtenerPorUsuario(SessionHelper.GetIdUser()).IdOficina;
            var rm = new ResponseModel();
            rm = _item.Listar(ini, fin, o);
            rm.function = "mostrarTablaItems";
            string resultado;
            resultado = JsonConvert.SerializeObject(rm, Formatting.Indented,
                        new JsonSerializerSettings()
                        {
                            ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore,
                        }
                    );                      
            return resultado;
        }
        public ActionResult RegistroAsignacion()
        {
            int idUsuario = SessionHelper.GetIdUser();                
            return View(new Items());
        }
    }
}