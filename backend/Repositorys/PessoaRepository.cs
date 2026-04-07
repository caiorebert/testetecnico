namespace TesteTecnico.Repositorys;

using TesteTecnico.Data;
using TesteTecnico.Models;
using Microsoft.EntityFrameworkCore;
using TesteTecnico.Repositorys.Interfaces;

public class PessoaRepository : IPessoaRepository
{
    private readonly AppDbContext _context;

    public PessoaRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Pessoa>> GetAllAsync()
    {
        return await _context.Pessoa.ToListAsync();
    }

    public async Task<Pessoa?> GetByIdAsync(int id)
    {
        return await _context.Pessoa.FindAsync(id);
    }

    public async Task AddAsync(Pessoa pessoa)
    {
        await _context.Pessoa.AddAsync(pessoa);
        await _context.SaveChangesAsync();
    }

    public async Task UpdateAsync(Pessoa pessoa)
    {
        _context.Pessoa.Update(pessoa);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteAsync(Pessoa pessoa)
    {
        _context.Pessoa.Remove(pessoa);
        await _context.SaveChangesAsync();
    }
}