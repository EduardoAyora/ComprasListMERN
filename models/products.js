const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    aisle: {
        type: Number,
        required: false
    },
    inCart: {
        type: Boolean,
        required: false
    },
    marked: {
        type: Boolean,
        required: false
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
},{
    timestamps: true
});

var Products = mongoose.model('Product', productSchema);

module.exports = Products;
