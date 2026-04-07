namespace TesteTecnico.Services;

using TesteTecnico.Models;
using TesteTecnico.Repositorys.Interfaces;

public class CategoriaService
{
    private readonly ICategoriaRepository _categoriaRepository;

    public CategoriaService(ICategoriaRepository categoriaRepository)
    {
        _categoriaRepository = categoriaRepository;
    }

    public async Task<IEnumerable<Categoria>> GetAllAsync()
    {
        return await _categoriaRepository.GetAllAsync();
    }

    public async Task<Categoria?> GetByIdAsync(int id)
    {
        return await _categoriaRepository.GetByIdAsync(id);
    }

    public async Task AddAsync(CategoriaDTO categoriaDTO)
    {
        Console.WriteLine($"CategoriaDTO: Descricao={categoriaDTO.Descricao}, Finalidade={categoriaDTO.Finalidade}");
        Finalidade finalidade = categoriaDTO.Finalidade switch
        {
            1 => Finalidade.Receita,
            2 => Finalidade.Despesa,
            3 => Finalidade.Ambas,
            _ => throw new Exception("Finalidade inválida")
        };
        
        Categoria categoria = new()
        {
            Descricao = categoriaDTO.Descricao,
            Finalidade = finalidade
        };
        await _categoriaRepository.AddAsync(categoria);
    }

    public async Task<Categoria> UpdateAsync(int id, CategoriaDTO categoriaDTO)
    {
        Categoria? existingCategoria = await _categoriaRepository.GetByIdAsync(id);

        if (existingCategoria == null)
        {
            throw new Exception("Categoria não encontrada");
        }

        existingCategoria.Descricao = categoriaDTO.Descricao;
        existingCategoria.Finalidade = categoriaDTO.Finalidade switch
        {
            1 => Finalidade.Despesa,
            2 => Finalidade.Receita,
            3 => Finalidade.Ambas,
            _ => throw new Exception("Finalidade inválida")
        };

        await _categoriaRepository.UpdateAsync(existingCategoria);

        return existingCategoria;
    }

    public async Task DeleteAsync(int id)
    {
        Categoria? categoria = await _categoriaRepository.GetByIdAsync(id);
        if (categoria != null)
        {
            await _categoriaRepository.DeleteAsync(categoria);
        }
    }
}