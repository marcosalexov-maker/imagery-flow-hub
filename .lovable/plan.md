# Ajustes de espaçamento e carrossel de projetos na home

## 1. Página do projeto — espaçamento título/descrição
Hoje a capa termina e a descrição começa com `pt-12 md:pt-16`. Reduzir para `pt-6 md:pt-8`, aproximando a descrição do título do projeto (que fica sobre a capa).

## 2. Vídeos — fonte um pouco menor
No bloco de vídeos (título ao lado do player):
- Título: de `text-2xl md:text-3xl` para `text-xl md:text-2xl`
- Descrição: de `text-base md:text-lg` para `text-sm md:text-base`

## 3. Home — menos espaço entre o hero e "Portfolio"
A seção de portfolio usa `py-24 md:py-32`. Passa a usar `pt-12 md:pt-16` mantendo o padding inferior atual.

## 4. Portfolio da home vira carrossel horizontal de cards menores
Substituir o slider atual (um slide 16:9 de largura total) por um carrossel horizontal:

- Cada projeto vira um card menor, com capa em proporção retrato/4:5, título, categoria e ano — no mesmo estilo visual atual (cantos arredondados, overlay escuro em gradiente, texto em branco sobre a imagem).
- Largura de card calibrada para mostrar **1,5 card** na tela: ~65% da largura do container no mobile e proporcional no desktop, com o próximo card cortado à direita.
- Navegação por arraste/scroll horizontal (snap) e setas laterais para avançar/voltar um card por vez.
- Clicar no card abre a página do projeto.

## 5. Placeholder do próximo projeto
Depois do último projeto real, um card "placeholder" com o mesmo tamanho e estilo: fundo neutro/escuro, borda tracejada sutil, rótulo "Coming Soon" e "Próximo projeto". Não é clicável.

## Detalhes técnicos
- Reescrever `src/components/portfolio/PortfolioSlider.tsx` como carrossel horizontal (scroll container com `snap-x`, `scroll-smooth`, botões de seta que fazem `scrollBy` da largura de um card). Remove-se o auto-play do slide único.
- Novo card interno no mesmo arquivo (ou pequeno componente `PortfolioCarouselCard`), reutilizando `preview_image_1`, `category` e `year`.
- Ajustes de classes em `src/pages/Index.tsx` (seção portfolio), `src/pages/PortfolioDetail.tsx` (padding da descrição) e `src/components/portfolio/ProjectMediaGallery.tsx` (tamanhos de fonte dos vídeos).
- Sem mudanças no banco de dados.
