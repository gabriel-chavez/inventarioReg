namespace InventarioReg.Models
{
    using Newtonsoft.Json;
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;
    using System.Linq;

    [Table("MarcaActivo")]
    public partial class MarcaActivo
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public MarcaActivo()
        {
            Items = new HashSet<Items>();
        }

        [Key]
        public int IdMarcaActivo { get; set; }

        [StringLength(100)]
        public string Marca { get; set; }
        [JsonIgnore]
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Items> Items { get; set; }
        /****************/
        public static List<MarcaActivo> ListaMarca(string nombre)
        {

            var marca = new List<MarcaActivo>();
            try
            {
                using (var ctx = new inventarioContext())
                {
                    ctx.Configuration.LazyLoadingEnabled = false;
                    marca = ctx.MarcaActivo
                                              .Where(x => x.Marca.Contains(nombre))
                                              .ToList();
                }
            }
            catch (Exception)
            {

                throw;
            }

            return marca;
        }
    }
}
