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
    }
}
