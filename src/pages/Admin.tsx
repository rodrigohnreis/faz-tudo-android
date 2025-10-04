import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings, Users, DollarSign, Save, Trash2, Shield } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface UserProfile {
  id: string;
  email: string;
  full_name: string | null;
  plan: string;
  plan_expires_at: string | null;
  created_at: string;
}

export const Admin = () => {
  const { isAdmin } = useAuth();
  const { toast } = useToast();
  
  // Payment Settings
  const [basicPrice, setBasicPrice] = useState("9.99");
  const [premiumPrice, setPremiumPrice] = useState("19.99");
  const [vipPrice, setVipPrice] = useState("49.99");
  const [mercadoPagoToken, setMercadoPagoToken] = useState("");
  
  // User Management
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isAdmin) {
      fetchUsers();
    }
  }, [isAdmin]);

  const fetchUsers = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setUsers(data || []);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar os usuários.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSavePrices = () => {
    localStorage.setItem('prices', JSON.stringify({
      basic: basicPrice,
      premium: premiumPrice,
      vip: vipPrice,
    }));
    
    toast({
      title: "Sucesso",
      description: "Preços atualizados com sucesso!",
    });
  };

  const handleSavePaymentConfig = () => {
    if (mercadoPagoToken) {
      localStorage.setItem('mercadoPagoToken', mercadoPagoToken);
      toast({
        title: "Sucesso",
        description: "Configuração do Mercado Pago salva!",
      });
    }
  };

  const handleUpdateUserPlan = async (userId: string, newPlan: 'basico' | 'premium' | 'vip') => {
    try {
      const expiresAt = new Date();
      expiresAt.setMonth(expiresAt.getMonth() + 1);

      const { error } = await supabase
        .from('profiles')
        .update({ 
          plan: newPlan,
          plan_expires_at: expiresAt.toISOString()
        })
        .eq('id', userId);

      if (error) throw error;

      toast({
        title: "Sucesso",
        description: "Plano do usuário atualizado!",
      });

      fetchUsers();
    } catch (error) {
      console.error('Error updating user:', error);
      toast({
        title: "Erro",
        description: "Não foi possível atualizar o usuário.",
        variant: "destructive",
      });
    }
  };

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Card className="p-6">
          <div className="flex items-center gap-3 text-destructive">
            <Shield className="w-6 h-6" />
            <div>
              <h2 className="text-xl font-bold">Acesso Negado</h2>
              <p className="text-sm text-muted-foreground">
                Você não tem permissão para acessar esta página.
              </p>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="bg-gradient-primary p-6 pb-8">
        <div className="flex items-center gap-3">
          <Settings className="w-6 h-6 text-white" />
          <div>
            <h1 className="text-2xl font-bold text-white">Painel Admin</h1>
            <p className="text-white/80 text-sm">Gerencie configurações e usuários</p>
          </div>
        </div>
      </div>

      <div className="p-4">
        <Tabs defaultValue="payments" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="payments">
              <DollarSign className="w-4 h-4 mr-2" />
              Pagamentos
            </TabsTrigger>
            <TabsTrigger value="users">
              <Users className="w-4 h-4 mr-2" />
              Usuários
            </TabsTrigger>
          </TabsList>

          <TabsContent value="payments" className="space-y-4">
            {/* Price Configuration */}
            <Card className="p-4">
              <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <DollarSign className="w-5 h-5" />
                Configurar Preços dos Planos
              </h3>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="basic">Plano Básico (R$)</Label>
                  <Input
                    id="basic"
                    type="number"
                    step="0.01"
                    value={basicPrice}
                    onChange={(e) => setBasicPrice(e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="premium">Plano Premium (R$)</Label>
                  <Input
                    id="premium"
                    type="number"
                    step="0.01"
                    value={premiumPrice}
                    onChange={(e) => setPremiumPrice(e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="vip">Plano VIP Diamond (R$)</Label>
                  <Input
                    id="vip"
                    type="number"
                    step="0.01"
                    value={vipPrice}
                    onChange={(e) => setVipPrice(e.target.value)}
                  />
                </div>

                <Button onClick={handleSavePrices} className="w-full">
                  <Save className="w-4 h-4 mr-2" />
                  Salvar Preços
                </Button>
              </div>
            </Card>

            {/* Mercado Pago Config */}
            <Card className="p-4">
              <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Configurar API Mercado Pago
              </h3>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="mpToken">Access Token</Label>
                  <Input
                    id="mpToken"
                    type="password"
                    placeholder="APP_USR-..."
                    value={mercadoPagoToken}
                    onChange={(e) => setMercadoPagoToken(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Token de acesso do Mercado Pago para processar pagamentos PIX
                  </p>
                </div>

                <Button onClick={handleSavePaymentConfig} className="w-full">
                  <Save className="w-4 h-4 mr-2" />
                  Salvar Configuração
                </Button>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="users" className="space-y-4">
            <Card className="p-4">
              <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <Users className="w-5 h-5" />
                Gerenciar Usuários
              </h3>

              {loading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nome</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Plano</TableHead>
                        <TableHead>Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {users.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell className="font-medium">
                            {user.full_name || 'N/A'}
                          </TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>
                            <Badge variant={
                              user.plan === 'vip' ? 'default' :
                              user.plan === 'premium' ? 'secondary' :
                              'outline'
                            }>
                              {user.plan}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Select
                              value={user.plan}
                              onValueChange={(value) => handleUpdateUserPlan(user.id, value as 'basico' | 'premium' | 'vip')}
                            >
                              <SelectTrigger className="w-32">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="basico">Básico</SelectItem>
                                <SelectItem value="premium">Premium</SelectItem>
                                <SelectItem value="vip">VIP</SelectItem>
                              </SelectContent>
                            </Select>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
