const animals=[
{fa:'موش',tk:'سیچان',emoji:'🐀'},
{fa:'گاو',tk:'سیغیر',emoji:'🐂'},
{fa:'پلنگ',tk:'بارس',emoji:'🐆'},
{fa:'خرگوش',tk:'تویشان',emoji:'🐇'},
{fa:'اژدها',tk:'آژدارها',emoji:'🐉'},
{fa:'مار',tk:'ییلان',emoji:'🐍'},
{fa:'اسب',tk:'آت',emoji:'🐎'},
{fa:'گوسفند',tk:'قویین',emoji:'🐑'},
{fa:'میمون',tk:'مایمون',emoji:'🐒'},
{fa:'مرغ',tk:'تووخ',emoji:'🐓'},
{fa:'سگ',tk:'ایت',emoji:'🐕'},
{fa:'خوک',tk:'دونگوز',emoji:'🐖'}
];
// مبنا: سال ۱۴۰۳ = اژدها، بنابراین ۱۴۰۹ = سگ
const baseYear=1403, baseIndex=4;
const faDigits=n=>String(n).replace(/\d/g,d=>'۰۱۲۳۴۵۶۷۸۹'[d]);
const yearEl=document.getElementById('year');
function getIndex(year){return ((year-baseYear+baseIndex)%12+12)%12}
function render(){let year=parseInt(yearEl.value,10);if(!Number.isFinite(year))return;const i=getIndex(year),a=animals[i];document.getElementById('animalEmoji').textContent=a.emoji;document.getElementById('animalFa').textContent=a.fa;document.getElementById('animalTk').textContent=a.tk;document.getElementById('yearText').textContent='سال '+faDigits(year);document.querySelectorAll('.animal-item').forEach((el,j)=>el.classList.toggle('active',j===i));}
function build(){const box=document.getElementById('animals');animals.forEach((a,i)=>{const el=document.createElement('div');el.className='animal-item';el.innerHTML=`<div class="e">${a.emoji}</div><div class="fa">${a.fa}</div><div class="tk">${a.tk}</div>`;el.onclick=()=>{const y=parseInt(yearEl.value,10);const target=((i-baseIndex+12)%12);let newY=baseYear+((target-(baseIndex-baseIndex)+12)%12);while(newY<y-6)newY+=12;while(newY>y+6)newY-=12;yearEl.value=newY;render()};box.appendChild(el)});render()}
yearEl.addEventListener('input',render);document.getElementById('prev').onclick=()=>{yearEl.value=+yearEl.value-1;render()};document.getElementById('next').onclick=()=>{yearEl.value=+yearEl.value+1;render()};build();