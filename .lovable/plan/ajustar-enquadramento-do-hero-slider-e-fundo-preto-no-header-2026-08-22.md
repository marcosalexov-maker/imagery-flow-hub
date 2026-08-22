# Ajustar enquadramento do Hero Slider e fundo preto no Header

## Objetivo
Deixar o slider de fundo do hero na página inicial com um enquadramento vertical mais estreito (menos altura que a tela cheia) e manter o header com o título do site e a aba "Menu" sobre fundo preto.

## Como vai funcionar

- O hero atual ocupa `h-screen` (100% da altura da viewport). Vamos reduzir essa altura para um formato mais vertical, por exemplo `h-[75vh]` ou `h-[80vh]`, com `min-h` para não ficar muito pequeno em telas baixas.
- O `HeroSlider` continua dentro da mesma posição absoluta do hero, preenchendo o novo container.
- O header, que hoje fica transparente na home (`bg-transparent` quando `isHomepage`), passa a ter fundo preto sólido (`bg-black`) na página inicial também.
- O texto do header (título e "Menu") permanece branco para contrastar com as imagens/vídeos do hero.
- A próxima seção ("Selected Work / Portfolio") sobe naturalmente para logo abaixo do hero encurtado, sem quebras.

## Arquivos envolvidos

- `src/pages/Index.tsx`: ajustar altura da `<section>` do hero.
- `src/components/layout/Header.tsx`: trocar `bg-transparent` por `bg-black` quando estiver na homepage.

## Observação
Não haverá mudança nos vídeos/imagem do slider nem na lógica de autoplay — apenas o enquadramento visual e o fundo do header.
