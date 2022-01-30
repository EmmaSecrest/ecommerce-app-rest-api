const express = require("express");
const { pool } = require("../config");
const orderRouter = express.Router();
const {ensureAuthentication} = require('./login')

//needed functions
const orderExists = (orderId ,done) =>{
    pool.query('SELECT * FROM orders WHERE id = $1' ,[orderId],
    function(err,data){
        if(err){
            console.log(err)
            done(err,null)
        } else{
            done(null,data)
        }
    })
}

const checkOrder = (orderId , done) =>{
    pool.query('SELECT * FROM orders WHERE id = $1 and status = $2' ,[orderId ,'received'],
    function(err, data){
        if (err){
            console.log(err)
            done(err,null)
        } else {
            done(null,data)
        }
    })
}

//get all orders
orderRouter.get('/',ensureAuthentication ,(req,res) => {
    const customersOrders = Number(req.user.id)
    pool.query('SELECT total, status  FROM orders WHERE user_id = $1',[customersOrders] ,function(err, data){
        if(err){
            console.log(err)
            res.send("There was an issue getting that order")
        } else{
            if(data.rowCount === 0){
                res.send("That order does not exist")
            } else{
                res.send(data.rows)
            }
        }
    })
});

// view a specific order
orderRouter.get('/:orderId',ensureAuthentication,(req,res)=>{
    const requestedOrder = Number(req.params.orderId)
    pool.query('select orders.id as order_id, order_item.product_id as product_id, product.name as name ,product.price as price FROM orders join order_item on orders.id = order_item.order_id join product on order_item.product_id = product.id WHERE orders .id =$1',[requestedOrder], 
    function(err,received){
        if(err){
            console.log(err)
            res.send("Can't grab this order")
        } else{
            if(received.rowCount === 0){
                res.send('This order is empty')
            } else {
                res.send(received.rows)
            }
        }
    })
})

// delete an order if not shipped
orderRouter.delete('/:cartId',(req,res)=>{
    const orderId = req.params.cartId
    orderExists(orderId ,function(err,result){
        if (err){
            throw err;
        } else{
            if(result.rowCount === 0){
                res.send("Order does not exist")
            } else {
                checkOrder(orderId, function(err, data){
                    if(data.rowCount === 0){
                        res.send("Order Has shipped cannot delete")
                    } else{
                        pool.query('DELETE FROM order_item WHERE order_id =$1', [orderId], function(err,d){
                            if(err){
                                console.log(err)
                            } else {
                                pool.query('DELETE FROM orders where id = $1',[orderId],
                                function(err,dat){
                                    if(err){
                                        console.log(err)
                                    } else{
                                        res.send("order successfully deleted")
                                    }
                                })
                            }
                        })
                    }
                })
            }  
        }
    })
} )

module.exports = orderRouter


//They can look at all orders
// They can look at a single order