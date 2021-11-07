const mongoose = require('mongoose');
const ProductSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name must be provided"]
        },
        price: {
            type: Number,
            required: [true, "Price Must be provided"]
        },
        company: {
            type: String,
            enum: {
                values: ['ikea', 'liddy', 'caressa', 'marcos'],
                message: "{VALUE} is not supported"
            }
        },
        featured: {
            type: Boolean,
            default: false
        },
        rating: {
            type: Number,
            default: 4.5
        },
        createdAt: {
            type: Date,
            default: Date.now()
        }
    }
)
module.exports.Product = mongoose.model('Product', ProductSchema);