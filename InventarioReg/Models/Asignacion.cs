namespace InventarioReg.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("Asignacion")]
    public partial class Asignacion
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Asignacion()
        {
            Items = new HashSet<Items>();
        }

        [Key]
        public int IdAsignacion { get; set; }
        [StringLength(100)]
        public string Usuario { get; set; }
        [StringLength(150)]
        public string NombreUsuario { get; set; }

        [StringLength(100)]
        public string NombreGrupo { get; set; }

        [StringLength(200)]
        public string Observacion { get; set; }
        public DateTime FechaAsignacion { get; set; }

        

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Items> Items { get; set; }
    }
}
