import mongoose from 'mongoose';

const FoodSchema = new mongoose.Schema({
    name: {type: String, require: true},
    description: {type: String, require: true},
    isVeg: {type: Boolean, require: true},
    isContainsEgg: {type: Boolean, require: true},
    category: {type: String, require: true},
    price: {type: Number, default: 150, require: true},
    photos: {
        type: mongoose.Types.ObjectId,
        ref: 'Images'
    },
    addOns: [{
        type: mongoose.Types.ObjectId,
        ref: "Foods"
    }],
    restaurant: {
        type: mongoose.Types.ObjectId,
        ref: "Restaurants",
        require: true
    }
},{
    timestamps: true
});

export const FoodModel = mongoose.model('Foods', FoodSchema);