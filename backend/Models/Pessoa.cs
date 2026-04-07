namespace TesteTecnico.Models;
using System.ComponentModel.DataAnnotations.Schema;

[Table("Pessoas")]
public class Pessoa
{
    public int Id { get; set; }
    public string Nome { get; set; } = string.Empty;
    public int Idade { get; set; }
    public DateTime CriadoEm { get; set; } = DateTime.Now;

    public Pessoa()
    {
        
    }
    public Pessoa(int Id, string Nome, int Idade)
    {
        this.Id = Id;
        this.Nome = Nome;
        this.Idade = Idade;
    }
}