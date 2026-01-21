import Swup from "swup";

class ColorChangeView {
  _body = document.body;

  constructor() {
    ////////////////// FUNCTION CLASS WHEN PAGE LOADS ////////////
    this.changeLinkColor();
  }

  /////////////////// EVENTLISTENERS //////////////
  changeLinkColor() {
    this._body.addEventListener("click", function (e) {
      const link = e.target.closest(".nav__link");

      if (!link) return;

      const navLinks = document.querySelectorAll(".nav__link");
      // console.log(navLinks);

      navLinks.forEach((navLink) => {
        link.href !== navLink.href
          ? navLink.classList.add("dark--color")
          : navLink.classList.add("purple--color");
      });
    });
  }
}

//  export class
export default new ColorChangeView();

// create swup instance out of the class to make the swup functionality work(transition between pages).
const swup = new Swup();
