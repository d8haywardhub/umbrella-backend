
import * as http from 'http';

// usage:     const weather = await weatherService.getWeather("524901");

class WeatherService {

    constructor() { }

    private getWeather = async (location: string) => {

        let rawData:string = "";

        try {
            const weather:string = await new Promise((resolve, reject) => {
                http.get(`${process.env.WEATHER_URL}?id=${location}&appid=${process.env.WEATHER_APPID}`, (resp: any) => {
        
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
        let isRain = false;
        const weather:any = await this.getWeather(location);
        if (weather && weather.list && weather.list.length > 0) {
            const found  = weather.list.find((item:any) => (item.weather[0].id >= 500 && item.weather[0].id < 600));
            return !!found;
        }

        return false;
    }

}
const weatherService = new WeatherService();

export default weatherService;