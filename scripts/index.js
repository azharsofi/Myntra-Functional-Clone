let bagItems;
onLoad();

function onLoad(){
  let bagItemsStr=localStorage.getItem('bagItems');
  bagItems=bagItemsStr?JSON.parse(bagItemsStr):[];
  displayItemsOnHomePage();
  displayBagIcon();

}

function addtobag(itemId){
  bagItems.push(itemId);
  localStorage.setItem('bagItems',JSON.stringify(bagItems));
  displayBagIcon();
}
function displayBagIcon(){
let bagCounter=document.querySelector('.counter');
if(bagItems.length>0){
bagCounter.style.visibility='visible';
bagCounter.innerText=bagItems.length;
}
else{
  bagCounter.style.visibility='hidden';

}

}

function displayItemsOnHomePage() {
let ele=document.querySelector('.items_cont');
if(!ele){
  return ;
}
let innerhtml='';
items.forEach(item=>{
  innerhtml+=
`<div class="item_cont">
<img class="it_img" src="${item.image}" alt="item image">
<div class="rating">
${item.rating.stars} ⭐ | ${item.rating.count}
</div>
<div class="company">${item.company}</div>
<div class="item_name">${item.item_name}</div>
<div class="price">
    <span class="currpr">Rs. ${item.current_price}</span>
    <span class="originalprice">Rs.  ${item.original_price}</span>
    <span class="discount">(${item.discount_percentage}% OFF)</span>
</div>

<button class="btn_add_bag" onclick="addtobag(${item.id});">Add to Bag</button>

</div>`

});
document.querySelector('.items_cont').innerHTML=innerhtml;

}