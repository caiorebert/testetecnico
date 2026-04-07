public class DashboardGeralDTO
{
    public List<DashboardPessoaDTO> Pessoas { get; set; }
    public List<DashboardCategoriaDTO> Categorias { get; set; }
    public decimal TotalGeralReceitasPessoas { get; set; }
    public decimal TotalGeralDespesasPessoas { get; set; }
    public decimal SaldoLiquidoGeralPessoas { get; set; }
    public decimal TotalGeralReceitasCategorias { get; set; }
    public decimal TotalGeralDespesasCategorias { get; set; }
    public decimal SaldoLiquidoGeralCategorias { get; set; }

}