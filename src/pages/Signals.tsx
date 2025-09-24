import { useSimulation } from "@/hooks/useSimulation";
import { SignalCard } from "@/components/signal-card";
import { Button } from "@/components/ui/button";
import { RefreshCw, TrendingUp, Filter } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Signal } from "@/types";

export const Signals = () => {
  const { houses, games, signals, isLoading, refreshData, getActiveSignals } = useSimulation();
  const activeSignals = getActiveSignals();
  const [filter, setFilter] = useState<Signal['type'] | 'all'>('all');

  const filteredSignals = filter === 'all' 
    ? activeSignals 
    : activeSignals.filter(signal => signal.type === filter);

  const filterOptions = [
    { value: 'all', label: 'Todos', icon: '🔄' },
    { value: 'golden_moment', label: 'Momento Ouro', icon: '⭐' },
    { value: 'bonus_sequence', label: 'Sequência Bônus', icon: '🎁' },
    { value: 'victory_pattern', label: 'Padrão Vitória', icon: '🏆' },
  ] as const;

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="bg-gradient-primary p-6 pb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white">Sinais</h1>
            <p className="text-white/80 text-sm">Acompanhe todos os sinais</p>
          </div>
          <Button
            variant="secondary"
            size="sm"
            onClick={refreshData}
            disabled={isLoading}
            className="bg-white/20 text-white border-none hover:bg-white/30"
          >
            <RefreshCw className={cn("w-4 h-4", isLoading && "animate-spin")} />
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm text-center">
            <div className="text-lg font-bold text-white">{activeSignals.length}</div>
            <div className="text-white/80 text-xs">Ativos</div>
          </div>
          
          <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm text-center">
            <div className="text-lg font-bold text-white">{signals.length}</div>
            <div className="text-white/80 text-xs">Total</div>
          </div>
          
          <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm text-center">
            <div className="text-lg font-bold text-white">
              {activeSignals.length > 0 
                ? Math.round(activeSignals.reduce((acc, s) => acc + s.probability, 0) / activeSignals.length)
                : 0}%
            </div>
            <div className="text-white/80 text-xs">Média</div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Filters */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Filter className="w-5 h-5 text-foreground" />
            <h2 className="text-lg font-semibold text-foreground">Filtros</h2>
          </div>
          
          <div className="flex gap-2 overflow-x-auto pb-2">
            {filterOptions.map((option) => (
              <Button
                key={option.value}
                variant={filter === option.value ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter(option.value)}
                className={cn(
                  "flex items-center gap-2 whitespace-nowrap",
                  filter === option.value && "bg-primary text-primary-foreground"
                )}
              >
                <span>{option.icon}</span>
                <span>{option.label}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Signals List */}
        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-card rounded-lg p-4 animate-pulse">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-muted rounded-full"></div>
                  <div className="space-y-2">
                    <div className="w-24 h-4 bg-muted rounded"></div>
                    <div className="w-32 h-3 bg-muted rounded"></div>
                  </div>
                </div>
                <div className="w-full h-4 bg-muted rounded mb-3"></div>
                <div className="flex justify-between">
                  <div className="w-16 h-4 bg-muted rounded"></div>
                  <div className="w-12 h-4 bg-muted rounded"></div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredSignals.length > 0 ? (
          <div className="space-y-4">
            {filteredSignals.map((signal) => {
              const game = games.find(g => g.id === signal.gameId);
              const house = houses.find(h => h.id === signal.houseId);
              
              if (!game || !house) return null;
              
              return (
                <SignalCard
                  key={signal.id}
                  signal={signal}
                  game={game}
                  house={house}
                />
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📡</div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              {filter === 'all' ? 'Nenhum sinal ativo' : 'Nenhum sinal encontrado'}
            </h3>
            <p className="text-muted-foreground mb-6">
              {filter === 'all' 
                ? 'Aguarde, novos sinais serão gerados automaticamente'
                : 'Tente outro filtro ou aguarde novos sinais'
              }
            </p>
            <div className="space-y-3">
              <Button 
                variant="outline" 
                onClick={refreshData} 
                disabled={isLoading}
              >
                <RefreshCw className={cn("w-4 h-4 mr-2", isLoading && "animate-spin")} />
                Verificar Novos Sinais
              </Button>
              
              {filter !== 'all' && (
                <div>
                  <Button 
                    variant="ghost" 
                    onClick={() => setFilter('all')}
                    className="text-sm"
                  >
                    Ver todos os sinais
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Signal Types Legend */}
        {activeSignals.length > 0 && (
          <div className="mt-8 p-4 bg-card rounded-lg border border-border">
            <h3 className="font-semibold text-card-foreground mb-3 flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Tipos de Sinais
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-3">
                <span className="text-warning">⭐</span>
                <span className="text-muted-foreground">
                  <strong className="text-warning">Momento Ouro:</strong> Alta probabilidade de ganho imediato
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-success">🎁</span>
                <span className="text-muted-foreground">
                  <strong className="text-success">Sequência Bônus:</strong> Múltiplas rodadas favoráveis
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-hot">🏆</span>
                <span className="text-muted-foreground">
                  <strong className="text-hot">Padrão Vitória:</strong> Sequência de resultados positivos
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};