'use strict';


let imgsNames = [
  'bag.jpg',
  'banana.jpg',
  'bathroom.jpg',
  'bathroom.jpg',
  'boots.jpg',
  'breakfast.jpg',
  'bubblegum.jpg',
  'chair.jpg',
  'cthulhu.jpg',
  'dog-duck.jpg',
  'dragon.jpg',
  'pen.jpg',
  'pet-sweep.jpg',
  'scissors.jpg',
  'shark.jpg',
  'sweep.png',
  'tauntaun.jpg',
  'unicorn.jpg',
  'usb.gif',
  'water-can.jpg',
  'wine-glass.jpg'
];
let leftIndex = 0;
let midIndex = 0;
let rightIndex = 0;
let LeftImg = document.getElementById('leftimg');
let midImg = document.getElementById('midimg');
let rightImg = document.getElementById('rightimg');
let defultRounds = 25;
let numberofRounds = 0;
function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function ImgVots(name) {
  this.name = name;
  this.path = `./images/${name}`;
  this.votes = 0;
  this.views = 0;
  ImgVots.all.push(this);

}
ImgVots.all = [];

for (let i = 0; i < imgsNames.length; i++) {
  new ImgVots(imgsNames[i]);
}

// console.log(ImgVots.all);
function render() {

  leftIndex = randomNumber(0, ImgVots.all.length - 1);
  midIndex = randomNumber(0, ImgVots.all.length - 1);
  rightIndex = randomNumber(0, ImgVots.all.length - 1);

  while (leftIndex === midIndex) {
    midIndex = randomNumber(0, ImgVots.all.length - 1);
  }
  while (rightIndex === leftIndex || rightIndex === midIndex) {
    rightIndex = randomNumber(0, ImgVots.all.length - 1);
  }
  // console.log(ImgVots.all[1].path);
  LeftImg.src = ImgVots.all[leftIndex].path;
  LeftImg.alt = ImgVots.all[leftIndex].name;
  LeftImg.title = ImgVots.all[leftIndex].name;



  midImg.src = ImgVots.all[midIndex].path;
  midImg.alt = ImgVots.all[midIndex].name;
  midImg.title = ImgVots.all[midIndex].name;

  rightImg.src = ImgVots.all[rightIndex].path;
  rightImg.alt = ImgVots.all[rightIndex].name;
  rightImg.title = ImgVots.all[rightIndex].name;


}
render();
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
let submitRound = document.getElementById('submitrounds');
// let textbox=document.getElementById('rounds');
// submitRound.addEventListener('submit',submitRounds);

function submitRounds(event) {
  console.log(event);
  let i = event.target.textbox.value;
  console.log(i);
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
let section = document.getElementById('votes');
section.addEventListener('click', clickfun);
// section.addEventListener('submit',submitRounds);


function clickfun(event) {
  // console.log(event);
  // let order = event.target.value;
  //  console.log(order);

  if (numberofRounds < defultRounds) {
    if (event.target.id !== 'votes') {
      if (event.target.id === 'leftimg') {
        ImgVots.all[leftIndex].votes = ImgVots.all[leftIndex].views+1;
      }


      else if (event.target.id === 'midimg') {
        ImgVots.all[midIndex].votes = ImgVots.all[midIndex].views + 1;
      }


      else {
        ImgVots.all[rightIndex].votes = ImgVots.all[rightIndex].views + 1;
      }
      ImgVots.all[midIndex].views = ImgVots.all[midIndex].views + 1;
      ImgVots.all[leftIndex].views = ImgVots.all[leftIndex].views + 1;
      ImgVots.all[rightIndex].views = ImgVots.all[rightIndex].views + 1;
      numberofRounds++;
      render();
    }
  }
  else if (defultRounds === 25) {
    alert('check the result The Defult Rounds is finished ');
  }
  else {
    alert(`check the result The ${defultRounds} Rounds is finished `);
  }
}
////////////////////////////////////////////////////////////////////////////////////
let section1 = document.getElementById('submitrounds');
section1.addEventListener('submit', clickfun1);

function clickfun1(event) {
  event.preventDefault();
  console.log(event.target);
  let order = event.target.roundvalu.value;
  // console.log(order);
  // console.log(typeof order);
  let x = Math.floor(order);
  // console.log(typeof x);
  // eslint-disable-next-line valid-typeof
  if (typeof x === 'Number' || x > 0) {
    // console.log(typeof x);
    defultRounds = x;
  }
  else {
    alert('please Enter the number of Rounds');
    defultRounds = 25;
  }

}
//////////////////////////////////////////////////////////////////////////////////////////////
let section2 = document.getElementById('result');
section2.addEventListener('submit', clickfun3);

function clickfun3(event) {
  event.preventDefault();

  // // resulttable1.parentNode.remove(resulttable1);
  // // let resulttable1 = document.getElementById('resultable');
  // // resulttable1.parentNode.remove('resulttable');
  // // // resulttable1.delete(resulttable1);

  // // let resulttable=document.getElementById('resulttable');

  // let resulttable2 = document.createElement('section');
  // // let idd =document.createAttribute('resulttable')
  // resulttable2.setAttribute('id', 'resulttable');
  // // console.log(resulttable);
  // let tableresult = document.getElementById('tableresult');
  let resulttable = document.getElementById('resultable');
  let tableresult = document.createElement('table');
  resulttable.appendChild(tableresult);

  let trEl = document.createElement('tr');
  tableresult.appendChild(trEl);

  let th0El = document.createElement('th');
  trEl.appendChild(th0El);
  th0El.textContent = 'Image Name';
  let thEl = document.createElement('th');
  trEl.appendChild(thEl);
  thEl.textContent = 'Votes';

  let th1El = document.createElement('th');
  trEl.appendChild(th1El);
  th1El.textContent = 'views';

  for (let i = 0; i < ImgVots.all.length; i++) {
    let tr1El = document.createElement('tr');
    tableresult.appendChild(tr1El);

    let tdEl = document.createElement('td');
    tr1El.appendChild(tdEl);
    tdEl.textContent = ImgVots.all[i].name;

    let td1El = document.createElement('td');
    tr1El.appendChild(td1El);
    td1El.textContent = ImgVots.all[i].votes;

    let td2El = document.createElement('td');
    tr1El.appendChild(td2El);
    td2El.textContent = ImgVots.all[i].views;
    

  }
  
}

  // console.log(event);

  // let order = event.target.result1.value;

  // console.log(order);
  // console.log(typeof order);
  // let y = order;
  // console.log( y);  tableresult
  // let resulttable=document.getElementById('resulttable');
// resulttable.appendChild()