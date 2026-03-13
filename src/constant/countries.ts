import { getCountries, getCountryCallingCode } from 'libphonenumber-js';
import countryList from 'country-list';

const getFlagEmoji = (countryCode: string) => {
  const codePoints = countryCode
    .toUpperCase() // Ensure code is uppercase
    .split('')
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
};

export const countries = getCountries()
  .map((countryCode) => {
    return {
      code: countryCode,
      label: countryList.getName(countryCode) || countryCode,
      phone: getCountryCallingCode(countryCode),
      flag: getFlagEmoji(countryCode),
    };
  })
  .sort((a, b) => a.label.localeCompare(b.label));
