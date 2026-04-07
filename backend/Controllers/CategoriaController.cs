using Microsoft.AspNetCore.Mvc;
using TesteTecnico.Models;
using TesteTecnico.Services;

[ApiController]
[Route("api/categoria")]
public class CategoriaController : ControllerBase
{
    private readonly CategoriaService _categoriaService;

    public CategoriaController(CategoriaService categoriaService)
    {
        _categoriaService = categoriaService;
    }

    [HttpGet]
    public Task<IEnumerable<Categoria>> Get()
    {
        return _categoriaService.GetAllAsync();
    }

    [HttpGet("{id}")]
    public Task<Categoria?> Get(int id)
    {
        return _categoriaService.GetByIdAsync(id);
    }

    [HttpPost]
    public Task AddAsync([FromBody] CategoriaDTO categoriaDTO)
    {
        return _categoriaService.AddAsync(categoriaDTO);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateAsync([FromBody] CategoriaDTO categoriaDTO, int id)
    {
        if (categoriaDTO == null)
        {
            return BadRequest("Dados da categoria inválidos");
        }

        try
        {
            return Ok(await _categoriaService.UpdateAsync(id, categoriaDTO));
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteAsync(int id)
    {
        await _categoriaService.DeleteAsync(id);
        return NoContent();
    }
}