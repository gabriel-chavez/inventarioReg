namespace InventarioReg.Models
{
    using Newtonsoft.Json;
    using Proyecto.Models;
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;
    using System.Linq;

    [Table("NombreActivo")]
    public partial class NombreActivo
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public NombreActivo()
        {
          //  Items = new HashSet<Items>();
        }

        [Key]
        public int IdNombreActivo { get; set; }

        [StringLength(100)]
        public string Nombre { get; set; }

        public int? IdTipoItem { get; set; }
      //  [JsonIgnore]
        //[System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]        
       // public virtual ICollection<Items> Items { get; set; }
        /***************************************/
        public static List<NombreActivo> ListaNombre(string nombre, int TipoItem)
        {      
                  
            var nombres = new List<NombreActivo>();
            try
            {
                using (var ctx = new inventarioContext())
                {
                    ctx.Configuration.LazyLoadingEnabled = false;
                    nombres = ctx.NombreActivo
                                              .Where(x=>x.IdTipoItem==TipoItem)
                                              .Where(x => x.Nombre.Contains(nombre))
                                              .ToList();
                }
            }
            catch (Exception)
            {

                throw;
            }

            return nombres;
        }
    }
}
