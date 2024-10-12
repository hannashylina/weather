import { defineStore } from 'pinia'

export const useCitiesStore = defineStore('cities', {
    state: () => ({
        cities: [],
        activeCity: {},
        display: '',
        favCities: []
    }),
    actions: {
        addCity(city) {
            this.cities.push(city)
        },
        deleteCity(id){
            const index = this.cities.findIndex(city => city.id === id)
            this.cities.splice(index, 1)
        },
        replaceDefaultCity(city){
            this.cities.splice(0, 1, city)
        },
        setActiveCity(city){
            Object.assign(this.activeCity, city);
        },
        setDisplay(mode){
            this.display = mode
        },
        addFavoriteCity(){
            this.favCities.push(city)
        }
    },
})