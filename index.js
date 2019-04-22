const express = require('express')
var bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT || 5000
var request = require("request");
app.use(bodyParser.json())
var cors = require('cors')
app.use(cors())
app.get('/', (req, res) => res.send('Hello World!'));
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
app.post("/juspaycreateonly",function(req,res){
  //expects customer_id,customer_email,return_url,additional_data,experience_id
  //customer_id
  //risk_id
  if(req.body.security!="amrit"){
    res.send("security failed");
    throw ("  ");
  }
    var options = { method: 'POST',
      url: 'https://sandbox.juspay.in/ecr/orders',
      headers: 
      { 'cache-control': 'no-cache',
        Authorization: 'Basic QzZFOEU2QkU3NkI0NEExQkUxMjA5QTg1Mjk4OEIwOg==',
        Version:"2018-07-01",
        'Content-Type': 'application/x-www-form-urlencoded' },
      form: 
      { order_id: 'paypal_test_code_'+getRandomInt(10000),
        amount: '1.00',
        currency: 'INR',
        customer_id: req.body.customer_id||'cst_zdwpilklo6wa6sfa',
        customer_email: req.body.customer_email||'amritpk@gmail.com',
        return_url: req.body.return_url||'http://www.google.co.in',
        'metadata.PAYPAL:last_name': 'gd',
        'metadata.PAYPAL:landing_page': 'Billing',
        'metadata.PAYPAL:country_code': 'IN',
        'metadata.PAYPAL:additional_data': req.body.additional_data||'[{"key": "sender_account_id","value": "10001"},{"key":"sender_first_name","value": "John"},{"key": "sender_country_code","value": "US"},{"key": "sender_popularity_score","value": "low"}]',
        'metadata.PAYPAL:phone_number': '7200058446',
        'metadata.PAYPAL:experience_id':  req.body.experience_id||'XP-3NYT-KYZG-UY6Z-MXLN',
        'options.get_client_auth_token': req.body.get_client_auth_token||'true',
        description: 'This is BA for Juspay merchant'} };
  
    request(options, function (error, response, body) {
      if (error) throw new Error(error);
      console.log(body);
      console.log(JSON.parse(body));
  
      console.log(body);
      res.send(body);
      //let orderid=JSON.parse(body).order_id;
     // console.log(orderid);
    });
});   
app.post("/juspaycreate",function(req,res){
//expects customer_id,customer_email,return_url,additional_data,experience_id
//customer_id
//risk_id
if(req.body.security!="amrit"){
  res.send("security failed");
  throw ("  ");
}
  var options = { method: 'POST',
    url: 'https://sandbox.juspay.in/ecr/orders',
    headers: 
    { 'cache-control': 'no-cache',
      Authorization: 'Basic QzZFOEU2QkU3NkI0NEExQkUxMjA5QTg1Mjk4OEIwOg==',
      'Content-Type': 'application/x-www-form-urlencoded' },
    form: 
    { order_id: 'paypal_test_code_'+getRandomInt(10000),
      amount: '1.00',
      currency: 'INR',
      customer_id: req.body.customer_id||'cst_zdwpilklo6wa6sfa',
      customer_email: req.body.customer_email||'amritpk@gmail.com',
      return_url: req.body.return_url||'http://www.google.co.in',
      'metadata.PAYPAL:last_name': 'gd',
      'metadata.PAYPAL:landing_page': 'Billing',
      'metadata.PAYPAL:country_code': 'IN',
      'metadata.PAYPAL:additional_data': req.body.additional_data||'[{"key": "sender_account_id","value": "10001"},{"key":"sender_first_name","value": "John"},{"key": "sender_country_code","value": "US"},{"key": "sender_popularity_score","value": "low"}]',
      'metadata.PAYPAL:phone_number': '7200058446',
      'metadata.PAYPAL:experience_id':  req.body.experience_id||'XP-3NYT-KYZG-UY6Z-MXLN',
      description: 'This is BA for Juspay merchant'} };

  request(options, function (error, response, body) {
    if (error) throw new Error(error);
    console.log(body);
    console.log(JSON.parse(body));

    console.log(body);
    let orderid=JSON.parse(body).order_id;
    console.log(orderid);
    var options = { method: 'GET',
    url: (req.body.customer_id)?'https://sandbox.juspay.in/customers/'+req.body.customer_id+'/wallets' :'https://sandbox.juspay.in/customers/cst_zdwpilklo6wa6sfa/wallets',
    headers: 
    { 'cache-control': 'no-cache',
      Authorization: 'Basic QzZFOEU2QkU3NkI0NEExQkUxMjA5QTg1Mjk4OEIwOg==',
      'Content-Type': 'application/x-www-form-urlencoded' },
    form: false };

    request(options, function (error, response, body) {
    if (error) throw new Error(error);

    console.log(body);
    console.log(JSON.parse(body).list);
    console.log(JSON.parse(body).list.pop());
      let tokenID=JSON.parse(body).list.pop().token;
      console.log(tokenID);
      var options = { method: 'POST',
        url: 'https://sandbox.juspay.in/txns',
        headers: 
        { 'cache-control': 'no-cache',
          Authorization: 'Basic QzZFOEU2QkU3NkI0NEExQkUxMjA5QTg1Mjk4OEIwOg==',
          'Content-Type': 'application/x-www-form-urlencoded' },
        form: 
        { order_id: orderid,
          merchant_id: 'dummy-merchant',
          payment_method_type: 'WALLET',
          payment_method: 'PAYPAL',
          redirect_after_payment: 'true',
          format: 'json',
          direct_wallet_token: tokenID,
          risk_id: req.body.risk_id||'4094eca42c47465a9a74d366d8c3fdfb'
         } };

      request(options, function (error, response, body) {
        if (error) throw new Error(error);

        console.log(body);
        res.send(body);
      });

    });

  });

})

