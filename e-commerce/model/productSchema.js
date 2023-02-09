const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name cannot be empty"]
    },
    phone: {
        type: Number,
        required: [true, "Phone is the required field"]
    },
    email: {
        type: String,
        match: [/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/, "Provide valid email"],
        unique: [true, " Email id should be unique"],
        required: [true, "Email is the required field"]
    },
    product: {
        type: [
            {
                colour: {
                    type: String,
                    required: [true, "Provide color of the product" ]
                },
                size: {
                    type: String,
                    enum : {
                        values : ['Small', 'Medium', 'Large'],
                        message : '{VALUE} is not supported'
                    },
                    required: [true, "Provide the size of the product"]                
                },
                amount: {
                    type: Number,
                    required: [true, "Provide the valid price of the product"]
                }
            }
        ]
    }
})

let Product = mongoose.model('product', productSchema);

module.exports = {
    Product
}

