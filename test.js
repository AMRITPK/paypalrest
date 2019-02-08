var request = require("request");

var options = { method: 'POST',
  url: 'https://api.sandbox.paypal.com/v1/oauth2/token',
  headers: 
   { 'Postman-Token': 'd48f6057-e4f0-4021-80de-6f6b465b407c',
     'cache-control': 'no-cache',
     'Content-Type': 'application/x-www-form-urlencoded',
     Authorization: 'Basic QVQxeE5TeFdzTVE2cHBKT0JqdFB1M3BsYUhmM2I1NW9tcmpERkFaT01QRkh2X09VdEZZSThrNmhPVDlRaEU3Sm5rejk3S2JuYWlVZjBoRHg6RUZhTWxKMC1zLWxaVDlVR2E3ZW9IV1NGWndpTjZaZHRVbFR0SGJfLTMyZkUxZmpPbkZnWE1zY3F1aEN4ck9yYnJQRVZvUURQOW1aN1BkZmw=,Basic QVQxeE5TeFdzTVE2cHBKT0JqdFB1M3BsYUhmM2I1NW9tcmpERkFaT01QRkh2X09VdEZZSThrNmhPVDlRaEU3Sm5rejk3S2JuYWlVZjBoRHg6RUZhTWxKMC1zLWxaVDlVR2E3ZW9IV1NGWndpTjZaZHRVbFR0SGJfLTMyZkUxZmpPbkZnWE1zY3F1aEN4ck9yYnJQRVZvUURQOW1aN1BkZmw=' },
 body:'grant_type=client_credentials&response_type=token&return_authn_schemes=true',
 form: false };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});


