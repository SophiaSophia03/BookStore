const mongoose  = require("mongoose");

const orderSchema = new mongoose.Schema({
  status:{
    type:String,
    default:"Order Placed",
    enum:["Order Placed","Out for Delivery", "Order completed", "Order Cancelled"]
  },
  user:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"user",
  }],
  book:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"book",
  }]
},
{timestamps:true}
);

const Order = mongoose.model("order", orderSchema);

module.exports = Order;
