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
      sleeping: false,
      soiled: false,
      needsTummyTime: false,
      isCrying: false
    };
  }

  birth() {
    this.awake();
    this.getHungry();
    this.craveTummyTime();
    this.startCrying();
  }

  getHungry() {
    this.baby.hungry = true;
    console.log("Baby is Hungry!\n")
  }

  feed() {
    this.baby.hungry = false;
    console.log("Feeding the baby. Hungry status is now: Full\n");
  }

  craveTummyTime() {
    this.baby.needsTummyTime = true;
    console.log("Baby needs tummy time!\n")
  }

  giveTummyTime() {
    this.baby.needsTummyTime = false;
    console.log("Giving Baby TummyTime.\n")
  }

  startCrying() {
    this.baby.isCrying = true;
    console.log("The baby is crying!\n")
  }

  soothe() {
    if(this.baby.hungry || this.baby.needsTummyTime || this.baby.soiled) {
      console.log("Baby is Still crying!\n")
    } else {
      this.baby.isCrying = false;
      console.log("Baby stopped crying.\n")
    }
  }

  putToSleep() {
    if (!this.baby.isCrying) {
      this.baby.sleeping = true;
      console.log("Putting the baby to sleep. Sleeping status is now: Asleep\n");
    } else {
      console.log("Baby is fussing about and won't sleep.\n");
    }
  }

  awake() {
    this.baby.sleeping = false;
    console.log("Baby Woke Up! Sleeping status is now: Awake\n");
  }

  changeDiaper() {
    this.baby.soiled = false;
    console.log("Changing the baby's diaper. Soiled status is now: Clean Booty!\n");
  }

  soil() {
    this.baby.soiled = true;
    console.log("The baby soiled! Soiled status is now: Soiled\n");
  }

  isHealthy() {
    return !this.baby.hungry && !this.baby.needsTummyTime && !this.baby.soiled && !this.baby.isCrying;
  }

  isReadyForBed() {
    return this.baby.sleeping && this.isHealthy();
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
    console.log("Baby status:");
    console.log("Hungry: " + this.baby.hungry);
    console.log("Sleeping: " + this.baby.sleeping);
    console.log("Soiled: " + this.baby.soiled);
    console.log("Needs Tummy Time: " + this.baby.needsTummyTime);
    console.log("Is Crying: " + this.baby.isCrying);
  }

  makeBabyHungry() {
    const randomInterval = this.getRandomInterval(1, 3);
    console.log(`Baby will get hungry again in ${randomInterval} hours.\n`);

    setTimeout(() => {
      this.baby.hungry = true;
      console.log("Baby is hungry!\n");

      setTimeout(() => {
        this.baby.hungry = false;
        console.log("Baby is no longer hungry.\n");

        this.makeBabyHungry();
      }, 20 * 60 * 1000); // 20 minutes in milliseconds
    }, randomInterval * 60 * 60 * 1000); // randomInterval hours in milliseconds
  }

  makeBabySoiled() {
    const randomInterval = this.getRandomInterval(3, 12);
    console.log(`Baby will get soiled again in ${randomInterval} hours.\n`);

    setTimeout(() => {
      this.baby.soiled = true;
      console.log("Baby is soiled!\n");

      setTimeout(() => {
        this.baby.soiled = false;
        console.log("Baby is no longer soiled.\n");

        this.makeBabySoiled();
      }, 5 * 60 * 1000); // 5 minutes in milliseconds
    }, randomInterval * 60 * 60 * 1000); // randomInterval hours in milliseconds
  }

  getRandomInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}

async function promptForResponse(baby) {
  let response = await prompt("What do you want to do?\n");
  switch (response) {
    case "TummyTime":
        baby.giveTummyTime();
        return true;
    case "Feed":
        baby.feed();
        return true;
    case "ChangeDiaper":
        baby.changeDiaper();
        return true;
    case "Soothe":
        baby.soothe();
        return true;
    case "PutToBed":
        baby.putToSleep();
        return true;
    case "Exit":
        if(!baby.isHealthy()) {
          console.log("You can't leave your baby in this condition!\n");
          return true;
        }
        if (!baby.isReadyForBed()) {
          console.log("You have to put your baby to sleep before you leave!\n")
          return true;
        }
        console.log("Your baby is sound asleep, see you soon!\n")
        return false;
    default:
        console.error("Invalid action. Valid inputs are: ChangeDiaper, Feed, TummyTime, Soothe, PutToBed, and Exit.\n")
        return true;
  }
}

async function beginSim(baby) {
  let shouldContinue = true;
  baby.birth();
  while (shouldContinue) {
    shouldContinue = await promptForResponse(baby);
    baby.babyStatus();
  }
  console.log('Sim ended.')
  process.exit(1);
}

const babySimulator = new BabySimulator();


beginSim(babySimulator);