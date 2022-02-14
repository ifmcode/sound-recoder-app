# Sound Recorder

This is a sound recording application created in ReactJS.

This is, in many ways, a recreation of this [dictaphone web application](https://github.com/mdn/web-dictaphone/).

This application allows you to record sounds and manipulate these audios. The recordings are saved in the firebase database (firestore) so you don't lose them. This aplication uses redux to manage the internal data.

For this project I have used trello to organise the development, creating tasks, estimating and prioritising them.

## How to run this project

- Installation:
  ```bash
    npm install
  ```
- Run the project:
  ```bash
    npm run start
  ```

## How to run the unit testing

  ```bash
    npm run test
  ```

## Tools used

- [Trello](https://trello.com/b/yUwmni2b/secret-source-recorder): to manage the development
- [Firebase](https://firebase.google.com): to store the recordings

## Libraries used

- [redux](https://redux.js.org/usage/index)
- [thunk](https://www.npmjs.com/package/redux-thunk)
- [firebase](https://firebase.google.com/docs?hl=es)
- [craco](https://www.npmjs.com/package/@craco/craco)
- [craco-less](https://www.npmjs.com/package/craco-less)
