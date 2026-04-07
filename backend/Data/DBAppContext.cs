using Microsoft.EntityFrameworkCore;
using TesteTecnico.Models;

namespace TesteTecnico.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Pessoa> Pessoa { get; set; }
    public DbSet<Categoria> Categoria { get; set; }
    public DbSet<Transacao> Transacao { get; set; }
}