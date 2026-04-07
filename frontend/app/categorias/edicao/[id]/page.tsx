'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Form from '../../components/Form'; 
import { ArrowLeft, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface CategoriaForm {
  descricao: string,
  finalidade: number
}

export default function EdicaoCategoria() {
  const params = useParams();
  const router = useRouter();
  
  const [categoria, setCategoria] = useState<CategoriaForm>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCategoria = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categoria/${params.id}`);
        if (!response.ok) toast.error('Erro ao carregar categoria do servidor.');
        const data = await response.json();
        setCategoria(data);
      } catch (err) {
        setError('Erro ao carregar dados da categoria.');
        toast.error('Erro ao carregar dados da categoria.');
      } finally {
        setLoading(false);
      }
    };

    if (params.id) fetchCategoria();
  }, [params.id]);

  const handleUpdate = async (formData: any) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categoria/${params.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success('Categoria atualizada com sucesso!');
        router.push('/categorias');
      } else {
        toast.error('Erro ao atualizar categoria no servidor.');
      }
    } catch (err) {
      console.error(err);
      toast.error('Erro de conexão.');
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
        <a href='/categorias' className="flex items-center gap-2 text-gray-500 hover:text-indigo-600 transition-colors mb-6 group">
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            <span>Voltar para a lista</span>
        </a>
        <Form 
          title="Editar Categoria" 
          buttonText="Salvar Alterações" 
          initialData={categoria} 
          onSubmit={handleUpdate} 
        />
      </div>
    </div>
  );
}