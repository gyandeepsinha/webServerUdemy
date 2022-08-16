const request   =   require('request');

//WeatherStack.com API to get weather report.
const weatherData   =   (address, callback) => {
    const weatherUrl="http://api.weatherstack.com/current?access_key=6295db48c789ca25df6522831397d586&query="+ address +"";

    request({url: weatherUrl, json: true}, (error, weatherDataResponse) =>{
        if(error){
            callback('Error While Getting API Response', undefined);
        }else if(weatherDataResponse.body.error){
            callback('No Weather Report Found', undefined);
        }else{
            callback(undefined,weatherDataResponse)
        }
    });
}

//MapBox API to get the latitude and longitude
const geoCode   =   (address, callback) => {
    const geoCodeUrl ="https://api.mapbox.com/geocoding/v5/mapbox.places/"+ address + ".json?access_token=pk.eyJ1Ijoic2d5YW5zaW5oYSIsImEiOiJjbDZkODVianIwMHJ1M2ltbWswcXlrbm45In0.Hze40ThjJX2eNnfRRQxQhA&limit=1";
    
    request({url: geoCodeUrl, json:true}, (error, geoCodeData) =>{
        if(error){
            callback('Error While Getting API Response', undefined);
        }else if(geoCodeData.body.features.length===0){
            callback('No Location Found!', undefined);
        }else{
            callback(undefined,geoCodeData);
        }
    });
}

module.exports  =   { geoCode, weatherData };