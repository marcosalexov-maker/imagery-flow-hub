import type { PortfolioProject, PortfolioMedia } from "./types";

// Imagens locais (src/assets/roma). Para trocar, substitua o arquivo ou o import.
import roma199 from "@/assets/roma/Roma-199.jpg";
import roma836 from "@/assets/roma/Roma-836.jpg";
import roma837 from "@/assets/roma/Roma-837.jpg";
import roma809 from "@/assets/roma/Roma-809.jpg";
import roma438 from "@/assets/roma/Roma-438.jpg";
import roma224 from "@/assets/roma/Roma-224.jpg";
import roma195 from "@/assets/roma/Roma-195.jpg";
import roma153 from "@/assets/roma/Roma-153.jpg";
import roma53 from "@/assets/roma/Roma-53.jpg";

const ROMA_ID = "roma-la-conquista";
const NOW = "2026-08-22T23:56:48.756Z";

export const portfolioProjects: PortfolioProject[] = [
  {
    id: ROMA_ID,
    title: "Roma - La Conquista",
    slug: "roma-la-conquista",
    category: "VIDEO & PHOTOGRAPHY",
    description:
      'Registro fotográfico e em vídeo da campanha de incentivo "La Conquista", uma viagem realizada pela maior administradora de consórcios do Brasil, "Ademicon Consórcio e Investimento". A viagem, que teve como destino principal a capital da Itália, também passou por Firenze e pelo Vaticano.',
    year: 2026,
    preview_image_1: roma199,
    preview_image_2: roma836,
    preview_image_3: roma438,
    preview_image_4: roma224,
    created_at: NOW,
    updated_at: NOW,
  },
];

const media = (
  id: string,
  media_type: PortfolioMedia["media_type"],
  url: string,
  sort_order: number,
  title: string | null,
  caption: string | null,
): PortfolioMedia => ({
  id,
  project_id: ROMA_ID,
  media_type,
  url,
  poster_url: null,
  title,
  caption,
  sort_order,
  created_at: NOW,
  updated_at: NOW,
});

export const portfolioMedia: PortfolioMedia[] = [
  media("roma-1", "image", roma199, 1, null, "A cúpula da Basílica de São Pedro iluminada pelo pôr do sol"),
  media("roma-2", "image", roma836, 2, null, "Audiência com o Papa Leão XIV"),
  media("roma-3", "image", roma837, 3, null, "Benção do Papa à Hadassa, filha de um casal participante da viagem"),
  media("roma-4", "image", roma809, 4, null, "As estátuas dos santos que coroam a fachada da basílica"),
  media("roma-5", "image", roma438, 5, null, "Retrato em frente ao Coliseu, símbolo eterno de Roma"),
  media("roma-6", "image", roma224, 6, null, "O grupo da campanha La Conquista reunido diante do Coliseu"),
  media("roma-7", "image", roma195, 7, null, "Vista panorâmica de Roma com o Vaticano ao entardecer"),
  media("roma-8", "image", roma153, 8, null, "Contemplando o fim de tarde sobre os telhados da cidade"),
  media("roma-9", "image", roma53, 9, null, "Ruas estreitas e bandeiras: o cotidiano italiano"),
  media(
    "roma-video-1",
    "youtube",
    "https://www.youtube.com/watch?v=9iGeZ5ksCIk",
    10,
    "Roma - La Conquista - Travel Video",
    "Documentário completo da campanha La Conquista, registrando os momentos mais marcantes da viagem pela Itália.",
  ),
  media(
    "roma-video-2",
    "youtube",
    "https://www.youtube.com/watch?v=4z_ke3tCy20",
    11,
    "Travel highlight video",
    "Os melhores momentos da viagem em um vídeo dinâmico com os destaques da experiência.",
  ),
];
