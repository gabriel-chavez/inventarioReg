namespace InventarioReg.Models
{
    using Newtonsoft.Json;
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class OficinasAreas
    {
        [Key]
        public int IdOficinaArea { get; set; }

        public int? IdOficina { get; set; }

        public int? IdArea { get; set; }

        public int? Activo { get; set; }

        public virtual Areas Areas { get; set; }
        //[JsonIgnore]
       // public virtual Oficinas Oficinas { get; set; }
    }
}
