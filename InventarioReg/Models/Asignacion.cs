namespace InventarioReg.Models
{
    using Newtonsoft.Json;
    using Proyecto.Models;
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity;
    using System.Data.Entity.Spatial;
    using System.Linq;
    using System.Web.Script.Serialization;

    [Table("Asignacion")]
    public partial class Asignacion
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Asignacion()
        {
            Items = new HashSet<Items>();
        }

        [Key]
        public int IdAsignacion { get; set; }

        public int Usuario { get; set; }
        [StringLength(150)]
        public string NombreUsuario { get; set; }

        [StringLength(100)]
        public string NombreGrupo { get; set; }

        [StringLength(200)]
        public string Observacion { get; set; }
        public DateTime FechaAsignacion { get; set; }

        public int? IdOficina { get; set; }
        public int? Eliminado { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        //[JsonIgnore]
        [ScriptIgnore]
        public virtual ICollection<Items> Items { get; set; }
        public ResponseModel Guardar()
        {
            var rm = new ResponseModel();
            try
            {
                using (var ctx = new inventarioContext())
                {
                    if (this.IdAsignacion > 0) ctx.Entry(this).State = EntityState.Modified;
                    else ctx.Entry(this).State = EntityState.Added;
                    ctx.SaveChanges();
                    rm.SetResponse(true);
                }
            }
            catch (Exception e)
            {
                throw;
            }
            return rm;
        }
        public static List<Asignacion> ListarPorGrupo(int? _IdOficina=null)
        {
            // var rm = new ResponseModel();
            var _asignacion = new List<Asignacion>();
            try
            {
                using (var ctx = new inventarioContext())
                {
                    ctx.Configuration.LazyLoadingEnabled = true;
                    ctx.Configuration.ProxyCreationEnabled = false;
                    var _asignacionaux = ctx.Asignacion
                        .Include(x => x.Items)
                        .Include("Items.Areas")
                        .Where(x => x.Eliminado != 1);
                    if (_IdOficina != null)
                        _asignacion = _asignacionaux.Where(x => x.IdOficina == _IdOficina).ToList();
                }

            }
            catch (Exception e)
            {

                throw;
            }
            return (_asignacion);
        }
        public static Asignacion retornaPorNombreGrupo(string nombreGrupo, int idOficina)
        {
            var asingnacion = new Asignacion();
            try
            {
                using (var ctx = new inventarioContext())
                {
                    ctx.Configuration.LazyLoadingEnabled = true;
                    ctx.Configuration.ProxyCreationEnabled = false;
                    asingnacion = ctx.Asignacion
                                    .Where(x => x.IdOficina == idOficina)
                                    .Where(x => x.NombreGrupo == nombreGrupo).FirstOrDefault();
                }
            }
            catch (Exception e)
            {

                throw;
            }
            return asingnacion;
        }
        public static List<Asignacion> usuariosGrupos(int idOficina, String busqueda)
        {
            var asingnacion = new List<Asignacion>();
            try
            {
                using (var ctx = new inventarioContext())
                {
                    ctx.Configuration.LazyLoadingEnabled = true;
                    ctx.Configuration.ProxyCreationEnabled = false;
                    asingnacion = ctx.Asignacion
                                    .Where(x => x.IdOficina == idOficina)
                                    .Where(x => x.NombreGrupo.Contains(busqueda) || x.NombreUsuario.Contains(busqueda)).ToList();                                    
                }
            }
            catch (Exception e)
            {

                throw;
            }
            return asingnacion;
        }
        public static Asignacion obtener(int idAsignacion)
        {
            var asignacion = new Asignacion();
            try
            {
                using (var ctx = new inventarioContext())
                {
                    ctx.Configuration.LazyLoadingEnabled = true;
                    ctx.Configuration.ProxyCreationEnabled = false;
                    asignacion = ctx.Asignacion.Where(x => x.IdAsignacion == idAsignacion).SingleOrDefault();
                }
            }
            catch (Exception)
            {

                throw;
            }
            return asignacion;
        }
    }
}
