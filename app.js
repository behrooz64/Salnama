const animals=[
{fa:'موش',tk:'سیچان',emoji:'🐀'},{fa:'گاو',tk:'سیغیر',emoji:'🐂'},{fa:'پلنگ',tk:'بارس',emoji:'🐆'},{fa:'خرگوش',tk:'تاوشان',emoji:'🐇'},{fa:'ماهی',tk:'بالیق',emoji:'🐟'},{fa:'مار',tk:'ییلان',emoji:'🐍'},{fa:'اسب',tk:'یلقی / آت',emoji:'🐎'},{fa:'گوسفند',tk:'قویین',emoji:'🐑'},{fa:'میمون',tk:'بیجن',emoji:'🐒'},{fa:'مرغ',tk:'تاووق',emoji:'🐓'},{fa:'سگ',tk:'ایت',emoji:'🐕'},{fa:'خوک',tk:'دونگیز',emoji:'🐖'}
];
const baseYear=1405;
const baseIndex=6;
let referenceYear=1405;
function animalIndex(year){return ((Number(year)-baseYear+baseIndex)%12+12)%12;}
function getReferenceAnimal(){return animals[animalIndex(referenceYear)];}
function setReferenceYear(year){referenceYear=Number(year);updateReferenceDisplay();}
function updateReferenceDisplay(){let el=document.getElementById('referenceAnimal');if(el){let a=getReferenceAnimal();el.innerHTML=`${referenceYear} - ${a.emoji} ${a.fa} (${a.tk})`;}}
function renderReferenceYears(){let s=document.getElementById('referenceYear');for(let y=1200;y<=1450;y++){let o=document.createElement('option');o.value=y;o.textContent=y;s.appendChild(o);}s.value=referenceYear;}
function renderAnimals(){let box=document.getElementById('animals');animals.forEach((a,i)=>{let b=document.createElement('button');b.className='animal-card';b.innerHTML=`${a.emoji}<br>${a.fa}<br><small>${a.tk}</small>`;b.onclick=()=>showAnimalYears(i);box.appendChild(b);});updateReferenceDisplay();}
function showAnimalYears(index){let result=document.getElementById('result');let html=`<h2>${animals[index].emoji} ${animals[index].fa}</h2><p>انتخاب سن بر اساس سال حیوانی:</p><div class="age-list">`;for(let year=referenceYear;year>=referenceYear-150;year--){if(animalIndex(year)===index){let age=referenceYear-year;html+=`<button class="age-item" onclick="selectAge(this,${index},${year})">${age} سال</button>`;}}html+='</div>';result.innerHTML=html;}
function selectAge(el,index,year){document.querySelectorAll('.age-item').forEach(x=>x.classList.remove('active'));el.classList.add('active');showResult(index,year);}
function showResult(index,birthYear){let age=referenceYear-Number(birthYear);let lunar=Math.floor(age*365.2425/354.367);let a=animals[index];document.getElementById('result').innerHTML=`<div class="animal">${a.emoji}</div><h2>${a.fa}</h2><p>نام ترکمنی: ${a.tk}</p><div class="final-result"><strong>${age} سال</strong><p>سن</p></div><div class="final-result"><p>سال شمسی: ${referenceYear}</p><p>سال حیوانی تولد: ${birthYear}</p><p>سن قمری: ${lunar} سال</p><p>اختلاف: ${lunar-age} سال</p></div>`;}
window.showResult=showResult;
window.addEventListener('DOMContentLoaded',()=>{renderReferenceYears();renderAnimals();document.getElementById('referenceYear').onchange=e=>setReferenceYear(e.target.value);});