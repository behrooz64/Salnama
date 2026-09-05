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
function renderAnimals(){let box=document.getElementById('animals');animals.forEach((a,i)=>{let b=document.createElement('button');b.className='animal-card';b.innerHTML=`${a.emoji}<br>${a.fa}<br><small>${a.tk}</small>`;b.onclick=()=>showAnimalAges(i);box.appendChild(b);});updateReferenceDisplay();}
function showAnimalAges(index){let result=document.getElementById('result');let html=`<h2>${animals[index].fa}</h2><p>انتخاب سن فرد (۱ تا ۱۵۰ سال)</p>`;for(let age=1;age<=150;age++){html+=`<button onclick="showResult(${index},${age})">${age}</button>`;}result.innerHTML=html;}
function showResult(index,age){let birthYear=referenceYear-Number(age);let lunar=Math.floor(age*365.2425/354.367);let a=animals[index];document.getElementById('result').innerHTML=`<div class="animal">${a.emoji}</div><h2>${a.fa}</h2><p>نام ترکمنی: ${a.tk}</p><p>سال مبنا: ${referenceYear} (${getReferenceAnimal().fa})</p><p>سن شمسی: ${age} سال</p><p>سال تولد محاسبه شده: ${birthYear}</p><p>سن قمری تقریبی: ${lunar} سال</p>`;}
window.showResult=showResult;
window.addEventListener('DOMContentLoaded',()=>{renderReferenceYears();renderAnimals();document.getElementById('referenceYear').onchange=e=>setReferenceYear(e.target.value);});