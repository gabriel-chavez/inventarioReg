namespace InventarioReg.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class Regionales
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int CodRegional { get; set; }

        [StringLength(100)]
        public string Regional { get; set; }
    }
}
