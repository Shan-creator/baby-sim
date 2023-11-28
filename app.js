const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
const prompt = (query) => new Promise((resolve) => rl.question(query, resolve));

class BabySimulator {
  constructor() {
    this.baby = {
      hungry: false,
      sleeping: true,
      soiled: false,
      needsTummyTime: true,
    };
  }

  feed() {
    this.baby.hungry = false;
    console.log("Feeding the baby. Hungry status: " + this.baby.hungry);
  }

  sleep() {
    this.baby.sleeping = true;
    console.log("Putting the baby to sleep. Sleeping status: " + this.baby.sleeping);
  }

  changeDiaper() {
    this.baby.soiled = false;
    console.log("Changing the baby's diaper. Soiled status: " + this.baby.soiled);
  }

  async doTummyTime() {
    console.log("Needs tummy time: " + this.baby.needsTummyTime);
    let myBaby = this.baby;
     let response = await prompt("Do you want to provide tummy time?")
      if (response === "Yes"){
        myBaby.needsTummyTime = false;
      } else {
        myBaby.needsTummyTime - true;
      }
    this.babyStatus();
  }

  babyStatus() {
    console.log("Initial status:");
    console.log("Hungry: " + this.baby.hungry);
    console.log("Sleeping: " + this.baby.sleeping);
    console.log("Soiled: " + this.baby.soiled);
    console.log("Needs Tummy Time: " + this.baby.needsTummyTime);

  }

  simulateActions() {
    this.babyStatus();

    this.makeBabyHungry();
    this.makeBabySoiled();
    this.doTummyTime();
  }

  makeBabyHungry() {
    const randomInterval = this.getRandomInterval(1, 3);
    console.log(`Baby will get hungry again in ${randomInterval} hours.`);

    setTimeout(() => {
      this.baby.hungry = true;
      console.log("Baby is hungry!");

      setTimeout(() => {
        this.baby.hungry = false;
        console.log("Baby is no longer hungry.");

        this.makeBabyHungry();
      }, 20 * 60 * 1000); // 20 minutes in milliseconds
    }, randomInterval * 60 * 60 * 1000); // randomInterval hours in milliseconds
  }

  makeBabySoiled() {
    const randomInterval = this.getRandomInterval(3, 12);
    console.log(`Baby will get soiled again in ${randomInterval} hours.`);

    setTimeout(() => {
      this.baby.soiled = true;
      console.log("Baby is soiled!");

      setTimeout(() => {
        this.baby.soiled = false;
        console.log("Baby is no longer soiled.");

        this.makeBabySoiled();
      }, 5 * 60 * 1000); // 5 minutes in milliseconds
    }, randomInterval * 60 * 60 * 1000); // randomInterval hours in milliseconds
  }

  getRandomInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}

// Create an instance of BabySimulator
const babySimulator = new BabySimulator();

// Simulate actions on the baby object and display initial status
babySimulator.simulateActions();

module.exports = {getRandomInterval}