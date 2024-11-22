
const fetchImg = async(petId)=>{
  (petId)
const res = await fetch(`https://openapi.programming-hero.com/api/peddy/pet/${petId}`);
const data =await res.json();
likeBtn(data.petData.image)
console.log(data.petData.image)
};
const likeBtn = (petData)=>{
  const btnId = document.getElementById('like-imageContainer');
  const imageDiv = document.createElement('div');
  imageDiv.innerHTML = `
  <img class='rounded-lg' src='${petData}'/>

  `;
  btnId.appendChild(imageDiv);
}

function showSpinner(data) {
  const spinner = document.getElementById('spinner');
  spinner.style.display = 'block';
  setTimeout(() => {
      spinner.style.display = 'none';
      displayAllPets(data);
  }, 2000);
}
const showModal = (petId)=>{
 modal.showModal();
  
  let adfBtn = document.getElementById(`adfBtn${petId}`);
 
  console.log(adfBtn)
  
  const timer = document.getElementById('BtnCount');
  console.log(timer);
  const countDwn = setInterval(() => {
    timer.innerText = parseInt(timer.innerText)-1;
  
  }, 500);
  
  setTimeout(() => {
    clearInterval(countDwn);
    let modal = document.getElementById('modal');
    
    modal.close();
    adfBtn.innerText='Adopted';
    adfBtn.setAttribute("disabled", true);
    adfBtn.classList.add('disabled:text-gray-400')
    timer.innerText=3;
  }, 1800);

}
