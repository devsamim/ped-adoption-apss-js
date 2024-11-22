// Load categories from API

const loadCategories = async () => {

  try {
    const res = await fetch('https://openapi.programming-hero.com/api/peddy/categories');
    const data = await res.json();
    displayCategories(data.categories);
  } catch (error) {
    console.log('API fetch error is:', error);
  }
};


// Display categories dynamically
const displayCategories = (dataCategories) => {
  const buttonContainer = document.getElementById('button-container');
  dataCategories.forEach((item) => {
   const {category,category_icon}=item;
    const buttonDiv = document.createElement('div');
    buttonDiv.innerHTML = `
      <div class='flex   w-full gap-4'>
      <button id='${category}' onclick='categoriesWiseFetch("${category}")' class='btn  lg:w-[210px] w-[180px] rounded-lg h-[70px] text-xl font-bold text-black p-4 categoryBtn1 relative'>
        <span class="absolute  p-5 h-20 w-20">
          <img class='ml-[-50px]' src='${category_icon}' />
        </span> 
        ${category}
      </button>
       
      </div>
    `;
    buttonContainer.append(buttonDiv);
  });
};



// Fetch pets across all categories

const loadAllPets = async () => {
  try {
    const res = await fetch('https://openapi.programming-hero.com/api/peddy/pets');
    const data = await res.json();
    const spinner = document.getElementById('spinner');
    spinner.classList.remove('hidden');

    document.getElementById('shortById').addEventListener('click',function(pets){
      shortPet(data.pets)
    })
    

    setTimeout(() => {
      spinner.classList.add('hidden');
      displayAllPets(data.pets); 

  }, 2000);

 
  

  
    
  } catch (error) {
    console.log('API fetch error is:', error);
  }



  
};


 const shortPet = (pets)=>{
  const short =pets.sort(function(s,b){

    return b.price-s.price;
   
  });
  displayAllPets(short);

 }



// Fetch pets by specific category
const categoriesWiseFetch = async (category) => {

  try {
   
    const res = await fetch(`https://openapi.programming-hero.com/api/peddy/category/${category}`);
    const data = await res.json();
    let categoryBtn1 = document.getElementsByClassName('categoryBtn1');
    for(const ctButt of categoryBtn1){
      ctButt.classList.remove('rounded-full','border-[#0e7a81]','border-2');
    }
    const cateGoryBtn = document.getElementById(`${category}`);
    cateGoryBtn.classList.add('rounded-full','border-[#0e7a81]','border-2');

    //console.log({data})
    document.getElementById('all-pets').innerHTML="";
    const spinner = document.getElementById('spinner');
    spinner.classList.remove('hidden');
    setTimeout(() => {
      spinner.classList.add('hidden');
      displayAllPets(data.data); 
  }, 2000);
    
  } catch (error) {
  ('API fetch error is:', error);
  }
};
//fetch by single ID
 const loadSinglePet = async (petId) => {
  try {
    const res = await fetch(`https://openapi.programming-hero.com/api/peddy/pet/${petId}`);
    const data = await res.json();
    console.log(data.petData)
    showBySingleId(data.petData);
  } catch (error) {
    console.log('API fetch error is:', error);
  }
};

const showBySingleId = (petId)=>{
  //console.log(petId)
  const {breed,date_of_birth,price,image,gender,pet_details,vaccinated_status,pet_name} =petId;
  modalData.showModal()

  
  const modalDetails = document.getElementById('modalData');
  modalDetails.innerHTML=`

   <div class="modal-box">
   <div>
   <img class="w-full rounded-lg" src=${image} />
  <h3 class="font-bold text-2xl mt-4 mb-4">${pet_name?pet_name:'Not Available'}</h3>
  <div class="grid grid-cols-2">
  <p class=' text-gray-500'><i class="fa-solid fa-table-cells-large"></i> Breed: ${breed?breed:'Not Available'}</p>
  <p class=' text-gray-500 '><i class="fa-regular fa-calendar"></i> Birth: ${date_of_birth?date_of_birth:'Not Available'}</p>
            <p class=' text-gray-500 '><i class="fa-solid fa-venus"></i> Gender: ${gender?gender:'Not Available'}</p>
<p class=' text-gray-500 '><i class="fa-solid fa-dollar-sign"></i> Price: ${price?price:'Not Available'}</p>
<p class=' text-gray-500 '><i class="fa-solid fa-venus"></i> Vaccinated Status: ${vaccinated_status?vaccinated_status:'Under Process!'}</p>
  
  </div>
            <div class="mt-2 text-justify p-4">
            <h1 class="text-xl font-bold text-black">Details Information<h1>
            ${pet_details?pet_details:'N/A'}
            </div>
   </div>
    <div class="modal-action">
      <form class="w-full h-[50px] p-2 font-bold text-xl border rounded-lg bg-[#0E7A811A]" method="dialog">
        <!-- if there is a button in form, it will close the modal -->
        <button class="w-full  text-[#0E7A81]">Cancel</button>
      </form>
    </div>
  </div>
  
  `;

}



// Display fetched pets data
const displayAllPets = (dataPets) => {


  const divContainer = document.getElementById('all-pets');
  
  
  if (dataPets.length === 0) {
     
    divContainer.innerHTML =` "<div class='text-center'>
    <div class="text-center mb-5 ">
    <img class='mx-auto' src='images/error.webp';
    </div>
    
    <p class= 'text-red-500 font-bold mt-10'>Oops! Sorry, there are no pets available in this category!</p></div>"
    `;
  } else {
    divContainer.innerHTML = "";

    dataPets.forEach((item) => {
      const cardDiv = document.createElement('div');
      const {image,pet_name,breed,date_of_birth,gender,price,petId} = item;
     
     
      cardDiv.classList.add('border', 'card', 'card-compact');
      cardDiv.innerHTML = `
        <figure class="h-[200px] p-4 ">
          <img id="image-item" class="w-full h-full object-cover rounded-lg" src=${image} alt="img" />
        </figure>
        <div class="px-0 py-1 flex gap-2 items-center">
          <div>
            <h3 class="font-bold ml-5">${pet_name?pet_name:'Not Available'}</h3>
            <p class='ml-5 text-gray-500'><i class="fa-solid fa-table-cells-large"></i> Breed: ${breed ? breed:'Not Available'}</p>
            <p class='ml-5 text-gray-500 '><i class="fa-regular fa-calendar"></i> Birth: ${date_of_birth?date_of_birth:'Not Available'}</p>
            <p class='ml-5 text-gray-500 '><i class="fa-solid fa-venus"></i> Gender: ${gender?gender:'Not Available'}</p>
            <p class='ml-5 text-gray-500 '><i class="fa-solid fa-dollar-sign"></i> Price: ${price ? price:'Not Available'}</p>
            <div class="flex justify-between items-center ml-4 mt-4 border-t py-4">
              <button id='like${petId}' class="w-10 h-10 border p-2 rounded-lg">
                <img onclick='fetchImg(${petId})' class="w-full" src="https://img.icons8.com/?size=50&id=24816&format=png"/>
              </button>
              <button id="adfBtn${petId}" onclick="showModal('${petId}')" class="text-[#0E7A81] font-bold p-2 ml-4 border rounded-lg">Adopt</button>
              <button onclick="loadSinglePet('${petId}')" class="text-[#0E7A81] font-bold p-2 ml-4 border rounded-lg">Details</button>
            </div>
          </div>
        </div>
      `;
      divContainer.append(cardDiv);
    });
  }
};

// Initial function calls
loadCategories();
loadAllPets();
