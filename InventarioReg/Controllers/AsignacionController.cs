using InventarioReg.Models;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Proyecto.Models;
using sistemainventario.Helper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;

namespace InventarioReg.Controllers
{
    [Autenticado]
    public class AsignacionController : Controller
    {
        // GET: Asignacion
        public ActionResult Index()
        {            
            return View();
        }
        public JsonResult ItemsAsignadosOficina()
        {
            //oficina del usuario responsable de oficina (agencia, regional, sol amigo, atm etc)
            int idUsuario = SessionHelper.GetIdUser();
            var oficinas = Oficinas.obtenerPorUsuario(idUsuario);
            var datos = Items.ListarAsignadosDetalle(oficinas.IdOficina);
            ResponseModel rm = new ResponseModel();
            rm.result = datos;
            rm.response = true;
            rm.message = "";
            rm.function = "mostrarTablaAsignacionOficina";

            return Json(rm);
        }
        public JsonResult ItemsNoAsignadosOficina()
        {            
            int idUsuario = SessionHelper.GetIdUser();
            var oficinas = Oficinas.obtenerPorUsuario(idUsuario);
            var datos = Items.ListarNoAsignadosDetalle(oficinas.IdOficina);
            ResponseModel rm = new ResponseModel();
            rm.result = datos;
            rm.response = true;
            rm.message = "";
            rm.function = "mostrarTablaNoAsignacionOficina";

            return Json(rm);
        }
        public JsonResult retornarUsuariosGrupos(string b)
        {
            int idUsuario = SessionHelper.GetIdUser();
            var oficinas = Oficinas.obtenerPorUsuario(idUsuario);
            var usuariosGrupos = Asignacion.usuariosGrupos(oficinas.IdOficina, b);
            var ret = new { total_count = usuariosGrupos.Count, incomplete_results = false, items = usuariosGrupos };
            return Json(ret, JsonRequestBehavior.AllowGet);            
        }
        public JsonResult desasignarItem(int idItem)
        {
            var rm = new ResponseModel();
            Items.desasignarItem(idItem);
            rm.SetResponse(true);
            return Json(rm);
        }
        public JsonResult asignarItems(int usuarioGrupo, string tabla)
        {
            
            dynamic stuff = JsonConvert.DeserializeObject(tabla);          
            var item = new Items();
            var rm = new ResponseModel();
            foreach (var elemento in stuff)
            {
                //update idAsignacion 
                item.actualizarAsignacion(Convert.ToInt32(elemento.id), usuarioGrupo);
            }
            rm.SetResponse(true);
            //rm.function = "retornarItemsAsignados()";
            return Json(rm);
        }
        public ActionResult edicionGrupos()
        {
            int idUsuario = SessionHelper.GetIdUser();
            var oficina = Oficinas.obtenerPorUsuario(idUsuario);
            var grupos = Asignacion.ListarPorGrupo(oficina.IdOficina);
            ViewBag.grupos = grupos;
            ViewBag.oficina = oficina.Nombre;
            return View();
        }
        public JsonResult editarDatos(int idAsignacion, string grupoEquipo,string UsuarioGrupo, string observacion)
        {
            var asignacion = Asignacion.obtener(idAsignacion);
            var rm = new ResponseModel();
            asignacion.NombreGrupo = grupoEquipo;
            asignacion.NombreUsuario = UsuarioGrupo;
            asignacion.Observacion = observacion;
            asignacion.Usuario = SessionHelper.GetIdUser();
            asignacion.FechaAsignacion = DateTime.Now;
            rm=asignacion.Guardar();
            rm.href = Url.Content("self");
            return Json(rm);
        }
        public JsonResult EliminarAsignacion(int idAsignacion)
        {
            var asignacion = Asignacion.obtener(idAsignacion);
            var rm = new ResponseModel();
            asignacion.Eliminado = 1;          
            rm = asignacion.Guardar();
            rm.href = Url.Content("self");
            return Json(rm);
        }
    }
}