'use strict';
getItem();

function rndmNmbr(min, max){
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

var itemImages = [
  'bag.jpg',
  'banana.jpg',
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
  'wine-glass.jpg',
];

var leftItemImage= document.querySelector('#left_item_img');
var middleItemImage= document.querySelector('#middle_item_img');
var rightItemImage= document.querySelector('#right_item_img');
var actionSection= document.querySelector('#all_items');
console.log(actionSection);
var leftRndmItem= [];
var middleRndmItem= [];
var rightRndmItem= [];
var items= [];
var noDuplicateCheck= [];
var totalClicks= 0;


function CoolItem(){
  this.name= itemImages[i].slice(0,-4);
  this.urlImage = `imgs/${itemImages[i]}`;
  this.clickPerImg= 0;
  this.totalViews= 0;

  items.push(this);

}


function getRndmItems(){
  leftRndmItem= items[rndmNmbr(0, items.length-1)];
  middleRndmItem= items[rndmNmbr(0, items.length-1)];
  rightRndmItem= items[rndmNmbr(0, items.length-1)];
  while (leftRndmItem === middleRndmItem || leftRndmItem === rightRndmItem || middleRndmItem === rightRndmItem
  || noDuplicateCheck.includes(leftRndmItem) || noDuplicateCheck.includes(middleRndmItem) || noDuplicateCheck.includes(rightRndmItem)){
    leftRndmItem= items[rndmNmbr(0, items.length-1)];
    middleRndmItem= items[rndmNmbr(0, items.length-1)];
    rightRndmItem= items[rndmNmbr(0, items.length-1)];
    console.log('everything');
  }


  noDuplicateCheck.push(leftRndmItem);
  noDuplicateCheck.push(middleRndmItem);
  noDuplicateCheck.push(rightRndmItem);

  if (noDuplicateCheck.length > 3) {
    noDuplicateCheck.shift();
    noDuplicateCheck.shift();
    noDuplicateCheck.shift();
  }
  leftItemImage.setAttribute('src', leftRndmItem.urlImage);
  middleItemImage.setAttribute('src', middleRndmItem.urlImage);
  rightItemImage.setAttribute('src', rightRndmItem.urlImage);
  leftItemImage.setAttribute('alt', leftRndmItem.name);
  middleItemImage.setAttribute('alt', middleRndmItem.name);
  rightItemImage.setAttribute('alt', rightRndmItem.name);
}

for (var i = 0; i < itemImages.length; i++) {
  new CoolItem(itemImages[i]);
}

function setItem(){
  var itemStats = JSON.stringify(items);
  localStorage.setItem( 'itemInfo', itemStats);
}
function getItem(){
  var itemInfo = localStorage.getItem('itemInfo');
  items = JSON.parse(itemInfo);
  console.log(itemInfo);
}



actionSection.addEventListener('click', imgSelected);
getRndmItems();

console.log(actionSection);
function imgSelected(e) {

  if (e.target.id === 'left_item_img' || e.target.id === 'middle_item_img' || e.target.id === 'right_item_img') {
    getRndmItems();
    totalClicks++;
    leftRndmItem.totalViews++;
    middleRndmItem.totalViews++;
    rightRndmItem.totalViews++;
    if (e.target.id === 'left_item_img') {
      leftRndmItem.clickPerImg++;
    }
    if (e.target.id === 'middle_item_img') {
      middleRndmItem.clickPerImg++;
    }
    if (e.target.id === 'right_item_img') {
      rightRndmItem.clickPerImg++;
    }
  }
  if (totalClicks === 5) {
    actionSection.removeEventListener('click', imgSelected);
    leftItemImage.remove();
    middleItemImage.remove();
    rightItemImage.remove();
    var messageId= document.querySelector('#msgid');
    messageId.append('Out of Clicks!');
    var results= document.getElementById('results');
    for (var v = 0; v < itemImages.length; v++) {
      var liEl= document.createElement('li');
      results.appendChild(liEl);
      liEl.append(`${items[v].name} had ${items[v].clickPerImg} votes and was shown ${items[v].totalViews} times`);
    }
    showResults();
  }
}





function showResults(){
  var itemsNamesArr= [];
  var itemsClicksArr= [];
  var itemsViewsArr= [];
  for (var i = 0; i < items.length; i++) {
    var itemName = items[i].name;
    itemsNamesArr.push(itemName);
    var itemClicks= items[i].clickPerImg;
    itemsClicksArr.push(itemClicks);
    var itemViews = items[i].totalViews;
    itemsViewsArr.push(itemViews);
  }
  setItem();


  var ctx = document.getElementById('myItemsChart').getContext('2d');
  var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: itemsNamesArr,
      datasets: [{
        label: '# of Clicks',
        data: itemsClicksArr,
        backgroundColor:
          'rgba(153, 102, 255, 0.2)',
        borderColor:
          'rgba(255, 99, 132, 1)',
        borderWidth: 1
      }, {
        label: '# of Views',
        data: itemsViewsArr,
        backgroundColor:
        'rgba(255, 206, 86, 0.2)',
        borderColor:
        'rgba(153, 102, 255, 1)',
        borderWidth: 1
      }],
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
}
