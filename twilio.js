const fs = require("fs");
const csv = require("csv-parser");

const wordleJSON = [];

//flow of tasks
// grab a phone number we want to use - done
// grab the word of the day - done
// set up twilio to send SMS

//things to test before setting it live.
// - if the script will loop through the phone numbers and words correctly. - use setTimeout at first then on heroku
// see if each phone number can send a sms -

// get list of phone numbers.
const fileReader = new Promise((resolve, reject) => {
  fs.readFile("phoneNumbers.txt", "utf8", function (err, data) {
    if (err) reject(err);
    return resolve(data.split(","));
  });
});

const csvToJson = new Promise((resolve, reject) => {
  fs.createReadStream("wordle.csv")
    .pipe(csv({}))
    .on("data", (data) => wordleJSON.push(data))
    .on("end", () => {
      return resolve(wordleJSON);
    });
});

function getPhoneNumber(i) {
  return new Promise((resolve, reject) => {
    fileReader.then((results) => {
      //grab the phone number we will use and save it in the variable.
      let phoneNumber = results[i - 1]; // the pn in csv starts at 1
      return resolve(phoneNumber);
    });
  });
}

// get todays word.
function getWordOfTheDay() {
  return new Promise((resolve, reject) => {
    let now = new Date();
    let todaysWord;
    csvToJson.then((results) => {
      todaysWord = results.filter((result) => {
        let wordleDay = new Date(result.Date);
        if (
          wordleDay.getMonth() == now.getMonth() &&
          wordleDay.getDate() == now.getDate()
        ) {
          return true;
        }
      });
      return resolve(todaysWord[0]);
    });
  });
}

async function createTwilioCommand() {
  const todaysWord = await getWordOfTheDay();
  console.log(todaysWord);
  let PhoneNumber = await getPhoneNumber(todaysWord.PN);
  console.log(PhoneNumber);
}

createTwilioCommand();
