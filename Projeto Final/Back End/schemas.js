const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Game = Schema(
    {
     title: {type: String, required: true, max: 50},
     situation: {type: String, required: true, enum: ['Available', 'On Hold'], default: 'Available'},
     store: {type: Schema.ObjectId, ref: 'Store'},
     user: {type: Schema.ObjectId, ref: 'User'},
     price: {type: Number, required: true},
     holdTime: {type: Date, default: Date.now}
    }
);

const Store = Schema(
    {
        storeName: {type: String, required: true, max: 100},
        address: {type: String, required: true, max: 100},
        CEP: {type: Number, required: true},
        games: [{type: Schema.ObjectId, ref: 'Game'}] 
    }
);
const User = Schema(
    {
        name: {type: String, required: true, max: 20},
        lastName: {type: String, required: true, max: 30},
        CPF: {type: Number, required: true, max: 9999999999},
        email: {type: String, required: true, max: 30},
        password: {type: String, required: true, min: 8, max: 16},
        address: { type: String, required: true, max: 50},
        creditCardNumber: {type: String, max:16, default: null},
        creditCardSecurityCode: {type: String, max:3, default: null},
        games: [{type: Schema.ObjectId, ref: 'Game'}] 
    }
);

const UserStore = Schema(
    {
        storeName: {type: String, required: true, max: 100},
        managerName: {type: String, required: true, max: 50},
        CPF: {type: Number, required: true,max: 9999999999},
        email: {type: String, required: true, max: 30},
        password: {type: String, required: true, min: 8, max: 16},
        address: { type: String, required: true, max: 50},
        creditCardNumber: {type: String, max:16, default: null},
        StoreID: {type: Schema.ObjectId, ref: 'Store', required: true}
    }
);

const DBStores = Schema(
    {
        storeName: {type: String, required: true, max: 100},
        address: {type: String, required: true, max: 100},
        CEP: {type: Number, required: true},
        district: {type: String, required: true, max: 20},
        description: {type: String, required: true, max: 100}
    }
);

exports.Game = mongoose.model('Game',Game);
exports.Store = mongoose.model('Store', Store);
exports.User = mongoose.model('User',User);
exports.UserStore = mongoose.model('UserStore',UserStore);
exports.DBStores = mongoose.model('DBStores',DBStores);
