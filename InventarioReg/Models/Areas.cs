namespace InventarioReg.Models
{
    using Newtonsoft.Json;
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class Areas
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Areas()
        {
            /*  Items = new HashSet<Items>();
              Tranferencia = new HashSet<Tranferencia>();*/
           // OficinasAreas = new HashSet<OficinasAreas>();
        }

        [Key]
        public int IdArea { get; set; }

        [StringLength(100)]
        public string Area { get; set; }

        /*ystem.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Items> Items { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Tranferencia> Tranferencia { get; set; }*/

        //[System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        // [JsonIgnore]
        //  public virtual ICollection<OficinasAreas> OficinasAreas { get; set; }
        
    }
}
