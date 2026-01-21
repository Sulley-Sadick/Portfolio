class ToggleDarkModeView {
  _darkModeToggle = document.querySelector(".toggle-dark-mode");
  _darkMode = localStorage.getItem("darkmode");
  _lightParagraph = document.querySelector(".light__paragraph");
  _darkParagraph = document.querySelector(".dark__paragraph");

  constructor() {
    this._toggleDarkMode();

    // show darkmode if darkMode  is enabled when page loads.
    if (this._darkMode === "enabled") this._enableDarkMode();
  }

  _enableDarkMode() {
    // add dark class to the root  element
    document.documentElement.classList.add("dark");

    // store the dark in the localStorage
    localStorage.setItem("darkmode", "enabled");
  }

  _disableDarkMode() {
    // remove dark class from the root element
    document.documentElement.classList.remove("dark");

    // update localStorage
    localStorage.setItem("darkmode", null);
  }

  _toggleDarkMode() {
    // used arrow function in order to set the this keyword to the ToggleDarkModeView class(object)
    this._darkModeToggle.addEventListener("click", () => {
      // update this._darkMode
      this._darkMode = localStorage.getItem("darkmode");

      if (this._darkMode !== "enabled")
        // show dark mode
        this._enableDarkMode();
      else
        // disable dark mode
        this._disableDarkMode();
    });
  }
}

//  export class
export default new ToggleDarkModeView();
