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

function animalIndex(year){return ((baseAnimalIndex+(year-baseYear)%12)+12)%12;}

function possibleAges(selectedAnimalIndex){
 let result=[];
 for(let age=selectedAnimalIndex+1;age<150;age+=12) result.push(age);
 return result;
}

function calculateSelected(selectedAnimalIndex,age){
 if(!possibleAges(selectedAnimalIndex).includes(age)) return null;
 const birthYear=baseYear-age;
 const lunarAge=Math.floor(age*365.2425/354.367);
 return {birthYear,solarAge:age,lunarAge,difference:lunarAge-age,animal:animals[animalIndex(birthYear)]};
}

function renderAnimals(){
 const box=document.getElementById('animals');
 if(!box) return;
 box.innerHTML='';
 animals.forEach((a,i)=>{
  const btn=document.createElement('button');
  btn.className='animal-card';
  btn.innerHTML=`${a.emoji}<br>${a.fa}<br><small>${a.tk}</small>`;
  btn.onclick=()=>showAnimalAges(i);
  box.appendChild(btn);
 });
}

function showAnimalAges(index){
 const result=document.getElementById('result');
 const ages=possibleAges(index);
 if(result){
 result.innerHTML=`<div class="animal">${animals[index].emoji}</div><h2>${animals[index].fa}</h2><p>نام ترکمنی: <strong>${animals[index].tk}</strong></p><p>سن احتمالی را انتخاب کنید:</p><div>${ages.map(a=>`<button onclick="showResult(${index},${a})">${a}</button>`).join(' ')}</div>`;
 }
}

function showResult(index,age){
 const data=calculateSelected(index,age);
 const result=document.getElementById('result');
 if(!data||!result) return;
 const info=window.animalData?.[data.animal.fa];
 result.innerHTML=`<div class="animal">${data.animal.emoji}</div><h2>${data.animal.fa}</h2><p>نام ترکمنی: <strong>${data.animal.tk}</strong></p><p>سال تولد شمسی: ${data.birthYear}</p><p>سن شمسی: ${data.solarAge}</p><p>سن قمری تقریبی: ${data.lunarAge}</p><p>اختلاف: ${data.difference}</p>${info?`<hr><h3>ویژگی‌های سنتی</h3><p>${info.personality}</p><h3>ویژگی‌های طبیعی</h3><p>${info.climate}</p><p>${info.nature}</p>`:''}`;
}

window.muche={animals,possibleAges,calculateSelected};
window.showResult=showResult;
window.addEventListener('DOMContentLoaded',renderAnimals);
