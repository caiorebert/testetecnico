namespace TesteTecnico.Services;

using TesteTecnico.Models;
using TesteTecnico.Repositorys.Interfaces;

public class TransacaoService
{
    private readonly ITransacaoRepository _transacaoRepository;
    private readonly PessoaService _pessoaService;
    private readonly CategoriaService _categoriaService;

    public TransacaoService(
        ITransacaoRepository transacaoRepository,
        PessoaService pessoaService,
        CategoriaService categoriaService
        )
    {
        _transacaoRepository = transacaoRepository;
        _pessoaService = pessoaService;
        _categoriaService = categoriaService;
    }

    public async Task<IEnumerable<Transacao>> GetAllAsync()
    {
        return await _transacaoRepository.GetAllAsync();
    }

    public async Task<TransacaoDTO?> GetByIdAsync(int id)
    {
        Transacao transacao = await _transacaoRepository.GetByIdAsync(id) ?? throw new Exception("Transação não encontrada");

        TransacaoDTO transacaoDTO = new(
            Descricao: transacao.Descricao,
            Valor: transacao.Valor,
            Tipo: transacao.Tipo,
            CategoriaId: transacao.Categoria.Id,
            PessoaId: transacao.Pessoa.Id   
        );

        return transacaoDTO;
    }

    public async Task AddAsync(TransacaoDTO transacaoDTO)
    {
        if (transacaoDTO == null)
        {
            throw new ArgumentNullException(nameof(transacaoDTO));
        }

        if (transacaoDTO.Valor <= 0)
        {
            throw new ArgumentException("O valor da transação deve ser maior que zero.");
        }

        if (transacaoDTO.CategoriaId <= 0)
        {
            throw new ArgumentException("O ID da categoria deve ser maior que zero.");
        }

        if (transacaoDTO.PessoaId <= 0)
        {
            throw new ArgumentException("O ID da pessoa deve ser maior que zero.");
        }


        Categoria? categoria = await _categoriaService.GetByIdAsync(transacaoDTO.CategoriaId);
        if (categoria == null)
        {
            throw new ArgumentException($"Categoria com ID {transacaoDTO.CategoriaId} não encontrada.");
        }

        Pessoa? pessoa = await _pessoaService.GetByIdAsync(transacaoDTO.PessoaId);
        if (pessoa == null)
        {
            throw new ArgumentException($"Pessoa com ID {transacaoDTO.PessoaId} não encontrada.");
        }

        Transacao transacao = new(
            Descricao: transacaoDTO.Descricao,
            Valor: transacaoDTO.Valor,
            Tipo: transacaoDTO.Tipo,
            Categoria: categoria,
            Pessoa: pessoa
        );

        await _transacaoRepository.AddAsync(transacao);
    }

    public async Task<Transacao> UpdateAsync(int id, TransacaoDTO transacaoDTO)
    {
        Transacao? existingTransacao = await _transacaoRepository.GetByIdAsync(id);

        if (existingTransacao == null)
        {
            throw new Exception("Transação não encontrada");
        }

        existingTransacao.Descricao = transacaoDTO.Descricao;
        existingTransacao.Valor = transacaoDTO.Valor;
        existingTransacao.Tipo = transacaoDTO.Tipo;
        existingTransacao.Categoria = await _categoriaService.GetByIdAsync(transacaoDTO.CategoriaId) ?? throw new Exception($"Categoria com ID {transacaoDTO.CategoriaId} não encontrada.");
        existingTransacao.Pessoa = await _pessoaService.GetByIdAsync(transacaoDTO.PessoaId) ?? throw new Exception($"Pessoa com ID {transacaoDTO.PessoaId} não encontrada.");
        await _transacaoRepository.UpdateAsync(existingTransacao);

        return existingTransacao;
    }

    public async Task DeleteAsync(int id)
    {
        Transacao? transacao = await _transacaoRepository.GetByIdAsync(id);
        if (transacao != null)
        {
            await _transacaoRepository.DeleteAsync(transacao);
        }
    }

    public async Task<DashboardGeralDTO> GetByPessoaIdAsync(int pessoaId)
    {
        return await _transacaoRepository.GetDashboardAsync();
    }
}