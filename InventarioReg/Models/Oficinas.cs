namespace InventarioReg.Models
{
    using Newtonsoft.Json;
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;
    using System.Linq;

    public partial class Oficinas
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Oficinas()
        {
          /*  Items = new HashSet<Items>();
            Tranferencia = new HashSet<Tranferencia>();
            Tranferencia1 = new HashSet<Tranferencia>();*/
            OficinasAreas = new HashSet<OficinasAreas>();
        }

        [Key]
        public int IdOficina { get; set; }

        [StringLength(100)]
        public string Nombre { get; set; }

        public int? Codigo { get; set; }

        public int? Dependiente { get; set; }

        public int? Regional { get; set; }

        public int? IdusuarioResponsable { get; set; }
        /* [JsonIgnore]
         [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
         public virtual ICollection<Items> Items { get; set; }
         [JsonIgnore]
         [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
         public virtual ICollection<Tranferencia> Tranferencia { get; set; }
         [JsonIgnore]
         [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
         public virtual ICollection<Tranferencia> Tranferencia1 { get; set; }
         */
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<OficinasAreas> OficinasAreas { get; set; }
        public static Oficinas obtenerPorUsuario(int idusuario)
        {
            var oficinas = new Oficinas();
            try
            {
                using (var ctx = new inventarioContext())
                {
                    ctx.Configuration.LazyLoadingEnabled = true;
                    ctx.Configuration.ProxyCreationEnabled = false;
                    oficinas = ctx.Oficinas.Where(x => x.IdusuarioResponsable == idusuario).SingleOrDefault();
                }
            }
            catch (Exception)
            {

                throw;
            }
            return oficinas;
        }
        public static Oficinas obtenerPorOficina(int idoficina)
        {
            var oficinas = new Oficinas();
            try
            {
                using (var ctx = new inventarioContext())
                {
                    ctx.Configuration.LazyLoadingEnabled = true;
                    ctx.Configuration.ProxyCreationEnabled = false;
                    oficinas = ctx.Oficinas.Include("OficinasAreas.Areas")
                                            .Where(x => x.IdOficina == idoficina).SingleOrDefault();
                }
            }
            catch (Exception)
            {

                throw;
            }
            return oficinas;
        }
        public static List<Oficinas> Listar(int? regional=0)
        {
            List<Oficinas> _oficinas = new List<Oficinas>();            
            try
            {
                using (var ctx = new inventarioContext())
                {
                    ctx.Configuration.LazyLoadingEnabled = true;
                    ctx.Configuration.ProxyCreationEnabled = false;
                    var oficinatmp = ctx.Oficinas.Include("OficinasAreas.Areas")
                                                 .Where(x=>x.IdOficina>0);
                    if(regional > 0)
                    {
                        oficinatmp = oficinatmp.Where(x => x.Regional == regional);
                    }
                    _oficinas=oficinatmp.ToList();
                                   
                }                
            }
            catch (Exception e)
            {
                throw;
            }
            return _oficinas;
        }
    }
}
