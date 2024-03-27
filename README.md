<div style="display: flex; align-items: center;">
    <!-- Logo -->
    <img src="https://github.com/Blitu82/FE_WD_project/blob/main/public/logo_example.png" alt="OnlyMaps Logo" width="50" height="50">
    <!-- Title -->
    <h1>OnlyMaps</h1>
</div>

## Description

Mapping server app that allows users to download geographic data.
<br>
![Screenshot](https://github.com/Blitu82/FE_WD_project/blob/main/public/onlymaps_app.png)

## Routes

### Grid Routes

| Method | Route         | Description                                              |
| ------ | ------------- | -------------------------------------------------------- |
| GET    | /api/grid     | Returns all tiles                                        |
| POST   | /api/grid     | Creates new tiles using the files in the /geojson folder |
| GET    | /api/download | Endpoint for downloading coverage data from GeoServer    |

### Authentication Routes

| Method | Route                 | Description                                  |
| ------ | --------------------- | -------------------------------------------- |
| POST   | /auth/signup          | Creates a new user                           |
| POST   | /auth/login           | Verifies email and password and return a JWT |
| GET    | /auth/verify          | Verifies JWT stored on the client            |
| POST   | /auth/change-password | Allows a user to change their password       |

### User Feedback Routes

| Method | Route         | Description                           |
| ------ | ------------- | ------------------------------------- |
| POST   | /api/feedback | Allows a user to send a feedback form |

## Models

### Polygon Schema

```js
{
  type: {
    type: String,
    enum: ['Polygon'],
    required: true
  },
  coordinates: {
    type: [[[Number]]],
    required: true
  }
}
```

### Grid Schema

```js
{
  name: String,
  location: polygonSchema,
}
```

### User Schema

```js
{
  email: String,
  password: String,
}
```

### Feedback Schema

```js
{
  category: String,
  rating: Number,
  feedback: String,
  email: String,
}
```

<br>

## APIs

[MapBox](https://www.mapbox.com/)

<br>

## Packages

[Chakra UI](https://chakra-ui.com/)

<br>

## GitHub

[Frontend](https://github.com/Blitu82/FE_WD_project)

[Backend](https://github.com/Blitu82/BE_WD_project)

[Deployed version](https://onlymaps.netlify.app/)

## Contributors

Pablo García García - [GitHub](https://github.com/Blitu82) - [LinkedIn](https://www.linkedin.com/in/garpablo/)
