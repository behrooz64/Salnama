const animals=["موش","گاو","پلنگ","خرگوش","ماهی","مار","اسب","گوسفند","میمون","مرغ","سگ","خوک"];

export function getAnimalIndex(year, baseYear=1405, baseIndex=6){
  return (baseIndex + (year-baseYear)) % 12;
}

export function getPossibleBirthYears(animalIndex, baseYear=1405, maxAge=150){
  const result=[];
  for(let age=0; age<=maxAge; age++){
    const birthYear=baseYear-age;
    if(getAnimalIndex(birthYear,baseYear,6)===animalIndex) result.push({age,birthYear});
  }
  return result;
}

export {animals};
