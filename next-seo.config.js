const title =
  'Prayer Request – Dua is like a conversation with Allah Almighty in which we put our needs before Him and ask His help in the resolution of our problems.';
const description = 'Prayer Request is a place where you can request prayer for yourself and your loved ones and pray for others.';

const SEO = {
  title,
  description,
  canonical: 'https://prayerrequest.vercel.app',
  openGraph: {
    type: 'website',
    locale: 'en_IE',
    url: 'https://prayerrequest.vercel.app',
    title,
    description,
    images: [
      {
        url: 'https://prayerrequest.vercel.app/logo.png',
        alt: title,
        width: 1280,
        height: 720
      }
    ]
  }
};

export default SEO;