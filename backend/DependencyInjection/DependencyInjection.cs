using TesteTecnico.Repositorys;
using TesteTecnico.Repositorys.Interfaces;
using TesteTecnico.Services;

public static class DependencyInjectionConfig
{
    public static IServiceCollection ResolveDependencies(this IServiceCollection services)
    {
        services.AddScoped<IPessoaRepository, PessoaRepository>();
        services.AddScoped<ICategoriaRepository, CategoriaRepository>();
        services.AddScoped<ITransacaoRepository, TransacaoRepository>();

        services.AddScoped<PessoaService>();
        services.AddScoped<CategoriaService>();
        services.AddScoped<TransacaoService>();

        return services;
    }
}