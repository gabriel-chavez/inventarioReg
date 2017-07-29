namespace InventarioReg.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("EstadosMovimiento")]
    public partial class EstadosMovimiento
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public EstadosMovimiento()
        {
            TransferenciaDetalle = new HashSet<TransferenciaDetalle>();
        }

        [Key]
        public int IdEstadosMovimiento { get; set; }

        [StringLength(50)]
        public string Estado { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<TransferenciaDetalle> TransferenciaDetalle { get; set; }
    }
}
