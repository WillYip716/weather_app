
window.onload = function(){

    const form  = document.getElementsByTagName('form')[0];
    const cityIn = document.getElementById("city");
    const imgDiv = document.getElementById("imgDiv");
    const tempMsg = document.getElementById("tempMsg");

    async function getGihpyImage(keyword) {
        try{
            const response = await fetch('https://api.giphy.com/v1/gifs/translate?api_key=av3xs7PNhEIsiV0vbFNfrsF2ZWqgG6xV&s='+keyword, {mode: 'cors'});
            return await response.json();
        }
        catch(e){
            console.log(e);
        }    
    }
    
    async function getWeather(keyword) {
        try{
            const response = await fetch("http://api.openweathermap.org/data/2.5/weather?q="+keyword+"&APPID=9c730a2a159c8f0e90e12e3a783d89ff", {mode: 'cors'});
            return await response.json();
        }
        catch(e){
            console.log(e);
        }    
    }
    
    form.addEventListener("submit" ,async function(){
        event.preventDefault();
        let cityName = cityIn.value;

        console.log("the name is " +cityName);
        
        getWeather(cityName).then((jSfile) => {
            let temp = "warm";
            const tempInF = Math.floor((jSfile.main.temp - 273.15) * 9/5 + 32);

            console.log(tempInF)

            if(tempInF>90){
                temp = "hot";
            }
            else if(tempInF < 65){
                temp = "cold"
            }

            getGihpyImage(temp).then((imgObj) => {
                imgDiv.src= imgObj.data.images.original.url;
                tempMsg.innerHTML = "It's " + temp + "!";
                console.log("giphy fininshed");
            });
        });
    });
}
