
import React from 'react'
import { Search } from 'lucide-react'

const FilterSection = ({ filters, onFiltersChange, onSearch, regioes, estados, loading }) => {
  const anos = Array.from({ length: 11 }, (_, i) => 2025 - i) // 2015 a 2025
  

  const handleFilterChange = (key, value) => {
    onFiltersChange({ ...filters, [key]: value })
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      {/* Tipo de Registro */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3 text-gray-800">Tipo de Registro</h3>
        <div className="flex flex-wrap gap-4">
          {[
            { value: 'todos', label: 'Todos os Registros' },
            { value: 'nascimentos', label: 'Nascimentos' },
            { value: 'obitos', label: 'Óbitos' },
            { value: 'casamentos', label: 'Casamentos' }
          ].map((tipo) => (
            <label key={tipo.value} className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="tipoRegistro"
                value={tipo.value}
                checked={filters.tipoRegistro === tipo.value}
                onChange={(e) => handleFilterChange('tipoRegistro', e.target.value)}
                className="mr-2 text-green-600 focus:ring-green-500"
              />
              <span className="text-gray-700">{tipo.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Filtros de Data e Localização */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* Ano */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Ano</label>
          <select
          id='anoSelect'
            value={filters.ano}
            onChange={(e) => handleFilterChange('ano', parseInt(e.target.value))}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
          >
            {anos.map(ano => (
              <option key={ano} value={ano}>{ano}</option>
            ))}
          </select>
        </div>

       

        {/* Região */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Região</label>
          <select
            value={filters.regiao}
            onChange={(e) => handleFilterChange('regiao', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
          >
            <option value="todas">Todas as Regiões</option>
            {regioes.map(regiao => (
              <option key={regiao.id} value={regiao.id}>{regiao.nome}</option>
            ))}
          </select>
        </div>

        {/* Estado */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Estado</label>
          <select
            value={filters.estado}
            onChange={(e) => handleFilterChange('estado', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
          >
            <option value="todos">Todos os Estados</option>
            {estados.map(estado => (
              <option key={estado.id} value={estado.id}>{estado.nome}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Botão de Pesquisa */}
      <div className="flex justify-end">
        <button
          onClick={onSearch}
          disabled={loading}
          className="flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <Search size={20} className="mr-2" />
          {loading ? 'Pesquisando...' : 'Pesquisar'}
        </button>
      </div>
    </div>
  )
}

export default FilterSection
