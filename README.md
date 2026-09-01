# Marcos Alex — Portfolio

Site de portfólio (filmmaker & photographer) em React + Vite + TypeScript + Tailwind.
Todo o conteúdo e todas as mídias ficam no próprio repositório — não é preciso banco de
dados, variáveis de ambiente ou serviços externos para rodar.

## Rodando localmente

Requisitos: Node.js 18+ e npm.

```sh
git clone <url-do-repositorio>
cd <pasta-do-repositorio>
npm install
npm run dev
```

O site abre em `http://localhost:8080`.

Build de produção:

```sh
npm run build
npm run preview
```

## Onde editar o conteúdo

| O quê | Arquivo |
| --- | --- |
| Projetos do portfólio e suas mídias | `src/data/portfolio.ts` |
| Blog, depoimentos, e-mail de contato | `src/data/content.ts` |
| Vídeos/imagens do slider da home | `src/components/HeroSlider.tsx` |
| Imagens e vídeos (arquivos) | `src/assets/` |

Para adicionar uma foto a um projeto: coloque o arquivo em `src/assets/`, importe-o em
`src/data/portfolio.ts` e adicione uma entrada em `portfolioMedia`.

Os dois vídeos do projeto "Roma - La Conquista" são embeds do YouTube — é o único
conteúdo carregado de fora do repositório.

## Contato

O formulário de contato abre o cliente de e-mail do visitante (`mailto:`) usando o
endereço definido em `contactEmail` (`src/data/content.ts`).
