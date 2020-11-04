import {derived, writable} from 'svelte/store'
import { DrugsData, CityData} from './data'
import { Utils } from './utils';

function createPlayerStats(){

    const {subscribe,set,update} = writable({
        Balance : 2000,
        Bank : 0,
        Dept : 5500,
        Guns : [],
        CurrentCity : "la",
        Inventory : {
            Storage : [],
            MaxSize : 100
        },
        Market : [],
        MarketBehaviour : {
            IsLow : false,
            IsHigh : false,
            IsNormal : true
        }
    })


    const getDrugs = (sub) => {
        let _drugs = [];
        let _city ;

        sub((val) => {
            _city = val.CurrentCity;
        })

        CityData[_city].drugs.forEach((el) => {
            for(let drug in DrugsData){
                if(drug === el){
                    _drugs.push(drug);
                }
            }
        })
        return _drugs;
    }

    function UpdateMarket(){

        function GetPrice(el){
            let _rChooser = Utils.ArbitraryRandom(1,3)
            //Cheap
            if(_rChooser === 1){
                return Utils.CalculatePrice(DrugsData[el].cheap.min, DrugsData[el].cheap.max);
            //Expensive
            }else if(_rChooser === 2){
                return Utils.CalculatePrice(DrugsData[el].expensive.min, DrugsData[el].expensive.max);
            //Normal
            }else{
                return Utils.CalculatePrice(DrugsData[el].normal.min, DrugsData[el].normal.max);
            }
        }

        getDrugs(subscribe).forEach((el) => {

            let _drug = {
                name : DrugsData[el].name,
                price : GetPrice(el)              
            }

            update((n) => {
                n.Market.push(_drug);
            });
        })
    }

    UpdateMarket();
    
    return {
        subscribe,
        AddItem : (i) => update((n) => {

        }),
        BuyItem : () => update((n) => {
    
        }),
    }
}

export const playerStats = createPlayerStats();