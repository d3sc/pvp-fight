const drop_down_weapon_p1 = document.getElementById("dropDown-weapon-p1");
const drop_down_armor_p1 = document.getElementById("dropDown-armor-p1");
const drop_down_weapon_p2 = document.getElementById("dropDown-weapon-p2");
const drop_down_armor_p2 = document.getElementById("dropDown-armor-p2");
const btnOk = document.getElementById("btnOk");
const choose_equipment = document.getElementById("choose-equipment");
const game_user_interface = document.querySelector(".game-user-interface");
const name_p1 = document.getElementById("name-p1");
const name_p2 = document.getElementById("name-p2");

game_user_interface.style.display = "none";

let weapon = {
 default: 0,
 piso: 7,
 pedang: 11,
 pistol: 40,
};

let armor = {
 default: 0,
 kulit: 30,
 baja: 60,
};

let heal_spell = {
 small: 10,
 medium: 30,
 master: 80,
};

class Player {
 constructor(player_name, player_health, equipment_weapon, equipment_armor) {
  this.name = player_name;
  this.health = player_health;
  this.weapon = equipment_weapon;
  this.armor = equipment_armor;
  this.is_dead = 0;
  this.default_damage = 5;
 }

 attack() {
  if (this.is_dead == 1) {
   this.health = 0;
   return alert(this.name + " already lose!");
  }
  let value = 0;
  const default_damage = this.default_damage;

  let crit = Math.floor(Math.random() * 7 + 1);

  const bonus_damage = this.weapon + crit;
  value = default_damage + bonus_damage;

  return value;
 }

 heal(bonus_health) {
  if (this.is_dead == 1) {
   this.health = 0;
   return alert(this.name + " already lose!");
  }
  this.health += bonus_health;
  if (this.health > 100) {
   this.health = 100;
  }

  return this.health;
 }

 defend() {
  if (this.is_dead == 1) {
   this.health = 0;
   return alert(this.name + " already lose!");
  }
  this.armor += Math.floor(Math.random() * 10 + 1);
  return "Success Defend";
 }

 damage_handler(damage_received) {
  if (this.is_dead == 1) {
   this.health = 0;
   return alert(this.name + " already lose!");
  }

  if (this.armor > damage_received) {
   this.armor -= damage_received;
   damage_received = 0;
  } else if (damage_received >= this.armor) {
   this.health = this.health - (damage_received - this.armor);
   this.armor = 0;
  } else {
  }

  if (this.armor <= 0) this.armor = 0;

  if (this.health <= 0) {
   this.health = 0;
   this.is_dead = 1;
  }

  return this.health;
 }

 update_equipment_weapon(new_weapon) {
  if (new_weapon == undefined) return "Failed Update Weapon!";
  this.weapon = new_weapon;

  return "Weapon Update!";
 }

 update_equipment_armor(new_armor) {
  if (new_armor == undefined) return "Failed Update Armor!";
  this.armor = new_armor;

  return "Armor Update!";
 }
}

let player1 = new Player("", 100, weapon.default, armor.default);
let player2 = new Player("", 100, weapon.default, armor.default);

// mengecek name dari function checkName
function checkName(name_p1_value, name_p2_value) {
 if (name_p1_value == undefined || name_p1_value == "") {
  name_p1_value = "player 1";
  player1.name = name_p1_value;
 } else {
  player1.name = name_p1_value;
 }

 if (name_p2_value == undefined || name_p2_value == "") {
  name_p2_value = "player 2";
  player2.name = name_p2_value;
 } else {
  player2.name = name_p2_value;
 }
}

function statusPlayer() {
 console.log(player1);
 console.log(player2);
}

let keys_weapon = Object.keys(weapon);
let keys_armor = Object.keys(armor);

function choose_item_handler_p1(keys_weapon, keys_armor) {
 keys_weapon.forEach((i) => {
  let newOption = document.createElement("option");
  let isiNewOption = document.createTextNode(i);

  newOption.appendChild(isiNewOption);
  drop_down_weapon_p1.appendChild(newOption);
 });

 keys_armor.forEach((i) => {
  let newOption = document.createElement("option");
  let isiNewOption = document.createTextNode(i);

  newOption.appendChild(isiNewOption);
  drop_down_armor_p1.appendChild(newOption);
 });
}
function choose_item_handler_p2(keys_weapon, keys_armor) {
 keys_weapon.forEach((i) => {
  let newOption = document.createElement("option");
  let isiNewOption = document.createTextNode(i);

  newOption.appendChild(isiNewOption);
  drop_down_weapon_p2.appendChild(newOption);
 });

 keys_armor.forEach((i) => {
  let newOption = document.createElement("option");
  let isiNewOption = document.createTextNode(i);

  newOption.appendChild(isiNewOption);
  drop_down_armor_p2.appendChild(newOption);
 });
}
choose_item_handler_p1(keys_weapon, keys_armor);
choose_item_handler_p2(keys_weapon, keys_armor);

