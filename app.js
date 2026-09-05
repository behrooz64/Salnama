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

let referenceYear=1405;

function animalIndex(year){
 return ((year-1405)%12+12)%12;
}

function setReferenceYear(year){
 referenceYear=Number(year);
}

function getReferenceAnimal(){
 return animals[animalIndex(referenceYear)];
}

function possibleBirthYears(selectedIndex){
 let years=[];
 for(let y=referenceYear;y>0;y--){
  if(animalIndex(y)===selectedIndex) years.push(y);
 }
 return years;
}

function calculateSelected(selectedIndex,birthYear){
 const age=1405-birthYear;
 return {
  birthYear,
  solarAge:age,
  lunarAge:Math.floor(age*365.2425/354.367),
  animal:animals[selectedIndex],
  referenceAnimal:getReferenceAnimal()
 };
}

function renderAnimals(){
 const box=document.getElementById('animals');
 if(!box)return;
 box.innerHTML='';
 animals.forEach((a,i)=>{
  const btn=document.createElement('button');
  btn.className='animal-card';
  btn.innerHTML=`${a.emoji}<br>${a.fa}<br><small>${a.tk}</small>`;
  btn.onclick=()=>showAnimalYears(i);
  box.appendChild(btn);
 });
}

function showAnimalYears(index){
 const result=document.getElementById('result');
 const years=possibleBirthYears(index).slice(0,10);
 if(result){
 result.innerHTML=`<div class="animal">${animals[index].emoji}</div><h2>${animals[index].fa}</h2><p>نام ترکمنی: <strong>${animals[index].tk}</strong></p><p>سال تولد را انتخاب کنید:</p><div>${years.map(y=>`<button onclick="showResult(${index},${y})">${y}</button>`).join(' ')}</div>`;
 }
}

function showResult(index,birthYear){
 const data=calculateSelected(index,birthYear);
 const result=document.getElementById('result');
 if(!result)return;
 const info=window.animalData?.[data.animal.fa];
 result.innerHTML=`<div class="animal">${data.animal.emoji}</div><h2>${data.animal.fa}</h2><p>نام ترکمنی: <strong>${data.animal.tk}</strong></p><p>سال مرجع: ${referenceYear} (${data.referenceAnimal.fa})</p><p>سال تولد شمسی: ${data.birthYear}</p><p>سن شمسی: ${data.solarAge}</p><p>سن قمری تقریبی: ${data.lunarAge}</p>${info?`<hr><h3>ویژگی‌های سنتی</h3><p>${info.personality}</p>`:''}`;
}

window.muche={animals,possibleBirthYears,calculateSelected,setReferenceYear,getReferenceAnimal};
window.showResult=showResult;
window.addEventListener('DOMContentLoaded',renderAnimals);
