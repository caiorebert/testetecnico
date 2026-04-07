namespace TesteTecnico.Repositorys;

using TesteTecnico.Data;
using TesteTecnico.Models;
using Microsoft.EntityFrameworkCore;
using TesteTecnico.Repositorys.Interfaces;

public class TransacaoRepository : ITransacaoRepository
{
    private readonly AppDbContext _context;

    public TransacaoRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Transacao>> GetAllAsync()
    {
        return await _context.Transacao.Include(t => t.Categoria).Include(t => t.Pessoa).ToListAsync();
    }

    public async Task<Transacao?> GetByIdAsync(int id)
    {
        return await _context.Transacao.Include(t => t.Categoria).Include(t => t.Pessoa).FirstOrDefaultAsync(t => t.Id == id);
    }

    public async Task AddAsync(Transacao transacao)
    {
        await _context.Transacao.AddAsync(transacao);
        await _context.SaveChangesAsync();
    }

    public async Task UpdateAsync(Transacao transacao)
    {
        _context.Transacao.Update(transacao);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteAsync(Transacao transacao)
    {
        _context.Transacao.Remove(transacao);
        await _context.SaveChangesAsync();
    }

    public async Task<DashboardGeralDTO> GetDashboardAsync()
    {
        var consultaPessoas = await (from p in _context.Pessoa
                         join t in _context.Transacao on p.Id equals t.Pessoa.Id into transacoesAgrupadas
                         select new DashboardPessoaDTO
                         {
                             PessoaId = p.Id,
                             Nome = p.Nome,
                             TotalReceitas = transacoesAgrupadas
                                 .Where(x => x.Tipo == "Receita")
                                 .Sum(x => (decimal?)x.Valor) ?? 0,
                             TotalDespesas = transacoesAgrupadas
                                 .Where(x => x.Tipo == "Despesa")
                                 .Sum(x => (decimal?)x.Valor) ?? 0
                         }).ToListAsync();

        var consultaCategorias = await (from c in _context.Categoria
                            join t in _context.Transacao on c.Id equals t.Categoria.Id into transacoesAgrupadas
                            select new DashboardCategoriaDTO
                            {
                                CategoriaId = c.Id,
                                Finalidade = c.Finalidade == Finalidade.Receita ? 1 : c.Finalidade == Finalidade.Despesa ? 2 : 3,
                                Descricao = c.Descricao,
                                TotalReceitas = transacoesAgrupadas
                                    .Where(x => x.Tipo == "Receita")
                                    .Sum(x => (decimal?)x.Valor) ?? 0,
                                TotalDespesas = transacoesAgrupadas
                                    .Where(x => x.Tipo == "Despesa")
                                    .Sum(x => (decimal?)x.Valor) ?? 0
                            }).ToListAsync();

        return new DashboardGeralDTO
        {
            Pessoas = consultaPessoas,
            Categorias = consultaCategorias,
            TotalGeralReceitasPessoas = consultaPessoas.Sum(p => p.TotalReceitas),
            TotalGeralDespesasPessoas = consultaPessoas.Sum(p => p.TotalDespesas),
            SaldoLiquidoGeralPessoas = consultaPessoas.Sum(p => p.TotalReceitas - p.TotalDespesas),
            TotalGeralReceitasCategorias = consultaCategorias.Sum(c => c.TotalReceitas),
            TotalGeralDespesasCategorias = consultaCategorias.Sum(c => c.TotalDespesas),
            SaldoLiquidoGeralCategorias = consultaCategorias.Sum(c => c.TotalReceitas - c.TotalDespesas)
        };
    }
}