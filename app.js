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
var items= [];
var totalClicks= 1;


function CoolItem(name){
  var description= itemImages[i].slice(0,-4);
  // var clickPerImg= 0;
  // var totalViews= 0;
  this.description= description;
  this.urlImage = `imgs/${name}`;
  items.push(this);
}

function getRndmItems(){
  var leftRndmItem= items[rndmNmbr(0, items.length-1)];
  var middleRndmItem= items[rndmNmbr(0, items.length-1)];
  var rightRndmItem= items[rndmNmbr(0, items.length-1)];
  if (leftRndmItem !== middleItemImage && leftRndmItem !== rightRndmItem && middleRndmItem !== rightRndmItem){
    leftItemImage.setAttribute('src', leftRndmItem.urlImage);
    middleItemImage.setAttribute('src', middleRndmItem.urlImage);
    rightItemImage.setAttribute('src', rightRndmItem.urlImage);
    leftItemImage.setAttribute('alt', leftRndmItem.description);
    middleItemImage.setAttribute('alt', middleRndmItem.description);
    rightItemImage.setAttribute('alt', rightRndmItem.description);
  }
}

for (var i = 0; i < itemImages.length; i++) {
  new CoolItem(itemImages[i]);
  // if (document.img.alt === description) {
  //   totalViews++;
  //   clickPerImg++;
  // }
}

getRndmItems();
console.log(items);

function imgSelected(e) {
  if (e.target.id === 'left_item_img' || e.target.id === 'middle_item_img' || e.target.id === 'right_item_img') {
    getRndmItems();
    totalClicks++;
  }
  if (totalClicks === 25) {
    actionSection.removeEventListener('click', imgSelected);
    leftItemImage.remove();
    middleItemImage.remove();
    rightItemImage.remove();
    var messageId= document.querySelector('#msgid');
    messageId.append('Out of Clicks!');
    for (var v = 0; v < itemImages.length; v++) {
      // messageId.append(`${CoolItem.description} had ${clickPerImg} votes and was shown ${totalViews} times`);
    }
  }
}
actionSection.addEventListener('click', imgSelected);

function rndmNmbr(min, max){
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
