//load categories fnc
const loadCategories = async()=>{
  try{
  const res = await fetch('https://openapi.programming-hero.com/api/phero-tube/categories');
  const data = await (res.json());
  displayCategories(data.categories);
  
  }
  catch(error){
  ((error)=>console.log('Api fetch error is :',error));
  }
  }
  
  //display categories items
  const displayCategories = async(dataCategories)=>{
    const buttonContainer = document.getElementById('button-container');
    dataCategories.forEach((item) => {
    // console.log(item);
    const buttonDiv = document.createElement('div');
    buttonDiv.innerHTML = `
    <button onclick="categoriesWiseFetch(${item.category_id})" class='btn'>
    ${item.category}
    </button>
    `;
    buttonContainer.append(buttonDiv);
    });
    
    }    
  
    
  //loadVideo api hit
  const loadVideos = async()=>{
    try{
    const res = await fetch('https://openapi.programming-hero.com/api/phero-tube/videos');
    const data = await (res.json());
    displayVideos(data.videos);
    
    }
    catch(error){
    ((error)=>console.log('Api fetch error is :',error));
    }
    }
  
    // get time hours
    function getTimeString(time){
             const hour = parseInt(time / 3600);
             let remainingSecond = parseInt(time % 3600);
            const minute = parseInt(remainingSecond / 60);
            remainingSecond = remainingSecond % 60 ;
       return `${hour} hour ${minute} minute ${remainingSecond} second ago`
  
    }
    console.log(getTimeString(2251));
  
    //categories wise fetch function
    const categoriesWiseFetch = async(id)=>{
    const res = await fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`);
  const data = await (res.json());
  displayVideos(data.category);
  
  
    }
    // show displayVideos api hit
  
  const displayVideos = async(dataVideos)=>{
    //console.log(dataVideos);
    const divContainer = document.getElementById('videos');
     divContainer.innerHTML="";
     if(dataVideos.length === 0){
      divContainer.innerHTML="Oops! Sorry, there are no content here!"
     }
    dataVideos.forEach((item) => {
    //console.log(item);
    const {thumbnail}= item;
    const cardDiv = document.createElement('div');
    cardDiv.classList.add('card', 'card-compact')
    cardDiv.innerHTML=`
    <figure class="h-[200px] relative">
    
      <img class="w-full h-full object-cover" 
        src=${thumbnail}
        alt="Shoes" />
       ${item.others.posted_date?.length === 0 ? "":`<span class="absolute right-2 bottom-2 bg-black text-xs text-white rounded p-1">${getTimeString(item.others.posted_date)}</span>`}
       
    </figure>
    <div class="px-0 py-2 flex gap-2 items-center">
      <div class="">
      <img class="h-10 w-10 rounded-full object-cover bg-center" src=${item.authors[0].profile_picture} />
      </div>
      <div class="">
      <h3 class="font-bold">${item.title}</h3>
      <div class="flex items-center gap-2">
      <p class='text-gray-400'>${item.authors[0].profile_name}</p>
      ${item.authors[0].verified === true ? `<span><img class='h-5 w-5' src="https://img.icons8.com/?size=100&id=D9RtvkuOe31p&format=png&color=000000"/></span>`:''}
      </div>
      <p class='text-gray-400 '>${item.others.views}</p>
      </div>
    </div>
    `;
    divContainer.append(cardDiv);
    });
    }
  
  
  loadCategories();
  loadVideos();