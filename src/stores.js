import { writable } from "svelte/store";

// Declare nav bar object 
export const mainBar = [{
  title: "Create",
  icon: "fas fa-map-marker-alt fa-2x",
  colour: "color:rgb(153, 196, 74)",
  link: "/#/create",
}, 
{
  title: "Settings",
  icon: "fas fa-user fa-2x",
  colour: "color:rgb(14, 168, 160)",
  link: "/#/settings",
},
{
  title: "Pois",
  icon: "fas fa-th-list fa-2x",
  colour: "color:rgb(63, 122, 139)",
  link: "/#/pois",
},
{
  title: "Logout",
  icon: "fas fa-sign-out-alt fa-3x",
  colour: "color:rgb(156, 70, 128)",
  link: "/#/logout",
},
];
export const welcomeBar = [
  {
    title: "Sign Up",
    icon: "fas fa-user-cog fa-3x",
    colour: "color:rgb(63, 160, 155)",
    link: "/#/signup",
  },
  {
    title: "Log In",
    icon: "fas fa-user-edit fa-3x",
    colour: "color:green",
    link: "/#/login",
  },
];

export const navBar = writable({
  bar: [],
});
export const title = writable("");
export const subTitle = writable("");
export const user = writable({
  email: "",
  token: "",
});
export const poi = writable({
  id: "",
  title: "",
  description: "",
  category: "",
  lat: "",
  lng: "",
  creator: ""
});
export const comment = writable({
  id: "",
  comment: "",
  creator: "",
  poi_id: ""
});