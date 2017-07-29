namespace InventarioReg.Models
{
    using Newtonsoft.Json;
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;
    using System.Linq;

    [Table("ModeloActivo")]
    public partial class ModeloActivo
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public ModeloActivo()
        {
            Items = new HashSet<Items>();
        }

        [Key]
        public int IdModeloActivo { get; set; }

        [StringLength(100)]
        public string Modelo { get; set; }
        [JsonIgnore]
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Items> Items { get; set; }
        /****************/
        public static List<ModeloActivo> ListaModelo(string nombre)
        {

            var modelo = new List<ModeloActivo>();
            try
            {
                using (var ctx = new inventarioContext())
                {
                    ctx.Configuration.LazyLoadingEnabled = false;
                    modelo = ctx.ModeloActivo
                                              .Where(x => x.Modelo.Contains(nombre))
                                              .ToList();
                }
            }
            catch (Exception)
            {

                throw;
            }

            return modelo;
        }
    }
}
