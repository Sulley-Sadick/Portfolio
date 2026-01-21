class StickyNavView {
  _header = document.querySelector("header");
  _nav = document.querySelector("nav");

  constructor() {
    this.showStickyNav();
  }

  _showStickyNavCallback(entries) {
    // using destructuring to get the first element within the entries.
    const [entry] = entries;

    // used sticky-nav class because setting it to the class of sticky makes tailwind overrides the position of fixed and replace it with sticky making the effect not working.
    if (!entry.isIntersecting) this._nav.classList.add("sticky-nav");
    else this._nav.classList.remove("sticky-nav");
  }

  showStickyNav() {
    const navObserver = new IntersectionObserver(
      this._showStickyNavCallback.bind(this),
      {
        root: null,
        threshold: 0,
      },
    );

    navObserver.observe(this._header);
  }
}

//  export class
export default new StickyNavView();
