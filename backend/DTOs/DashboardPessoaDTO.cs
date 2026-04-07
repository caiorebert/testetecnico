public class DashboardPessoaDTO
{
    public int PessoaId { get; set; }
    public string Nome { get; set; }
    public decimal TotalReceitas { get; set; }
    public decimal TotalDespesas { get; set; }
    public decimal Saldo => TotalReceitas - TotalDespesas;
}