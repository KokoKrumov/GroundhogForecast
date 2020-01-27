import {Days} from './days';

export interface ObjWeather {
    weatherType: string;
    name: string;
    weatherIcon: string;
    region: string;
    country: string;
    temperature: number;
    description: string;
    feelsLike: number;
    humidity: number;
    windSpeed: number;
    days: Array<Days>;
}
