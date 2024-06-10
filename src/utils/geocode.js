const request = require('request')


const geocode = (address, callback) => {
    //const geocodeURL = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${address}&key=AIzaSyB9X26tgR0P2u3lko48ED36qFbuMhKgEeY`
    const url = 'https://maps.googleapis.com/maps/api/place/textsearch/json?query=' + encodeURIComponent(address) + '&key=AIzaSyB9X26tgR0P2u3lko48ED36qFbuMhKgEeY'
    console.log(url)

    request({ url, json: true }, (error, {body}) => {
        
        //const data = response.body

        console.log('body.status = ' + body.status)

        if(error){
            callback('Unable to connect to location service!', undefined)
        }
        //else if(body.results.lentgh === 0){
        else if(body.status === 'ZERO_RESULTS'){
            callback('No results for this location')
        }
        else{
            callback(undefined, {
                latitude: body.results[0].geometry.location.lat,
                longitude: body.results[0].geometry.location.lng,
                location: body.results[0].formatted_address
            })
        }
    })
}

module.exports = geocode