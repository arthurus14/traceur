//interface

export interface Map{

  name:string;
  description:string;
  lat:number;
  lng:number;

}
//mocks => données brut en attendant d'avoir une padding

export const GeoMap = [
  {
    'name' : 'Jérémy',
    'description' : 'Portable ',
    'lat' : 49.182863,
    'lng' :-0.37067899999999554
  },
  {
    'name' : 'Stéphanie',
    'description' : 'Portable ',
    'lat' : 49.33083300000001,
    'lng' :-0.3928960000000643
  }
]
