import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import PaypalExpressBtn from 'react-paypal-express-checkout';

const Paypal = (props) => {
  const [cvtCurrency, setCvtCurrency] = useState(null);

  useEffect(() => {
    const fetchAPI = async () => {
      const data = await Axios.get(
        'https://free.currconv.com/api/v7/convert?q=USD_VND&compact=ultra&apiKey=8c154be65e6b91ca79ae'
      );
      setCvtCurrency(data.data['USD_VND']);
    };

    fetchAPI();
  }, []);

  const onSuccess = (payment) => {
    // 1, 2, and ... Poof! You made it, everything's fine and dandy!
    props.onSuccess(payment);
    // You can bind the "payment" object's value to your state or props or whatever here, please see below for sample returned data
  };

  const onCancel = (data) => {
    // The user pressed "cancel" or closed the PayPal popup
    console.log('Payment cancelled!', data);
    // You can bind the "data" object's value to your state or props or whatever here, please see below for sample returned data
  };

  const onError = (err) => {
    // The main Paypal script could not be loaded or something blocked the script from loading
    console.log('Error!', err);
    // Because the Paypal's main script is loaded asynchronously from "https://www.paypalobjects.com/api/checkout.js"
    // => sometimes it may take about 0.5 second for everything to get set, or for the button to appear
  };

  let env = 'sandbox'; // you can set this string to 'production'
  let currency = 'USD'; // you can set this string from your props or state

  const client = {
    sandbox:
      'ActeOi2bfNKOF7IKxq-lMfkz8JRuy3wjs8DKTUvJTm10QjjCsjgMpQQSdchAySQjGyJGGc2ncvrM3Vmj',
    production: 'YOUR-PRODUCTION-APP-ID',
  };
  // In order to get production's app-ID, you will have to send your app to Paypal for approval first
  // For your sandbox Client-ID (after logging into your developer account, please locate the "REST API apps" section, click "Create App" unless you have already done so):
  //   => https://developer.paypal.com/docs/classic/lifecycle/sb_credentials/
  // Note: IGNORE the Sandbox test AppID - this is ONLY for Adaptive APIs, NOT REST APIs)
  // For production app-ID:
  //   => https://developer.paypal.com/docs/classic/lifecycle/goingLive/

  // NB. You can also have many Paypal express checkout buttons on page, just pass in the correct amount and they will work!
  return (
    <PaypalExpressBtn
      env={env}
      client={client}
      currency={currency}
      total={Math.round(props.total / cvtCurrency)}
      onError={onError}
      onSuccess={onSuccess}
      onCancel={onCancel}
      style={{
        shape: 'rect',
        size: 'large',
      }}
    />
  );
};

export default Paypal;
