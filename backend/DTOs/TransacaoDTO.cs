public class TransacaoDTO
{
    public TransacaoDTO() {}
    public TransacaoDTO(
        string? Descricao,
        int Valor,
        string? Tipo,
        int CategoriaId,
        int PessoaId
    )
    {
        this.Descricao = Descricao;
        this.Valor = Valor;
        this.Tipo = Tipo;
        this.CategoriaId = CategoriaId;
        this.PessoaId = PessoaId;
    }
    public string? Descricao { get; set; }
    public int Valor { get; set; }
    public string? Tipo { get; set; }
    public int CategoriaId { get; set; }
    public int PessoaId { get; set; }
}