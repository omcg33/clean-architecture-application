interface IResizeParams {
  id: string;
  type: string;
  suffix?: string;
}

export const FORMAT = {
  ORGANIZER_AVATAR: "adv_organizer_avatar",
  CARD_TRIP: "adv_card_trip",
  CARD_TRIP_AVATAR: "adv_card_trip_avatar",
  CARD_ORGANIZER: "adv_card_organizer",
  CARD_THEME: "adv_card_theme",
  COUNTRY_SEO_CARD: "adv_country_seo_card",
  ABOUT_PAGE_GALLERY_THUMBNAIL: "adv_about_page_gallery_thumbnail",
  ABOUT_PAGE_GALLERY_ITEM: "adv_about_page_gallery_item",
  TRIP_PAGE_ACCOMMODATION_THUMBNAIL: "adv_trip_page_accommodation_thumbnail",
  TRIP_PAGE_PROGRAM_ITEM: "adv_trip_page_program_item",
  TRIP_PAGE_PROGRAM_THUMBNAIL: "adv_trip_page_program_thumbnail",
  SUBSTRATE_PAGE_DESKTOP: "adv_substrate_page_desktop",
  SUBSTRATE_PAGE_MOBILE: "adv_substrate_page_mobile",
  CARD_REVIEW_TRIP_GALLEY_THUMBNAIL: "adv_review_trip_gallery_thumbnail",
  CARD_REVIEW_TRIP_GALLERY_ITEM: "adv_review_trip_gallery_item",
  SLIDER_PAGING_MAIN: "adv_slider_paging_main",
  SLIDER_PAGING_THUMBNAIL: "adv_slider_paging_thumbnail"
};

let _url: string = "";

const resize = (params: IResizeParams) => {
  const { type, id, suffix = "" } = params;

  if (!Object.values(FORMAT).includes(type))
    throw new Error(`Недопустимый алиас для ресайза: ${type}`);

  return `${_url}/${type}/${id}.jpg${suffix ? `?${suffix}` : suffix}`;
};

const imageResizer = (url: string) => {
  _url = url;
  return { resize };
};

export { imageResizer, resize };
