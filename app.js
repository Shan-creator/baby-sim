const readline = require(`readline`);
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
const prompt = (query) => new Promise((resolve) => rl.question(query, resolve));
const OneMinute = 60000;
let babyName;

class BabySimulator {
  constructor() {
    this.baby = {
      hungry: false,
      sleeping: false,
      soiled: false,
      tummyTimesCompleted: 0,
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
    console.log(`${babyName} is Hungry!\n`)
  }

  feed() {
    this.baby.hungry = false;
    console.log(`Feeding the baby. Hungry status is now: Full\n`);
  }

  giveTummyTime() {
    this.baby.tummyTimesCompleted++;
    console.log(`Giving ${babyName} TummyTime.\n`)
  }

  startCrying() {
    this.baby.isCrying = true;
    console.log(`The baby is crying!\n`)
  }

  soothe() {
    if(!this.isHealthy) {
      console.log(`${babyName} is Still crying!\n`)
    } else {
      this.baby.isCrying = false;
      console.log(`${babyName} stopped crying.\n`)
    }
  }

  putToSleep() {
    if (!this.baby.isCrying) {
      this.baby.sleeping = true;
      console.log(`Putting the baby to sleep. Sleeping status is now: Asleep\n`);
    } else {
      console.log(`${babyName} is fussing about and won't sleep.\n`);
    }
  }

  awake() {
    this.baby.sleeping = false;
    console.log(`${babyName} Woke Up! Sleeping status is now: Awake\n`);
  }

  changeDiaper() {
    this.baby.soiled = false;
    console.log(`Changing the baby's diaper. Soiled status is now: Clean Booty!\n`);
  }

  soil() {
    this.baby.soiled = true;
    console.log(`The baby soiled! Soiled status is now: Soiled\n`);
  }

  isHealthy() {
    return !this.baby.hungry && !this.baby.soiled;
  }

  isReadyForBed() {
    return this.baby.sleeping && this.isHealthy();
  }

  babyStatus() {
    console.log(`${babyName} status:`);
    if (this.baby.hungry) {
      console.log(`:_( - ${babyName} is Hungry!`);
    } else {
      console.log(`:D - ${babyName} is Full.`)
    }
    if (this.baby.sleeping) {
      console.log(`-_- - ${babyName} is Asleep.`);
    } else {
      console.log(`-_- - ${babyName} is Awake.`)
    }
    if (this.baby.sleeping) {
      console.log(`-_- - ${babyName} is Asleep.`);
    } else {
      console.log(`-_- - ${babyName} is Awake.`)
    }
    console.log(`Sleeping: ` + this.baby.sleeping);
    console.log(`Soiled: ` + this.baby.soiled);
    console.log(`Needs Tummy Time: ` + this.baby.tummyTimesCompleted);
    console.log(`Is Crying: ` + this.baby.isCrying);
  }

  makeBabyHungry() {
    const randomInterval = this.getRandomInterval(1, 3);
    console.log(`${babyName} will get hungry again in ${randomInterval} hours.\n`);

    setTimeout(() => {
      this.baby.hungry = true;
      console.log(`${babyName} is hungry!\n`);

      setTimeout(() => {
        this.baby.hungry = false;
        console.log(`${babyName} is no longer hungry.\n`);

        this.makeBabyHungry();
      }, 20 * 60 * 1000); // 20 minutes in milliseconds
    }, randomInterval * 60 * 60 * 1000); // randomInterval hours in milliseconds
  }

  makeBabySoiled() {
    const randomInterval = this.getRandomInterval(3, 12);
    console.log(`${babyName} will get soiled again in ${randomInterval} hours.\n`);

    setTimeout(() => {
      this.baby.soiled = true;
      console.log(`${babyName} is soiled!\n`);

      setTimeout(() => {
        this.baby.soiled = false;
        console.log(`${babyName} is no longer soiled.\n`);

        this.makeBabySoiled();
      }, 5 * 60 * 1000); // 5 minutes in milliseconds
    }, randomInterval * 60 * 60 * 1000); // randomInterval hours in milliseconds
  }

 
}

async function promptForResponse(baby) {
  let response = await prompt(`What do you want to do?\n`);
  switch (response) {
    case `TummyTime`:
        baby.giveTummyTime();
        return true;
    case `Feed`:
        baby.feed();
        return true;
    case `ChangeDiaper`:
        baby.changeDiaper();
        return true;
    case `Soothe`:
        baby.soothe();
        return true;
    case `PutToBed`:
        baby.putToSleep();
        return true;
    case `Exit`:
        if(!baby.isHealthy()) {
          console.log(`You can't leave your baby in this condition!\n`);
          return true;
        }
        if (!baby.isReadyForBed()) {
          console.log(`You have to put your baby to sleep before you leave!\n`)
          return true;
        }
        console.log(`Your baby is sound asleep, see you soon!\n`)
        return false;
    default:
        console.error(`Invalid action. Valid inputs are: ChangeDiaper, Feed, TummyTime, Soothe, PutToBed, and Exit.\n`)
        return true;
  }
}

function getRandomInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function kickOffHungerCounter(baby) {
  const randomInterval = getRandomInterval(1, 3);
  setTimeout(() => {
    this.baby.hungry = true;
    console.log(`${babyName} is hungry!\n`);
  }, randomInterval * OneMinute); // ${babyName} stays hungry for 1 minute times random interval
}

async function kickOffTummyTimeCounter(baby) {
  const randomInterval = getRandomInterval(1, 3);
  setTimeout(() => {
    this.baby.hungry = true;
    console.log(`${babyName} is hungry!\n`);
  }, randomInterval * OneMinute); // ${babyName} stays hungry for 1 minute times random interval
}

async function giveBirth(baby) {
  baby.birth();
  babyName = await prompt(`What is your baby's name?\n`);
}

async function beginSim(baby) {
  let shouldContinue = true;
  giveBirth(baby);
  kickOffHungerCounter(baby);
  kickOffTummyTimeCounter(baby);
  kickOffSoilCounter(baby);


  while (shouldContinue) {
    shouldContinue = await promptForResponse(baby);
    baby.babyStatus();
  }
  console.log('Sim ended.')
  process.exit(1);
}

const babySimulator = new BabySimulator();


beginSim(babySimulator);