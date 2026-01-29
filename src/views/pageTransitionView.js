import Swup from "swup";

// create swup instance out of the class to make the swup functionality work(transition between pages).
const swup = new Swup();

swup.hooks.on("content:replace", () => {
  console.log("content replaced");
});

export default Swup;
