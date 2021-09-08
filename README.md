# Brewery Finder

A web application that helps you find all the breweries in a certain area




## Authors

- [@GriffinGeorgiadis](https://github.com/GriffGeorgiadis)

  
## Deployment

To deploy this projectfirst clone this project to a directory then:

```bash
  npm install
```
```bash
  npm run build
```
```bash
  npm start
```

  
## Features

- Get all breweries in a certain area
- Save breweries to your list (list can be of breweries you want to see or visit)
- Delete breweries from your list

  
## API Reference

#### MapQuest API

```http
  GET http://open.mapquestapi.com/geocoding/v1/address?key=${APIKey}&location=${location}`
```

| Parameter | Type     | Description                             |
| :-------- | :------- | :-------------------------------------- |
|  `APIKey` | `string` | **Required**. Your API key for mapquest |

#### GoogleAPI

```http
  https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lng,lat}4&radius={num}&type={keyword}&keyword={keyword}&key=${APIKey}
```

| Parameter | Type     | Description                               |
| :-------- | :------- | :---------------------------------------- |
|  `APIKey` | `string` | **Required**. Your API key for googleMaps |


  
## License

[MIT](https://choosealicense.com/licenses/mit/)
