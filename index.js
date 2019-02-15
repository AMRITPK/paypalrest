const express = require('express')
const app = express()
const port = process.env.PORT || 5000
var request = require("request");

app.get('/', (req, res) => res.send('Hello World!'))
app.get('/redirect-server', function(req, res) {
  console.log("in here in red 302");
  res.redirect(302,'myapp://returnApp?status=1');
});
app.get('/redirect', function(req, res) {
    res.sendFile('views/redirect.html', {root: __dirname })
});
app.get('/create123',(req,res)=> {
  console.log(req.header);
});

app.post('/create',(req,res)=> {
var request = require("request");
console.log("amrrrr",req.body);
var options = { method: 'POST',
  url: 'https://api.sandbox.paypal.com/v1/oauth2/token',
  headers:
   { 'Postman-Token': 'd48f6057-e4f0-4021-80de-6f6b465b407c',
     'cache-control': 'no-cache',
     'Content-Type': 'application/x-www-form-urlencoded',
     Authorization: 'Basic QVlURXNfQTI5S2ZVVDBOU0JGVHRHUmFZbHlpWFZNTUpEbW5FWnhkQ0JKeFp3Q0VJcmhDcFZvNHZUVkNvbkp0bWg1c0pZOFluUHFxcm1Na1M6RUpuem1VcG1iWklGbURaS093NkxlNGVmczJGRmZKTU1xSG43X1QxaDk2aWpRZnlTY3M3NjJKUTNEUkxWSDFMLXk0YmVjR1J5UXVmYmNHcWs=,Basic QWZzYS1nUWY3cjdreXlsMmFUSjEzZkZ4SmhUX3JBQnJabGFWZDRHU1J0ZnNwVXJPUnY2N1RseVNMSC1xYm5XdVp1NUpXLWtPQ1l5WHpNNlU6RUJHQmJKQWd1QlVVWjEtQkN0Q0RQcjBQOTBKU3hsT285UFdqcHptWlpOU29qMXZ0b0lXQXFqdkpsUmdHMVhBZ1o4aVpIWl9lV2VlOVdCTVU='
    },
 body:'grant_type=client_credentials&response_type=token&return_authn_schemes=true',
 form: false };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  var resjson=JSON.parse(body);
  var token= resjson.access_token ;
console.log(token);

 //request = require("request");

 options = { method: 'POST',
  url: 'https://api.sandbox.paypal.com/v1/payments/payment',
  headers: 
   { 'Postman-Token': '6005c7cc-60f9-4b42-8b01-d44189b933bd',
     'cache-control': 'no-cache',
     Authorization: 'Bearer '+token,
     'Content-Type': 'application/json' },
  body: 
   { intent: 'sale',
     payer: { payment_method: 'paypal' },
     transactions: 
      [ { amount: 
           { total: '30.11',
             currency: 'INR',
             details: 
              { subtotal: '30.00',
                tax: '0.07',
                shipping: '0.03',
                handling_fee: '1.00',
                shipping_discount: '-1.00',
                insurance: '0.01' } },
          description: req.body.description||'This is the payment transaction description.',
          custom: req.body.custom||'EBAY_EMS_90048630024435',
          invoice_number: req.body.invoice_number||token.substring(10),
          payment_options: { allowed_payment_method: 'INSTANT_FUNDING_SOURCE' },
          soft_descriptor: 'ECHI5786786',
          item_list: 
           { items: 
              [ { name: 'hat',
                  description: req.body.description||'Brown color hat',
                  quantity: '5',
                  price: '3',
                  tax: '0.01',
                  sku: '1',
                  currency: req.body.currency||'INR' },
                { name: 'handbag',
                  description: 'Black color hand bag',
                  quantity: '1',
                  price: '15',
                  tax: '0.02',
                  sku: 'product34',
                  currency: req.body.currency||'INR' } ],
             shipping_address: 
              { recipient_name: 'Hello World',
                line1: '4thFloor',
                line2: 'unit#34',
                city: 'SAn Jose',
                country_code: 'US',
                postal_code: '95131',
                phone: '011862212345678',
                state: 'CA' } } } ],
     note_to_payer: 'Contact us for any questions on your order.',
     redirect_urls: 
      { return_url: req.body.return_url||'https://www.paypal-proserv.com/testingamr_bak.php?url=https://www.amazon.in/gizmos',
        cancel_url: req.body.cancel_url||'http://www.hawaii.com' } },
        //''myapp://returnApp?status=1'  
        //https://www.paypal-proserv.com/testingamr.php?url=myapp%3A%2F%2FreturnApp%3Fstatus%3D1%0A
        //'http://10.232.196.155:3000/redirect-server'
  json: true };

 // console.log(options);

request(options, function (error, response, body) {
  if (error) throw new Error(error);
  //console.log(response,body);
  var jsonbody1=(body);
  console.log(jsonbody1);
  res.send( jsonbody1);
  var links=jsonbody1['links'];

  for (index in links){
    if(links[index].method=='REDIRECT'){
       //res.send(links[index].href);
    }
  }
});


});


});
app.listen(port, () => console.log(`Example app listening on port ${port}!`))


