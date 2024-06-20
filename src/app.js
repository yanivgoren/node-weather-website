const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const log = console.log

log(__dirname)
log(path.join(__dirname, '../public'))

const app = express()
const port = process.env.PORT || 3000

//Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath  = path.join(__dirname, '../templates/views')
const partialsPath  = path.join(__dirname, '../templates/partials')

//Setup handlesbars engine and view location
app.set('view engine', 'hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

//2
app.get('', (req,res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Yaniv Goren'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        title: 'Help',
        helpText: 'This is some hgelpful text',
        name: 'Yaniv Goren'
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Yaniv Goren',
        myImage: '/img/me.png'
    })
})

app.get('/weather', (req,res) => {

    if(!req.query.address){
        return res.send({error: 'You must provide address.'})
    }

    geocode(req.query.address, (error, {latitude,longitude,location} = {}) => {
        if(error){
            return res.send({error})
        }
        else{
            //forecast(geocodeData.latitude, geocodeData.longitude, (error, forecastData) => {
            forecast(latitude, longitude, (error, forecastData) => {
                //forecast('Buenos Aires', (error, data) => {
                    if(error){
                        return res.send({error})
                    }
                    //log(geocodeData.location)  
                    log(location)  
                    log(forecastData)  
                    
                    res.send({
                        forecast: forecastData,
                        location,
                        address: req.query.address
                    })
                    }
                )
            }
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'This article not exist',
        name: 'Yaniv Goren',
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'This page not found',
        name: 'Yaniv Goren',
    })
})

//app.com
//app.com/help
//app.com/about


app.listen(port, () => {
    log('Server is up on port ' + port)
})