app.get('/redirect-server', function(req, res) {
  console.log("in here in red 302");
  res.redirect(302,'myapp://returnApp?status=1');
});
app.get('/redirect', function(req, res) {
    res.sendFile('views/redirect.html', {root: __dirname })
});
app.get('/create123',(req,res)=> {
  res.send("{ 'id': 'PAYID-LR3X66I3NF28077FT845531S', 'intent': 'sale', 'state': 'created', 'payer': { 'payment_method': 'paypal' }, 'transactions': [ { 'amount': { 'total': '3.00', 'currency': 'INR', 'details': { 'subtotal': '3.00', 'tax': '0.00', 'shipping': '0.00', 'insurance': '0.00', 'handling_fee': '0.00', 'shipping_discount': '0.00' } }, 'description': 'This is the payment transaction description.', 'custom': 'EBAY_EMS_900486300244d35', 'invoice_number': '48787589dd6721', 'soft_descriptor': 'ECHI5786786', 'payment_options': { 'allowed_payment_method': 'INSTANT_FUNDING_SOURCE', 'recurring_flag': false, 'skip_fmf': false }, 'item_list': { 'items': [ { 'name': 'hat', 'sku': '1', 'description': 'Brown color hat', 'price': '3.00', 'currency': 'INR', 'tax': '0.00', 'quantity': 1 } ], 'shipping_address': { 'recipient_name': 'Hello World', 'line1': '4thFloor', 'line2': 'unit#34', 'city': 'Bangalore', 'state': 'Karnataka', 'postal_code': '560100', 'country_code': 'IN', 'phone': '011862212345678' } }, 'related_resources': [] } ], 'note_to_payer': 'Contact us for any questions on your order.', 'create_time': '2019-02-28T06:28:09Z', 'links': [ { 'href': 'https://api.paypal.com/v1/payments/payment/PAYID-LR3X66I3NF28077FT845531S', 'rel': 'self', 'method': 'GET' }, { 'href': 'https://www.paypal.com/cgi-bin/webscr?cmd=_express-checkout&token=EC-95S20214683635835', 'rel': 'approval_url', 'method': 'REDIRECT' }, { 'href': 'https://api.paypal.com/v1/payments/payment/PAYID-LR3X66I3NF28077FT845531S/execute', 'rel': 'execute', 'method': 'POST' } ]}");
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
     
  application_context:{
   
    "landing_page":req.body.landing_page||"Login"
  },
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


