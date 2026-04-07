'use client';

import { useState, useEffect } from 'react';
import Icon from '@mdi/react';
import { mdiArrowLeft, mdiAccountPlus, mdiAccount, mdiNumeric } from '@mdi/js';

interface PessoaFormProps {
    initialData?: { descricao: string; finalidade: number };
    onSubmit: (data: { descricao: string; finalidade: number }) => Promise<void>;
    buttonText: string;
    title: string;
}

export default function Form({ initialData, onSubmit, buttonText, title }: PessoaFormProps) {
    const [formData, setFormData] = useState({ descricao: '', finalidade: 1 });
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState({ type: '', message: '' });

    // Sincroniza dados iniciais (importante para a edição)
    useEffect(() => {
        if (initialData) setFormData(initialData);
    }, [initialData]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        await onSubmit(formData);
        setLoading(false);
    };

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="bg-indigo-600 p-6 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-white/20 rounded-full text-white mb-3">
                <Icon path={mdiAccountPlus} size={1} />
            </div>
            <h2 className="text-xl font-bold text-white">
                {title}
            </h2>
            <p className="text-indigo-100 text-sm">Preencha os dados abaixo para adicionar uma categoria.</p>
            </div>

            <form onSubmit={handleSubmit} className="p-8">
            <div className="space-y-5">
                
                {/* Campo Nome */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Descrição</label>
                    <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                            <Icon path={mdiAccount} size={1} />
                        </span>
                        <input
                            type="text"
                            className="w-full text-black pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all placeholder:text-gray-400"
                            placeholder="Ex: Comida"
                            value={formData.descricao}
                            onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                            required
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Finalidade</label>
                    <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                            <Icon path={mdiNumeric} size={1}/>
                        </span>
                        <select
                            className="w-full text-black pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                            value={formData.finalidade}
                            onChange={(e) => setFormData({ ...formData, finalidade: parseInt(e.target.value) })}
                            required
                        >
                            <option value="1">Receita</option>
                            <option value="2">Despesa</option>
                            <option value="3">Ambas</option>
                        </select>
                    </div>
                </div>

                {status.message && (
                <div className={`p-3 rounded-lg text-sm text-center font-medium ${
                    status.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'
                }`}>
                    {status.message}
                </div>
                )}

                <button
                type="submit"
                disabled={loading}
                className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-md shadow-indigo-100"
                >
                {loading ? (
                    <>
                    {/* <Loader2 size={18} className="animate-spin" /> */}
                    Enviando...
                    </>
                ) : (
                    typeof initialData === 'undefined' ? 'Confirmar Cadastro' : 'Editar Cadastro'
                )}
                </button>
            </div>
            </form>
        </div>
    );
}