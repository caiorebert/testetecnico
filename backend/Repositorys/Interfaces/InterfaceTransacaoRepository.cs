namespace TesteTecnico.Repositorys.Interfaces;
using TesteTecnico.Models;

public interface ITransacaoRepository
{
    Task<IEnumerable<Transacao>> GetAllAsync();
    Task<Transacao?> GetByIdAsync(int id);
    Task AddAsync(Transacao transacao);
    Task UpdateAsync(Transacao transacao);
    Task DeleteAsync(Transacao transacao);
    Task<DashboardGeralDTO> GetDashboardAsync();
}