type Zodiac = 'Aries' | 'Taurus' | 'Gemini' | 'Cancer' | 'Leo' | 'Virgo' | 'Libra' | 'Scorpio' | 'Sagittarius' | 'Capricorn' | 'Aquarius' | 'Pisces';

function getHoroscope(date: Date | string): Zodiac {
  const d = date instanceof Date ? date : new Date(date);
  const month = d.getMonth() + 1;
  const day = d.getDate();
  const dates = [20, 19, 21, 20, 21, 21, 23, 23, 23, 23, 22, 22];
  const signs: Zodiac[] = ['Capricorn', 'Aquarius', 'Pisces', 'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius'];

  return signs[(month - (day < dates[month - 1] ? 1 : 0)) % 12];
}

export default getHoroscope;
