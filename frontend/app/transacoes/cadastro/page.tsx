'use client';
import { useRouter } from 'next/navigation';
import Form from '../components/Form';
import { ArrowLeft } from 'lucide-react';

export default function Cadastro() {
  const router = useRouter();
  const handleCreate = async (data: any) => {
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/transacao', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (response.ok) {
        alert('Criado com sucesso!');
        router.push('/transacoes');
      } else {
        alert('Erro ao criar no servidor.');
      }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="max-w-md w-full">
          <a href='/transacoes' className="flex items-center gap-2 text-gray-500 hover:text-indigo-600 transition-colors mb-6 group">
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            <span>Voltar para a lista</span>
          </a>
          <Form 
            title="Nova Transação" 
            buttonText="Cadastrar Transação" 
            onSubmit={handleCreate} 
          />
        </div>
    </div>
  );
}