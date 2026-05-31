
console.log('Welcome to the Community Portal');
window.onload=()=>alert('Page Fully Loaded');

class Event{
 constructor(name,date,seats,category){
  this.name=name; this.date=date; this.seats=seats; this.category=category;
 }
 checkAvailability(){return this.seats>0;}
}

const events=[
 new Event('Music Night','2026-06-10',10,'Music'),
 new Event('Baking Workshop','2026-06-11',5,'Workshop'),
 new Event('Football Match','2026-06-12',20,'Sports')
];

function renderEvents(list){
 const div=document.getElementById('events');
 div.innerHTML='';
 list.forEach((e,i)=>{
  div.innerHTML+=`
  <div class="col-md-4">
   <div class="eventCard">
    <h3>${e.name}</h3>
    <p>${e.date}</p>
    <p>${e.category}</p>
    <p>Seats: ${e.seats}</p>
    <button class="btn btn-primary" onclick="registerUser(${i})">Register</button>
   </div>
  </div>`;
 });
}

function registerUser(i){
 try{
  if(events[i].seats<=0) throw new Error('No seats available');
  events[i].seats--;
  renderEvents(events);
 }catch(e){alert(e.message);}
}

document.getElementById('categoryFilter').onchange=function(){
 let v=this.value;
 renderEvents(v==='All'?events:events.filter(x=>x.category===v));
}

document.getElementById('registerForm').addEventListener('submit',e=>{
 e.preventDefault();
 document.getElementById('message').innerHTML='Registration Successful';
});

async function fetchEvents(){
 return Promise.resolve(events);
}

fetchEvents().then(renderEvents);
