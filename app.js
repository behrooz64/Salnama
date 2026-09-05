const animals=[
{fa:'موش',tk:'سیچان',emoji:'🐀'},
{fa:'گاو',tk:'سیغیر',emoji:'🐂'},
{fa:'پلنگ',tk:'بارس',emoji:'🐆'},
{fa:'خرگوش',tk:'تاوشان',emoji:'🐇'},
{fa:'ماهی',tk:'بالیق',emoji:'🐟'},
{fa:'مار',tk:'ییلان',emoji:'🐍'},
{fa:'اسب',tk:'یلقی/آت',emoji:'🐎'},
{fa:'گوسفند',tk:'قویون',emoji:'🐑'},
{fa:'میمون',tk:'بیجن',emoji:'🐒'},
{fa:'مرغ',tk:'تاووق',emoji:'🐓'},
{fa:'سگ',tk:'ایت',emoji:'🐕'},
{fa:'خوک',tk:'دونگیز',emoji:'🐖'}
];

const baseYear=1405;
const baseAnimalIndex=6;

function animalIndex(year){
 return ((baseAnimalIndex+(year-baseYear)%12)+12)%12;
}

function possibleAges(selectedAnimalIndex){
 let result=[];
 for(let age=selectedAnimalIndex+1;age<150;age+=12){
  result.push(age);
 }
 return result;
}

function calculateSelected(selectedAnimalIndex,age){
 const possible=possibleAges(selectedAnimalIndex);
 if(!possible.includes(age)) return null;
 const birthYear=baseYear-age;
 const animal=animals[animalIndex(birthYear)];
 const lunar=Math.floor(age*365.2425/354.367);
 return {birthYear,solarAge:age,lunarAge:lunar,difference:lunar-age,animal};
}

window.muche={
 animals,
 possibleAges,
 calculateSelected
};
