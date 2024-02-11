// document.addEventListener('DOMContentLoaded',()=>{
//     const addToCartButtons = document.getElementById('add-to-cart')
//     // console.log(addToCartButtons); // tell me if addToCartButtons is selecting the correct elements
//     // // const addToCartButton = document.querySelectorAll('.add-to-cart');
//     const cartItemCount = document.querySelector('.cart-icon span');
//     const cartItemList = document.querySelector('.cart-items');
//     const cartTotal = document.querySelector('.cart-total');
//     const cartIcon = document.getElementById('cart-icon');
//     const siderbar = document.getElementById('sidebar');


//     let cartItems =[];
//     let totalAmount = 0;

//     addToCartButtons.forEach((button, index)=>{
//         button.addEventListener('click',()=>{
//             const item ={
//                 name: document.querySelectorAll('.card .card-title')[index].textContent, 
//                 price: parseFloat( 
//                     document.querySelectorAll('.price')[index].textContent.slice(1),
//                 ),
//                 quantity:1,
//             };
//             const existingItem = cartItems.find(
//                 (cartItem)=> cartItem.name === item.name,
//             );
//             if(existingItem){
//                 existingItem.quantity++;
//             }else{
//                 cartItems.push(item);
//             }
//             totalAmount +=item.price;

//             updateCartUI();
//         });

//         function updateCartUI(){
//             updateCartItemCount(cartItems.length);
//             updateCartItemList();
//             updateCartTotal();
//         }
        
//         function updateCartItemCount(count){
//             cartItemCount.textContent=count;
//         }

//         function updateCartItemList(){
//             cartItemList.innerHTML = '';
//             cartItems.forEach((item,index)=> {
//                 const cartItem =  document.createElement('div');
//                 cartItem.classList.add('cart-item','individual-cart-item');
//                 cartItem.innerHTML=`
//                 <span>(${item.quantity}x) ${item.name}</span>
//                 <span>${(item.price * item.quantity).toFixed(2)}

//                 <button class="remove-btn" data-index="${index}"><i class='bx bxs-shopping-bag-alt' id="cart-icon"><span>0 </span></i>
//                 </button>
//                 </span>
//                 `;

//                 cartItemList.append(cartItem);
//             });

//             const removeButtons = document.querySelectorAll('.sidebar-close');
//             removeButtons.forEach((button)=>{
//                 button.addEventListener('click',(event)=>{
//                 const index = event.target.dataset.index;
//                 removeItemFromCart(index);
//             });
//         });
//         }
//         function removeItemFromCart(index){
//             const removeItem = cartItems.splice(index,1)[0];
//             totalAmount -= removeItem.price* removeItem.quantity;
//             updateCartUI();
//         }
//         function updateCartTotal(){
//             cartTotal.textContent ='$${totalAmount.toFixed(2)}';
//         }
//         cartIcon.addEventListener('click',() => {
//             sidebar.classList.toggle('open');
//         });
//         const closeButton = document.querySelector('removeButtons');
//         closeButton.addEventListener('click',()=>
//         sidebar.classList.remove('open')
//         )
//     });

// });





// sncjkscdscds

const cartIcon = document.getElementById('cart-icon');

