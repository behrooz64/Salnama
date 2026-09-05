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

// مبنا: سال ۱۴۰۵ = اسب (index 6)
const baseYear=1405;
const baseAnimalIndex=6;

function animalIndex(year){return ((baseAnimalIndex+(year-baseYear)%12)+12)%12;}

// تولید سن های احتمالی یک حیوان تا 150 سال
function possibleAges(index){
 let result=[];
 for(let age=1;age<150;age++){
  let birthYear=baseYear-age;
  if(animalIndex(birthYear)===index) result.push(age);
 }
 return result;
}

function getBirthYearFromAge(age){return baseYear-age;}

function lunarAge(shamsiAge){
 return Math.floor(shamsiAge*365.2425/354.367);
}

function calculate(age){
 const birthYear=getBirthYearFromAge(age);
 const animal=animals[animalIndex(birthYear)];
 const lAge=lunarAge(age);
 return {birthYear,age,lunarAge:lAge,difference:lAge-age,animal};
}

window.muche={animals,possibleAges,calculate};

const box=document.getElementById('animals');
if(box){
 animals.forEach((a,i)=>{
  const el=document.createElement('div');
  el.className='animal-item';
  el.innerHTML=`${a.emoji}<br>${a.fa}<br>${a.tk}`;
  el.onclick=()=>{
   const ages=possibleAges(i);
   console.log(a.fa,ages);
  };
  box.appendChild(el);
 });
}
