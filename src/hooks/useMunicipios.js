import { useState, useEffect, useCallback } from 'react'
import apiService from '../services/api'

export const useMunicipios = (estadoSelecionado, ano) => {
  const [municipios, setMunicipios] = useState([])
  const [estatisticasMunicipios, setEstatisticasMunicipios] = useState([])
  const [loading, setLoading] = useState(false)

  const loadMunicipios = useCallback(async (estadoId, anoSelecionado) => {
    if (!estadoId) {
      setMunicipios([])
      setEstatisticasMunicipios([])
      return
    }

    try {
      setLoading(true)
      // Busca municípios do estado (usando seu método já existente que filtra no frontend)
      const municipiosData = await apiService.getMunicipiosByUf(estadoId)
      setMunicipios(municipiosData)

      // Busca todas as estatísticas de municípios do estado num único endpoint
      const estatisticas = await apiService.getEstatisticasMunicipiosPorEstado(estadoId, anoSelecionado)
      setEstatisticasMunicipios(estatisticas)
    } catch (error) {
      console.error('Erro ao carregar municípios ou estatísticas:', error)
      setMunicipios([])
      setEstatisticasMunicipios([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadMunicipios(estadoSelecionado, ano)
  }, [estadoSelecionado, ano, loadMunicipios])

  // Calcula o total baseado no array geral de estatísticas
  const getTotalByMunicipio = useCallback((municipioId, tipoRegistro, anoFiltro) => {
    if (!estatisticasMunicipios.length) return 0

    const estatisticasDoMunicipio = estatisticasMunicipios.filter(
      stat => stat.cod_municipio === municipioId && (!anoFiltro || stat.ano === anoFiltro)
    )

    return estatisticasDoMunicipio.reduce((total, stat) => {
      switch (tipoRegistro) {
        case 'nascimentos':
          return total + (stat.total_nascimento || 0)
        case 'obitos':
          return total + (stat.total_morte || 0)
        case 'casamentos':
          return total + (stat.total_casamento || 0)
        case 'todos':
          return (
            total +
            (stat.total_nascimento || 0) +
            (stat.total_morte || 0) +
            (stat.total_casamento || 0)
          )
        default:
          return total
      }
    }, 0)
  }, [estatisticasMunicipios])

  return {
    municipios,
    estatisticasMunicipios,
    loading,
    getTotalByMunicipio
  }
}
