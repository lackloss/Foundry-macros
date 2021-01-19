let type = "wand"

let selected = canvas.tokens.controlled;
  if(selected.length != 1){
    ui.notifications.error("Please select one token")
  } else {
let hero = selected[0].actor;
let items = hero.data.items;
items = items.filter(o => o.type === "consumable" && o.data.consumableType === type);
if (items.length < 1) {
    ui.notifications.warn("No wands found");
} else {

    let options = ""
  for(let o of items){
    options += `<option value=${o._id}>${o.name}</option>`
}
    

  let dialogTemplate = `
  <div style="display:flex">
    <div  style="flex:1"><select id="pickItem">${options}</select></div>
    </div>
  `

let d = new Dialog({
 title: "Wands!",
 content: dialogTemplate,
 buttons: {
  one: {
   icon: '<i class="fas fa-check"></i>',
   label: "Use Wand",
   callback: (html) => {
       let itemID = html.find("#pickItem")[0].value;
       let sitem = hero.items.find(item => item._id == itemID)
       game.pf1.rollitemMacro(sitem.name, {
           itemID: itemID,
           itemType: "consumable",
           actorID: hero._id,
       }); 
       console.log(sitem);
   }

  },
 },
 default: "one",
 render: html => console.log("Register interactivity in the rendered dialog"),
 close: html => console.log("This always is logged no matter which option is chosen")
});
d.render(true);
}
}
