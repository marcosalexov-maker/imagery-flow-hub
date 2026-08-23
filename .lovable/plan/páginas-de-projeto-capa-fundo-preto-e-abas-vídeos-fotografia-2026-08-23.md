# Páginas de projeto: capa, fundo preto e abas Vídeos / Fotografia

## O que muda

**1. Capa no topo**
Ao abrir um projeto, a imagem de capa aparece no topo em largura total, com uma sobreposição escura e o título do projeto (mais a categoria) por cima. Altura limitada — cerca de 55% da altura da tela no desktop (nunca a tela inteira), e mais baixa no mobile. O botão "Back to Portfolio" fica sobre a capa.

**2. Fundo preto**
A página de projeto passa a ter fundo preto com textos em branco (e textos secundários em cinza claro), independente do resto do site.

**3. Abas Vídeos / Fotografia**
Logo abaixo da descrição, duas abas separam as mídias:
- **Vídeos** — itens de vídeo e YouTube
- **Fotografia** — imagens

A troca é instantânea, sem recarregar a página, com transição de fade rápida (~0,25s) no conteúdo. A aba inicial é a que tiver conteúdo (Vídeos por padrão, se houver). Abas sem nenhum item não aparecem; se só houver um tipo de mídia, a barra de abas é ocultada.

Nada muda no conteúdo em si — as mesmas fotos (com descrição no hover) e vídeos continuam iguais, apenas agrupados.

## Detalhes técnicos

- `src/pages/PortfolioDetail.tsx`: nova seção de capa (`preview_image_1` como imagem, overlay em gradiente, altura `h-[55vh] max-h-[620px]`), wrapper com fundo preto/texto branco, e a seção de galeria substituída pelo bloco de abas.
- `src/components/portfolio/ProjectMediaGallery.tsx`: passa a receber uma prop de filtro (`kind: "video" | "photo"`) ou a lista já filtrada, mantendo a grade e o lightbox atuais.
- Novo estado local para a aba ativa + `AnimatePresence`/`motion.div` (framer-motion, já usado no projeto) com fade `opacity 0→1`, `duration 0.25`, `mode="wait"`.
- Classificação: `media_type === "video" | "youtube"` (ou URL do YouTube) → Vídeos; o restante → Fotografia.
- Cores via tokens semânticos, sem `text-white`/`bg-black` soltos: escopo escuro na página aplicando a classe `dark` no wrapper e usando `bg-background`/`text-foreground`.
- Skeletons de loading e estado "Project Not Found" ajustados ao fundo escuro.
