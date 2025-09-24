# SinaisVIP - Aplicativo de Sinais Simulados

## 📱 Sobre o App

O **SinaisVIP** é um aplicativo Android de sinais simulados de apostas, desenvolvido com React, TypeScript e Capacitor. O app simula a experiência de plataformas de sinais de apostas com interface profissional e dados em tempo real.

### ✨ Funcionalidades

- **Dashboard em Tempo Real**: Visualize casas "quentes" e sinais ativos
- **Simulação Realística**: Lógica de flutuação de taxas de pagamento das casas
- **Tipos de Sinais**: Momento Ouro, Sequência Bônus e Padrão Vitória
- **Interface Profissional**: Design inspirado em apps reais com tema vermelho/escuro
- **Jogos Simulados**: Tigrinho, Coelhinho, Macaco e outros com multiplicadores
- **Atualização Automática**: Dados atualizados a cada 30 segundos

### 🎮 Jogos Disponíveis

- 🐅 **Tigrinho** - O clássico jogo do tigre
- 🐰 **Coelhinho da Sorte** - Pulos de sorte e fortuna  
- 🐵 **Macaco Milionário** - Travessuras que pagam
- 🦁 **Leão Dourado** - O rei dos ganhos
- 🐘 **Elefante da Sorte** - Memória de vitórias
- 🦜 **Papagaio Premiado** - Repete os ganhos

### 🏢 Casas de Apostas Simuladas

- 🎯 **Aposta Certa**
- ⚡ **Ganho Rápido** 
- 🍀 **Sorte Grande**
- 💎 **Mega Bet**
- 🏆 **Super Casa**

## 🚀 Como Gerar o APK Android

### Pré-requisitos

- Node.js instalado
- Android Studio instalado
- Git configurado

### Passos para Gerar APK

1. **Clone o projeto do GitHub:**
   ```bash
   git clone <URL_DO_SEU_REPOSITORIO>
   cd sinaisvip-app
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Adicione a plataforma Android:**
   ```bash
   npx cap add android
   ```

4. **Atualize as dependências nativas:**
   ```bash
   npx cap update android
   ```

5. **Compile o projeto:**
   ```bash
   npm run build
   ```

6. **Sincronize com o Capacitor:**
   ```bash
   npx cap sync
   ```

7. **Abra o projeto no Android Studio:**
   ```bash
   npx cap run android
   ```

8. **No Android Studio:**
   - Aguarde a sincronização do Gradle
   - Vá em `Build > Generate Signed Bundle / APK`
   - Selecione `APK` e siga as instruções
   - O APK será gerado na pasta `app/build/outputs/apk/`

### 📱 Testando no Dispositivo

Para testar diretamente no dispositivo físico:

```bash
npx cap run android --target=<DEVICE_ID>
```

Para listar dispositivos conectados:
```bash
adb devices
```

## 🛠️ Tecnologias Utilizadas

- **React 18** - Interface de usuário
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização
- **Shadcn/ui** - Componentes UI
- **Capacitor** - Framework para mobile
- **Vite** - Build tool
- **React Router** - Navegação

## 🎨 Design System

O app utiliza um design system baseado em:

- **Cores Principais**: Vermelho escuro (#8B0000) e Crimson (#DC143C)
- **Fundo**: Tema escuro (#1C1C1E)
- **Status HOT**: Coral vermelho (#FF6B6B)
- **Status FRIO**: Cinza (#6C757D)
- **Animações**: Transições suaves e micro-interações

## ⚠️ Importante

Este é um aplicativo de **simulação educacional**. Todos os sinais, casas de apostas e dados são **fictícios** e gerados algoritmicamente para fins de demonstração.

## 📞 Suporte

Para dúvidas sobre mobile development com Capacitor, consulte:
[Blog post sobre desenvolvimento mobile](https://lovable.dev/blogs/TODO)

---

**SinaisVIP** - Experiência realística de sinais simulados 📱✨