function create_data_equipment(
 weapon_val_p1,
 armor_val_p1,
 weapon_val_p2,
 armor_val_p2
) {
 localStorage.setItem("player1_weapon", weapon_val_p1);
 localStorage.setItem("player1_armor", armor_val_p1);
 localStorage.setItem("player2_weapon", weapon_val_p2);
 localStorage.setItem("player2_armor", armor_val_p2);
}

function updateStatusPlayer(
 equipment_weapon_p1,
 equipment_armor_p1,
 equipment_weapon_p2,
 equipment_armor_p2
) {
 // Fallback error
 if (
  equipment_weapon_p1 == "" ||
  equipment_armor_p1 == "" ||
  equipment_weapon_p2 == "" ||
  equipment_armor_p2 == ""
 )
  return "update equipment error!";
 if (
  equipment_weapon_p1 == undefined ||
  equipment_armor_p1 == undefined ||
  equipment_weapon_p2 == undefined ||
  equipment_armor_p2 == undefined
 )
  return "update equipment error!";

 player1.update_equipment_weapon(weapon[equipment_weapon_p1]);
 player1.update_equipment_armor(armor[equipment_armor_p1]);
 player2.update_equipment_weapon(weapon[equipment_weapon_p2]);
 player2.update_equipment_armor(armor[equipment_armor_p2]);

 return statusPlayer();
}

// ketika button ok diclick
btnOk.addEventListener("click", () => {
 let name_p1_value = name_p1.value;
 let name_p2_value = name_p2.value;

 checkName(name_p1_value, name_p2_value);

 name_player1.textContent = player1.name;
 name_player2.textContent = player2.name;

 randomChange();
 let weapon_val_p1 = drop_down_weapon_p1.value;
 let armor_val_p1 = drop_down_armor_p1.value;
 let weapon_val_p2 = drop_down_weapon_p2.value;
 let armor_val_p2 = drop_down_armor_p2.value;

 create_data_equipment(
  weapon_val_p1,
  armor_val_p1,
  weapon_val_p2,
  armor_val_p2
 );

 // Mengambil data dari localstorage
 let equipment_weapon_p1 = localStorage.getItem("player1_weapon");
 let equipment_armor_p1 = localStorage.getItem("player1_armor");
 let equipment_weapon_p2 = localStorage.getItem("player2_weapon");
 let equipment_armor_p2 = localStorage.getItem("player2_armor");

 //  Update status
 updateStatusPlayer(
  equipment_weapon_p1,
  equipment_armor_p1,
  equipment_weapon_p2,
  equipment_armor_p2
 );

 get_health_number();
 choose_equipment.style.display = "none";
 game_user_interface.style.display = "flex";
});

// Game start!
const name_player1 = document.getElementById("name-player1");
const name_player2 = document.getElementById("name-player2");

// selection button
const attackBtn = document.getElementById("attackBtn");
const attackBtn2 = document.getElementById("attackBtn2");
const defendBtn = document.getElementById("defendBtn");
const defendBtn2 = document.getElementById("defendBtn2");
const healBtn = document.getElementById("healBtn");
const healBtn2 = document.getElementById("healBtn2");

const damage_p1 = document.querySelector(".damageP1");
const damage_p2 = document.querySelector(".damageP2");
const health_p1 = document.getElementById("health-p1");
const health_p2 = document.getElementById("health-p2");
const armor_p1 = document.getElementById("armor-p1");
const armor_p2 = document.getElementById("armor-p2");

function get_damage(value) {
 return value;
}

// hidden btn
let randomNum = Math.floor(Math.random() * 2 + 1);
function randomChange() {
 //  player 1
 if (randomNum % 2 == 0) {
  attackBtn.hidden = false;
  attackBtn2.hidden = true;
  defendBtn.hidden = false;
  defendBtn2.hidden = true;
  healBtn.hidden = false;
  healBtn2.hidden = true;
  return randomNum++;
 }
 //  player 2
 else if (randomNum % 2 == 1) {
  attackBtn.hidden = true;
  attackBtn2.hidden = false;
  defendBtn.hidden = true;
  defendBtn2.hidden = false;
  healBtn.hidden = true;
  healBtn2.hidden = false;
  return randomNum++;
 }
}

attackBtn.addEventListener("click", () => {
 randomChange();
 let seranganP1 = player1.attack();
 player2.damage_handler(seranganP1);

 get_health_number();

 get_damage_p2(seranganP1);

 if (player2.health <= 0) {
  attackBtn.hidden = true;
  attackBtn2.hidden = true;
  player2.health = 0;
  setTimeout(() => {
   gameOver();
  }, 500);
 }

 armor_p2.textContent = player2.armor;

 get_health_full("player 2");
});

attackBtn2.addEventListener("click", () => {
 randomChange();
 let seranganP2 = player2.attack();
 player1.damage_handler(seranganP2);

 get_health_number();
 get_damage_p1(seranganP2);

 if (player1.health <= 0) {
  attackBtn.hidden = true;
  attackBtn2.hidden = true;
  player1.health = 0;
  setTimeout(() => {
   gameOver();
  }, 500);
 }

 armor_p1.textContent = player1.armor;

 get_health_full("player 1");
});

