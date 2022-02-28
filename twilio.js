// const fs = require("fs");
// const csv = require("csv-parser");
// //const twilioConfig = require("./config.js");
// const authToken = process.env.TOKEN; //|| twilioConfig.token;
// const accountSid = process.env.SID; //|| twilioConfig.SID; // these needs to change based on the phone number
// const client = require("twilio")(accountSid, authToken); // needs SID set before this.
// const PhoneNumbers = require("./phoneNumbers.js");
// const wordleJSON = [];
// const csvToJson = new Promise((resolve, reject) => {
//   fs.createReadStream("wordle.csv")
//     .pipe(csv({}))
//     .on("data", (data) => wordleJSON.push(data))
//     .on("end", () => {
//       return resolve(wordleJSON);
//     });
// });
// function getPhoneNumberObj(i) {
//   return new Promise((resolve, reject) => {
//     return resolve(PhoneNumbers[i]);
//   });
// }
// // get todays word.
// function getWordOfTheDay() {
//   return new Promise((resolve, reject) => {
//     let now = new Date();
//     let todaysWord;
//     csvToJson.then((results) => {
//       todaysWord = results.filter((result) => {
//         let wordleDay = new Date(result.Date);
//         if (
//           wordleDay.getMonth() == now.getMonth() &&
//           wordleDay.getDate() == now.getDate()
//         ) {
//           return true;
//         }
//       });
//       return resolve(todaysWord[0]);
//     });
//   });
// }
// // get todays word.
// function getWordOfTomorrow() {
//   return new Promise((resolve, reject) => {
//     let now = new Date();
//     let tomorrow = new Date();
//     tomorrow.setDate(now.getDate() + 1);
//     let tomorrowsWord;
//     csvToJson.then((results) => {
//       tomorrowsWord = results.filter((result) => {
//         let wordleDay = new Date(result.Date);
//         if (
//           wordleDay.getMonth() == tomorrow.getMonth() &&
//           wordleDay.getDate() == tomorrow.getDate()
//         ) {
//           return true;
//         }
//       });
//       return resolve(tomorrowsWord[0]);
//     });
//   });
// }
// async function createTwilioCommand() {
//   const todaysWord = await getWordOfTheDay();
//   const tomorrowsWord = await getWordOfTomorrow();
//   console.log(todaysWord);
//   console.log(tomorrowsWord);
//   let PhoneNumber = await getPhoneNumberObj(todaysWord.PN);
//   console.log(PhoneNumber);
//   client.messages
//     .create({
//       body: `${todaysWord.Word} and ${tomorrowsWord.Word} are the next words. This is an automated message kek`,
//       from: PhoneNumber.Number,
//       to: process.env.TOPHONENUMBER, //|| twilioConfig.toPhoneNumber,
//     })
//     .then((message) => {
//       console.log(
//         `${todaysWord.Word} and ${tomorrowsWord.Word} are the next words. This is an automated message kek`
//       );
//       console.log(
//         `sent to - ${process.env.TOPHONENUMBER}` //|| twilioConfig.toPhoneNumber}
//       );
//       console.log(`sent from - ${PhoneNumber.Number}`);
//       console.log(message.sid);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// }
