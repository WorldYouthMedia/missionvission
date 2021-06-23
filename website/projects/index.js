const cardsDOM = document.querySelector(".container");

class Members {
  async getMembers() {
    try {
      let result = await fetch("projects.json");
      let data = await result.json();
      let members = data.items;
      members = members.map((item) => {
        const { name, bio, mail } = item.fields;
        const { id } = item.sys;
        const image = item.fields.image.fields.file.url;
        return { name, bio, mail, image };
      });

      return members;
    } catch (error) {
      console.log(error);
    }
  }
}

class UI {
  displayMembers(members) {
    let result = "";
    members.forEach((member) => {
      result += `
          <!-- single card -->
          <div class="card" >
          <img
          src=${member.image}
        alt=${member.name}'s picture
          class="projectIMG"
        />
          <div class="face face1" >
         
            <div class="content">         
              <p>${member.bio}</p>
            </div>
          </div>
          <div class="face face2">
            <h2>${member.name}</h2>
          </div>
        </div>
          `;

      var imageUrl = member.image;
      const image = "url('" + imageUrl + "')";
      console.log(image);
      //   document.getElementsByClassName(".card").style.backgroundImage =        image;
    });
    cardsDOM.innerHTML = result;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const ui = new UI();
  const members = new Members();

  members
    .getMembers()
    .then((members) => {
      ui.displayMembers(members);
    })
    .then(() => {
      console.log("everything loaded!");
    });
});
