const API_BASE_URL = 'http://localhost:5000'

class ApiService {
  async fetchData(endpoint) {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      return await response.json()
    } catch (error) {
      console.error(`Error fetching ${endpoint}:`, error)
      throw error
    }
  }

  // Regiões
  async getRegioes() {
    return this.fetchData('/regioes')
  }

  // Estados (UFs)
  async getEstados(regiaoId) {
    let endpoint = '/ufs'
    if (regiaoId && regiaoId !== 'todas') {
      endpoint += `?regiao_id=${regiaoId}`
    }
    return this.fetchData(endpoint)
  }

  // Mesorregiões
  async getMesorregioes() {
    return this.fetchData('/mesorregioes')
  }

  // Microrregiões
  async getMicrorregioes() {
    return this.fetchData('/microrregioes')
  }

  // Municípios
  async getMunicipios() {
    return this.fetchData('/municipios')
  }

  // Estatísticas por UF
  async getEstatisticasUf(ufId, ano) {
    return this.fetchData(`/ufs/${ufId}/${ano}/estatisticas`)
  }

  // Estatísticas de todos os municípios de um estado em um ano
  async getEstatisticasMunicipiosPorEstado(ufId, ano) {
    return this.fetchData(`/ufs/${ufId}/${ano}/municipios/estatisticas`)
  }

  // Filtrar municípios por UF
  async getMunicipiosByUf(ufId) {
    const municipios = await this.getMunicipios()
    return municipios.filter(municipio => municipio.cod_uf === ufId)
  }

  // Calcular totais por tipo de registro
  calculateTotals(estatisticas, tipoRegistro, ano = null) {
    if (!estatisticas || estatisticas.length === 0) return 0
    
    let filteredStats = estatisticas
    if (ano) {
      filteredStats = estatisticas.filter(stat => stat.ano === ano)
    }

    return filteredStats.reduce((total, stat) => {
      switch (tipoRegistro) {
        case 'nascimentos':
          return total + (stat.total_nascimento || 0)
        case 'obitos':
          return total + (stat.total_morte || 0)
        case 'casamentos':
          return total + (stat.total_casamento || 0)
        case 'todos':
          return total + (stat.total_nascimento || 0) + (stat.total_morte || 0) + (stat.total_casamento || 0)
        default:
          return total
      }
    }, 0)
  }
}

export default new ApiService()


