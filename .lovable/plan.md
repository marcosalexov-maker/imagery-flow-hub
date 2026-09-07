# Hero com imagens e um vídeo

## Proposta

- Manter o slider atual da página inicial, mas organizar a sequência com **até 3 imagens e 1 vídeo curto**.
- Aplicar às imagens um movimento cinematográfico discreto, alternando zoom lento e leve deslocamento para evitar repetição visual.
- Usar transição suave em fade entre todos os itens, sem mudanças bruscas no enquadramento.
- Preservar o fundo escuro sobre a mídia para manter o título, subtítulo e botão legíveis.
- O vídeo será reproduzido sem som, sem controles e diretamente no fundo; ao terminar, o slider avança para o próximo item.
- Manter os indicadores discretos para navegação manual.

## Desempenho e acessibilidade

- Carregar primeiro a imagem inicial para que o topo apareça rapidamente.
- Carregar o vídeo de forma controlada e usar uma imagem de capa enquanto ele ainda não estiver pronto.
- Pausar mídias que não estiverem visíveis.
- Em dispositivos com redução de movimento ativada, mostrar uma imagem estática sem zoom ou reprodução automática.
- Preservar o enquadramento vertical atual em telas grandes e pequenas.

## Conteúdo necessário

- Usar uma imagem atual como primeira mídia até serem fornecidas as imagens finais.
- Aproveitar apenas um dos vídeos já existentes no projeto; o outro deixa de aparecer no hero, mas não será excluído.
- As novas imagens poderão substituir os espaços da sequência quando forem enviadas.

## Detalhes técnicos

- Ajustar somente o componente do slider do hero e sua lista local de mídias.
- Manter Framer Motion para fade, zoom e deslocamento suave.
- Não alterar textos, header, portfólio, banco de dados ou outras páginas.
- Validar a sequência, as transições e o enquadramento em desktop e celular.
