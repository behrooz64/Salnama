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

// مبنا: ۱۴۰۵ = اسب
const baseYear=1405;
const baseAnimalIndex=6;

function animalIndex(year){
 return ((baseAnimalIndex+(year-baseYear)%12)+12)%12;
}

// سن های احتمالی بر اساس جایگاه حیوان در چرخه موچه
function possibleAges(index){
 let result=[];
 let startAge=index+1;
 for(let age=startAge;age<150;age+=12){
  result.push(age);
 }
 return result;
}

function calculate(age){
 const birthYear=baseYear-age;
 const animal=animals[animalIndex(birthYear)];
 const lunar=Math.floor(age*365.2425/354.367);
 return {birthYear,age,lunarAge:lunar,difference:lunar-age,animal};
}

window.muche={animals,possibleAges,calculate};
