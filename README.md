
# Docplanner Technical Test

## Prerequisites

* [Node JS 10 LTS](https://nodejs.org)
* [Visual Studio 2017 15.7 or later](https://docs.microsoft.com/en-us/visualstudio/install/update-visual-studio)
* [Net Core 2.1.7 SDK 2.1.503](https://dotnet.microsoft.com/download/dotnet-core/2.1)

## How to run

To run the application just execute in the root folder:

```cmd
dotnet run --project ServerApp
```

To run the tests just execute in the root folder:

```cmd
dotnet test
```

## Tech decisions made

* For the sake of simplicity and because it feel unnesecary I have just created tests for the *free slots adapter*, the POST method to save was just a handler between the *Server* and the *API*, and should be the API the responsable off making sure that the requests are the expected ones, I just return a *BadRequest* to the front end when the API data was not correct.

* The frontend is built using [React JS](https://facebook.github.io/create-react-app/) using [TypeScript](https://www.typescriptlang.org/), I also included several libraries to made the development easier:

  * [Moment.js](https://momentjs.com/): To work with dates and build the calendar
  * [React Bootstrap](https://react-bootstrap.github.io/): For building a nice UI with ease
  * [React Router](https://reacttraining.com/react-router/): Provides routing between the calendar and the reservation page