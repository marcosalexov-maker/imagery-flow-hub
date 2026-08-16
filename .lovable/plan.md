# Slider da página inicial com vídeos e/ou imagens

A página inicial já tem o slider "Our Process" (4 slides com imagens). A ideia é evoluí-lo para aceitar até 4 itens que podem ser **imagem ou vídeo**, mantendo o visual atual.

## O que muda

1. **Lista de slides configurável** no topo do componente do slider — cada item passa a ter:
   - `type`: `"image"` ou `"video"`
   - `src`: arquivo importado de `src/assets` (ou URL)
   - `poster` (opcional, só para vídeo): imagem exibida antes do vídeo carregar
   - `title`, `subtitle`, `description` (textos sobrepostos, como hoje)
   - Limite de 4 itens; se houver mais, apenas os 4 primeiros são exibidos.

2. **Renderização de vídeo**: quando `type: "video"`, o slide renderiza `<video>` com `muted`, `playsInline`, `loop`, `preload="metadata"` e `object-cover`, ocupando o mesmo espaço 16:9 das imagens.

3. **Reprodução inteligente**:
   - O vídeo do slide ativo dá play automaticamente; os demais ficam pausados e voltam ao início.
   - Autoplay do carrossel: em slides de imagem continua trocando a cada 5s; em slides de vídeo o slider aguarda o fim do vídeo (ou um tempo máximo) antes de avançar.
   - Pausa ao passar o mouse continua funcionando.
   - Respeita `prefers-reduced-motion` (sem autoplay de vídeo nesse caso).

4. **Setas, dots, textos e botão "Learn More"** permanecem idênticos e funcionam igual para imagem e vídeo.

## Como você troca o conteúdo depois

No começo do arquivo do slider haverá um bloco comentado bem visível com os 4 itens; basta:
- Colocar o arquivo em `src/assets/` (imagem `.jpg/.png` ou vídeo `.mp4`)
- Importar e ajustar `type` / `src` / textos do item.

## Detalhes técnicos

- Arquivo: `src/components/ProcessSlider.tsx` (único arquivo alterado).
- `useRef` com array de refs para os elementos `<video>`, controlando play/pause no efeito de mudança de slide.
- Sem mudanças de backend, rotas ou design tokens.

## Observação

Vídeos importados de `src/assets` entram no bundle. Para arquivos grandes (>5-10 MB), o ideal é hospedar o vídeo (ex.: em storage do backend) e usar a URL — posso configurar isso se preferir.
