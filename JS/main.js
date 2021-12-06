window.onscroll = function () {
  if (window.pageYOffset > 550) {
    document.getElementById("header").style.backgroundColor = "Black";
    document.getElementById("brand").style.color = "white";
  } else {
    document.getElementById("header").style.backgroundColor = "transparent";
    document.getElementById("brand").style.color = "black";
  }
};

let sellProperty = [];
propertyContents = document.getElementById("propertyContentsRow");

const addCard = () => {
  const newPropertyDetails = {
    id: `${Date.now()}`,
    url: document.getElementById("imgUrl").value,
    title: document.getElementById("cardTitle").value,
    text: document.getElementById("cardText").value,
    address: document.getElementById("cardAddress").value,
  };
  console.log(newPropertyDetails);
  console.log(newPropertyDetails.id);

  propertyContents.insertAdjacentHTML(
    "beforeend",
    generatePropertyCard(newPropertyDetails)
  );

  sellProperty.push(newPropertyDetails);
  saveToLocalStorage();
};


const generatePropertyCard = ({ id, url, text, title, address }) => {
  return `<div class="col-md-3 mb-5" id=${id} key=${id}>
            <div class="card" >
                <img src=${url} alt="">
                <h3 class="details">${title}</h3>
                <div class="details flex-wrap">
                  <h4 class="detail">${text}</h4> 
                 
                </div>
                <h4 class="detail">${address}</h4>
            <div class="card-footer">
            <div class="d-flex  justify-content-evenly footer-card">
               <button class="btn" data-bs-toggle="modal" data-bs-target="#showTask" name=${id} onclick="saveEditProperty(this)">save</button>
               <button type="button" class="btn me-2" name=${id}  onclick="editProperty(this)">
                 <i class="fas fa-pencil-alt"></i>
               </button>
               <button type="button" class="btn" name=${id} onclick="deleteProperty(this)">
                 <i class="fas fa-trash"></i>
               </button>
            </div>
            </div>
         </div>`;
};

const saveToLocalStorage = () => {
  localStorage.setItem("propertyStorage", JSON.stringify({ pstorage: sellProperty }));
};

const reloadPropertyCard = () => {
  const localStorageCopy = JSON.parse(localStorage.getItem("propertyStorage"));
  console.log(localStorageCopy);
  if (localStorageCopy) {
    sellProperty = localStorageCopy["pstorage"];
  }
  console.log(sellProperty);
  sellProperty.map((cardData) => {
    propertyContents.insertAdjacentHTML("beforeend", generatePropertyCard(cardData));
  });
};


const deleteProperty = (e) => {
  const targetID = e.getAttribute("name");
  sellProperty = sellProperty.filter((cardData) => cardData.id !== targetID);
  saveToLocalStorage();
  window.location.reload();
};

const editProperty = (e) => {
  const targetID = e.getAttribute("name");
  console.log(targetID);
  console.log(e);
  console.log(e.parentNode);
  console.log(e.parentNode.parentNode);
  console.log(e.parentNode.parentNode.parentNode);
  console.log(e.parentNode.parentNode.parentNode.childNodes);
  console.log(e.parentNode.parentNode.parentNode.childNodes[3]);
  console.log(e.parentNode.parentNode.parentNode.childNodes[5]);
  console.log(e.parentNode.parentNode.parentNode.childNodes[7]);
  console.log(
    e.parentNode.parentNode.parentNode.childNodes[9].childNodes[1].childNodes[1]
  );

  e.parentNode.parentNode.parentNode.childNodes[3].setAttribute(
    "contenteditable",
    "true"
  );
  e.parentNode.parentNode.parentNode.childNodes[5].setAttribute(
    "contenteditable",
    "true"
  );
  e.parentNode.parentNode.parentNode.childNodes[7].setAttribute(
    "contenteditable",
    "true"
  );
  e.parentNode.parentNode.parentNode.childNodes[9].childNodes[1].childNodes[1].innerHTML =
    "SAVE";

  e.parentNode.parentNode.parentNode.childNodes[9].childNodes[1].childNodes[1].setAttribute(
    "onclick",
    "saveEditProperty(this)"
  );
};

const saveEditProperty = (e) => {
  console.log(e);
  const targetID = e.getAttribute("name");
  console.log(targetID);
  console.log(e.parentNode.parentNode.parentNode.childNodes);
  const submitButton =
    e.parentNode.parentNode.parentNode.childNodes[9].childNodes[1].childNodes[1];
  console.log(submitButton);
  const title = e.parentNode.parentNode.parentNode.childNodes[3].innerHTML;
  console.log(title);
  const text = e.parentNode.parentNode.parentNode.childNodes[5].innerHTML;
  console.log(text);
  const address = e.parentNode.parentNode.parentNode.childNodes[7].innerHTML;
  console.log(address);
  let Ftarget = sellProperty.filter((cardData) => {
    if (cardData.id === targetID) {
      cardData.title = title;
      cardData.text = text;
      cardData.address = address;
    }
    // console.log(cardData);
    return cardData;
  });
  console.log(Ftarget);
  sellProperty = Ftarget;
  console.log(sellProperty);
  saveToLocalStorage();
  cardText.setAttribute("contenteditable", "false");
  cardTitle.setAttribute("contenteditable", "false");
  cardAddress.setAttribute("contenteditable", "false");
  submitButton.setAttribute("onclick", "saveEditProperty(this)");
 
};
