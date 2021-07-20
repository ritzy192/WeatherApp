const request = require("request");

const forecast = (lat, long, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=3b01490a702d8d41d46cba938459868c&query=' + lat + ',' + long

    request({url, json: true}, (error, { body }) => {
        if(error)
        {
            callback('Unabke to connect to weather service')
        }
        else if(body.error)
        {
            callback('Unable to find weather location')
        }
        else
        {
            callback(undefined,body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature +' degrees out. It feels like ' + body.current.feelslike + ' degrees out.')
        }
    })
}

module.exports = forecast