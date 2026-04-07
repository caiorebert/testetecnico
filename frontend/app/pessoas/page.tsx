"use client"
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { mdiPencil, mdiDelete } from '@mdi/js'
import ConfirmModal from './components/ConfirmModal';
import Icon from '@mdi/react';
import { Home } from 'lucide-react';

const ListaPessoas = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [pessoas, setPessoas] = useState([
    {}
  ]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Abre o modal e guarda o ID que será deletado
  const openDeleteModal = (id: number) => {
    setDeletingId(id);
    setIsModalOpen(true);
  };

  const handleDelete = async () => {
    if (!deletingId) return;
    
    setIsDeleting(true);
    try {
      const response = await fetch(`http://localhost:5045/api/pessoa/${deletingId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Atualiza a lista local removendo a pessoa deletada
        setPessoas(pessoas.filter(p => p.id !== deletingId));
        setIsModalOpen(false);
      } else {
        alert("Erro ao excluir registro no .NET.");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsDeleting(false);
      setDeletingId(null);
    }
  };
  
  useEffect(() => {
    const fetchPessoas = async () => {
      try {
        const response = await fetch('http://localhost:5045/api/pessoa');
        const data = (await response.json());
        setPessoas(data)
        setLoading(false)
      } catch (err) {
        console.error(err);
      }
    };

    fetchPessoas();
  }, []);

  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-5xl mx-auto">
        <div className='flex'>
            <Link href="/" className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center gap-2">
              <Home size={18} />
            </Link>
        </div>
        {/* Header da Tela */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Gestão de Pessoas</h1>
            <p className="text-gray-500 text-sm">Visualize e gerencie os usuários do sistema.</p>
          </div>
          <a href='/pessoas/cadastro' className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors shadow-sm">
            Nova Pessoa
          </a>
        </div>

        {/* Tabela / Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {loading ? (
            <div className="p-10 text-center text-gray-400">Carregando dados...</div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Pessoa</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Idade</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {pessoas.map((p) => (
                  <tr key={p.id} className="hover:bg-indigo-50/30 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold">
                          {p.nome.charAt(0)}
                        </div>
                        <span className="font-medium text-gray-700">{p.nome}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-500">
                      <div className="flex items-center gap-2">
                        {/* <Mail size={14} /> */}
                        {p.idade}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2 group-hover:opacity-100 transition-opacity">
                        <a href={'/pessoas/edicao/' + p.id} className="p-2 text-blue-600 hover:bg-blue-50 rounded-md">
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
      </div>
      <ConfirmModal
        isOpen={isModalOpen}
        loading={isDeleting}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleDelete}
        title="Confirmar Exclusão"
        message="Tem certeza que deseja excluir esta pessoa? Esta ação não pode ser desfeita e removerá os dados permanentemente."
      />
    </div>
  );
};

export default ListaPessoas;