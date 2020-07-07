import { Injectable } from '@angular/core';

@Injectable()
export class HA_Storage {
    public STORE_LOCALSTORAGE = window.localStorage;

    public storeType:any = this.STORE_LOCALSTORAGE;

    constructor() {

    }
    public isSet(key){
        return this.storeType.getItem(key) !== null;
    };
    public set (key, val) {
        var obj = {
            type: val instanceof Date
                ? "date"
                : typeof val,
            value: val
        };
        this.storeType.setItem(key, JSON.stringify(obj));
    };
    
    public get (key) {
        if (!this.isSet(key)) {
            return undefined;
        }
        var obj = JSON.parse(this.storeType.getItem(key));
        if (obj.type === "date") {
            return new Date(obj.value);
        }
        return obj.value;
    };
    public remove (key){
        var keys = (key instanceof Array)
            ? key
            : [key];
        keys.map((key) => {
            this.storeType.removeItem(key);
        });
    };

    public clear () {
        this.storeType.clear();
    };

    public keys () {
        return Object.keys(this.storeType);
    };

    public values() {
        return this.keys().map((key)=> {
            return this.get(key);
        });
    };
    public getType(key) {
        if (!this.isSet(key)) {
            return undefined;
        } else {
            return typeof this.get(key);
        }
    };
    public pushTo (key, item) {
        if (!this.isSet(key) || !(this.get(key) instanceof Array)) {
            return;
        }
        var arr = this.get(key);
        arr.push(item);
        this.set(key, arr);
        return arr;
    };
    public removeByIdFrom (itemId, arrName) {
        var newArr = this.get(arrName).filter((arrItem)=> {
            return Number(arrItem.id) !== Number(itemId);
        });
        this.set(arrName, newArr);
        return this.get(arrName);
    };
}