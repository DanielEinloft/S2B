const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Game = Schema(
    {
     title: {type: String, required: true, max: 50},
     situation: {type: String, enum: ['Available', 'On Hold'], default: 'Available'},
     storeId: {type: Schema.ObjectId, ref: 'Store', required: true},
     UserHolding: {type: Schema.ObjectId, ref: 'User', default: undefined},
     price: {type: Number, required: true},
     holdTime: {type: Date, default: Date.now},
     units:{type: Number, default: 1}
    }
);

const Store = Schema(
    {
        storeName: {type: String, required: true, max: 100},
        address: {type: String, required: true, max: 100},
        CEP: {type: Number, required: true},
        games: [{type: Schema.ObjectId, ref: 'Game'}],
        userStore: {type: Schema.ObjectId, ref: 'UserStore', required: true}
    }
);
const User = Schema(
    {
        name: {type: String, required: true, max: 20},
        email: {type: String, required: true, max: 30},
        password: {type: String, required: true, min: 8, max: 16},
        address: { type: String, required: true, max: 50},
        games: [{type: Schema.ObjectId, ref: 'Game'}] 
    }
);

const UserStore = Schema(
    {
        name: {type: String, required: true, max: 50},
        email: {type: String, required: true, max: 30},
        password: {type: String, required: true, min: 8, max: 16},
        address: { type: String, required: true, max: 50},
        StoreID: [{type: Schema.ObjectId, ref: 'Store'}]
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
