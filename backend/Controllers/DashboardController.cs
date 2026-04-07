// Controllers/TransacaoController.cs
using Microsoft.AspNetCore.Mvc;
using TesteTecnico.Models;
using TesteTecnico.Services;

[ApiController]
[Route("api/dashboard")]

public class DashboardController : ControllerBase
{
    protected readonly TransacaoService _transacaoService;

    public DashboardController(TransacaoService transacaoService
    )
    {
        _transacaoService = transacaoService;
    }

    [HttpGet]
    public async Task<IActionResult> Get()
    {
        try
        {
            DashboardGeralDTO dashboard = await _transacaoService.GetByPessoaIdAsync(0);
            return Ok(dashboard);
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }
}