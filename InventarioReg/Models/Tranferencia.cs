namespace InventarioReg.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("Tranferencia")]
    public partial class Tranferencia
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Tranferencia()
        {
            TransferenciaDetalle = new HashSet<TransferenciaDetalle>();
        }

        [Key]
        public int IdTransferencia { get; set; }

        public int IdUsuario { get; set; }

        public int IdOficinaOrigen { get; set; }

        public int IdOficinaDestino { get; set; }

        public int? IdArea { get; set; }

        public DateTime? Fecha { get; set; }

        public int? IdEstadoTransferencia { get; set; }

        [StringLength(500)]
        public string Observacion { get; set; }

        public DateTime? FechaCambioEstado { get; set; }

        public int? IdUsuarioCambioEstado { get; set; }

        public virtual Areas Areas { get; set; }

        public virtual EstadosTransferencia EstadosTransferencia { get; set; }

        public virtual Oficinas Oficinas { get; set; }

        public virtual Oficinas Oficinas1 { get; set; }

        public virtual Usuarios Usuarios { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<TransferenciaDetalle> TransferenciaDetalle { get; set; }
    }
}