const siderbar = document.getElementById('sidebar');
let cart = {
    items: [],
    total: 0
  };
  
  function addToCart(title, price) {
    // Check if item is already in the cart and increase the quantity
    const existingItem = cart.items.find(item => item.title === title);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      // If not, add a new item with quantity 1
      cart.items.push({ title, price, quantity: 1 });
    }
  
    // Update total price
    cart.total += price;
  
    // Update cart display
    updateCartDisplay();
  }
  
  function updateCartDisplay() {
    // Reference to the sidebar cart items container and total
    const cartItemsContainer = document.querySelector('.cart-items');
    const cartTotal = document.querySelector('.cart-total');
    
    // Clear the current cart items container content
    cartItemsContainer.innerHTML = '';
    
    // Loop through cart items and append them to cart items container
    cart.items.forEach(item => {
      const itemElement = document.createElement('div');
      itemElement.innerHTML = `${item.title} - Quantity: ${item.quantity} - Price: &#8377; ${item.price * item.quantity}`;
      cartItemsContainer.appendChild(itemElement);
    });
    
    // Update total price
    cartTotal.innerHTML = `&#8377; ${cart.total.toFixed(2)}`;
    
    // Update cart icon count
    const cartIconCount = document.querySelector('#cart-icon span');
    const totalCount = cart.items.reduce((acc, item) => acc + item.quantity, 0);
    cartIconCount.textContent = totalCount;
  }
  
  // Event listener setup for each add-to-cart button
  document.querySelectorAll('.bx-cart-add').forEach(button => {
    button.addEventListener('click', (event) => {
      // Get the closest card that contains button
      const card = button.closest('.card');
      
      // Retrieve title and price of the product
      const title = card.querySelector('.card--title').textContent;
      const priceText = card.querySelector('.price').textContent;
      const price = parseFloat(priceText.replace(/[\u20B9\s]/g, '')); // Remove Rupee symbol and whitespace
  
      // Call addToCart function with title and price of product
      addToCart(title, price);
    });
  });



// NEW ONE



// document.addEventListener('DOMContentLoaded', () => {
//     const addToCartButtons = document.querySelectorAll('.add-to-cart');
//     console.log(addToCartButtons); // Check if addToCartButtons is selecting the correct elements
//     const cartItemCount = document.querySelector('.cart-icon span');
//     const cartItemList = document.querySelector('.cart-items');
//     const cartTotal = document.querySelector('.cart-total');
//     const cartIcon = document.querySelector('.cart-icon');
//     const sidebar = document.getElementById('sidebar');

//     let cartItems = [];
//     let totalAmount = 0;

//     addToCartButtons.forEach((button, index) => {
//         button.addEventListener('click', () => {
//             const item = {
//                 name: document.querySelectorAll('.card .card-title')[index].textContent,
//                 price: parseFloat(document.querySelectorAll('.price')[index].textContent.slice(1)),
//                 quantity: 1,
//             };
//             const existingItem = cartItems.find(
//                 (cartItem) => cartItem.name === item.name,
//             );
//             if (existingItem) {
//                 existingItem.quantity++;
//             } else {
//                 cartItems.push(item);
//             }
//             totalAmount += item.price;
//             updateCartUI();
//         });
//     });

//     function updateCartUI() {
//         updateCartItemCount(cartItems.length);
//         updateCartItemList();
//         updateCartTotal();
//     }

//     function updateCartItemCount(count) {
//         cartItemCount.textContent = count;
//     }

//     function updateCartItemList() {
//         cartItemList.innerHTML = '';
//         cartItems.forEach((item, index) => {
//             const cartItem = document.createElement('div');
//             cartItem.classList.add('cart-item', 'individual-cart-item');
//             cartItem.innerHTML = `
//                 <span>(${item.quantity}x) ${item.name}</span>
//                 <span>${(item.price * item.quantity).toFixed(2)}</span>
//                 <button class="remove-btn" data-index="${index}"><i class="fa-solid fa-times"></i></button>
//             `;
//             cartItemList.append(cartItem);
//         });
//         const removeButtons = document.querySelectorAll('.remove-btn');
//         removeButtons.forEach((button) => {
//             button.addEventListener('click', (event) => {
//                 const index = event.target.dataset.index;
//                 removeItemFromCart(index);
//             });
//         });
//     }

//     function removeItemFromCart(index) {
//         const removedItem = cartItems.splice(index, 1)[0];
//         totalAmount -= removedItem.price * removedItem.quantity;
//         updateCartUI();
//     }

//     function updateCartTotal() {
//         cartTotal.textContent = `$${totalAmount.toFixed(2)}`;
//     }

//     cartIcon.addEventListener('click', () => {
//         sidebar.classList.toggle('open');
//     });

//     const closeButton = document.querySelector('.sidebar-close');
//     closeButton.addEventListener('click', () =>
//         sidebar.classList.remove('open')
//     );
// });

