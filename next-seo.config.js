const title =
  'Dua Request – Dua Request is a place where you can request prayer for yourself and your loved ones and pray for others.';
const description = 'Dua is like a conversation with Allah Almighty in which we put our needs before Him and ask His help in the resolution of our problems.';

const SEO = {
  title,
  description,
  canonical: 'https://duarequest.app',
  openGraph: {
    type: 'website',
    locale: 'en_IE',
    url: 'https://duarequest.app',
    title,
    description,
    images: [
      {
        url: 'https://duarequest.app/icon.png',
        alt: title,
        width: 1280,
        height: 620
      }
    ]
  }
};

export default SEO;