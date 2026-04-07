'use client';

import { useState, useEffect } from 'react';
import { DollarSign, Calendar, Tag, Loader2, Save } from 'lucide-react';

interface TransacaoForm {
    descricao: string,
    valor: string,
    tipo: string,
    categoriaId: number,
    pessoaId: number,
    data: string
}

interface Categoria {
    id: number;
    descricao: string;
    finalidade: number;
}

interface Pessoa {
    id: number;
    nome: string;
    idade: number;
} 

interface TransacaoFormProps {
  initialData?: TransacaoForm;
  onSubmit: (data: TransacaoForm) => Promise<void>;
  buttonText: string;
  title: string;
}

export default function TransacaoForm({ initialData, onSubmit, buttonText, title }: TransacaoFormProps) {
  const [formData, setFormData] = useState<TransacaoForm>({
    descricao: '',
    valor: '',
    tipo: 'Receita',
    categoriaId: 0,
    pessoaId: 0,
    data: new Date().toISOString().split('T')[0]
  });
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [categoriasBackup, setCategoriasBackup] = useState<Categoria[]>([]);
  const [tipos, setTipos] = useState(['Receita', 'Despesa']);
  const [pessoas, setPessoas] = useState<Pessoa[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_API_URL + '/pessoa').then(res => res.json()).then(setPessoas);
    if (initialData) setFormData(initialData);

    fetch(process.env.NEXT_PUBLIC_API_URL + '/categoria').then(res => res.json()).then(data => {
      // @ts-ignore
      setCategorias(data.filter(c => c.finalidade === 1 || c.finalidade === 3));
      setCategoriasBackup(data);
    });
    // setCategorias(categoriasBackup.filter(c => c.finalidade === 1));
    if (initialData) setFormData(initialData);
  }, [initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await onSubmit(formData);
    setLoading(false);
  };

  const selecionaTipo = (tipo: string) => {
    if (tipo == 'Despesa') {
      setCategorias(categoriasBackup.filter(c => c.finalidade === 2 || c.finalidade === 3));
      if (formData.categoriaId) setFormData({ ...formData, categoriaId: 0 });
    } else if (tipo == 'Receita') {
      setCategorias(categoriasBackup.filter(c => c.finalidade === 1 || c.finalidade === 3));
      if (formData.categoriaId) setFormData({ ...formData, categoriaId: 0 });
    } else {
      setCategorias([]);
      setFormData({ ...formData, categoriaId: 0 });
    }
    setFormData({ ...formData, tipo });
  }

  const selecionaPessoa = (id: number) => {
    if (id != 0) {
      const pessoa = pessoas.find(p => p.id === id);
      if (pessoa && pessoa.idade) {
        if (pessoa?.idade < 18) {
          setTipos(['Despesa']);
          setFormData({ ...formData, categoriaId: 0 });
          setFormData({ ...formData, tipo: 'Despesa' });
          selecionaTipo('Despesa');
        } else {
          setTipos(['Receita', 'Despesa']);
        }
      }
      
      setFormData({ ...formData, pessoaId: id });
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden max-w-md w-full">
      <div className={`p-6 text-center text-white bg-indigo-600`}>
        <h2 className="text-xl font-bold">{title}</h2>
      </div>

      <form onSubmit={handleSubmit} className="p-8 space-y-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Descrição</label>
          <input
            type="text"
            className="text-black w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            value={formData.descricao}
            onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Valor</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400"><DollarSign size={16}/></span>
              <input
                type="number" step="0.01"
                className="text-black w-full pl-9 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                value={formData.valor}
                onChange={(e) => setFormData({ ...formData, valor: e.target.value })}
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Tipo</label>
            <select 
              className="text-black w-full px-3 py-2 border rounded-lg outline-none"
              value={formData.tipo}
              onChange={(e) => selecionaTipo(e.target.value)}
              required
            >
              <option value="">Selecione...</option>
              {tipos.map((t, i) => <option key={i} value={t}>{t}</option>)}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Categoria</label>
          <select 
            className="text-black w-full px-3 py-2 border rounded-lg outline-none"
            value={formData.categoriaId}
            onChange={(e) => setFormData({ ...formData, categoriaId: parseInt(e.target.value) })}
            required
          >
            <option value="">Selecione...</option>
            {categorias.map((c: any) => <option key={c.id} value={c.id}>{c.descricao}</option>)}
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Pessoa</label>
          <select 
            className="text-black w-full px-3 py-2 border rounded-lg outline-none"
            value={formData.pessoaId}
            onChange={(e) => selecionaPessoa(parseInt(e.target.value))}
            required
          >
            <option value="">Selecione...</option>
            {pessoas.map((c: any) => <option key={c.id} value={c.id}>{c.nome}</option>)}
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gray-900 hover:bg-black text-white font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          {loading ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
          {buttonText}
        </button>
      </form>
    </div>
  );
}