import { useSimulation } from "@/hooks/useSimulation";
import { SignalCard } from "@/components/signal-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { RefreshCw, Crown, Star, Zap, TrendingUp, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Signal } from "@/types";

export const VipSignals = () => {
  const { houses, games, signals, isLoading, refreshData, getActiveSignals } = useSimulation();
  const activeSignals = getActiveSignals();
  const [filter, setFilter] = useState<Signal['type'] | 'all'>('all');

  // Filter only high probability signals for VIP
  const vipSignals = activeSignals.filter(signal => signal.probability >= 85);
  
  const filteredSignals = filter === 'all' 
    ? vipSignals 
    : vipSignals.filter(signal => signal.type === filter);

  const filterOptions = [
    { value: 'all', label: 'Todos VIP', icon: '👑' },
    { value: 'golden_moment', label: 'Golden', icon: '⭐' },
    { value: 'bonus_sequence', label: 'Bônus VIP', icon: '🎁' },
    { value: 'victory_pattern', label: 'Padrão Elite', icon: '🏆' },
  ] as const;

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* VIP Header */}
      <div className="bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 p-6 pb-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <Crown className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                Sinais VIP
                <Badge className="bg-white/20 text-white border-none">
                  PREMIUM
                </Badge>
              </h1>
              <p className="text-white/90 text-sm">Sinais exclusivos de alta precisão</p>
            </div>
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

        {/* VIP Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white/15 rounded-lg p-3 backdrop-blur-sm text-center border border-white/20">
            <div className="text-lg font-bold text-white">{vipSignals.length}</div>
            <div className="text-white/90 text-xs">VIP Ativos</div>
          </div>
          
          <div className="bg-white/15 rounded-lg p-3 backdrop-blur-sm text-center border border-white/20">
            <div className="text-lg font-bold text-white">
              {vipSignals.length > 0 
                ? Math.round(vipSignals.reduce((acc, s) => acc + s.probability, 0) / vipSignals.length)
                : 0}%
            </div>
            <div className="text-white/90 text-xs">Precisão</div>
          </div>
          
          <div className="bg-white/15 rounded-lg p-3 backdrop-blur-sm text-center border border-white/20">
            <div className="text-lg font-bold text-white">
              {vipSignals.filter(s => s.probability >= 90).length}
            </div>
            <div className="text-white/90 text-xs">Elite (90%+)</div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* VIP Benefits */}
        <Card className="mb-6 p-4 bg-gradient-to-r from-yellow-50 to-amber-50 border-yellow-200">
          <div className="flex items-center gap-3 mb-3">
            <Star className="w-5 h-5 text-yellow-600" />
            <h3 className="font-semibold text-yellow-800">Benefícios VIP</h3>
          </div>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="flex items-center gap-2 text-yellow-700">
              <Zap className="w-4 h-4" />
              <span>Sinais em tempo real</span>
            </div>
            <div className="flex items-center gap-2 text-yellow-700">
              <TrendingUp className="w-4 h-4" />
              <span>Precisão +85%</span>
            </div>
            <div className="flex items-center gap-2 text-yellow-700">
              <Crown className="w-4 h-4" />
              <span>Análise avançada</span>
            </div>
            <div className="flex items-center gap-2 text-yellow-700">
              <Star className="w-4 h-4" />
              <span>Suporte prioritário</span>
            </div>
          </div>
        </Card>

        {/* Filters */}
        <div className="mb-6">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {filterOptions.map((option) => (
              <Button
                key={option.value}
                variant={filter === option.value ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter(option.value)}
                className={cn(
                  "flex items-center gap-2 whitespace-nowrap",
                  filter === option.value && "bg-yellow-500 text-white hover:bg-yellow-600"
                )}
              >
                <span>{option.icon}</span>
                <span>{option.label}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* VIP Signals List */}
        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-card rounded-lg p-4 animate-pulse border border-yellow-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-yellow-200 rounded-full"></div>
                  <div className="space-y-2">
                    <div className="w-24 h-4 bg-yellow-200 rounded"></div>
                    <div className="w-32 h-3 bg-yellow-200 rounded"></div>
                  </div>
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
                <div key={signal.id} className="relative">
                  <div className="absolute -top-2 -right-2 z-10">
                    <Badge className="bg-yellow-500 text-white border-none">
                      <Crown className="w-3 h-3 mr-1" />
                      VIP
                    </Badge>
                  </div>
                  <SignalCard
                    signal={signal}
                    game={game}
                    house={house}
                  />
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-yellow-600" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              {filter === 'all' ? 'Nenhum sinal VIP ativo' : 'Nenhum sinal VIP encontrado'}
            </h3>
            <p className="text-muted-foreground mb-6">
              {filter === 'all' 
                ? 'Aguarde, sinais VIP de alta precisão serão gerados'
                : 'Tente outro filtro ou aguarde novos sinais VIP'
              }
            </p>
            <div className="space-y-3">
              <Button 
                variant="outline" 
                onClick={refreshData} 
                disabled={isLoading}
                className="border-yellow-300 text-yellow-700 hover:bg-yellow-50"
              >
                <RefreshCw className={cn("w-4 h-4 mr-2", isLoading && "animate-spin")} />
                Verificar Sinais VIP
              </Button>
              
              {filter !== 'all' && (
                <div>
                  <Button 
                    variant="ghost" 
                    onClick={() => setFilter('all')}
                    className="text-sm text-yellow-700 hover:bg-yellow-50"
                  >
                    Ver todos os sinais VIP
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* VIP Legend */}
        {vipSignals.length > 0 && (
          <div className="mt-8 p-4 bg-gradient-to-r from-yellow-50 to-amber-50 rounded-lg border border-yellow-200">
            <h3 className="font-semibold text-yellow-800 mb-3 flex items-center gap-2">
              <Crown className="w-4 h-4" />
              Sinais VIP - Precisão Elite
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-3">
                <span className="text-yellow-600">👑</span>
                <span className="text-yellow-700">
                  <strong>Sinais VIP:</strong> Apenas sinais com precisão ≥ 85%
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-yellow-600">⭐</span>
                <span className="text-yellow-700">
                  <strong>Elite:</strong> Sinais premium com precisão ≥ 90%
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};