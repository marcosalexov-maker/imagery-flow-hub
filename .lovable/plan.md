# Slider de fundo no Hero (até 4 imagens ou vídeos)

Hoje o hero da página inicial usa uma imagem fixa (`hero-bg.jpg`) como fundo, com o texto, botão e selo por cima. A mudança troca essa imagem fixa por um **slider de fundo em tela cheia** com até 4 itens, que podem ser imagens ou vídeos.

## Como vai funcionar

- Novo componente `HeroSlider` renderizado atrás do conteúdo do hero, ocupando toda a tela (mesmo enquadramento atual, `object-cover`).
- Aceita **até 4 itens**; cada item é imagem (`.jpg/.png/.webp`) ou vídeo (`.mp4/.webm`).
- Transição suave de fade entre os itens (sem "pulo"), com leve zoom lento, no mesmo espírito minimalista do site.
- Troca automática:
  - imagem: 6 segundos
  - vídeo: avança quando o vídeo termina (com limite máximo de segurança)
- Vídeos rodam mudos, em `loop` opcional, `playsInline`, com `poster` opcional — sem áudio e sem controles, já que é fundo.
- Overlay escuro atual (gradiente preto) permanece, garantindo leitura do texto branco.
- Indicadores discretos (pontinhos) na base do hero para trocar manualmente. Sem setas, para não competir com o CTA.
- Respeita `prefers-reduced-motion`: sem autoplay/zoom, exibe só o primeiro item.
- Se houver apenas 1 item, o slider se comporta como imagem/vídeo estático (sem pontinhos).

## Como você troca o conteúdo

No topo do arquivo do slider haverá um bloco comentado bem visível, por exemplo:

```text
HERO_SLIDES = [
  { type: "image", src: heroBg,          alt: "..." },
  { type: "video", src: video1, poster: capa1 },
  ...até 4 itens
]
```

Basta colocar o arquivo em `src/assets/` (ou usar uma URL) e ajustar a lista. Itens além do 4º são ignorados.

## Detalhes técnicos

- Novo arquivo: `src/components/HeroSlider.tsx`.
- `src/pages/Index.tsx`: a `div` de background com `backgroundImage` é substituída por `<HeroSlider />`; overlay e conteúdo ficam iguais.
- Fade com Framer Motion (`AnimatePresence`), refs de `<video>` para play/pause conforme o slide ativo.
- Vídeos grandes: importar de `src/assets` engorda o bundle. Recomendo hospedar arquivos acima de ~5 MB e usar a URL — posso configurar isso quando você enviar os vídeos.
- Nenhuma mudança de backend, rotas ou tokens de design.

## Observação

Começo com o `hero-bg.jpg` atual como primeiro slide e placeholders comentados para os outros três, prontos para você preencher com seus vídeos/imagens.
