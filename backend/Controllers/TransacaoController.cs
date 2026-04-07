// Controllers/TransacaoController.cs
using Microsoft.AspNetCore.Mvc;
using TesteTecnico.Models;
using TesteTecnico.Services;

[ApiController]
[Route("api/transacao")]
public class TransacaoController : ControllerBase
{
    protected readonly TransacaoService _transacaoService;
    private static List<Transacao> Transacoes = [];

    public TransacaoController(TransacaoService transacaoService)
    {
        _transacaoService = transacaoService;
    }

    [HttpGet]
    public async Task<IActionResult> Get()
    {
        try
        {
            var transacoes = await _transacaoService.GetAllAsync();
            return Ok(transacoes);
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> Get(int id)
    {
        try
        {
            TransacaoDTO? transacaoDTO = await _transacaoService.GetByIdAsync(id);
            return Ok(transacaoDTO);
        } catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpPost]
    public async Task<IActionResult> Post([FromBody] TransacaoDTO TransacaoDTO)
    {
        if (TransacaoDTO == null)
        {
            return BadRequest("Dados Inválidos");
        }
        
        if (TransacaoDTO.Descricao == null)
        {
            return BadRequest("Descrição é obrigatório");
        }

        try
        {
            await _transacaoService.AddAsync(TransacaoDTO);
            return Ok("Transação criada com sucesso");
        } catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }

    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Put([FromBody] TransacaoDTO TransacaoDTO, int id)
    {
        if (TransacaoDTO == null)
        {
            return BadRequest("Dados Inválidos");
        }
        
        if (TransacaoDTO.Descricao == null)
        {
            return BadRequest("Descrição é obrigatório");
        }

        try
        {
            Transacao? transacao = await _transacaoService.UpdateAsync(id, TransacaoDTO);
            return Ok(transacao);
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
            await _transacaoService.DeleteAsync(id);
            return NoContent();
        } catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }
}