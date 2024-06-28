type ChineseZodiac = 'Rat' | 'Ox' | 'Tiger' | 'Rabbit' | 'Dragon' | 'Snake' | 'Horse' | 'Goat' | 'Monkey' | 'Rooster' | 'Dog' | 'Pig';

interface ZodiacRange {
  start: Date;
  end: Date;
  sign: ChineseZodiac;
}

function getChineseZodiac(date: Date | string): ChineseZodiac {
  const d = date instanceof Date ? date : new Date(date);

  const zodiacRanges: ZodiacRange[] = [
    { start: new Date('2023-01-22'), end: new Date('2024-02-09'), sign: 'Rabbit' },
    { start: new Date('2022-02-01'), end: new Date('2023-01-21'), sign: 'Tiger' },
    { start: new Date('2021-02-12'), end: new Date('2022-01-31'), sign: 'Ox' },
    { start: new Date('2020-01-25'), end: new Date('2021-02-11'), sign: 'Rat' },
    { start: new Date('2019-02-05'), end: new Date('2020-01-24'), sign: 'Pig' },
    { start: new Date('2018-02-16'), end: new Date('2019-02-04'), sign: 'Dog' },
    { start: new Date('2017-01-28'), end: new Date('2018-02-15'), sign: 'Rooster' },
    { start: new Date('2016-02-08'), end: new Date('2017-01-27'), sign: 'Monkey' },
    { start: new Date('2015-02-19'), end: new Date('2016-02-07'), sign: 'Goat' },
    { start: new Date('2014-01-31'), end: new Date('2015-02-18'), sign: 'Horse' },
    { start: new Date('2013-02-10'), end: new Date('2014-01-30'), sign: 'Snake' },
    { start: new Date('2012-01-23'), end: new Date('2013-02-09'), sign: 'Dragon' },
    { start: new Date('2011-02-03'), end: new Date('2012-01-22'), sign: 'Rabbit' },
    { start: new Date('2010-02-14'), end: new Date('2011-02-02'), sign: 'Tiger' },
    { start: new Date('2009-01-26'), end: new Date('2010-02-13'), sign: 'Ox' },
    { start: new Date('2008-02-07'), end: new Date('2009-01-25'), sign: 'Rat' },
    { start: new Date('2007-02-18'), end: new Date('2008-02-06'), sign: 'Pig' },
    { start: new Date('2006-01-29'), end: new Date('2007-02-17'), sign: 'Dog' },
    { start: new Date('2005-02-09'), end: new Date('2006-01-28'), sign: 'Rooster' },
    { start: new Date('2004-01-22'), end: new Date('2005-02-08'), sign: 'Monkey' },
    { start: new Date('2003-02-01'), end: new Date('2004-01-21'), sign: 'Goat' },
    { start: new Date('2002-02-12'), end: new Date('2003-01-31'), sign: 'Horse' },
    { start: new Date('2001-01-24'), end: new Date('2002-02-11'), sign: 'Snake' },
    { start: new Date('2000-02-05'), end: new Date('2001-01-23'), sign: 'Dragon' },
    { start: new Date('1999-02-16'), end: new Date('2000-02-04'), sign: 'Rabbit' },
    { start: new Date('1998-01-28'), end: new Date('1999-02-15'), sign: 'Tiger' },
    { start: new Date('1997-02-07'), end: new Date('1998-01-27'), sign: 'Ox' },
    { start: new Date('1996-02-19'), end: new Date('1997-02-06'), sign: 'Rat' },
    { start: new Date('1995-01-31'), end: new Date('1996-02-18'), sign: 'Pig' },
    { start: new Date('1994-02-10'), end: new Date('1995-01-30'), sign: 'Dog' },
    { start: new Date('1993-01-23'), end: new Date('1994-02-09'), sign: 'Rooster' },
    { start: new Date('1992-02-04'), end: new Date('1993-01-22'), sign: 'Monkey' },
    { start: new Date('1991-02-15'), end: new Date('1992-02-03'), sign: 'Goat' },
    { start: new Date('1990-01-27'), end: new Date('1991-02-14'), sign: 'Horse' },
    { start: new Date('1989-02-06'), end: new Date('1990-01-26'), sign: 'Snake' },
    { start: new Date('1988-02-17'), end: new Date('1989-02-05'), sign: 'Dragon' },
    { start: new Date('1987-01-29'), end: new Date('1988-02-16'), sign: 'Rabbit' },
    { start: new Date('1986-02-09'), end: new Date('1987-01-28'), sign: 'Tiger' },
    { start: new Date('1985-02-20'), end: new Date('1986-02-08'), sign: 'Ox' },
    { start: new Date('1984-02-02'), end: new Date('1985-02-19'), sign: 'Rat' },
    { start: new Date('1983-02-13'), end: new Date('1984-02-01'), sign: 'Pig' },
    { start: new Date('1982-01-25'), end: new Date('1983-02-12'), sign: 'Dog' },
    { start: new Date('1981-02-05'), end: new Date('1982-01-24'), sign: 'Rooster' },
    { start: new Date('1980-02-16'), end: new Date('1981-02-04'), sign: 'Monkey' },
    { start: new Date('1979-01-28'), end: new Date('1980-02-15'), sign: 'Goat' },
    { start: new Date('1978-02-07'), end: new Date('1979-01-27'), sign: 'Horse' },
    { start: new Date('1977-02-18'), end: new Date('1978-02-06'), sign: 'Snake' },
    { start: new Date('1976-01-31'), end: new Date('1977-02-17'), sign: 'Dragon' },
    { start: new Date('1975-02-11'), end: new Date('1976-01-30'), sign: 'Rabbit' },
    { start: new Date('1974-01-23'), end: new Date('1975-02-10'), sign: 'Tiger' },
    { start: new Date('1973-02-03'), end: new Date('1974-01-22'), sign: 'Ox' },
    { start: new Date('1972-01-16'), end: new Date('1973-02-02'), sign: 'Rat' },
    { start: new Date('1971-01-27'), end: new Date('1972-01-15'), sign: 'Pig' },
    { start: new Date('1970-02-06'), end: new Date('1971-01-26'), sign: 'Dog' },
    { start: new Date('1969-02-17'), end: new Date('1970-02-05'), sign: 'Rooster' },
    { start: new Date('1968-01-30'), end: new Date('1969-02-16'), sign: 'Monkey' },
    { start: new Date('1967-02-09'), end: new Date('1968-01-29'), sign: 'Goat' },
    { start: new Date('1966-01-21'), end: new Date('1967-02-08'), sign: 'Horse' },
    { start: new Date('1965-02-02'), end: new Date('1966-01-20'), sign: 'Snake' },
    { start: new Date('1964-02-13'), end: new Date('1965-02-01'), sign: 'Dragon' },
    { start: new Date('1963-01-25'), end: new Date('1964-02-12'), sign: 'Rabbit' },
    { start: new Date('1962-02-05'), end: new Date('1963-01-24'), sign: 'Tiger' },
    { start: new Date('1961-02-15'), end: new Date('1962-02-04'), sign: 'Ox' },
    { start: new Date('1960-01-28'), end: new Date('1961-02-14'), sign: 'Rat' },
    { start: new Date('1959-02-08'), end: new Date('1960-01-27'), sign: 'Pig' },
    { start: new Date('1958-02-18'), end: new Date('1959-02-07'), sign: 'Dog' },
    { start: new Date('1957-01-31'), end: new Date('1958-02-17'), sign: 'Rooster' },
    { start: new Date('1956-02-12'), end: new Date('1957-01-30'), sign: 'Monkey' },
    { start: new Date('1955-01-24'), end: new Date('1956-02-11'), sign: 'Goat' },
    { start: new Date('1954-02-03'), end: new Date('1955-01-23'), sign: 'Horse' },
    { start: new Date('1953-02-14'), end: new Date('1954-02-02'), sign: 'Snake' },
    { start: new Date('1952-01-27'), end: new Date('1953-02-13'), sign: 'Dragon' },
    { start: new Date('1951-02-06'), end: new Date('1952-01-26'), sign: 'Rabbit' },
    { start: new Date('1950-02-17'), end: new Date('1951-02-05'), sign: 'Tiger' },
    { start: new Date('1949-01-29'), end: new Date('1950-02-16'), sign: 'Ox' },
    { start: new Date('1948-02-10'), end: new Date('1949-01-28'), sign: 'Rat' },
    { start: new Date('1947-01-22'), end: new Date('1948-02-09'), sign: 'Pig' },
    { start: new Date('1946-02-02'), end: new Date('1947-01-21'), sign: 'Dog' },
    { start: new Date('1945-02-13'), end: new Date('1946-02-01'), sign: 'Rooster' },
    { start: new Date('1944-01-25'), end: new Date('1945-02-12'), sign: 'Monkey' },
    { start: new Date('1943-02-05'), end: new Date('1944-01-24'), sign: 'Goat' },
    { start: new Date('1942-02-15'), end: new Date('1943-02-04'), sign: 'Horse' },
    { start: new Date('1941-01-27'), end: new Date('1942-02-14'), sign: 'Snake' },
    { start: new Date('1940-02-08'), end: new Date('1941-01-26'), sign: 'Dragon' },
    { start: new Date('1939-02-19'), end: new Date('1940-02-07'), sign: 'Rabbit' },
    { start: new Date('1938-01-31'), end: new Date('1939-02-18'), sign: 'Tiger' },
    { start: new Date('1937-02-11'), end: new Date('1938-01-30'), sign: 'Ox' },
    { start: new Date('1936-01-24'), end: new Date('1937-02-10'), sign: 'Rat' },
    { start: new Date('1935-02-04'), end: new Date('1936-01-23'), sign: 'Pig' },
    { start: new Date('1934-02-14'), end: new Date('1935-02-03'), sign: 'Dog' },
    { start: new Date('1933-01-26'), end: new Date('1934-02-13'), sign: 'Rooster' },
    { start: new Date('1932-02-06'), end: new Date('1933-01-25'), sign: 'Monkey' },
    { start: new Date('1931-02-17'), end: new Date('1932-02-05'), sign: 'Goat' },
    { start: new Date('1930-01-30'), end: new Date('1931-02-16'), sign: 'Horse' },
    { start: new Date('1929-02-10'), end: new Date('1930-01-29'), sign: 'Snake' },
    { start: new Date('1928-01-23'), end: new Date('1929-02-09'), sign: 'Dragon' },
    { start: new Date('1927-02-02'), end: new Date('1928-01-22'), sign: 'Rabbit' },
    { start: new Date('1926-02-13'), end: new Date('1927-02-01'), sign: 'Tiger' },
    { start: new Date('1925-01-25'), end: new Date('1926-02-12'), sign: 'Ox' },
    { start: new Date('1924-02-05'), end: new Date('1925-01-24'), sign: 'Rat' },
    { start: new Date('1923-02-16'), end: new Date('1924-02-04'), sign: 'Pig' },
    { start: new Date('1922-01-28'), end: new Date('1923-02-15'), sign: 'Dog' },
    { start: new Date('1921-02-08'), end: new Date('1922-01-27'), sign: 'Rooster' },
    { start: new Date('1920-02-20'), end: new Date('1921-02-07'), sign: 'Monkey' },
    { start: new Date('1919-02-01'), end: new Date('1920-02-19'), sign: 'Goat' },
    { start: new Date('1918-02-11'), end: new Date('1919-01-31'), sign: 'Horse' },
    { start: new Date('1917-01-23'), end: new Date('1918-02-10'), sign: 'Snake' },
    { start: new Date('1916-02-03'), end: new Date('1917-01-22'), sign: 'Dragon' },
    { start: new Date('1915-02-14'), end: new Date('1916-02-02'), sign: 'Rabbit' },
    { start: new Date('1914-01-26'), end: new Date('1915-02-13'), sign: 'Tiger' },
    { start: new Date('1913-02-06'), end: new Date('1914-01-25'), sign: 'Ox' },
    { start: new Date('1912-02-18'), end: new Date('1913-02-05'), sign: 'Rat' },
  ];

  for (const range of zodiacRanges) {
    if (d >= range.start && d <= range.end) {
      return range.sign;
    }
  }

  // If no match found, calculate based on year (fallback method)
  const year = d.getFullYear();
  const signs: ChineseZodiac[] = ['Rat', 'Ox', 'Tiger', 'Rabbit', 'Dragon', 'Snake', 'Horse', 'Goat', 'Monkey', 'Rooster', 'Dog', 'Pig'];
  return signs[(year - 1900) % 12];
}

export default getChineseZodiac;
