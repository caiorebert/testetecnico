'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Plus, Edit, Trash2, ArrowUpCircle, ArrowDownCircle, Home } from 'lucide-react';
import Icon from '@mdi/react';
import ConfirmModal from './components/ConfirmModal';
import { mdiPencil, mdiDelete } from '@mdi/js';

interface Categoria {
    id: number;
    descricao: string;
    finalidade: number;
}

export default function ListaCategorias() {
    const [loading, setLoading] = useState(false);
    const [categorias, setCategorias] = useState<Categoria[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedId, setSelectedId] = useState<number | null>(null);

    useEffect(() => {
        fetch(process.env.NEXT_PUBLIC_API_URL + '/categoria').then(res => res.json()).then(setCategorias);
    }, []);

    const confirmDelete = (id: number) => {
        setSelectedId(id);
        setIsModalOpen(true);
    };

    const handleDelete = async () => {
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categoria/${selectedId}`, { method: 'DELETE' });
        setCategorias(categorias.filter((t: any) => t.id !== selectedId));
        setIsModalOpen(false);
    };

    const getFinalidade = (finalidade: number) => {
        switch (finalidade) {
            case 1:
                return <div className="flex items-center gap-2 text-green-600"><ArrowUpCircle size={14} /> Receita</div>;
            case 2:
                return <div className="flex items-center gap-2 text-red-600"><ArrowDownCircle size={14} /> Despesa</div>;
            default:
                return <div className="flex items-center gap-2"><span className="text-green-600"><ArrowUpCircle size={14} /></span><span className="text-red-600"><ArrowDownCircle size={14} /></span> Ambas</div>;
        }
    };

  return (
    <div className="p-8">
        <div className='flex mb-5'>
            <Link href="/" className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center gap-2">
              <Home size={18} />
            </Link>
        </div>
        <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold text-gray-800">Categorias</h1>
            <Link href="/categorias/cadastro" className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center gap-2">
                <Plus size={18} /> Nova Categoria
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
                    <th className="px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Finalidade</th>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider text-right">Ações</th>
                </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                {categorias.map((p) => (
                    <tr key={p.id} className="hover:bg-indigo-50/30 transition-colors group">
                    <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold">
                            {p.descricao.charAt(0)}
                        </div>
                        <span className="font-medium text-gray-700">{p.descricao}</span>
                        </div>
                    </td>
                    <td className="px-6 py-4 text-gray-500">
                        <div className="flex items-center gap-2">
                        {
                            getFinalidade(p.finalidade) 
                        }
                        </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2 group-hover:opacity-100 transition-opacity">
                        <a href={'/categorias/edicao/' + p.id} className="p-2 text-blue-600 hover:bg-blue-50 rounded-md">
                            <Icon path={mdiPencil} size={1} />
                        </a>
                        <button onClick={() => confirmDelete(p.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-md">
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