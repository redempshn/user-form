import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  doc,
  deleteDoc,
} from "firebase/firestore/lite";

const firebaseConfig = {
  apiKey: "AIzaSyDX1xAUvwRYEfKH7Sfte1r9YkLo9F3h0Zs",
  authDomain: "user-form-b9ca4.firebaseapp.com",
  projectId: "user-form-b9ca4",
  storageBucket: "user-form-b9ca4.appspot.com",
  messagingSenderId: "290413364972",
  appId: "1:290413364972:web:79b11a7b5d9e26b3d2c7c9",
  measurementId: "G-1PPFTGJS4H",
};

// init services
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const colRef = collection(db, "users");

// get data
getDocs(colRef)
  .then((snapshot) => {
    // for values
    let usersArr = [];

    snapshot.docs.forEach((doc) => {
      usersArr.push({ ...doc.data(), id: doc.id });
    });

    showUser(usersArr);
  })
  .catch((error) => {
    console.log(error);
  });

// form actions
const form = document.getElementById("form");

let username = document.getElementById("name");
let email = document.getElementById("email");
let phone = document.getElementById("phone");
let avatar = document.getElementById("avatar");
let date = document.getElementById("date");

//main
let main = document.querySelector(".main");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  correctInputs();
});

function correctInputs() {
  const nameValue = username.value.trim();
  const emailValue = email.value.trim();
  const phoneValue = phone.value.trim();
  const avatarValue = avatar.value.trim();
  const dateValue = date.value.trim();

  addDoc(colRef, {
    avatar: avatarValue,
    date: dateValue,
    email: emailValue,
    name: nameValue,
    phone: phoneValue,
  }).then(() => {
    form.reset();
  });

  //username
  if (nameValue === "") {
    setErrorFor(username);
  } else {
    setSuccessFor(username);
  }

  //email
  if (emailValue === "") {
    setErrorFor(email);
  } else if (!isEmail(emailValue)) {
    setErrorFor(email);
  } else {
    setSuccessFor(email);
  }

  //phone
  if (phoneValue === "") {
    setErrorFor(phone);
  } else {
    setSuccessFor(phone);
  }

  //avatar
  if (avatarValue === "") {
    setErrorFor(avatar);
  } else {
    setSuccessFor(avatar);
  }

  if (dateValue === "") {
    setErrorFor(date);
  } else {
    setSuccessFor(date);
  }
}

function setErrorFor(input) {
  const formItem = input.parentElement;

  formItem.className = "form-item error";
}
function setSuccessFor(input) {
  const formItem = input.parentElement;

  formItem.className = "form-item success";
}

function isEmail(email) {
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );
}

// show user in main
function showUser(array) {
  const ul = document.createElement("ul");
  ul.classList.add("wrapper");

  array.forEach((user) => {
    //<li class="item">
    const li = document.createElement("li");
    li.classList.add("item");

    //<div class="img-container">
    const imgContainer = document.createElement("div");
    imgContainer.classList.add("img-container");

    //<img src=${user.avatar} alt="avatar" class="image">
    const image = document.createElement("img");
    image.classList.add("image");
    image.setAttribute("src", `${user.avatar}`);
    image.setAttribute("alt", "avatar");
    imgContainer.appendChild(image);
    li.appendChild(imgContainer);

    //<div class="info">
    const info = document.createElement("div");
    info.classList.add("info");
    li.appendChild(info);

    //<p class="info-item">User name: ${user.name}</p>
    const itemName = document.createElement("p");
    itemName.classList.add("info-item");
    itemName.innerHTML = `User name: ${user.name}`;
    info.appendChild(itemName);

    //<p class="info-item">Birthday: ${user.date}</p>
    const itemDate = document.createElement("p");
    itemDate.classList.add("info-item");
    itemDate.innerHTML = `Birthday: ${user.date}`;
    info.appendChild(itemDate);

    //<p class="info-item">Email: ${user.email}</p>
    const itemEmail = document.createElement("p");
    itemEmail.classList.add("info-item");
    itemEmail.innerHTML = `Email: ${user.email}`;
    info.appendChild(itemEmail);

    //<span class="info-item">Phone number: ${user.phone}</span>
    const itemPhone = document.createElement("span");
    itemPhone.classList.add("info-item");
    itemPhone.innerHTML = `Phone number: ${user.phone}`;
    info.appendChild(itemPhone);

    //<button type="button" class="delete">delete</button>
    const deleteButton = document.createElement("button");

    deleteButton.addEventListener("click", () => {
      deleteDoc(doc(db, "users", user.id));
    });

    deleteButton.classList.add("delete");
    deleteButton.setAttribute("type", "button");
    deleteButton.innerHTML = "delete";
    li.appendChild(deleteButton);

    ul.appendChild(li);
  });

  main.appendChild(ul);
}
