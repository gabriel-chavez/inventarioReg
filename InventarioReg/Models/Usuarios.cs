namespace InventarioReg.Models
{
    using Proyecto.Models;
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity;
    using System.Data.Entity.Spatial;
    using System.Linq;

    public partial class Usuarios
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Usuarios()
        {
            Asignacion = new HashSet<Asignacion>();
            Items = new HashSet<Items>();
            Tranferencia = new HashSet<Tranferencia>();
        }

        [Key]
        public int IdUsuario { get; set; }

        [StringLength(200)]
        public string Nombre { get; set; }

        [StringLength(200)]
        public string Correo { get; set; }

        [StringLength(100)]
        public string Usuario { get; set; }
        
        [StringLength(100)]
        public string Roles { get; set; }
        [StringLength(100)]
        public string Cargo { get; set; }
        [StringLength(100)]
        public string Imagen { get; set; }
        public int? Estado { get; set; }
        public int? Tipo { get; set; }
        public int? Regional { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Asignacion> Asignacion { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Items> Items { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Tranferencia> Tranferencia { get; set; }
        public ResponseModel Listar()
        {
            List<Usuarios> usuarios = new List<Usuarios>();

            var rm = new ResponseModel();
            try
            {
                using (var ctx = new inventarioContext())
                {
                    ctx.Configuration.LazyLoadingEnabled = true;
                    ctx.Configuration.ProxyCreationEnabled = false;
                    usuarios = ctx.Usuarios.ToList();
                }
                rm.response = true;
                rm.message = "";
                rm.function = "mostrarTablaUsuarios";
                rm.result = usuarios;

            }
            catch (Exception e)
            {
                throw;
            }
            return rm;
        }
        public Usuarios Obtener(string usuario)
        {
            var usuariosSistema = new Usuarios();
            try
            {
                using (var ctx = new inventarioContext())
                {
                    ctx.Configuration.LazyLoadingEnabled = false;
                    ctx.Configuration.ProxyCreationEnabled = false;
                    usuariosSistema = ctx.Usuarios
                                       .Where(x => x.Usuario == usuario)
                                       .FirstOrDefault();
                }
            }
            catch (Exception)
            {

                throw;
            }
            return usuariosSistema;
        }
        public Usuarios ObtenerporId(int idUsuario)
        {
            var usuariosSistema = new Usuarios();
            try
            {
                using (var ctx = new inventarioContext())
                {
                    ctx.Configuration.LazyLoadingEnabled = false;
                    ctx.Configuration.ProxyCreationEnabled = false;
                    usuariosSistema = ctx.Usuarios
                                       .Where(x => x.IdUsuario == idUsuario)
                                       .FirstOrDefault();
                }
            }
            catch (Exception e)
            {

                throw;
            }
            return usuariosSistema;
        }
        public ResponseModel Guardar()
        {
            var rm = new ResponseModel();
            try
            {
                using (var ctx = new inventarioContext())
                {
                    var usu = Obtener(this.Usuario);
                    if (this.IdUsuario > 0)
                    {
                        ctx.Entry(this).State = EntityState.Modified;
                        ctx.SaveChanges();
                        rm.SetResponse(true);
                    }
                    else
                    {
                        if (usu == null)
                        {
                            ctx.Entry(this).State = EntityState.Added;
                            ctx.SaveChanges();
                            rm.SetResponse(true);
                        }
                        else
                        {
                            rm.SetResponse(false);
                            rm.message = "El Usuario ya se encuentra registrado en la Base de Datos";
                        }

                    }
                }
            }
            catch (Exception e)
            {
                throw;
            }
            return rm;
        }
    }
}
