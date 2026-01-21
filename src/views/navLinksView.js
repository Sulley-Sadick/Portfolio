class NavLinksView {
  _navLinks = document.querySelector(".nav__links");
  _menu__btn = document.querySelector(".menu");
  _close__btns = document.querySelectorAll(".bar");
  _isNavOpen = false;

  constructor() {
    ///////////////////////// FUNCTION CALLS WHEN PAGE LOADS ////////////
    if (this._isMobile()) this._hideNavLinks();

    this._toggleNavLinksPanel();

    // hide or show navlinks based on different screen sizes
    this._showNavLinksOnDifferentScreenSizes();
  }

  //////////////////////// FUNCTIONS ///////////////////////
  _isMobile() {
    return window.innerWidth <= 768;
  }

  _showNavLinks() {
    this._close__btns.forEach((btn) => btn.classList.add("active"));

    // show navLinks
    this._navLinks.classList.remove("show__nav");
  }

  _hideNavLinks() {
    // hide navLinks
    this._navLinks.classList.add("show__nav");

    // show close__btn
    this._close__btns.forEach((btn) => btn.classList.remove("active"));
  }

  _updateUI() {
    // show navLinks when page is greater than 768px
    if (!this._isMobile()) this._showNavLinks();
    else
      // show navLinks if isNavOpen === true else hide navLinks
      this._isNavOpen ? this._showNavLinks() : this._hideNavLinks();
  }

  _controlGap(gap) {
    this._menu__btn.style.gap = gap;
  }

  //////////////////////// EVENTLISTENERS ///////////////////////

  _toggleNavLinksPanel() {
    this._menu__btn.addEventListener("click", () => {
      this._isNavOpen = !this._isNavOpen;

      if (this._isNavOpen) {
        this._controlGap("0px");

        this._showNavLinks();
      } else {
        this._controlGap("0.5rem");
        this._hideNavLinks();
      }
    });
  }

  _showNavLinksOnDifferentScreenSizes() {
    window.addEventListener("resize", () => {
      this._updateUI();
    });
  }
}

//  export class
export default new NavLinksView();
