namespace InventarioReg.Models
{
    using Newtonsoft.Json;
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("TipoItem")]
    public partial class TipoItem
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public TipoItem()
        {
           // Items = new HashSet<Items>();
        }

        [Key]
        public int IdTipoItem { get; set; }

        [Column("TipoItem")]
        [StringLength(100)]
        public string TipoItem1 { get; set; }
      //  [JsonIgnore]
        //[System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        //public virtual ICollection<Items> Items { get; set; }
    }
}
