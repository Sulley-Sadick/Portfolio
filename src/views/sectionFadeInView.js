class SectionFadeInView {
  _sections = document.querySelectorAll("section");
  constructor() {
    ///////////// FUNCTION CLASS WHEN PAGE LOADS ///////////
    this._fadeInSection();
  }

  ////////////// FUNCTIONS ///////////
  _sectionFadeIn(entries, observer) {
    entries.forEach((entry) => {
      // stop execution when entry is not intersecting
      if (!entry.isIntersecting) return;

      // show entry target
      entry.target.classList.remove("section--hidden");

      // unobserve entry target
      observer.unobserve(entry.target);
    });
  }

  _fadeInSection() {
    const sectionsObserver = new IntersectionObserver(this._sectionFadeIn, {
      root: null,
      threshold: 0.1,
    });

    this._sections.forEach((section) => {
      // hide section
      section.classList.add("section--hidden");

      // observe section
      sectionsObserver.observe(section);
    });
  }
}

//  export class
export default new SectionFadeInView();
