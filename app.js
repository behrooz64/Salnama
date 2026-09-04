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
const baseYear=1401,baseIndex=2;
const faDigits=n=>String(n).replace(/\d/g,d=>'۰۱۲۳۴۵۶۷۸۹'[d]);
const yearEl=document.getElementById('year');
const birthYearEl=document.getElementById('birthYear');
const birthMonthEl=document.getElementById('birthMonth');
const birthDayEl=document.getElementById('birthDay');
function getIndex(year){return ((year-baseYear+baseIndex)%12+12)%12}
function getNearestYearForAnimal(index,year){const first=baseYear+((index-baseIndex+12)%12);return first+Math.round((year-first)/12)*12}
function jalaliLeap(y){const r=y%33;return [1,5,9,13,17,22,26,30].includes(r)}
function daysInMonth(y,m){if(m<=6)return 31;if(m<=11)return 30;return jalaliLeap(y)?30:29}
function jalaliToGregorian(jy,jm,jd){let gy=jy+621;const epBase=jy-(jy>=0?474:473);const epYear=474+((epBase%2820+2820)%2820);const jp=jd+(jm<=7?(jm-1)*31:(jm-1)*30+6)+((epYear*682-110)/2816|0)+(epYear-1)*365+Math.floor(epBase/2820)*1029983+(1948320-1);const gdn=jp+0;let j= gdn+68569;let n=Math.floor(4*j/146097);j=j-Math.floor((146097*n+3)/4);let i=Math.floor(4000*(j+1)/1461001);j=j-Math.floor(1461*i/4)+31;let k=Math.floor(80*j/2447);const gd=j-Math.floor(2447*k/80);j=Math.floor(k/11);const gm=k+2-12*j;const gyear=100*(n-49)+i+j;return new Date(Date.UTC(gyear,gm-1,gd))}
function gregorianToIslamic(date){const jd=Math.floor(date.getTime()/86400000)+2440588;let l=jd-1948440+10632;let n=Math.floor((l-1)/10631);l=l-10631*n+354;let j=(Math.floor((10985-l)/5316))*Math.floor((50*l)/17719)+(Math.floor(l/5670))*Math.floor((43*l)/15238);l=l-(Math.floor((30-j)/15))*Math.floor((17719*j)/50)-(Math.floor(j/16))*Math.floor((15238*j)/43)+29;const m=Math.floor((24*l)/709);const d=l-Math.floor((709*m)/24);const y=30*n+j-30;return {y,m,d}}
function render(){const year=parseInt(yearEl.value,10);if(!Number.isFinite(year))return;const i=getIndex(year),a=animals[i];document.getElementById('animalEmoji').textContent=a.emoji;document.getElementById('animalFa').textContent=a.fa;document.getElementById('animalTk').textContent=a.tk;document.getElementById('yearText').textContent='سال '+faDigits(year);document.querySelectorAll('.animal-item').forEach((el,j)=>el.classList.toggle('active',j===i))}
function renderBirth(){const y=parseInt(birthYearEl.value,10),m=parseInt(birthMonthEl.value,10),d=parseInt(birthDayEl.value,10);if(!Number.isFinite(y)||!Number.isFinite(m)||!Number.isFinite(d)||m<1||m>12||d<1||d>daysInMonth(y,m))return;const currentYear=1405;let age=currentYear-y;const birthAnimal=animals[getIndex(y)];document.getElementById('birthYearText').textContent=faDigits(y);document.getElementById('ageText').textContent=faDigits(age)+' سال';document.getElementById('birthAnimalText').textContent=birthAnimal.emoji+' '+birthAnimal.fa+' ('+birthAnimal.tk+')';const g=jalaliToGregorian(y,m,d),h=gregorianToIslamic(g);document.getElementById('lunarYearText').textContent=faDigits(h.y);document.getElementById('birthDateText').textContent=faDigits(y)+'/'+faDigits(String(m).padStart(2,'0'))+'/'+faDigits(String(d).padStart(2,'0'));}
function build(){const box=document.getElementById('animals');animals.forEach((a,i)=>{const el=document.createElement('div');el.className='animal-item';el.innerHTML=`<div class="e">${a.emoji}</div><div class="fa">${a.fa}</div><div class="tk">${a.tk}</div>`;el.onclick=()=>{const y=parseInt(yearEl.value,10)||baseYear;yearEl.value=getNearestYearForAnimal(i,y);render()};box.appendChild(el)});render();renderBirth()}
yearEl.addEventListener('input',render);birthYearEl.addEventListener('input',renderBirth);birthMonthEl.addEventListener('input',renderBirth);birthDayEl.addEventListener('input',renderBirth);document.getElementById('prev').onclick=()=>{yearEl.value=+yearEl.value-1;render()};document.getElementById('next').onclick=()=>{yearEl.value=+yearEl.value+1;render()};document.getElementById('birthPrev').onclick=()=>{birthYearEl.value=+birthYearEl.value-1;renderBirth()};document.getElementById('birthNext').onclick=()=>{birthYearEl.value=+birthYearEl.value+1;renderBirth()};build();