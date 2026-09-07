# Hero: 1 vídeo + 3 imagens com movimento suave

## Sequência definida

1. Vídeo de capa (enviado agora)
2. Auto retrato
3. Uruguai
4. Foto PB

O slider inicia sempre pelo vídeo e segue nessa ordem, em ciclo.

## Comportamento

- Vídeo de fundo: sem som, sem controles, avança automaticamente ao terminar.
- Imagens: permanecem alguns segundos cada, com movimento cinematográfico discreto (zoom lento e leve deslocamento, alternando o sentido para não parecer repetitivo).
- Transição em fade suave entre todos os itens, sem cortes bruscos.
- Sobreposição escura mantida para o título, subtítulo e botão continuarem legíveis.
- Indicadores discretos na base para navegação manual.

## Desempenho e acessibilidade

- Imagens otimizadas para web, mantendo o enquadramento vertical atual do hero.
- Vídeo com carregamento controlado e imagem de capa enquanto ele não estiver pronto.
- Em dispositivos com redução de movimento ativada: apenas o primeiro item, sem zoom nem reprodução automática.
- Mídia fora de exibição fica pausada.

## Conteúdo

- Os quatro arquivos enviados passam a ser as mídias oficiais do hero.
- Os vídeos antigos deixam de aparecer no hero (não serão excluídos do projeto).

## Detalhes técnicos

- Ajuste restrito ao componente do slider do hero e à sua lista de mídias.
- Arquivos enviados publicados como assets do projeto, sem pesar o repositório.
- Framer Motion para fade, zoom e deslocamento.
- Nenhuma alteração em textos, header, portfólio, banco de dados ou outras páginas.
- Verificação da sequência e do enquadramento em desktop e celular.
