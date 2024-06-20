const request = require('request')


//const forecast = (address, callback) => {
const forecast = (latitude, longitude, callback) => {
   
    //const url = 'https://api.tomorrow.io/v4/weather/realtime?location=' + encodeURIComponent(address) + '&apikey=wSypn4SXa5A8ISDydYMePYQJMKi4XuZd'
    const url = 'https://api.tomorrow.io/v4/weather/realtime?location=' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude) + '&apikey=wSypn4SXa5A8ISDydYMePYQJMKi4XuZd'
    console.log(url)

    //request({ url: url, json: true }, (error, response) => {
    request({ url, json: true }, (error, {body}) => {
        
        //const data = response.body

        if(error){
            callback('Unable to connect to location service!', undefined)
        }
        else if(body.code){
            callback('Error. Code = ' + body.code + '. message = ' + body.message)
        }
        else{
            //let msg = `It's currently ${data.data.values['temperature']} degress out in ${data.location['name']}. There is a ${data.data.values['precipitationProbability']}% chance of rain.`
            callback(undefined, 
                //`It's currently ${data.data.values['temperature']} degress out in ${data.location['name']}. There is a ${data.data.values['precipitationProbability']}% chance of rain.`
                //`It's currently ${data.data.values['temperature']} degress out. There is a ${data.data.values['precipitationProbability']}% chance of rain.`
                `It's currently ${body.data.values['temperature']} degress out. There is a ${body.data.values['precipitationProbability']}% chance of rain and ${body.data.values['humidity']}% humidity`
            )
        }
    })
}

module.exports = forecast