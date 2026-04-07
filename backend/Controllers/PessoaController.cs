// Controllers/PessoaController.cs
using Microsoft.AspNetCore.Mvc;
using TesteTecnico.Models;
using TesteTecnico.Services;

[ApiController]
[Route("api/[controller]")]
public class PessoaController : ControllerBase
{
    protected readonly PessoaService _pessoaService;

    public PessoaController(PessoaService pessoaService)
    {
        _pessoaService = pessoaService;
    }

    [HttpGet]
    public async Task<IActionResult> Get()
    {
        var pessoas = await _pessoaService.GetAllAsync();
        return Ok(pessoas);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> Get(int id)
    {

        Pessoa? pessoa = await _pessoaService.GetByIdAsync(id);

        if (pessoa != null)
        {
            return Ok(pessoa);
        } else
        {
            return NotFound();
        }
    }

    [HttpPost]
    public async Task<IActionResult> Post([FromBody] PessoaDTO pessoaDTO)
    {
        if (pessoaDTO == null)
        {
            return BadRequest("Dados Inválidos");
        }
        
        if (pessoaDTO.Nome == null)
        {
            return BadRequest("Nome é obrigatório");
        }


        Pessoa novaPessoa = await _pessoaService.AddAsync(pessoaDTO);

        return Ok(novaPessoa);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Put([FromBody] PessoaDTO pessoaDTO, int id)
    {
        if (pessoaDTO == null)
        {
            return BadRequest("Dados Inválidos");
        }
        
        if (pessoaDTO.Nome == null)
        {
            return BadRequest("Nome é obrigatório");
        }

        try
        {
            Pessoa? pessoa = await _pessoaService.UpdateAsync(id, pessoaDTO);
            return Ok(pessoa);
        } catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        try
        {
            await _pessoaService.DeleteAsync(id);
            return Ok();
        } catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }
}