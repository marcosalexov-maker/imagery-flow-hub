# Projeto 100% local para GitHub / IDE

Sim, é possível. Hoje o site depende de duas coisas externas: as imagens/vídeos hospedados no CDN da Lovable e o conteúdo dos projetos que vem do banco (Lovable Cloud). O plano abaixo remove as duas dependências e deixa o repositório rodando com apenas `npm install` + `npm run dev`.

## O que muda

1. **Mídias locais**
   - Baixar do CDN os 9 JPGs do projeto Roma e os 2 vídeos do hero (`v1.mp4`, `v2.mp4`) e gravá-los como arquivos reais em `src/assets/`.
   - Remover os arquivos ponteiro `.asset.json` e trocar as importações para importar o arquivo direto (`import v1 from "@/assets/v1.mp4"`).
   - Nenhuma URL `/__l5e/...` sobra no código.

2. **Conteúdo congelado em arquivo local**
   - Criar `src/data/portfolio.ts` com o projeto "Roma - La Conquista" (título, slug, categoria, descrição, capa) e suas 11 mídias (9 fotos locais + os 2 embeds do YouTube), na mesma forma que o banco retorna hoje.
   - Reescrever os hooks `usePortfolio` para ler desse arquivo em vez do banco — as páginas Home, Portfolio e Projeto não mudam visualmente.
   - Blog, depoimentos e configurações do site estão vazios no banco; suas páginas passam a usar listas locais vazias (mesmo estado de "sem conteúdo" de hoje).

3. **Formulário de contato**
   - Hoje ele envia por uma função de servidor da Lovable, que não existe fora daqui. Em modo local o formulário passa a abrir o cliente de e-mail (`mailto:`) com os dados preenchidos, mantendo o mesmo visual.

4. **Limpeza e documentação**
   - Remover o cliente e os tipos gerados do backend do fluxo do app (tipos das mídias passam a ser definidos em `src/data`).
   - Atualizar o `README.md` com instruções: clonar, `npm install`, `npm run dev`, e onde editar textos/imagens (`src/data/portfolio.ts` e `src/assets/`).
   - Sem `.env` obrigatório para rodar.

## Observações

- Os dois vídeos do projeto Roma continuam como embed do YouTube (sua escolha) — é o único carregamento externo restante, e o resto do site funciona offline.
- Depois disso o conteúdo é editado no código, não mais por painel. Se um dia quiser voltar ao CMS, dá para reverter esta alteração pelo histórico.
- Peso estimado do repositório: ~10 MB (7 MB dos dois vídeos do hero).

## Detalhes técnicos

- Download via `curl` das URLs de CDN para `src/assets/` e `src/assets/roma/`, seguido de `lovable-assets delete` não será usado (os ponteiros só são removidos do repositório, os originais no CDN permanecem intactos para o preview publicado).
- `src/hooks/usePortfolio.ts`: mesmas assinaturas (`usePortfolioList`, `usePortfolioItem`, `usePortfolioMedia`) usando `useQuery` com dados locais, para não tocar nos componentes.
- Tipos `Tables<"portfolio">` / `Tables<"portfolio_media">` substituídos por interfaces `PortfolioProject` / `PortfolioMedia` em `src/data/types.ts`, com os mesmos campos usados hoje.
- Após a exportação para o GitHub, o projeto roda com Node 18+ e Vite, sem variáveis de ambiente.
