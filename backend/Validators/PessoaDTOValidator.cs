using FluentValidation;

public class PessoaDtoValidator : AbstractValidator<PessoaDTO>
{
    public PessoaDtoValidator()
    {
        RuleFor(x => x.Nome)
            .NotEmpty().WithMessage("Nome é obrigatório")
            .MaximumLength(100).WithMessage("Nome deve ter no máximo 100 caracteres");

        RuleFor(x => x.Idade)
            .GreaterThan(0).WithMessage("Idade deve ser maior que zero");
    }
}