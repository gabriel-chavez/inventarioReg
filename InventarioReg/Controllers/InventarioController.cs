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
        public JsonResult retornarAreas(int idoficina)
        {
            var rm = new ResponseModel();
            var oficinas = new Oficinas();
            oficinas = Oficinas.obtenerPorOficina(idoficina);
            rm.result = oficinas.OficinasAreas;
            rm.message = "";
            rm.response = true;
            rm.function = "cargarAreas";
            return Json(rm);
        }
        public ActionResult RegistroAsignacion()
        {
            //int idUsuario = SessionHelper.GetIdUser();
            var usuario = new Usuarios();
            usuario = SessionHelper.ObtenerUsuarioSession();
            ViewBag.oficinas = Oficinas.Listar(usuario.Regional);

            //retornarEquiposAgencia(1);



            return View(new Items());
        }
        public JsonResult GuardarRegistros(string tabla, string nombreGrupo,string nombreUsuario,string observacion,int idOficina, int idArea)
        {
            var rmGuardar = new ResponseModel();           
            List<Items> _items = JsonConvert.DeserializeObject<List<Items>>(tabla);
            if (_items.Count > 0)
            {
                if (_items.ToList()[0].IdArea==null || _items.ToList()[0].IdArea == 0)
                {
                    rmGuardar.message = "No se selecciono el area";
                    rmGuardar.response = false;
                    return Json(rmGuardar);
                }
                var hoy = DateTime.Now;
                var asignacion = new Asignacion();
                var rmAsignacion = new ResponseModel();
                int idUsuario = SessionHelper.GetIdUser();
                var oficina = Oficinas.obtenerPorUsuario(idUsuario);
                var item = new Items();

                if (nombreGrupo != "")//si se tiene nombre de grupo se guarda la asignacion
                {
                    //verificar si ya existe el nombre // si ya existe entonces agregar equipos al grupo
                    var asignacionaux = Asignacion.retornaPorNombreGrupo(nombreGrupo, idOficina);
                    if(asignacionaux==null)
                    {
                        asignacion.NombreUsuario = nombreUsuario;
                        asignacion.NombreGrupo = nombreGrupo;
                        asignacion.Observacion = observacion;
                        asignacion.FechaAsignacion = hoy;
                        asignacion.Usuario = idUsuario;
                        asignacion.IdOficina = idOficina;
                        rmAsignacion = asignacion.Guardar();
                    }
                    else
                    {
                        asignacion = asignacionaux;
                    }
                    
                }
                int? _idAsignacion;
                if (asignacion.IdAsignacion == 0)
                    _idAsignacion = null;
                else
                    _idAsignacion = asignacion.IdAsignacion;
                foreach (var _item in _items)
                {
                    _item.IdEstado = 1;
                    _item.IdOficina = idOficina;//datos de cabecera
                    _item.IdArea = idArea;//datos de cabecera
                    _item.FechaRegistro = hoy;
                    _item.IdUsuario = idUsuario;
                    _item.IdAsignacion = _idAsignacion;
                    _item.Guardar();
                }
                rmGuardar.response = true;
                rmGuardar.message = "Se guardo correctamente";
                rmGuardar.function = "retornarTabla3AsignacionAgencia";
            }
            else
            {
                rmGuardar.message = "No se tiene ningun registro a guardar";
                rmGuardar.response = false;
            }
            return Json(rmGuardar);
        }
        public JsonResult retornarEquiposAgencia(int IdOficina)
        {
            var rm = new ResponseModel();
            var asignacion = Asignacion.ListarPorGrupo(IdOficina);
            List<object> auxItems = new List<object>();
            object auxItem;
            var _nombre = "";
            var _equipos = 0;
            var _area = "";
            var _tipo = 0;//0 equipos asignados -- 1 equipos sin asignacion
            var _id = 0; // idasignacion o id item;
            Items aux;
            foreach (var item in asignacion)
            {
                _nombre = item.NombreGrupo;
                _equipos = item.Items.Count;
                if (_equipos > 0)
                {
                    aux = item.Items.ToList()[0];
                    if (aux.Areas == null)
                        _area = null;
                     else
                        _area = aux.Areas.Area;
                }
                _id = item.IdAsignacion;
                auxItem = new { id = _id, nombre = _nombre, equipos = _equipos, area = _area, tipo = _tipo };                
                auxItems.Add(auxItem);
            }
            var items = new List<Items>();
            items = _item.ListarNoAsignados(IdOficina);
            _tipo = 1;
            foreach (var item in items)
            {
                _nombre = _area = item.NombreActivo == null?null:item.NombreActivo.Nombre;
                _equipos = 1;                
                _area = item.Areas==null?null:item.Areas.Area;
                _id = item.IdItem;
                auxItem = new { id = _id, nombre = _nombre, equipos = _equipos, area = _area, tipo = _tipo };
                auxItems.Add(auxItem);
            }
            rm.response = true;
            rm.message = "";
            rm.result = auxItems;
            rm.function = "mostrarTablaAgregadosAgencia";
            return Json(rm);
        }
        public JsonResult retornarDetalleItems(int IdAsignacion)
        {
            var _items = new List<Items>();
            var rm = new ResponseModel();
            _items = Items.ListarItemsDetalle(null,IdAsignacion);
            rm.response = true;
            rm.message = "";
            rm.result = _items;
            rm.function = "mostrarDetalleModal";
            return Json(rm);
        }
        public JsonResult retornarDetalleEquipo(int IdItem)
        {
            var _items = new List<Items>();
            var rm = new ResponseModel();
            _items = Items.ListarItemsDetalle(IdItem, null);
            rm.response = true;
            rm.message = "";
            rm.result = _items;
            rm.function = "mostrarDetalleModal";
            return Json(rm);
        }
    }
}