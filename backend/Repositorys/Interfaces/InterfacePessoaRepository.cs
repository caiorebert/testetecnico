namespace TesteTecnico.Repositorys.Interfaces;
using TesteTecnico.Models;

public interface IPessoaRepository
{
    Task<IEnumerable<Pessoa>> GetAllAsync();
    Task<Pessoa?> GetByIdAsync(int id);
    Task AddAsync(Pessoa pessoa);
    Task UpdateAsync(Pessoa pessoa);
    Task DeleteAsync(Pessoa pessoa);
}