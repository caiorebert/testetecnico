'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Form from '../../components/Form'; 
import { ArrowLeft, Loader2 } from 'lucide-react';

interface PessoaForm {
  nome: string,
  idade: number
}

export default function EdicaoPessoa() {
  const params = useParams();
  const router = useRouter();
  
  const [pessoa, setPessoa] = useState<PessoaForm>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPessoa = async () => {
      try {
        const response = await fetch(`http://localhost:5045/api/pessoa/${params.id}`);
        if (!response.ok) throw new Error('Pessoa não encontrada');
        const data = await response.json();
        setPessoa(data);
      } catch (err) {
        setError('Erro ao carregar dados da pessoa.');
      } finally {
        setLoading(false);
      }
    };

    if (params.id) fetchPessoa();
  }, [params.id]);

  const handleUpdate = async (formData: any) => {
    try {
      const response = await fetch(`http://localhost:5045/api/pessoa/${params.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Atualizado com sucesso!');
        router.push('/pessoas');
      } else {
        alert('Erro ao atualizar no servidor.');
      }
    } catch (err) {
      console.error(err);
      alert('Erro de conexão.');
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 text-indigo-600">
      <Loader2 className="animate-spin" size={40} />
    </div>
  );

  if (error) return <div className="text-center p-10 text-red-500">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full">
        <a href='/pessoas' className="flex items-center gap-2 text-gray-500 hover:text-indigo-600 transition-colors mb-6 group">
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            <span>Voltar para a lista</span>
        </a>
        <Form 
          title="Editar Cadastro" 
          buttonText="Salvar Alterações" 
          initialData={pessoa} 
          onSubmit={handleUpdate} 
        />
      </div>
    </div>
  );
}