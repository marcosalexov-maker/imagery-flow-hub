# Portfolio em slider + galeria de produções por projeto

## O que muda

**Na página inicial**, a seção "Portfolio" deixa de ser uma grade de cards e passa a ser um slider no mesmo estilo visual do "Our Process": um slide 16:9 por vez, imagem em destaque, overlay escuro em gradiente, texto sobreposto (categoria, título, descrição curta), setas laterais, dots de navegação e auto-play com pausa ao passar o mouse. Cada slide é um projeto e leva para a página do projeto.

**Na página do projeto**, cada projeto passa a ter uma galeria de produções ilimitada: fotos e vídeos, cada um com título, legenda e ordem de exibição. Vídeos tocam no próprio site (player nativo, com miniatura de capa). Fotos abrem em tela cheia ao clicar.

## Backend

Nova tabela `portfolio_media` no banco:

- `project_id` (ligada ao projeto, apaga junto se o projeto for removido)
- `media_type` — `image` ou `video`
- `url` — endereço da foto ou vídeo
- `poster_url` — capa opcional do vídeo
- `title`, `caption` — textos opcionais
- `sort_order` — ordem de exibição
- Leitura pública; escrita apenas para admin (mesmo padrão das outras tabelas do CMS)
- GRANTs: `SELECT` para `anon` e `authenticated`, `ALL` para `service_role`

As 4 imagens já existentes (`preview_image_1..4`) continuam funcionando: a primeira vira a capa do slide na home, e as demais são exibidas como fallback caso o projeto ainda não tenha mídias na nova tabela.

## Frontend

- `src/components/portfolio/PortfolioSlider.tsx` — novo componente, copiando a mecânica e o visual do `ProcessSlider` (framer-motion, variantes de slide, parallax leve, setas, dots), mas alimentado pelos projetos vindos do banco. Máximo de 6 projetos no slider, com link "View All".
- `src/pages/Index.tsx` — substitui a grade `StaggerContainer` de `PortfolioCard` pelo `<PortfolioSlider />`, mantendo o cabeçalho "Selected Work / Portfolio".
- `src/hooks/usePortfolio.ts` — novo hook `usePortfolioMedia(projectId)` para buscar as mídias ordenadas.
- `src/pages/PortfolioDetail.tsx` — a galeria passa a renderizar as mídias da nova tabela: imagens em grade responsiva com lightbox, vídeos em card 16:9 com player e poster, títulos/legendas abaixo. Se não houver mídias cadastradas, mantém a grade atual das `preview_image_*`.
- `PortfolioCard` continua sendo usado na página `/portfolio` (grade completa), sem alteração.

## Como você adiciona conteúdo

Pelo painel do backend, em `portfolio_media`: cria uma linha por foto/vídeo, escolhendo o projeto, o tipo e a URL. Para vídeos hospedados no próprio site, eu posso subir os arquivos e te passar as URLs.
