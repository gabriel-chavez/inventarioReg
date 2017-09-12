using InventarioReg.Models;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Proyecto.Models;
using sistemainventario.Helper;
using sistemainventario.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Runtime.Serialization.Json;
using System.Text;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;

namespace InventarioReg.Controllers
{
    [Autenticado]
    public class UsuariosController : Controller
    {
        // GET: Usuarios

        private Usuarios usuarios = new Usuarios();


        //public ActionResult Index()
        //{
        //    var Areas = new areas();
        //    ViewBag.areas = Areas.Listar();
        //    var x = SessionHelper.GetUser();
        //    return View();
        //}
        public string retornarUsuarios()
        {
            var rm = new ResponseModel();
            rm = usuarios.Listar();
            // rm.function = "mostrarTablaTareas";
            string resultado;
            resultado = JsonConvert.SerializeObject(rm, Formatting.Indented,
                        new JsonSerializerSettings()
                        {
                            ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore,

                        }
                    );
            // return Json(rm);
            return resultado;
        }
        private bool buscarArray(string st, string[] array)
        {
            bool existe = false;
            foreach (var nombre in array)
            {
                if (contains2(st, nombre, StringComparison.OrdinalIgnoreCase))
                    existe = true;
                else
                    return false;
            }
            return existe;
        }
        //sobrecarga a funcion contains
        private bool contains2(string fuente, string achecar, StringComparison comp)
        {
            return fuente.IndexOf(achecar, comp) >= 0;
        }
        [HttpGet]
        public JsonResult Autocompletar(string b)
        {
            using (StreamReader sr = new StreamReader(Server.MapPath("~/assets/usuarios.json")))
            {

                List<string[]> matriz = new List<string[]>();


                bool buscardearray = false;
                string json1 = sr.ReadToEnd();
                var serializer = new JavaScriptSerializer();
                serializer.RegisterConverters(new[] { new DynamicJsonConverter() });
                dynamic obj = serializer.Deserialize(json1, typeof(object));
                if (b.Contains(" "))
                    buscardearray = true;
                else
                    buscardearray = false;

                string[] abuscar = b.Split(' ');

                for (int i = 1; i < obj.count - 1; i++)
                {

                    if ((obj[i].samaccountname != null) && (obj[i].description != null) && (obj[i].mailnickname != null))
                    {
                        if (buscardearray)
                        {
                            if (buscarArray(obj[i].cn[0], abuscar))
                            {
                                matriz.Add(new string[4] { obj[i].cn[0], obj[i].description[0], obj[i].samaccountname[0], obj[i].mailnickname[0] });
                            }
                        }
                        else
                        {
                            if (contains2(obj[i].cn[0], b, StringComparison.OrdinalIgnoreCase) || contains2(obj[i].samaccountname[0], b, StringComparison.OrdinalIgnoreCase))
                            {
                                matriz.Add(new string[4] { obj[i].cn[0], obj[i].description[0], obj[i].samaccountname[0], obj[i].mailnickname[0] });
                            }
                        }
                    }

                }
                return Json(matriz, JsonRequestBehavior.AllowGet);
            }
        }
        //public JsonResult Guardar(Usuarios model, string[] menus, string Area, string Encargado, string IdResponsable)
        //{


        //    model.Estado = 1;
        //    model.Roles = JsonConvert.SerializeObject(menus);

        //    var rm = new ResponseModel();
        //    if (model.Nombre != null || model.Usuario != null || model.Email != null || model.Cargo != null)
        //    {
        //        if (ModelState.IsValid)
        //        {
        //            rm = model.Guardar();
        //            if (rm.response)
        //            {
        //                //guardar responsable
        //                this.GuardarResponsable(Area, Encargado, IdResponsable, model.idUsuario);
        //                rm.function = "retornarTablaUsuarios()";
        //            }
        //        }
        //    }
        //    else
        //    {
        //        rm.SetResponse(false);
        //        rm.message = "Complete los datos para continuar";
        //    }

        //    return Json(rm);
        //}
        //public void GuardarResponsable(string Area, string Encargado, string IdResponsable, int IdUsuario)
        //{
        //    if ((Area != null && Encargado != null) && (Area != "" && Encargado != ""))
        //    {
        //        var responsable = new responsable();
        //        responsable.IdResponsable = Convert.ToInt32(IdResponsable);
        //        responsable.IdArea = Convert.ToInt32(Area);
        //        responsable.Encargado = Convert.ToInt16(Encargado);
        //        responsable.IdUsuario = IdUsuario;
        //        responsable.Guardar();
        //    }
        //    else //eliminar responsable
        //    {
        //        var _idresponsable = Convert.ToInt32(IdResponsable);
        //        if (_idresponsable > 0)
        //        {
        //            var responsable = new responsable();
        //            responsable.eliminarResponsable(_idresponsable);
        //        }

        //    }
        //}
    }

}