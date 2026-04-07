'use client';

import Link from 'next/link';
import { 
  Users, 
  ArrowRightLeft, 
  Tags, 
  ArrowRight, 
  LayoutDashboard,
} from 'lucide-react';
import { useEffect, useState } from 'react';

interface DashboardData {
  pessoas: {
    nome: string;
    totalReceitas: number;
    totalDespesas: number;
    saldo: number;
  }[];
  saldoLiquidoGeralCategorias: number;
  totalGeralReceitasCategorias: number;
  totalGeralDespesasCategorias: number;
  saldoLiquidoGeralPessoas: number;
  totalGeralReceitasPessoas: number;
  totalGeralDespesasPessoas: number;
  categorias: {
    descricao: string;
    finalidade: number;
    totalReceitas: number;
    totalDespesas: number;
  }[];
}

export default function Home() {
  const [dashboardData, setDashboardData] = useState<DashboardData>();
  const modules = [
    {
      title: 'Pessoas',
      description: 'Gerencie clientes, fornecedores e usuários do sistema.',
      icon: <Users size={32} className="text-indigo-600" />,
      href: '/pessoas',
      color: 'bg-indigo-50',
      border: 'border-indigo-100',
      count: ''
    },
    {
      title: 'Transações',
      description: 'Controle de entradas, saídas e movimentações financeiras.',
      icon: <ArrowRightLeft size={32} className="text-emerald-600" />,
      href: '/transacoes',
      color: 'bg-emerald-50',
      border: 'border-emerald-100',
      count: ''
    },
    {
      title: 'Categorias',
      description: 'Organize seus lançamentos por grupos e tipos.',
      icon: <Tags size={32} className="text-amber-600" />,
      href: '/categorias',
      color: 'bg-amber-50',
      border: 'border-amber-100',
      count: ''
    }
  ];

  const consultaDashboard = () => {
      fetch('http://localhost:5045/api/dashboard').then(res => res.json()).then(data => {
        setDashboardData(data);
      });
  }

  const formataMoeda = (valor: number) => {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }

  useEffect(() => {
    consultaDashboard();
  }, []);

  const corCategoria = (categoria: any) => {
    console.log(categoria);
    const cores = [
      'bg-red-600',
      'bg-green-800',
      'bg-blue-800',
    ]

    return cores[categoria.finalidade - 1];
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <nav className="bg-white border-b border-gray-200 px-8 py-4">
        <div className="max-w-6xl mx-auto flex items-center gap-2">
          <div className="bg-indigo-600 p-2 rounded-lg text-white">
            <LayoutDashboard size={20} />
          </div>
          <span className="font-bold text-gray-800 text-lg">Teste <span className="text-indigo-600">Tecnico</span></span>
        </div>
      </nav>

      <main className="flex-1 p-8">
        <div className="max-w-6xl mx-auto">
          
          <div className="mb-10">
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Bem-vindo, Caio</h1>
            <p className="text-gray-500 mt-2">Selecione um módulo para começar a gerenciar seus dados.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {modules.map((module, index) => (
              <Link 
                key={index} 
                href={module.href}
                className="group relative bg-white p-8 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md hover:border-indigo-200 transition-all duration-300 overflow-hidden"
              >
                <div className={`absolute top-0 right-0 w-24 h-24 ${module.color} rounded-bl-full opacity-50 translate-x-8 -translate-y-8 group-hover:translate-x-4 group-hover:-translate-y-4 transition-transform`} />

                <div className="relative z-10">
                  <div className={`w-14 h-14 ${module.color} rounded-xl flex items-center justify-center mb-6 border ${module.border}`}>
                    {module.icon}
                  </div>

                  <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-indigo-600 transition-colors">
                    {module.title}
                  </h3>
                  
                  <p className="text-gray-500 text-sm leading-relaxed mb-6">
                    {module.description}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                    <span className="text-xs font-medium text-gray-400 uppercase tracking-wider italic">
                      {module.count}
                    </span>
                    <div className="flex items-center gap-1 text-indigo-600 font-semibold text-sm">
                      Acessar
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        
          <div className="mt-12 p-6 bg-white rounded-2xl shadow-sm border border-gray-200 text-center">
            <h2 className="text-xl font-bold text-gray-800 mb-2">Resumo por pessoa</h2>
            <p className="text-gray-500 mb-4">Resumo rápido por pessoa de finanças.</p>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr>
                  <th className="border-b border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700">Pessoa</th>
                  <th className="border-b border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700">Total Receitas</th>
                  <th className="border-b border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700">Total Despesas</th>
                  <th className="border-b border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700">Saldo</th>
                </tr>
              </thead>
              <tbody>
                {dashboardData?.pessoas.map((pessoa: any, index: number) => (
                  <tr key={index}>
                    <td className="border-b border-gray-100 px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                          {pessoa.nome.charAt(0)}
                        </div>
                        <span className="text-gray-800 font-medium">{pessoa.nome}</span>
                      </div>
                    </td>
                    <td className="border-b border-gray-100 px-4 py-3 text-green-600 font-semibold">R$ {pessoa.totalReceitas.toFixed(2)}</td>
                    <td className="border-b border-gray-100 px-4 py-3 text-red-600 font-semibold">R$ {pessoa.totalDespesas.toFixed(2)}</td>
                    <td className="border-b border-gray-100 px-4 py-3 text-gray-800 font-bold">R$ {pessoa.saldo.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <h6 className="text-gray-800 font-bold mt-5">Totais Gerais:</h6>
            <div className="flex items-center justify-center gap-6 mt-6">
              <p className="text-gray-500 mt-2">Saldo Líquido Geral: R$ {dashboardData?.saldoLiquidoGeralPessoas.toFixed(2)}</p>
              <p className="text-gray-500 mt-2">Total Geral Receitas: R$ {dashboardData?.totalGeralReceitasPessoas.toFixed(2)}</p>
              <p className="text-gray-500 mt-2">Total Geral Despesas: R$ {dashboardData?.totalGeralDespesasPessoas.toFixed(2)}</p>
            </div>
          </div>

          <div className="mt-12 p-6 bg-white rounded-2xl shadow-sm border border-gray-200 text-center">
            <h2 className="text-xl font-bold text-gray-800 mb-2">Resumo por categoria</h2>
            <p className="text-gray-500 mb-4">Resumo rápido por categoria de finanças.</p>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr>
                  <th className="border-b border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700">Categoria</th>
                  <th className="border-b border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700">Finalidade</th>
                  <th className="border-b border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700">Total Receitas</th>
                  <th className="border-b border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700">Total Despesas</th>
                </tr>
              </thead>
              <tbody>
                {dashboardData?.categorias.map((categoria: any, index: number) => (
                  <tr key={index}>
                    <td className="border-b border-gray-100 px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 ${corCategoria(categoria)} text-white rounded-full flex items-center justify-center text-xs font-bold`}>
                          {categoria.descricao.charAt(0)}
                        </div>
                        <span className="text-gray-800 font-medium">{categoria.descricao}</span>
                      </div>
                    </td>
                    <td className="border-b border-gray-100 px-4 py-3">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${categoria.finalidade === 1 ? 'bg-green-100 text-green-600' : categoria.finalidade === 2 ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'}`}>
                        {categoria.finalidade === 1 ? 'Receita' : categoria.finalidade === 2 ? 'Despesa' : 'Ambas'}
                      </span>
                    </td>
                    <td className="border-b border-gray-100 px-4 py-3 text-green-600 font-semibold">{formataMoeda(categoria.totalReceitas)}</td>
                    <td className="border-b border-gray-100 px-4 py-3 text-red-600 font-semibold">{formataMoeda(categoria.totalDespesas)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <h6 className="text-gray-800 font-bold mt-5">Totais Gerais:</h6>
            <div className="flex items-center justify-center gap-6 mt-6">
              <p className="text-gray-500 mt-2">Saldo Líquido Geral: R$ {dashboardData?.saldoLiquidoGeralCategorias.toFixed(2)}</p>
              <p className="text-gray-500 mt-2">Total Geral Receitas: R$ {dashboardData?.totalGeralReceitasCategorias.toFixed(2)}</p>
              <p className="text-gray-500 mt-2">Total Geral Despesas: R$ {dashboardData?.totalGeralDespesasCategorias.toFixed(2)}</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}