healBtn.addEventListener("click", () => {
 let random_change_heal = Math.floor(Math.random() * 10 + 1);
 if (random_change_heal >= 5 && random_change_heal <= 10) {
  randomChange();
  return get_damage_p1("failed");
 }
 randomChange();
 let randomNum = Math.floor(Math.random() * 10 + 1);
 let arrayHeal = Object.keys(heal_spell);

 if (randomNum <= 5 && randomNum > 0) {
  player1.heal(heal_spell[arrayHeal[0]]);
  get_heal_p1(heal_spell[arrayHeal[0]]);
  get_health_number();
  get_health_full("player 1");
 } else if (randomNum <= 9 && randomNum > 5) {
  player1.heal(heal_spell[arrayHeal[1]]);
  get_heal_p1(heal_spell[arrayHeal[1]]);
  get_health_number();
  get_health_full("player 1");
 } else if (randomNum == 10) {
  player1.heal(heal_spell[arrayHeal[2]]);
  get_heal_p1(heal_spell[arrayHeal[2]]);
  get_health_number();
  get_health_full("player 1");
 }
});

healBtn2.addEventListener("click", () => {
 let random_change_heal = Math.floor(Math.random() * 10 + 1);
 if (random_change_heal >= 5 && random_change_heal <= 10) {
  randomChange();
  return get_damage_p2("failed");
 }
 randomChange();
 let randomNum = Math.floor(Math.random() * 10 + 1);
 let arrayHeal = Object.keys(heal_spell);

 if (randomNum <= 5 && randomNum > 0) {
  player2.heal(heal_spell[arrayHeal[0]]);
  get_heal_p2(heal_spell[arrayHeal[0]]);
  get_health_number();
  get_health_full("player 2");
 } else if (randomNum <= 9 && randomNum > 5) {
  player2.heal(heal_spell[arrayHeal[1]]);
  get_heal_p2(heal_spell[arrayHeal[1]]);
  get_health_number();
  get_health_full("player 2");
 } else if (randomNum == 10) {
  player2.heal(heal_spell[arrayHeal[2]]);
  get_heal_p2(heal_spell[arrayHeal[2]]);
  get_health_number();
  get_health_full("player 2");
 }
});

defendBtn.addEventListener("click", () => {
 player1.defend();
 console.log(player1.armor);
 armor_p1.textContent = player1.armor;
 randomChange();
});

defendBtn2.addEventListener("click", () => {
 player2.defend();
 armor_p2.textContent = player2.armor;
 randomChange();
});

function get_damage_p1(value) {
 if (value != "failed") {
  damage_p1.textContent = "-" + value;
 } else {
  damage_p1.textContent = value;
 }
 damage_p1.style.animation = "up 0.8s ease";
 setTimeout(() => {
  damage_p1.style.animation = "";
 }, 400);
}

function get_damage_p2(value) {
 if (value != "failed") {
  damage_p2.textContent = "-" + value;
 } else {
  damage_p2.textContent = value;
 }
 damage_p2.style.animation = "up 0.8s ease";
 setTimeout(() => {
  damage_p2.style.animation = "";
 }, 400);
}

function get_heal_p1(value) {
 damage_p1.textContent = "+" + value;
 damage_p1.style.color = "green";
 damage_p1.style.animation = "up 0.8s ease";
 setTimeout(() => {
  damage_p1.style.animation = "";
  damage_p1.style.color = "red";
 }, 400);
}

function get_heal_p2(value) {
 damage_p2.textContent = "+" + value;
 damage_p2.style.color = "green";
 damage_p2.style.animation = "up 0.8s ease";
 setTimeout(() => {
  damage_p2.style.animation = "";
  damage_p2.style.color = "red";
 }, 400);
}

function get_health_number() {
 health_p1.textContent = player1.health;
 health_p2.textContent = player2.health;
}

function gameOver() {
 if (player1.is_dead == 1) {
  alert(`${player1.name} kalah!`);
  resetGame();
 } else if (player2.is_dead == 1) {
  alert(`${player2.name} kalah!`);
  resetGame();
 }
}

function resetGame() {
 player1.is_dead = 0;
 player2.is_dead = 0;
 player1.health = 100;
 player2.health = 100;
 game_user_interface.style.display = "none";
 choose_equipment.style.display = "block";
 attackBtn.hidden = false;
 attackBtn2.hidden = false;
 document.body.style.setProperty("--hp-p1", player1.health + "%");
 document.body.style.setProperty("--hp-p2", player2.health + "%");
 get_health_number();
}

function get_health_full(player) {
 if (player == "player 1") {
  if (player1.health >= 100) {
   return document.body.style.setProperty("--hp-p1", 100 + "%");
  } else if (player1.health < 100) {
   return document.body.style.setProperty("--hp-p1", player1.health + "%");
  }
 } else if (player == "player 2") {
  if (player2.health >= 100) {
   return document.body.style.setProperty("--hp-p2", 100 + "%");
  } else if (player2.health < 100) {
   return document.body.style.setProperty("--hp-p2", player2.health + "%");
  }
 }
}
