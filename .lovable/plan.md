# Ajustes da página inicial: fundo preto no Portfolio, padronização de espaçamentos e remoção de seções

## Objetivo
Deixar a home mais enxuta, com destaque para portfolio e about, padronizando espaçamentos e removendo seções que não fazem parte do foco atual do site.

## 1. Portfolio com fundo preto e textos legíveis
- Em `src/pages/Index.tsx`, aplicar `bg-black text-white` na seção do Portfolio.
- Ajustar cores do cabeçalho da seção: rótulo "Selected Work", título "Portfolio" e link "View All" para tons de branco/cinza claro que contrastem com o preto.
- Manter os cards do carrossel como estão (já possuem overlay escuro e texto branco).

## 2. Padronização de espaçamentos na home
- Reduzir o espaço entre o fim da seção Portfolio e o início da seção About (ícone do raio).
- Aplicar padding vertical consistente e menor nas seções restantes (Hero, Portfolio, About), reduzindo gaps entre títulos e conteúdos.
- Ajustar margens inferiores dos cabeçalhos de seção (`mb-12`, `mb-16`, etc.) para valores menores e uniformes.

## 3. Remoção de seções
Remover da `src/pages/Index.tsx` as seguintes seções/componentes:
- Our Process (`<ProcessSlider />`)
- Insights & Stories (Blog)
- What Our Clients Say (Testimonials)
- Schedule a Call (Booking)
- FAQ
- Our Team
- Let's Talk (CTA final)

A home ficará com: Hero → Portfolio → About.

## 4. Verificação visual
- Confirmar que o carrossel de projetos continua funcionando (scroll, setas, placeholder).
- Verificar contraste dos textos no Portfolio sobre fundo preto.
- Validar que a navegação do menu e o layout não quebraram com a remoção das seções.

## Arquivos envolvidos
- `src/pages/Index.tsx`
