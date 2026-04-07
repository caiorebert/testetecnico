namespace TesteTecnico.Models;

public class Transacao
{
    public int Id { get; set; }
    public string Descricao { get; set; }
    public int Valor { get; set; }
    public string Tipo { get; set; }
    public Categoria Categoria { get; set; }
    public Pessoa Pessoa { get; set; }
    public DateTime CriadoEm { get; set; } = DateTime.Now;

    public Transacao() {}

    public Transacao(
        string Descricao,
        int Valor,
        string Tipo,
        Categoria Categoria,
        Pessoa Pessoa
        )
    {
        this.Descricao = Descricao;
        this.Valor = Valor;
        this.Tipo = Tipo;
        this.Categoria = Categoria;
        this.Pessoa = Pessoa;
    }

    public Transacao(
        int Id,
        string Descricao,
        int Valor,
        string Tipo,
        Categoria Categoria,
        Pessoa Pessoa
        )
    {
        this.Id = Id;
        this.Descricao = Descricao;
        this.Valor = Valor;
        this.Tipo = Tipo;
        this.Categoria = Categoria;
        this.Pessoa = Pessoa;
    }
}