namespace TesteTecnico.Repositorys;

using TesteTecnico.Data;
using TesteTecnico.Models;
using Microsoft.EntityFrameworkCore;
using TesteTecnico.Repositorys.Interfaces;

public class CategoriaRepository : ICategoriaRepository
{
    private readonly AppDbContext _context;

    public CategoriaRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Categoria>> GetAllAsync()
    {
        return await _context.Categoria.ToListAsync();
    }

    public async Task<Categoria?> GetByIdAsync(int id)
    {
        return await _context.Categoria.FindAsync(id);
    }

    public async Task AddAsync(Categoria categoria)
    {
        await _context.Categoria.AddAsync(categoria);
        await _context.SaveChangesAsync();
    }

    public async Task UpdateAsync(Categoria categoria)
    {
        _context.Categoria.Update(categoria);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteAsync(Categoria categoria)
    {
        _context.Categoria.Remove(categoria);
        await _context.SaveChangesAsync();
    }
}