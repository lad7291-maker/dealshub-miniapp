/**
 * SmartSkidka.ru — Deeplink Generator
 *
 * Использует прямые ссылки через s.click.aliexpress.com (Admitad)
 * Каждый товар получает уникальную партнёрскую ссылку на свой itemId
 */

(function () {
  const ADMITAD_KEY = '_c3s1yQkJ';
  const ADMITAD_ID = '2529186';
  const PROGRAM_ID = '47843';

  function generateDeeplink(itemId, aliLink, category) {
    // Всегда генерируем уникальную ссылку через s.click.aliexpress.com
    // Это гарантирует что каждый товар ведёт на СВОЮ страницу
    if (itemId && itemId.length > 5) {
      const targetUrl = encodeURIComponent(
        'https://aliexpress.ru/item/' + itemId + '.html?af=' + ADMITAD_ID + '&cv=' + PROGRAM_ID
      );
      return (
        'https://s.click.aliexpress.com/deep_link.htm?aff_short_key=' +
        ADMITAD_KEY +
        '&dl_target_url=' +
        targetUrl
      );
    }

    // Fallback: поиск по категории
    const searchUrl = encodeURIComponent(
      'https://aliexpress.ru/wholesale?SearchText=' + encodeURIComponent(category || 'smartskidka')
    );
    return (
      'https://s.click.aliexpress.com/deep_link.htm?aff_short_key=' +
      ADMITAD_KEY +
      '&dl_target_url=' +
      searchUrl
    );
  }

  function generateSearchDeeplink(query, subid) {
    const searchUrl = encodeURIComponent(
      'https://aliexpress.ru/wholesale?SearchText=' + encodeURIComponent(query || 'smartskidka')
    );
    return (
      'https://s.click.aliexpress.com/deep_link.htm?aff_short_key=' +
      ADMITAD_KEY +
      '&dl_target_url=' +
      searchUrl
    );
  }

  window.generateDeeplink = generateDeeplink;
  window.generateSearchDeeplink = generateSearchDeeplink;
})();
