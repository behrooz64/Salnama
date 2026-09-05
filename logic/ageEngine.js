// Salnama age engine
// Base: 1405 = Horse (Yylky/At)
const ANIMAL_COUNT = 12;
const BASE_YEAR = 1405;
const BASE_INDEX = 6;

export function animalIndexFromYear(year) {
  return ((year - BASE_YEAR + BASE_INDEX) % ANIMAL_COUNT + ANIMAL_COUNT) % ANIMAL_COUNT;
}

export function possibleAgesForAnimal(index, limit = 150) {
  const result = [];
  for (let age = 0; age < limit; age++) {
    if (animalIndexFromYear(BASE_YEAR - age) === index) result.push(age);
  }
  return result;
}

export function calculateResult(birthYear) {
  const age = BASE_YEAR - birthYear;
  return {
    solarAge: age,
    lunarAge: Math.floor(age * 365.2425 / 354.367),
    difference: Math.floor(age * 365.2425 / 354.367) - age
  };
}
