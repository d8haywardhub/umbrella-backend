import * as http from 'http';

class WeatherService {

    constructor() { }

    private getWeather = async (location: string) => {

        let rawData:string = "";

        try {
            const weather:string = await new Promise((resolve, reject) => {
                debugger;
                var isNum = /^\d+$/.test(location);
                let weatherQuery = `id=${location}`;
                if (!isNum) {
                    weatherQuery = `q=${location}`;        // City,country
                }
                //http.get(`${process.env.WEATHER_URL}?id=${location}&appid=${process.env.WEATHER_APPID}`, (resp: any) => {
                http.get(`${process.env.WEATHER_URL}?${weatherQuery}&appid=${process.env.WEATHER_APPID}`, (resp: any) => {
        
                    resp.on('data', (chunk:string) => {
                        rawData += chunk;
                    }),
        
                    resp.on('end', () => {
                        resolve(rawData);
                    }),

                    resp.on('error', (error) => {
                        reject(error);
                    })
        
                });

            });
            return JSON.parse(weather);

        } catch(error) {
            return JSON.parse("{}");
        }
    }

    public async isRainInForecast(location: string) {
        const weather:any = await this.getWeather(location);
        if (weather && weather.list && weather.list.length > 0) {
            const found = weather.list.find((item:any) => (item.weather[0].id >= 500 && item.weather[0].id < 600));
            return !!found;
        }

        return false;
    }

    public async getRainForecast(location: string) {
        let foundRain: boolean = false;
        const weather:any = await this.getWeather(location);
        if (weather && weather.list && weather.list.length > 0) {
            const whenRaining = weather.list.map((item:any) => {            // => (item.weather[0].id >= 500 && item.weather[0].id < 600)
                if (item.weather[0].id >= 500 && item.weather[0].id < 600) {
                    foundRain=true;
                    //const dateOf:Date = new Date(item.dt*1000);
                    //console.log(dateOf.toLocaleString());
                    return item.dt*1000;
                }
                //return 0;
            });

            if (foundRain) {
                return whenRaining;
            } else {
                return [];
            }
        }

        return [];
    }

}
const weatherService = new WeatherService();

export default weatherService;