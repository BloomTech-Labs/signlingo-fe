[![Maintainability](https://api.codeclimate.com/v1/badges/dd0d2897554fd6b2defa/maintainability)](https://codeclimate.com/github/Lambda-School-Labs/signlingo-fe/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/dd0d2897554fd6b2defa/test_coverage)](https://codeclimate.com/github/Lambda-School-Labs/signlingo-fe/test_coverage)


🚫 The numbers 1️⃣ through 5️⃣ next to each item represent the week that part of the docs needs to be comepleted by. Make sure to delete the numbers by the end of Labs.


# SignLingo

You can find the deployed project at [AWS](https://master.d2965nx2i7rdu0.amplifyapp.com/).

## Contributors

| [Joseph Nevarez](https://github.com/zeravenyoej)                                        |      [Erik Rodriguez](https://github.com/ErikRodriguez-webdev)                                            |          [Cedric Winbush](https://github.com/caw442000)                                      |
| :----------------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------------: |
|   [<img src="src/images/githubPics/joey.png" width = "200" />](https://github.com/zeravenyoej)   |       [<img src="src/images/githubPics/erik.JPG" width = "200" />](https://github.com/ErikRodriguez-webdev)       |            [<img src="src/images/githubPics/cedric.png" width = "200" />](https://github.com/caw442000)            |
|                   [<img src="https://github.com/favicon.ico" width="15"> ](https://github.com/zeravenyoej)                    |                       [<img src="https://github.com/favicon.ico" width="15"> ](https://github.com/ErikRodriguez-webdev)                        |                  [<img src="https://github.com/favicon.ico" width="15"> ](https://github.com/caw442000)                   |
| [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> ](https://www.linkedin.com/in/joseph-nevarez) | [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> ](https://www.linkedin.com/in/erik-rodriguez-617aa419a/) | [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> ](https://www.linkedin.com/in/cedric-winbush-8b2aa23a/) |

|                                       [Seth Cox](https://github.com/SethC16)                                       |                                      [David Isakson](https://github.com/ikeman32)                                       |                                                           [Kendra McKernan](https://github.com/)                                                           |
| :------------------------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| [<img src="src/images/githubPics/seth.JPG" width = "200" />](https://github.com/SethC16) | [<img src="src/images/githubPics/david.JPG" width = "200" />](https://github.com/ikeman32) | [<img src="src/images/githubPics/kendra.JPG" width = "200" />](https://github.com) |
|                   [<img src="https://github.com/favicon.ico" width="15"> ](https://github.com/SethC16)                   |                 [<img src="https://github.com/favicon.ico" width="15"> ](https://github.com/ikeman32)                  |                                       [<img src="https://github.com/favicon.ico" width="15"> ](https://github.com/)                                       |
| [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> ](https://www.linkedin.com/in/seth-cox-73441772/) |       [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> ](https://www.linkedin.com/in/david-h-isakson-ii/)        |                   [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> ](https://www.linkedin.com/in/kendra-mckernan/)                    |
<br>
<br>

![MIT](https://img.shields.io/packagist/l/doctrine/orm.svg)
![React](https://img.shields.io/badge/react-v16.7.0--alpha.2-blue.svg)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

🚫 more info on using badges [here](https://github.com/badges/shields)

## Project Overview

[Trello Board](https://trello.com/b/gvQfXfd4/labs23-signlingo)

[Product Canvas](https://www.notion.so/SignLingo-402ff25b879c4edd98872826fb0af691)

[UX Design files](https://www.figma.com/file/06Jiu1l0kkp1kYNeYiXZiM/Sign-Lingo%2C-Kendra?node-id=179%3A0)


SignLingo is a sign language learning app/website for beginners. Current ASL digital learning platforms fail to leverage gamification. So SignLingo picks up where other platforms leave off. It uses gamification so that users have fun while learning!

### Key Features

- Going through flashcards to learn alphabet signs
- Taking multiple choice quizzes to practice alphabet signs
- Uploading a picture of your alphabet signs to test your knowledge


## Tech Stack

### Front end built using:

#### _React_

- Declarative
- Component Based
- Renders proper Html using JSX
- Lightweight and has a very small API surface

#### _Redux_

- Predictable
- Centralized
- Debuggable
- Flexible

### Libraries and Packages

#### _react-redux | redux-logger | redux-thunk_

- Global state-management

#### _axios_

- Easier to read responses than fetch

#### _sass_

- Styling purposes

#### _Material UI_

- Styling purposes

#### _CUID_

- Creates uniqe Id for mapping over data

#### _React Card Flip_

- Makes card flipping functionality more accessible 

#### _Formik_

- Form management 

#### _Yup_

- Form validation

#### _Inter UI_

- For fonts


#### Front end deployed to `Amazon Web Services`

# 3️⃣ Environment Variables

In order for the app to function correctly, the user must set up their own environment variables. There should be a .env file containing the following:

🚫These are just examples, replace them with the specifics for your app

    *  REACT_APP_apiKey - this is your Google API key, which can be generated in the Google Cloud Console
    *  REACT_APP_authDomain - when you set up your Firebase project, this information will be in the dashboard
    *  REACT_APP_databaseURL - in the Firebase dashboard
    *  REACT_APP_projectID - in the Firebase dashboard
    *  REACT_APP_storageBucket - in the Firebase dashboard
    *  REACT_APP_messagingSenderId - in the Firebase dashboard
    *  REACT_APP_stripe_API - this is your public Stripe API key, generated in the Stripe dashboard
    *  REACT_APP_backendURL - optional for your local development server
    *  REACT_APP_clientid - this is the Stripe_connect clientID, generated in Stripe_connect settings
    *  REACT_APP_stripe_plan - this is the ID for a second Stripe subscription plan, generated under Stripe products

# 5️⃣ Content Licenses

| Image Filename | Source / Creator | License                                                                      |
| -------------- | ---------------- | ---------------------------------------------------------------------------- |
| ASL alphabet signs   | Burst/Sarah Pflug   | [Burst](https://burst.shopify.com/@sarahpflugphoto) |
|                             |

# Testing

Jest was used to test the app because of its simplicity and its integration capabilities with Code Climate.

# Installation Instructions

Clone this repo to your local machine. Run npm i.

## Other Scripts

    * build - creates a build of the application
    * start - starts the production server after a build is created
    * test - runs tests in **__tests__** directory 
    * eject - copies the configuration files and dependencies into the project so you have full control over them
    * coverage - creates a coverage report of test

# Contributing

When contributing to this repository, please first discuss the change you wish to make via issue, email, or any other method with the owners of this repository before making a change.

Please note we have a [code of conduct](./CODE_OF_CONDUCT.md). Please follow it in all your interactions with the project.

## Issue/Bug Request

**If you are having an issue with the existing project code, please submit a bug report under the following guidelines:**

- Check first to see if your issue has already been reported.
- Check to see if the issue has recently been fixed by attempting to reproduce the issue using the latest master branch in the repository.
- Create a live example of the problem.
- Submit a detailed bug report including your environment & browser, steps to reproduce the issue, actual and expected outcomes, where you believe the issue is originating from, and any potential solutions you have considered.

### Feature Requests

We would love to hear from you about new features which would improve this app and further the aims of our project. Please provide as much detail and information as possible to show us why you think your new feature should be implemented.

### Pull Requests

If you have developed a patch, bug fix, or new feature that would improve this app, please submit a pull request. It is best to communicate your ideas with the developers first before investing a great deal of time into a pull request to ensure that it will mesh smoothly with the project.

Remember that this project is licensed under the MIT license, and by submitting a pull request, you agree that your work will be, too.

#### Pull Request Guidelines

- Ensure any install or build dependencies are removed before the end of the layer when doing a build.
- Update the README.md with details of changes to the interface, including new plist variables, exposed ports, useful file locations and container parameters.
- Ensure that your code conforms to our existing code conventions and test coverage.
- Include the relevant issue number, if applicable.
- You may merge the Pull Request in once you have the sign-off of two other developers, or if you do not have permission to do that, you may request the second reviewer to merge it for you.

### Attribution

These contribution guidelines have been adapted from [this good-Contributing.md-template](https://gist.github.com/PurpleBooth/b24679402957c63ec426).

## Documentation

See [Backend Documentation](https://github.com/Lambda-School-Labs/signlingo-be) for details on the backend of our project.