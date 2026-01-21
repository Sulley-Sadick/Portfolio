class ShowYearView {
  _year = document.querySelector(".year");
  constructor() {
    this._updateYear();
  }

  _updateYear() {
    const now = new Date();
    const year = now.getFullYear();

    this._year.textContent = year;
  }
}

//  export class
export default new ShowYearView();
