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
let totalvotes = [0];
let totalviews = [0];
let xleft = 0;
let xright = 0;
let xmid = 0;

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
function renderIndex() {

  leftIndex = randomNumber(0, ImgVots.all.length - 1);
  midIndex = randomNumber(0, ImgVots.all.length - 1);
  rightIndex = randomNumber(0, ImgVots.all.length - 1);

  while (leftIndex === midIndex) {
    midIndex = randomNumber(0, ImgVots.all.length - 1);
  }
  while (rightIndex === leftIndex || rightIndex === midIndex) {
    rightIndex = randomNumber(0, ImgVots.all.length - 1);
  }

  while ((leftIndex === xleft || leftIndex === xright || leftIndex === xmid || leftIndex === midIndex || leftIndex === rightIndex)) {
    leftIndex = randomNumber(0, ImgVots.all.length - 1);

  }
  while ((rightIndex === xleft || rightIndex === xright || rightIndex === xmid || rightIndex === leftIndex || rightIndex === midIndex)) {
    rightIndex = randomNumber(0, ImgVots.all.length - 1);

  }
  while ((midIndex === xleft || midIndex === xright || midIndex === xmid || midIndex === rightIndex || midIndex === leftIndex)) {
    midIndex = randomNumber(0, ImgVots.all.length - 1);

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
renderIndex();
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// let submitRound = document.getElementById('submitrounds');

// function submitRounds(event) {
//   console.log(event);
//   let i = event.target.textbox.value;
//   console.log(i);
// }
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
let section = document.getElementById('votes');
section.addEventListener('click', clickfun);

function clickfun(event) {
  xleft = leftIndex;
  xright = rightIndex;
  xmid = midIndex;
  // console.log(event.target.id);
  if (numberofRounds < defultRounds) {
    if (event.target.id == 'leftimg' || event.target.id == 'midimg' || event.target.id == 'rightimg') {
      if (event.target.id === 'leftimg') {
        ImgVots.all[leftIndex].votes = ImgVots.all[leftIndex].views + 1;
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
      renderIndex();
    }
    // votandview();
  }
  else if (numberofRounds === defultRounds) {

    alert('check the result The  Rounds is finished ');
    numberofRounds = 0;
    clickfun3(event);
    section.removeEventListener('click', clickfun);
    section2.removeEventListener('submit', clickfun3);
    let section3 = document.getElementById('result1');
    section3.value = 'Reset';
  }

}
////////////////////////////////////////////////////////////////////////////////////
let section1 = document.getElementById('submitrounds');
section1.addEventListener('submit', clickfun1);

function clickfun1(event) {
  event.preventDefault();
  // console.log(event.target);
  let order = event.target.roundvalu.value;
  let x = Math.floor(order);

  if (typeof x === 'Number' || x > 0) {

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

  votandview();
  chartvotview();
  // let resulttable = document.getElementById('resultable');
  // let tableresult = document.createElement('table');
  // resulttable.appendChild(tableresult);
 

  let ulEl = document.getElementById('imglist');

  // let trEl = document.createElement('tr');
  // tableresult.appendChild(trEl);

  // let th0El = document.createElement('th');
  // trEl.appendChild(th0El);
  // th0El.textContent = 'Image Name';
  // let thEl = document.createElement('th');
  // trEl.appendChild(thEl);
  // thEl.textContent = 'Votes';

  // let th1El = document.createElement('th');
  // trEl.appendChild(th1El);
  // th1El.textContent = 'views';

  for (let i = 0; i < ImgVots.all.length; i++) {
    let liEL = document.createElement('li');
    ulEl.appendChild(liEL);
    liEL.textContent = `${ImgVots.all[i].name} have a ${ImgVots.all[i].views} views and ${ImgVots.all[i].votes} votes`;

    // let tr1El = document.createElement('tr');
    // tableresult.appendChild(tr1El);

    // let tdEl = document.createElement('td');
    // tr1El.appendChild(tdEl);
    // tdEl.textContent = ImgVots.all[i].name;

    // let td1El = document.createElement('td');
    // tr1El.appendChild(td1El);
    // td1El.textContent = ImgVots.all[i].votes;

    // let td2El = document.createElement('td');
    // tr1El.appendChild(td2El);
    // td2El.textContent = ImgVots.all[i].views;


  }
  //  section2.removeEventListener('submit', clickfun3);

}

// console.log(event);

// let order = event.target.result1.value;

// console.log(order);
// console.log(typeof order);
// let y = order;
// console.log( y);  tableresult
// let resulttable=document.getElementById('resulttable');
// resulttable.appendChild()

function votandview() {

  for (let i = 0; i < ImgVots.all.length; i++) {
    totalvotes.push(ImgVots.all[i].votes);
    // console.log(totalvotes);
    totalviews.push(ImgVots.all[i].views);
    // console.log(totalviews);
  }
}

function chartvotview() {

  section.removeEventListener('click', clickfun);
    section2.removeEventListener('submit', clickfun3);
    let section3 = document.getElementById('result1');
    section3.value='Reset';

  let ctx = document.getElementById('myChart').getContext('2d');
  let chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'bar',

    // The data for our dataset
    data: {
      labels: imgsNames,

      datasets: [{
        label: 'Votes Chart',
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: totalvotes


      },
      {
        label: 'Views Chart',
        backgroundColor: 'rgba(15, 204, 72, 0.5)',
        borderColor: 'rgba(15, 204, 72, 0.5)',
        data: totalvotes


      }
      ]




    },

    // Configuration options go here
    options: {

    }
  });
}

// var pugbombButton = document.getElementById('pugbomb');
// pugbombButton.addEventListener('click', pugbombButtonHandler);

// function pugbombButtonHandler() {
//   alert('PUGBOMB!!!!');
// }
