const animals=[
{fa:'موش',tk:'syçan',emoji:'🐀'},
{fa:'گاو',tk:'sygyr',emoji:'🐂'},
{fa:'پلنگ',tk:'bars',emoji:'🐆'},
{fa:'خرگوش',tk:'towşan',emoji:'🐇'},
{fa:'ماهی',tk:'luw',emoji:'🐟'},
{fa:'مار',tk:'ýylan',emoji:'🐍'},
{fa:'اسب',tk:'ýylky',emoji:'🐎'},
{fa:'گوسفند',tk:'koý',emoji:'🐑'},
{fa:'میمون',tk:'bijin',emoji:'🐒'},
{fa:'مرغ',tk:'takyk',emoji:'🐓'},
{fa:'سگ',tk:'it',emoji:'🐕'},
{fa:'خوک',tk:'doňuz',emoji:'🐖'}
];
// مبنا بر اساس Müçe ترکمنی: سال ۱۴۰۱ = bars (پلنگ)، بنابراین ۱۴۰۹ = it (سگ).
// Müçe از ۲۱ مارس آغاز می‌شود؛ برنامه حیوان را بر اساس شماره سال شمسی نمایش می‌دهد.
const baseYear=1401,baseIndex=2;
const faDigits=n=>String(n).replace(/\d/g,d=>'۰۱۲۳۴۵۶۷۸۹'[d]);
const yearEl=document.getElementById('year');
function getIndex(year){return ((year-baseYear+baseIndex)%12+12)%12}
function getNearestYearForAnimal(index,year){const first=baseYear+((index-baseIndex+12)%12);return first+Math.round((year-first)/12)*12}
function render(){const year=parseInt(yearEl.value,10);if(!Number.isFinite(year))return;const i=getIndex(year),a=animals[i];document.getElementById('animalEmoji').textContent=a.emoji;document.getElementById('animalFa').textContent=a.fa;document.getElementById('animalTk').textContent=a.tk;document.getElementById('yearText').textContent='سال '+faDigits(year);document.querySelectorAll('.animal-item').forEach((el,j)=>el.classList.toggle('active',j===i))}
function build(){const box=document.getElementById('animals');animals.forEach((a,i)=>{const el=document.createElement('div');el.className='animal-item';el.innerHTML=`<div class="e">${a.emoji}</div><div class="fa">${a.fa}</div><div class="tk">${a.tk}</div>`;el.onclick=()=>{const y=parseInt(yearEl.value,10)||baseYear;yearEl.value=getNearestYearForAnimal(i,y);render()};box.appendChild(el)});render()}
yearEl.addEventListener('input',render);document.getElementById('prev').onclick=()=>{yearEl.value=+yearEl.value-1;render()};document.getElementById('next').onclick=()=>{yearEl.value=+yearEl.value+1;render()};build();