'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Plus, Edit, Trash2, ArrowUpCircle, ArrowDownCircle, Home } from 'lucide-react';
import ConfirmModal from './components/ConfirmModal';
import { Icon } from '@mdi/react';
import { mdiPencil, mdiDelete } from '@mdi/js';

interface Transacao {
    id: number;
    descricao: string;
    valor: number;
    tipo: 'Receita' | 'Despesa';
    categoria: {
        id: number;
        descricao: string;
    };
    pessoa: {
        id: number;
        nome: string;
    };
    data: string;
}

export default function ListaTransacoes() {
    const [loading, setLoading] = useState(false);
    const [transacoes, setTransacoes] = useState<Transacao[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [deletingId, setDeletingId] = useState<number | null>(null);


    useEffect(() => {
        fetch(process.env.NEXT_PUBLIC_API_URL + '/transacao').then(res => res.json()).then(setTransacoes);
    }, []);

    const openDeleteModal = (id: number) => {
        setDeletingId(id);
        setIsModalOpen(true);
    };

    const handleDelete = async () => {
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/transacao/${deletingId}`, { method: 'DELETE' });
        setTransacoes(transacoes.filter((t: Transacao) => t.id !== deletingId));
        setIsModalOpen(false);
    };

  return (
    <div className="p-8">
        <div className='flex'>
            <Link href="/" className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center gap-2">
              <Home size={18} />
            </Link>
        </div>
        <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold text-gray-800">Transações Financeiras</h1>
            <Link href="/transacoes/cadastro" className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center gap-2">
                <Plus size={18} /> Nova Transação
            </Link>
        </div>

        {/* Tabela / Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            {loading ? (
            <div className="p-10 text-center text-gray-400">Carregando dados...</div>
            ) : (
            <table className="w-full text-left border-collapse">
                <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Descrição</th>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Valor</th>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Categoria</th>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Pessoa</th>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider text-right">Ações</th>
                </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                {transacoes.map((p) => (
                    <tr key={p.id} className="hover:bg-indigo-50/30 transition-colors group">
                        <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold">
                                    {p.descricao.charAt(0)}
                                </div>
                                <span className="font-medium text-gray-700">{p.descricao}</span>
                            </div>
                        </td>
                        <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                                <span className="font-medium text-gray-700">{p.valor}</span>
                            </div>
                        </td>
                        <td className="px-6 py-4 text-gray-500">
                            <div className="flex items-center gap-2">
                                <span className="font-medium text-gray-700">{p.categoria.descricao}</span>
                            </div>
                        </td>
                         <td className="px-6 py-4 text-gray-500">
                            <div className="flex items-center gap-2">
                                <span className="font-medium text-gray-700">{p.pessoa.nome}</span>
                            </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                            <div className="flex justify-end gap-2 group-hover:opacity-100 transition-opacity">
                            <a href={'/transacoes/edicao/' + p.id} className="p-2 text-blue-600 hover:bg-blue-50 rounded-md">
                                <Icon path={mdiPencil} size={1} />
                            </a>
                            <button onClick={() => openDeleteModal(p.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-md">
                                <Icon path={mdiDelete} size={1} />
                            </button>
                            </div>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            )}
        </div>

        <ConfirmModal 
            isOpen={isModalOpen} 
            onClose={() => setIsModalOpen(false)} 
            onConfirm={handleDelete}
            title="Excluir Transação"
            message="Deseja realmente remover esta movimentação? Isso afetará seu saldo."
        />
    </div>
  );
}