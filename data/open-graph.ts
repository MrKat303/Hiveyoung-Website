const SITE_URL = "https://www.hiveyoung.org";

export const openGraphImages = {
  home: `${SITE_URL}/images/open-graph/home-page-septiembre-2026-v3.jpg`,
  somos:
    "https://res.cloudinary.com/dlipwrbvd/image/upload/f_jpg,q_auto,c_fill,g_auto,w_1200,h_630/v1782255806/Comunidad_HiveYoung_oounbh.jpg",
  historia:
    "https://res.cloudinary.com/dlipwrbvd/image/upload/f_jpg,q_auto,c_fill,g_auto,w_1200,h_630/v1782256043/Fundadores_de_HiveYoung_ebrcgk.png",
  equipo: `${SITE_URL}/images/open-graph/equipo-page-septiembre-2026-v3.jpg`,
  advisory:
    "https://res.cloudinary.com/dlipwrbvd/image/upload/f_jpg,q_auto,c_fill,g_auto,w_1200,h_630/v1782256047/HiveYoung_Marcelo_Guital_kyn4gz.png",
  unete:
    "https://res.cloudinary.com/dlipwrbvd/image/upload/f_jpg,q_auto,c_fill,g_auto,w_1200,h_630/v1782255778/Voluntarios_HiveYoung_rztrbn.jpg",
  contacto:
    "https://res.cloudinary.com/dlipwrbvd/image/upload/f_jpg,q_auto,c_fill,g_auto,w_1200,h_630/v1782256077/HiveYoung_en_la_radio_ggvl4o.png",
  congreso:
    "https://res.cloudinary.com/dlipwrbvd/image/upload/f_jpg,q_auto,c_fill,g_auto,w_1200,h_630/v1782258017/Orquesta_en_el_Congreso_HiveYoung_lcwip7.jpg",
  congreso2025:
    "https://res.cloudinary.com/dlipwrbvd/image/upload/f_jpg,q_auto,c_fill,g_auto,w_1200,h_630/v1782258233/Congreso_HiveYoung_Publico_Panel_tf94og.jpg",
} as const;

export type OpenGraphImageKey = keyof typeof openGraphImages;

export function getOpenGraphImage(key: OpenGraphImageKey) {
  return openGraphImages[key];
}
