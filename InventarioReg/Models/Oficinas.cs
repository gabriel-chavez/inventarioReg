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
            Items = new HashSet<Items>();
            Tranferencia = new HashSet<Tranferencia>();
            Tranferencia1 = new HashSet<Tranferencia>();
        }

        [Key]
        public int IdOficina { get; set; }

        [StringLength(100)]
        public string Nombre { get; set; }

        public int? Codigo { get; set; }

        public int? Dependiente { get; set; }

        public int? Regional { get; set; }

        public int? IdusuarioResponsable { get; set; }
        [JsonIgnore]
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Items> Items { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Tranferencia> Tranferencia { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Tranferencia> Tranferencia1 { get; set; }
        public static Oficinas obtenerPorUsuario(int idusuario)
        {
            var oficinas = new Oficinas();
            try
            {
                using (var ctx = new inventarioContext())
                {
                    oficinas = ctx.Oficinas.Where(x => x.IdusuarioResponsable == idusuario).SingleOrDefault();
                }
            }
            catch (Exception)
            {

                throw;
            }
            return oficinas;
        }
    }
}
