let bagItemObjects;
onLoad();
function onLoad(){
    loadBagItemsobj();
    display();
    displaySummary();

}
function displaySummary(){
    let totalMRP=0;
    let totalDisc=0;
    let finalPayment=0;
    bagItemObjects.forEach(bagitem=>{
        totalMRP+=bagitem.original_price;
        totalDisc+=bagitem.original_price-bagitem.current_price;
    });
    finalPayment=totalMRP-totalDisc+99;
    let Ele=document.querySelector('.bag-summary');
    Ele.innerHTML=` <div class="bag-details-container">
    <div class="price-header">PRICE DETAILS (${bagItems.length} Items) </div>
    <div class="price-item">
      <span class="price-item-tag">Total MRP</span>
      <span class="price-item-value">₹ ${totalMRP}</span>
    </div>
    <div class="price-item">
      <span class="price-item-tag">Discount on MRP</span>
      <span class="price-item-value priceDetail-base-discount">-₹ ${totalDisc}</span>
    </div>
    <div class="price-item">
      <span class="price-item-tag">Convenience Fee</span>
      <span class="price-item-value">₹ 99</span>
    </div>
    <hr>
    <div class="price-footer">
      <span class="price-item-tag">Total Amount</span>
      <span class="price-item-value">₹ ${finalPayment}</span>
    </div>
  </div>
  <button class="btn-place-order">
    <div class="css-xjhrni">PLACE ORDER</div>
  </button>
</div>`
}
function loadBagItemsobj(){
    console.log(bagItems);
    bagItemObjects=bagItems.map(itemId=>{
        for(let i=0;i<items.length;i++){
           if(itemId==items[i].id){
           return items[i]; 
           }
        }
    });
    console.log(bagItemObjects);
}
function display(){
    let ele=document.querySelector('.bag-items-container');
    innerHtml='';
    bagItemObjects.forEach(bagitem=>{
        innerHtml+=generateItemHtml(bagitem);
    });
    ele.innerHTML=innerHtml;
    

}
function removefrombag(ItemId){
    bagItems=bagItems.filter(bagItemId=>bagItemId!=ItemId);
    localStorage.setItem('bagItems',JSON.stringify(bagItems));
    loadBagItemsobj();
    displayBagIcon();
    display();
    displaySummary();

}

function generateItemHtml(item){
    return `<div class="bag-item-container">
    <div class="item-left-part">
      <img class="bag-item-img" src="../${item.image}">
    </div>
    <div class="item-right-part">
      <div class="company">${item.company}</div>
      <div class="item-name">${item.item_name}</div>
      <div class="price-container">
        <span class="current-price">Rs ${item.current_price}</span>
        <span class="original-price">Rs ${item.original_price}</span>
        <span class="discount-percentage">(${item.discount_percentage} OFF)</span>
      </div>
      <div class="return-period">
        <span class="return-period-days">${item.return_period}</span>days return available
      </div>
      <div class="delivery-details">
        Delivery by
        <span class="delivery-details-days">${item.delivery_date}</span>
      </div>
    </div>

    <div class="remove-from-cart" onclick=removefrombag(${item.id})>X</div>
  </div>`;

}