const loadPhones = async(searchText, dataLimit)=>{
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data, dataLimit)
}

const displayPhones = (phones, dataLimit) =>{
    const phonesContainer = document.getElementById("phone-container");
    phonesContainer.textContent = '';
    // display 10 phones only
    const seeAll = document.getElementById("see-all");
    if(dataLimit && phones.length > 10){
       phones = phones.slice(0, 10);
       seeAll.classList.remove('d-none'); 
    }
    else{
       seeAll.classList.add('d-none');  
    }
    
    // display no phones found warning msg........
    const noPhones = document.getElementById("no-found-msg");
      if(phones.length === 0){
        noPhones.classList.remove('d-none');
      }
      else{
        noPhones.classList.add('d-none');
      }
    //display all phones 
    phones.forEach(phone => {
    const phoneDiv = document.createElement('div');
    phoneDiv.classList.add('col');
     phoneDiv.innerHTML =`
     <div class="card p-4">
     <img src="${phone.image}" class="card-img-top" alt="">
     <div class="card-body">
     <h5 class="card-title">${phone.phone_name}</h5>
     <p class="card-text">This is a longer card ...</p>
     <button onclick="loadPhoneDetails('${phone.slug}')" href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneDetailModal">Show Details</button>
     </div>
     </div>
     `;
     phonesContainer.appendChild(phoneDiv);   
    });
    // stop loader....................
    toggleSpinner(false);

}

const processSearch = (dataLimit) =>{
    toggleSpinner(true);
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value; 
  loadPhones(searchText, dataLimit);
}
// Handle search button click..............
document.getElementById("btn-search").addEventListener('click', function(){
    // start loader or spinner
    processSearch(10)
})

// add enter button for search..........
document.getElementById("search-field").addEventListener("keypress", function(e){
  if(e.key ==='Enter'){
    processSearch(10);
  }  
})
// .........................
const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById("loader");
    if(isLoading){
        loaderSection.classList.remove('d-none')
    }
    else{
      loaderSection.classList.add('d-none');  
    }
}
// not the best way.but for some day using this.
document.getElementById("btn-see-all").addEventListener('click', function(){
   processSearch();
})
const loadPhoneDetails = async id =>{
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhoneDetail(data.data);
}

const displayPhoneDetail = phone =>{
   console.log(phone);
   const modalTitle = document.getElementById("phoneDetailModalLabel");
   modalTitle.innerText = phone.name;
  const phonesDetails = document.getElementById("phone-details");
  phonesDetails.innerHTML = `
  <p>Release Date : ${phone.releaseDate ? phone.releaseDate : 'No Release Date.'}</p>
  <p>Storage : ${phone.mainFeatures
? phone.mainFeatures.storage : 'Sorry!! No Storage Details.'  } 
  <p>Others : ${phone.others ? phone.others.Bluetooth : 'No Bluetooth Information.'}
  `
}
loadPhones('apple');