const animals=[
{fa:'موش',tk:'سیچان',emoji:'🐀'},
{fa:'گاو',tk:'سیغیر',emoji:'🐂'},
{fa:'پلنگ',tk:'بارس',emoji:'🐆'},
{fa:'خرگوش',tk:'تاوشان',emoji:'🐇'},
{fa:'ماهی',tk:'بالیق',emoji:'🐟'},
{fa:'مار',tk:'ییلان',emoji:'🐍'},
{fa:'اسب',tk:'یلقی / آت',emoji:'🐎'},
{fa:'گوسفند',tk:'قویین',emoji:'🐑'},
{fa:'میمون',tk:'بیجن',emoji:'🐒'},
{fa:'مرغ',tk:'تاووق',emoji:'🐓'},
{fa:'سگ',tk:'ایت',emoji:'🐕'},
{fa:'خوک',tk:'دونگیز',emoji:'🐖'}
];

// مرجع اصلی چرخه: سال ۱۴۰۵ = اسب
const baseYear=1405;
const baseIndex=6;
let referenceYear=1405;

function animalIndex(year){
 return ((Number(year)-baseYear+baseIndex)%12+12)%12;
}

function getReferenceAnimal(){
 return animals[animalIndex(referenceYear)];
}

function setReferenceYear(year){
 referenceYear=Number(year);
 updateReferenceDisplay();
}

function possibleBirthYears(selectedIndex){
 let years=[];
 for(let y=referenceYear;y>0;y--){
  if(animalIndex(y)===selectedIndex) years.push(y);
 }
 return years;
}

function calculateSelected(selectedIndex,birthYear){
 const solarAge=referenceYear-Number(birthYear);
 const lunarAge=Math.floor(solarAge*365.2425/354.367);
 return {
 birthYear,
 solarAge,
 lunarAge,
 difference:lunarAge-solarAge,
 animal:animals[selectedIndex],
 referenceAnimal:getReferenceAnimal()
 };
}

function updateReferenceDisplay(){
 const el=document.getElementById('referenceAnimal');
 if(el){
 const a=getReferenceAnimal();
 el.innerHTML=`${referenceYear} - ${a.emoji} ${a.fa} (${a.tk})`;
 }
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
 updateReferenceDisplay();
}

function showAnimalYears(index){
 const result=document.getElementById('result');
 const years=possibleBirthYears(index).slice(0,12);
 result.innerHTML=`<div class="animal">${animals[index].emoji}</div><h2>${animals[index].fa}</h2><p>نام ترکمنی: ${animals[index].tk}</p><p>سال تولد را انتخاب کنید:</p>${years.map(y=>`<button onclick="showResult(${index},${y})">${y}</button>`).join(' ')}`;
}

function showResult(index,birthYear){
 const d=calculateSelected(index,birthYear);
 document.getElementById('result').innerHTML=`<div class="animal">${d.animal.emoji}</div><h2>${d.animal.fa}</h2><p>نام ترکمنی: ${d.animal.tk}</p><p>سال مبنا: ${referenceYear} (${d.referenceAnimal.fa})</p><p>سال تولد: ${d.birthYear}</p><p>سن شمسی: ${d.solarAge} سال</p><p>سن قمری تقریبی: ${d.lunarAge} سال</p><p>اختلاف: ${d.difference} سال</p>`;
}

window.showResult=showResult;
window.muche={animals,animalIndex,possibleBirthYears,calculateSelected,setReferenceYear,getReferenceAnimal};

window.addEventListener('DOMContentLoaded',()=>{
 renderAnimals();
 const input=document.getElementById('referenceYear');
 if(input){
  input.value=referenceYear;
  input.onchange=e=>setReferenceYear(e.target.value);
 }
});