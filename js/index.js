const baseUrl = "http://localhost:3000";
document.addEventListener("DOMContentLoaded", function() {
  const ul = document.querySelector("ul");
  const listBook = book => {
    const li = document.createElement("li");
    li.innerText = book.title;
    ul.append(li);
    li.addEventListener("click", () => {
      showBook(book);
    });
  };

  const showBook = book => {
    const show = document.querySelector("#show-panel");
    show.innerHTML = "";
    const title = document.createElement("h1");
    title.innerText = book.title;
    const image = document.createElement("img");
    image.src = book.img_url;
    const description = document.createElement("p");
    description.innerText = book.description;
    const btn = document.createElement("button");
    btn.innerText = "read book";
    const listUsers = document.createElement("ul");
    listUsers.className = "listUsers";
    const listingUsers = () => {
      listUsers.innerHTML = "";
      console.log(book.users);
      book.users.forEach(user => {
        const userP = document.createElement("p");
        userP.innerText = user.username;
        listUsers.append(userP);
      });
    };
    listingUsers();
    show.innerHTML = "";
    show.append(title, image, description, listUsers, btn);
    btn.addEventListener("click", () => {
      const allUser = book.users;
      const finder = allUser.find(singleUser => singleUser.id == 1);
      if (finder == undefined) {
        allUser.unshift({ id: 1, username: "pouros" });
      } else {
        allUser.shift();
      }
      const option = {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json"
        },
        body: JSON.stringify({ users: allUser })
      };
      fetchBooks(`${baseUrl}/books/${book.id}`, option);
      showBook(book);
      init();
    });
  };
  const fetchBooks = (url, option = {}) => {
    if (option == {}) {
      return fetch(url).then(res => res.json());
    } else {
      return fetch(url, option).then(res => res.json());
    }
  };
  const init = () => {
    ul.innerHTML = "";
    fetchBooks(`${baseUrl}/books`).then(books =>
      books.forEach(book => listBook(book))
    );
  };

  init();
});
