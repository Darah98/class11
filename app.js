'use strict';
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
var leftRndmItem= [];
var middleRndmItem= [];
var rightRndmItem= [];
var items= [];
var totalClicks= 0;



function CoolItem(name){
  var description= itemImages[i].slice(0,-4);
  this.description= description;
  this.urlImage = `imgs/${name}`;
  this.clickPerImg= 0;
  this.totalViews= 0;
  items.push(this);
}

function getRndmItems(){
  leftRndmItem= items[rndmNmbr(0, items.length-1)];
  middleRndmItem= items[rndmNmbr(0, items.length-1)];
  rightRndmItem= items[rndmNmbr(0, items.length-1)];
  while (leftRndmItem === middleItemImage || leftRndmItem === rightRndmItem || middleRndmItem === rightRndmItem){
    leftRndmItem= items[rndmNmbr(0, items.length-1)];
    middleRndmItem= items[rndmNmbr(0, items.length-1)];
    rightRndmItem= items[rndmNmbr(0, items.length-1)];
    // console.log('everything');
  }
  leftItemImage.setAttribute('src', leftRndmItem.urlImage);
  middleItemImage.setAttribute('src', middleRndmItem.urlImage);
  rightItemImage.setAttribute('src', rightRndmItem.urlImage);
  leftItemImage.setAttribute('alt', leftRndmItem.description);
  middleItemImage.setAttribute('alt', middleRndmItem.description);
  rightItemImage.setAttribute('alt', rightRndmItem.description);
}

for (var i = 0; i < itemImages.length; i++) {
  new CoolItem(itemImages[i]);
}

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
  if (totalClicks === 10) {
    actionSection.removeEventListener('click', imgSelected);
    leftItemImage.remove();
    middleItemImage.remove();
    rightItemImage.remove();
    var messageId= document.querySelector('#msgid');
    messageId.append('Out of Clicks!');
    var results= document.getElementById('results');
    // console.log(results);
    for (var v = 0; v < itemImages.length; v++) {
      var liEl= document.createElement('li');
      results.appendChild(liEl);
      liEl.append(`${items[v].description} had ${items[v].clickPerImg} votes and was shown ${items[v].totalViews} times`);
    }
  }
}
actionSection.addEventListener('click', imgSelected);
getRndmItems();


function rndmNmbr(min, max){
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
