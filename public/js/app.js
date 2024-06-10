const log = console.log
log('Client side JavaScript is loaded!!')




const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')



weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value
    log(location)

    const url = 'http://localhost:3000/weather?address=' + location

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch(url).then((response) => {}
                log(response)
        response.json().then((data) => {
            if(data.error){
                log(data.error)
                messageOne.textContent = data.error
            }
            else{
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
                log(data.forecast)
                log(data.location)
                log(data.address)
            }
            
        })
    })
})