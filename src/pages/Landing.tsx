import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  Zap, 
  Shield, 
  Users, 
  Star, 
  Crown,
  CheckCircle,
  ArrowRight,
  Play,
  Clock,
  Target,
  Trophy
} from "lucide-react";

export const Landing = () => {
  const features = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Sinais em Tempo Real",
      description: "Receba alertas instantâneos dos melhores momentos para apostar"
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Análise Precisa",
      description: "Algoritmos avançados analisam múltiplas casas de apostas"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "100% Seguro",
      description: "Garantia de 7 dias e suporte 24/7 via WhatsApp"
    },
    {
      icon: <Trophy className="w-6 h-6" />,
      title: "Resultados Comprovados",
      description: "Mais de 10.000 usuários satisfeitos com nossos sinais"
    }
  ];

  const stats = [
    { number: "95%", label: "Taxa de Sucesso" },
    { number: "10k+", label: "Usuários Ativos" },
    { number: "24/7", label: "Suporte Online" },
    { number: "7 dias", label: "Garantia Total" }
  ];

  const testimonials = [
    {
      name: "João Silva",
      location: "São Paulo, SP",
      message: "Incríveis os sinais! Já recuperei o investimento na primeira semana.",
      rating: 5
    },
    {
      name: "Maria Santos", 
      location: "Rio de Janeiro, RJ",
      message: "O melhor app de sinais que já usei. Recomendo para todos!",
      rating: 5
    },
    {
      name: "Pedro Costa",
      location: "Belo Horizonte, MG", 
      message: "Suporte excelente e sinais precisos. Vale cada centavo!",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-card">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-primary-foreground" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                SinaisVIP
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/login">
                <Button variant="ghost" className="text-foreground hover:text-highlight">
                  Entrar
                </Button>
              </Link>
              <Link to="/register">
                <Button className="bg-gradient-primary hover:opacity-90 text-primary-foreground">
                  Cadastre-se Grátis
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <Badge className="bg-primary/10 text-primary px-6 py-2 text-sm">
            🔥 Mais de 10.000 usuários confiam em nós
          </Badge>
          
          <h1 className="text-5xl md:text-6xl font-bold text-foreground leading-tight">
            Sinais VIP para
            <br />
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Maximar seus Lucros
            </span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Receba sinais profissionais em tempo real, análise de múltiplas casas de apostas e 
            aumente suas chances de sucesso com nossa tecnologia avançada.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/register">
              <Button size="lg" className="bg-gradient-primary hover:opacity-90 text-primary-foreground font-semibold">
                Começar Agora
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link to="/plans">
              <Button size="lg" variant="outline" className="border-border text-foreground hover:bg-card">
                <Play className="w-5 h-5 mr-2" />
                Ver Planos
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center space-y-2">
              <div className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                {stat.number}
              </div>
              <div className="text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl font-bold text-foreground">
            Por que escolher o <span className="bg-gradient-primary bg-clip-text text-transparent">SinaisVIP</span>?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Tecnologia de ponta e anos de experiência para entregar os melhores resultados
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border-border shadow-card hover:shadow-elevated transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-6 text-center space-y-4">
                <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mx-auto text-primary-foreground">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-foreground">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl font-bold text-foreground">
            Planos que <span className="bg-gradient-primary bg-clip-text text-transparent">Cabem no seu Bolso</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Escolha o plano ideal para maximizar seus resultados
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Plano Básico */}
          <Card className="border-border shadow-card">
            <CardContent className="p-8 text-center space-y-6">
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-foreground">Básico</h3>
                <div className="text-4xl font-bold text-foreground">
                  R$ <span className="bg-gradient-primary bg-clip-text text-transparent">29,90</span>
                </div>
                <p className="text-muted-foreground">7 dias</p>
              </div>
              <ul className="space-y-3 text-left">
                {["Sinais básicos diários", "3 casas de apostas", "Suporte WhatsApp"].map((item, i) => (
                  <li key={i} className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-success" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
              <Button className="w-full bg-secondary hover:bg-secondary/80">
                Escolher Plano
              </Button>
            </CardContent>
          </Card>

          {/* Plano Premium */}
          <Card className="border-primary shadow-elevated relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <Badge className="bg-primary text-primary-foreground px-4 py-1">
                Mais Popular
              </Badge>
            </div>
            <CardContent className="p-8 text-center space-y-6">
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-foreground">Premium</h3>
                <div className="text-4xl font-bold text-foreground">
                  R$ <span className="bg-gradient-primary bg-clip-text text-transparent">79,90</span>
                </div>
                <p className="text-muted-foreground">30 dias</p>
              </div>
              <ul className="space-y-3 text-left">
                {["Sinais premium exclusivos", "Todas as casas", "Suporte 24/7", "Grupo VIP"].map((item, i) => (
                  <li key={i} className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-success" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
              <Button className="w-full bg-gradient-primary hover:opacity-90 text-primary-foreground">
                Escolher Plano
              </Button>
            </CardContent>
          </Card>

          {/* Plano VIP */}
          <Card className="border-warning shadow-elevated">
            <CardContent className="p-8 text-center space-y-6">
              <div className="space-y-2">
                <div className="flex items-center justify-center space-x-2">
                  <Crown className="w-6 h-6 text-warning" />
                  <h3 className="text-2xl font-bold text-foreground">VIP Diamond</h3>
                </div>
                <div className="text-4xl font-bold text-foreground">
                  R$ <span className="bg-gradient-primary bg-clip-text text-transparent">149,90</span>
                </div>
                <p className="text-muted-foreground">30 dias</p>
              </div>
              <ul className="space-y-3 text-left">
                {["Todos recursos Premium", "Calls ao vivo", "Suporte 1:1", "E-book grátis"].map((item, i) => (
                  <li key={i} className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-success" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
              <Button className="w-full bg-warning hover:bg-warning/80 text-warning-foreground">
                Escolher Plano
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-12">
          <Link to="/plans">
            <Button variant="outline" size="lg" className="border-border text-foreground hover:bg-card">
              Ver Todos os Planos
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Testimonials */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl font-bold text-foreground">
            O que nossos <span className="bg-gradient-primary bg-clip-text text-transparent">clientes dizem</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Mais de 10.000 usuários satisfeitos em todo o Brasil
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-border shadow-card">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center space-x-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-warning text-warning" />
                  ))}
                </div>
                <p className="text-muted-foreground italic">"{testimonial.message}"</p>
                <div>
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <Card className="border-border bg-gradient-primary/10 shadow-elevated">
          <CardContent className="p-12 text-center space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl font-bold text-foreground">
                Pronto para <span className="bg-gradient-primary bg-clip-text text-transparent">Aumentar seus Lucros</span>?
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Junte-se a milhares de usuários que já estão lucrando com nossos sinais profissionais
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/register">
                <Button size="lg" className="bg-gradient-primary hover:opacity-90 text-primary-foreground font-semibold">
                  Começar Agora - Grátis
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Clock className="w-5 h-5" />
                <span>Acesso imediato após cadastro</span>
              </div>
            </div>

            <div className="flex items-center justify-center space-x-8 pt-8 border-t border-border">
              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-success" />
                <span className="text-sm text-muted-foreground">Garantia 7 dias</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-success" />
                <span className="text-sm text-muted-foreground">+10k usuários</span>
              </div>
              <div className="flex items-center space-x-2">
                <Zap className="w-5 h-5 text-success" />
                <span className="text-sm text-muted-foreground">Suporte 24/7</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center space-x-2">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                SinaisVIP
              </span>
            </div>
            <p className="text-muted-foreground">
              © 2024 SinaisVIP. Todos os direitos reservados.
            </p>
            <div className="flex items-center justify-center space-x-6 text-sm text-muted-foreground">
              <Link to="/terms" className="hover:text-highlight">Termos de Uso</Link>
              <Link to="/privacy" className="hover:text-highlight">Privacidade</Link>
              <Link to="/contact" className="hover:text-highlight">Contato</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};