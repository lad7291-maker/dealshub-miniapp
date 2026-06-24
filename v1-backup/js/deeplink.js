/**
 * SmartSkidka.ru — Deeplink Generator
 *
 * Использует готовые affiliate-ссылки из фида Admitad (rzekl.com)
 * Каждый товар получает уникальную партнёрскую ссылку
 */

(function () {
  function generateDeeplink(itemId, aliLink, category) {
    // Если есть готовая affiliate-ссылка из фида — используем её
    if (aliLink && aliLink.includes('rzekl.com')) {
      return aliLink;
    }

    // Fallback: если есть прямая ссылка на aliexpress.com
    if (aliLink && aliLink.includes('aliexpress.com/item/')) {
      return aliLink;
    }

    // Fallback: поиск по категории
    const searchUrl = encodeURIComponent(
      'https://aliexpress.com/wholesale?SearchText=' + encodeURIComponent(category || 'smartskidka')
    );
    return (
      'https://s.click.aliexpress.com/deep_link.htm?aff_short_key=_c3s1yQkJ' +
      '&dl_target_url=' +
      searchUrl
    );
  }

  function generateSearchDeeplink(query, subid) {
    const searchUrl = encodeURIComponent(
      'https://aliexpress.com/wholesale?SearchText=' + encodeURIComponent(query || 'smartskidka')
    );
    return (
      'https://s.click.aliexpress.com/deep_link.htm?aff_short_key=_c3s1yQkJ' +
      '&dl_target_url=' +
      searchUrl
    );
  }

  window.generateDeeplink = generateDeeplink;
  window.generateSearchDeeplink = generateSearchDeeplink;
})();
