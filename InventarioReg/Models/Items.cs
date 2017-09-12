namespace InventarioReg.Models
{
    using Proyecto.Models;
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity;
    using System.Data.Entity.Spatial;
    using System.Linq;

    public partial class Items
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Items()
        {
            TransferenciaDetalle = new HashSet<TransferenciaDetalle>();
        }

        [Key]
        public int IdItem { get; set; }

        public int? idNombreActivo { get; set; }

        public int? IdMarcaActivo { get; set; }

        public int? IdModeloActivo { get; set; }

        [StringLength(100)]
        public string Serie { get; set; }

        public int IdEstado { get; set; }

        [StringLength(100)]
        public string Codigo { get; set; }

        public int IdTipoItem { get; set; }

        [StringLength(300)]
        public string Descripcion { get; set; }

        public int? IdOficina { get; set; }

        public int? IdArea { get; set; }

        public int? IdAsignacion { get; set; }

        public DateTime? FechaRegistro { get; set; }

        public int? IdUsuario { get; set; }

        public virtual Areas Areas { get; set; }

        public virtual Asignacion Asignacion { get; set; }

        public virtual Estados Estados { get; set; }

        public virtual MarcaActivo MarcaActivo { get; set; }

        public virtual ModeloActivo ModeloActivo { get; set; }

        public virtual NombreActivo NombreActivo { get; set; }

        public virtual Oficinas Oficinas { get; set; }

        public virtual TipoItem TipoItem { get; set; }

        public virtual Usuarios Usuarios { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<TransferenciaDetalle> TransferenciaDetalle { get; set; }
        /*********************/
        public ResponseModel Guardar()
        {
            var rm = new ResponseModel();
            try
            {
                using (var ctx = new inventarioContext())
                {
                    if (this.IdItem > 0) ctx.Entry(this).State = EntityState.Modified;
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
        public ResponseModel Listar(DateTime? ini, DateTime? fin, int _oficina=0)
        {
            List<Items> _items = new List<Items>();
            var rm = new ResponseModel();
            try
            {
                using (var ctx = new inventarioContext())
                {
                    ctx.Configuration.LazyLoadingEnabled = true;
                    ctx.Configuration.ProxyCreationEnabled = false;
                    var _itemsaux = ctx.Items                                    
                                    .Include(x => x.NombreActivo)
                                    .Include(x => x.MarcaActivo)
                                    .Include(x => x.ModeloActivo)
                                    .Include(x => x.TipoItem)
                                    .Include(x => x.Oficinas)
                                    .Include(x => x.Areas)
                                    .Where(x => x.IdEstado == 1)
                                    .Where(x =>x.IdArea == null);
                    if (ini != null && fin != null)
                    {
                        _itemsaux = _itemsaux.Where(x => x.FechaRegistro >= ini);
                        _itemsaux = _itemsaux.Where(x => x.FechaRegistro <= fin);
                    }
                    if (_oficina > 0)
                        _itemsaux = _itemsaux.Where(x => x.IdOficina == _oficina);                 
                    _itemsaux = _itemsaux.OrderByDescending(x => x.FechaRegistro);
                    _items = _itemsaux.ToList();
                }
                rm.response = true;
                rm.message = "";
                rm.result = _items;
            }
            catch (Exception e)
            {
                throw;
            }
            return rm;
        }
        public List<Items> ListarNoAsignados(int _oficina )
        {
            List<Items> _items = new List<Items>();
       //     var rm = new ResponseModel();
            try
            {
                using (var ctx = new inventarioContext())
                {
                    ctx.Configuration.LazyLoadingEnabled = true;
                    ctx.Configuration.ProxyCreationEnabled = false;
                    var _itemsaux = ctx.Items
                                    .Include(x => x.NombreActivo)
                                    .Include(x => x.MarcaActivo)
                                    .Include(x => x.ModeloActivo)
                                    .Include(x => x.TipoItem)
                                    .Include(x => x.Oficinas)
                                    .Include(x => x.Areas)
                                    .Where(x => x.IdEstado == 1)
                                    .Where(x => x.IdAsignacion == null);
                    if (_oficina > 0)
                        _itemsaux = _itemsaux.Where(x => x.IdOficina == _oficina);
                    _itemsaux = _itemsaux.OrderByDescending(x => x.FechaRegistro);
                    _items = _itemsaux.ToList();
                }
          
            }
            catch (Exception e)
            {
                throw;
            }
            return _items;
        }
        public static List<Items> ListarItemsDetalle(int? _idItem=null,int? _idAsignacion=null)
        {
            List<Items> _items = new List<Items>();
            //     var rm = new ResponseModel();
            try
            {
                using (var ctx = new inventarioContext())
                {
                  //  ctx.Configuration.LazyLoadingEnabled = true;
                    ctx.Configuration.ProxyCreationEnabled = false;                    
                    var _itemAux= ctx.Items
                                    .Include(x => x.NombreActivo)
                                    .Include(x => x.MarcaActivo)
                                    .Include(x => x.ModeloActivo)
                                    .Include(x => x.TipoItem)
                                    .Include(x => x.Oficinas)
                                    .Include(x => x.Areas)
                                    .Include(x => x.Asignacion)
                                    .Where(x => x.IdEstado == 1);
                    if (_idItem != null)
                        _itemAux = _itemAux.Where(x => x.IdItem == _idItem);
                    if (_idAsignacion != null)
                        _itemAux = _itemAux.Where(x => x.IdAsignacion == _idAsignacion);
                    _items = _itemAux.ToList();
                }
            }
            catch (Exception e)
            {
                throw;
            }
            return _items;
        }
        public static dynamic ListarAsignadosDetalle(int IdOficina)
        {
            //List<Items> _items = new List<Items>();            
            //List<Object> obj = new List<Object>();
            try
            {
                using (var ctx = new inventarioContext())
                {                    
                    ctx.Configuration.ProxyCreationEnabled = false;
                    var query = (from i in ctx.Items
                                 join a in ctx.Asignacion
                                 on i.IdAsignacion equals a.IdAsignacion
                                 join ar in ctx.Areas
                                 on i.IdArea equals ar.IdArea into xx //para left join
                                 from areaaux in xx.DefaultIfEmpty()  //para left join
                                 where (i.IdOficina==IdOficina)
                                 orderby a.NombreGrupo ascending
                                 select new
                                 {
                                     id = i.IdItem,
                                     item = i.NombreActivo.Nombre,
                                     marca = i.MarcaActivo.Marca,
                                     modelo = i.ModeloActivo.Modelo,
                                     serie = i.Serie,
                                     codigo = i.Codigo,
                                     tipo = i.TipoItem.TipoItem1,
                                     descripcion = i.Descripcion,
                                     oficinas = i.Oficinas.Nombre,
                                     grupo = a.NombreGrupo,
                                     usuario = a.NombreUsuario,
                                     observacion = a.Observacion,
                                     area= areaaux.Area
                                 }
                             ).ToList();

                    return query;
                }
            }
            catch (Exception e)
            {
                throw;
            }
            //return query;
        }
        public static dynamic ListarNoAsignadosDetalle(int IdOficina)
        {
            //List<Items> _items = new List<Items>();
            //List<Object> obj = new List<Object>();
            try
            {
                using (var ctx = new inventarioContext())
                {
                    ctx.Configuration.ProxyCreationEnabled = false;
                    var query = (from i in ctx.Items
                                 join ar in ctx.Areas
                                 on i.IdArea equals ar.IdArea into xx //para left join
                                 from areaaux in xx.DefaultIfEmpty()  //para left join
                                 where (i.IdOficina == IdOficina && i.IdAsignacion == null)

                                 select new
                                 {
                                     id = i.IdItem,
                                     item = i.NombreActivo.Nombre,
                                     marca = i.MarcaActivo.Marca,
                                     modelo = i.ModeloActivo.Modelo,
                                     serie = i.Serie,
                                     codigo = i.Codigo,
                                     tipo = i.TipoItem.TipoItem1,
                                     descripcion = i.Descripcion,
                                     oficinas = i.Oficinas.Nombre,     
                                     grupo="-",
                                     usuario="-",
                                     observacion="-",
                                     area = areaaux.Area
                                 }
                             ).ToList();

                    return query;
                }
            }
            catch (Exception e)
            {
                throw;
            }
            //return query;
        }
        public static bool desasignarItem(int IdItem)
        {
            string sql;
            try
            {
                using (var ctx = new inventarioContext())
                {
                    sql = "UPDATE dbo.Items SET IdAsignacion=NULL WHERE IdItem=" + IdItem;
                    ctx.Database.ExecuteSqlCommand(sql);
                    return true;      
                }
            }
            catch (Exception)
            {
                throw;
               
            }
        }
        public  bool actualizarAsignacion(int IdItem,int idAsignacion)
        {
            string sql;
            try
            {
                using (var ctx = new inventarioContext())
                {
                    sql = "UPDATE dbo.Items SET IdAsignacion="+idAsignacion+" WHERE IdItem=" + IdItem;
                    ctx.Database.ExecuteSqlCommand(sql);
                    return true;
                }
            }
            catch (Exception)
            {
                throw;

            }
        }
        
        //public static List<Items> ListarPorGrupo()
        //{
        //   // var rm = new ResponseModel();
        //    var _items = new List<Items>();
        //    try
        //    {
        //        using (var ctx =new inventarioContext())
        //        {
        //            ctx.Configuration.LazyLoadingEnabled = true;
        //            ctx.Configuration.ProxyCreationEnabled = false;
        //            _items = ctx.Items
        //                .Include(x => x.Asignacion)
        //                .Where(x=>x.IdAsignacion>0)
        //                //.GroupBy(x=>x.IdAsignacion)
        //                .ToList();
        //        }

        //    }
        //    catch (Exception e)
        //    {

        //        throw;
        //    }
        //    return (_items);
        //}
    }
}
