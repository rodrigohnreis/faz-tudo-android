import { useSimulation } from "@/hooks/useSimulation";
import { BettingHouseCard } from "@/components/betting-house-card";
import { SignalCard } from "@/components/signal-card";
import { Button } from "@/components/ui/button";
import { RefreshCw, Flame, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

export const Dashboard = () => {
  const { houses, games, signals, isLoading, refreshData, getHotHouses, getActiveSignals } = useSimulation();
  const hotHouses = getHotHouses();
  const activeSignals = getActiveSignals();

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="bg-gradient-primary p-6 pb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white">SinaisVIP</h1>
            <p className="text-white/80 text-sm">Sinais em tempo real</p>
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

        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-2">
              <Flame className="w-5 h-5 text-hot" />
              <span className="text-white/80 text-sm">Casas Quentes</span>
            </div>
            <div className="text-2xl font-bold text-white">{hotHouses.length}</div>
          </div>
          
          <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-5 h-5 text-warning" />
              <span className="text-white/80 text-sm">Sinais Ativos</span>
            </div>
            <div className="text-2xl font-bold text-white">{activeSignals.length}</div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-6">
        {/* Hot Houses Section */}
        {hotHouses.length > 0 && (
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Flame className="w-5 h-5 text-hot" />
              <h2 className="text-xl font-semibold text-foreground">Casas Pagando Mais</h2>
            </div>
            <div className="space-y-3">
              {hotHouses.slice(0, 3).map((house) => (
                <BettingHouseCard key={house.id} house={house} />
              ))}
            </div>
          </section>
        )}

        {/* Active Signals Section */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Zap className="w-5 h-5 text-warning" />
            <h2 className="text-xl font-semibold text-foreground">Sinais Recentes</h2>
          </div>
          
          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
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
          ) : activeSignals.length > 0 ? (
            <div className="space-y-4">
              {activeSignals.map((signal) => {
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
            <div className="text-center py-8">
              <div className="text-4xl mb-4">🔍</div>
              <p className="text-muted-foreground">Nenhum sinal ativo no momento</p>
              <Button 
                variant="outline" 
                onClick={refreshData} 
                className="mt-4"
                disabled={isLoading}
              >
                <RefreshCw className={cn("w-4 h-4 mr-2", isLoading && "animate-spin")} />
                Atualizar Sinais
              </Button>
            </div>
          )}
        </section>

        {/* All Houses Section */}
        <section>
          <h2 className="text-xl font-semibold text-foreground mb-4">Todas as Casas</h2>
          <div className="space-y-3">
            {houses.map((house) => (
              <BettingHouseCard key={house.id} house={house} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};