const axios = require("axios");
const orderModel = require("../models/orderModel");

// Use sandbox for testing, live for production
const KHALTI_URL = process.env.KHALTI_URL || "https://dev.khalti.com/api/v2"; // sandbox
// Production: https://khalti.com/api/v2

const KHALTI_SECRET_KEY = process.env.KHALTI_SECRET_KEY;

// 1. Initiate Payment
const initiatePayment = async (req, res) => {
  try {
    const { amount, purchase_order_id, purchase_order_name, customer_info } = req.body;

    if (!amount || !purchase_order_id || !purchase_order_name) {
      return res.status(400).json({ message: "amount, purchase_order_id and purchase_order_name are required" });
    }

    // Amount must be in paisa (1 NPR = 100 paisa)
    const amountInPaisa = Math.round(Number(amount) * 100);

    if (amountInPaisa < 1000) {
      return res.status(400).json({ message: "Minimum amount is Rs. 10" });
    }

    const payload = {
      return_url: process.env.FRONTEND_URL + "/payment/success", // change to your frontend success page
      website_url: process.env.FRONTEND_URL || "http://localhost:3000",
      amount: amountInPaisa,
      purchase_order_id,
      purchase_order_name,
      customer_info: customer_info || {
        name: req.user?.name || "Customer",
        email: req.user?.email || "customer@example.com",
        phone: "9800000000",
      },
    };

    const response = await axios.post(
      `${KHALTI_URL}/epayment/initiate/`,
      payload,
      {
        headers: {
          Authorization: `Key ${KHALTI_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    // response.data contains: pidx, payment_url, expires_at, expires_in
    res.status(200).json(response.data);
  } catch (error) {
    console.error("Khalti Initiate Error:", error.response?.data || error.message);
    res.status(500).json({
      message: "Failed to initiate payment",
      error: error.response?.data || error.message,
    });
  }
};

// 2. Verify Payment (after user returns from Khalti)
const verifyPayment = async (req, res) => {
  try {
    const { pidx } = req.body; // or req.query depending on how frontend sends it

    if (!pidx) {
      return res.status(400).json({ message: "pidx is required" });
    }

    const response = await axios.post(
      `${KHALTI_URL}/epayment/lookup/`,
      { pidx },
      {
        headers: {
          Authorization: `Key ${KHALTI_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const data = response.data;

    // Possible status: Completed, Pending, Refunded, Expired, User canceled
    if (data.status === "Completed") {
      // Optional: update your order here
      // await orderModel.findOneAndUpdate(
      //   { paymentId: pidx },
      //   { status: "paid", paymentId: data.transaction_id }
      // );

      return res.status(200).json({
        success: true,
        message: "Payment verified successfully",
        data,
      });
    }

    res.status(400).json({
      success: false,
      message: `Payment status: ${data.status}`,
      data,
    });
  } catch (error) {
    console.error("Khalti Verify Error:", error.response?.data || error.message);
    res.status(500).json({
      message: "Payment verification failed",
      error: error.response?.data || error.message,
    });
  }
};

module.exports = {
  initiatePayment,
  verifyPayment,
};