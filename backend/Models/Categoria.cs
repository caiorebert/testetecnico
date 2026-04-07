using Microsoft.EntityFrameworkCore.Metadata.Conventions;

namespace TesteTecnico.Models;

public class Categoria
{
    public int Id { get; set; }
    public string Descricao { get; set; } = string.Empty;
    public Finalidade Finalidade { get; set; }
    public DateTime CriadoEm { get; set; } = DateTime.Now;

    public Categoria() { }

    public Categoria(int Id, string Descricao, Finalidade Finalidade)
    {
        this.Id = Id;
        this.Descricao = Descricao;
        this.Finalidade = Finalidade;
    }
}