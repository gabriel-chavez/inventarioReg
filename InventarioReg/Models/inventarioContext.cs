namespace InventarioReg.Models
{
    using System;
    using System.Data.Entity;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Linq;

    public partial class inventarioContext : DbContext
    {
        public inventarioContext()
            : base("name=inventarioContext")
        {
        }

        public virtual DbSet<Areas> Areas { get; set; }
        public virtual DbSet<Asignacion> Asignacion { get; set; }
        public virtual DbSet<Estados> Estados { get; set; }
        public virtual DbSet<EstadosMovimiento> EstadosMovimiento { get; set; }
        public virtual DbSet<EstadosTransferencia> EstadosTransferencia { get; set; }
        public virtual DbSet<Items> Items { get; set; }
        public virtual DbSet<MarcaActivo> MarcaActivo { get; set; }
        public virtual DbSet<ModeloActivo> ModeloActivo { get; set; }
        public virtual DbSet<NombreActivo> NombreActivo { get; set; }
        public virtual DbSet<Oficinas> Oficinas { get; set; }
        public virtual DbSet<Regionales> Regionales { get; set; }
        public virtual DbSet<TipoItem> TipoItem { get; set; }
        public virtual DbSet<Tranferencia> Tranferencia { get; set; }
        public virtual DbSet<TransferenciaDetalle> TransferenciaDetalle { get; set; }
        public virtual DbSet<Usuarios> Usuarios { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Areas>()
                .Property(e => e.Area)
                .IsUnicode(false);

            modelBuilder.Entity<Asignacion>()
                .Property(e => e.NombreGrupo)
                .IsUnicode(false);

            modelBuilder.Entity<Asignacion>()
                .Property(e => e.Observacion)
                .IsUnicode(false);

            modelBuilder.Entity<Estados>()
                .Property(e => e.Estado)
                .IsUnicode(false);

            modelBuilder.Entity<Estados>()
                .HasMany(e => e.Items)
                .WithRequired(e => e.Estados)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<EstadosMovimiento>()
                .Property(e => e.Estado)
                .IsUnicode(false);

            modelBuilder.Entity<EstadosTransferencia>()
                .Property(e => e.Estado)
                .IsUnicode(false);

            modelBuilder.Entity<Items>()
                .Property(e => e.Serie)
                .IsUnicode(false);

            modelBuilder.Entity<Items>()
                .Property(e => e.Codigo)
                .IsUnicode(false);

            modelBuilder.Entity<Items>()
                .Property(e => e.Descripcion)
                .IsUnicode(false);

            modelBuilder.Entity<MarcaActivo>()
                .Property(e => e.Marca)
                .IsUnicode(false);

            modelBuilder.Entity<ModeloActivo>()
                .Property(e => e.Modelo)
                .IsUnicode(false);

            modelBuilder.Entity<NombreActivo>()
                .Property(e => e.Nombre)
                .IsUnicode(false);

            modelBuilder.Entity<Oficinas>()
                .Property(e => e.Nombre)
                .IsUnicode(false);

            modelBuilder.Entity<Oficinas>()
                .HasMany(e => e.Tranferencia)
                .WithRequired(e => e.Oficinas)
                .HasForeignKey(e => e.IdOficinaOrigen)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Oficinas>()
                .HasMany(e => e.Tranferencia1)
                .WithRequired(e => e.Oficinas1)
                .HasForeignKey(e => e.IdOficinaDestino)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Regionales>()
                .Property(e => e.Regional)
                .IsUnicode(false);

            modelBuilder.Entity<TipoItem>()
                .Property(e => e.TipoItem1)
                .IsUnicode(false);

            modelBuilder.Entity<TipoItem>()
                .HasMany(e => e.Items)
                .WithRequired(e => e.TipoItem)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Tranferencia>()
                .Property(e => e.Observacion)
                .IsUnicode(false);

            modelBuilder.Entity<TransferenciaDetalle>()
                .Property(e => e.Observaciones)
                .IsUnicode(false);

            modelBuilder.Entity<Usuarios>()
                .Property(e => e.Nombre)
                .IsUnicode(false);

            modelBuilder.Entity<Usuarios>()
                .Property(e => e.Correo)
                .IsUnicode(false);

            modelBuilder.Entity<Usuarios>()
                .Property(e => e.Usuario)
                .IsUnicode(false);

            modelBuilder.Entity<Usuarios>()
                .HasMany(e => e.Tranferencia)
                .WithRequired(e => e.Usuarios)
                .WillCascadeOnDelete(false);
        }
    }
}
