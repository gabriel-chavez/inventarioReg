namespace InventarioReg.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("TransferenciaDetalle")]
    public partial class TransferenciaDetalle
    {
        [Key]
        public int IdTransferenciaDetalle { get; set; }

        public int? IdTransferencia { get; set; }

        public int? IdItem { get; set; }

        public int? IdEstadosMovimiento { get; set; }

        [StringLength(500)]
        public string Observaciones { get; set; }

        public virtual EstadosMovimiento EstadosMovimiento { get; set; }

        public virtual Items Items { get; set; }

        public virtual Tranferencia Tranferencia { get; set; }
    }
}
