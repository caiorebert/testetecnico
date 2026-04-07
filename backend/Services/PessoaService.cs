namespace TesteTecnico.Services;

using TesteTecnico.Models;
using TesteTecnico.Repositorys.Interfaces;

public class PessoaService
{
    private readonly IPessoaRepository _pessoaRepository;

    public PessoaService(IPessoaRepository pessoaRepository)
    {
        _pessoaRepository = pessoaRepository;
    }

    public async Task<IEnumerable<Pessoa>> GetAllAsync()
    {
        return await _pessoaRepository.GetAllAsync();
    }

    public async Task<Pessoa?> GetByIdAsync(int id)
    {
        return await _pessoaRepository.GetByIdAsync(id);
    }

    public async Task<Pessoa> AddAsync(PessoaDTO pessoaDTO)
    {
        Pessoa pessoa = new Pessoa
        {
            Nome = pessoaDTO.Nome,
            Idade = pessoaDTO.Idade
        };

        await _pessoaRepository.AddAsync(pessoa);
        
        return pessoa;
    }

    public async Task<Pessoa> UpdateAsync(int id, PessoaDTO pessoa)
    {
        Pessoa? existingPessoa = await _pessoaRepository.GetByIdAsync(id);
        if (existingPessoa == null)
        {
            throw new Exception("Pessoa não encontrada");
        }

        existingPessoa.Nome = pessoa.Nome;
        existingPessoa.Idade = pessoa.Idade;

        await _pessoaRepository.UpdateAsync(existingPessoa);

        return existingPessoa;
    }

    public async Task DeleteAsync(int id)
    {
        Pessoa? pessoa = await _pessoaRepository.GetByIdAsync(id);
        if (pessoa != null)
        {
            await _pessoaRepository.DeleteAsync(pessoa);
        }
    }
}