async function runVerification() {
  console.log("=== STEELORA AUTOMATED VERIFICATION SUITE ===");

  const BASE_URL = "http://localhost:3000";

  // 1. Test Cart Calculate API (Bundle Discount Engine)
  console.log("\n1. Testing Cart Calculate API...");
  const cartPayload = {
    items: [
      { productId: "grill", slug: "foldable-charcoal-bbq-grill", quantity: 1 },
      { productId: "chair", slug: "foldable-outdoor-chair", quantity: 1 },
      { productId: "table", slug: "foldable-side-table-stool", quantity: 1 },
      { productId: "bag", slug: "heavy-duty-tactical-carry-bag", quantity: 1 },
    ],
  };

  const calcRes = await fetch(`${BASE_URL}/api/cart/calculate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(cartPayload),
  });

  const calcData = await calcRes.json();
  console.log("Cart Calculation Result:", {
    subtotalEGP: calcData.subtotalPiasters / 100,
    discountEGP: calcData.discountPiasters / 100,
    shippingEGP: calcData.shippingPiasters / 100,
    totalEGP: calcData.totalPiasters / 100,
    hasBundleDiscount: calcData.hasBundleDiscount,
    isBundleEligible: calcData.isBundleEligible,
  });

  if (calcData.hasBundleDiscount && calcData.discountPiasters === 235000) {
    console.log("✔ PASS: Bundle 15% discount (EGP 2,350) correctly calculated!");
  } else {
    throw new Error("FAIL: Bundle discount calculation failed");
  }

  // 2. Test Checkout API (Order Creation & Persistence)
  console.log("\n2. Testing Checkout API (Cash on Delivery)...");
  const checkoutPayload = {
    customerName: "Tarek Mansour",
    customerEmail: "tarek.mansour@example.com",
    customerPhone: "+201001234567",
    shippingAddress: "Villa 42, Palm Hills Compound",
    city: "6th of October",
    governorate: "Giza",
    deliveryNotes: "Deliver after 5 PM",
    paymentMethod: "COD",
    items: cartPayload.items,
  };

  const checkoutRes = await fetch(`${BASE_URL}/api/checkout`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(checkoutPayload),
  });

  const checkoutData = await checkoutRes.json();
  console.log("Checkout Result:", checkoutData);

  if (checkoutData.success && checkoutData.orderNumber) {
    console.log(`✔ PASS: Order created successfully with number ${checkoutData.orderNumber}`);
  } else {
    throw new Error("FAIL: Checkout failed");
  }

  // 3. Test Order Fetch API
  console.log("\n3. Testing Order Receipt API...");
  const orderRes = await fetch(`${BASE_URL}/api/orders/${checkoutData.orderId}`);
  const orderData = await orderRes.json();
  console.log("Order Fetched:", {
    orderNumber: orderData.orderNumber,
    customerName: orderData.customerName,
    itemsCount: orderData.items.length,
    totalEGP: orderData.totalPiasters / 100,
    status: orderData.status,
  });

  if (orderData.items.length === 4) {
    console.log("✔ PASS: Order receipt contains all 4 line items!");
  }

  // 4. Test Key Pages & Multilingual SSR Routes
  console.log("\n4. Testing Multilingual Pages & SEO endpoints...");
  const routesToTest = [
    "/en",
    "/ar",
    "/en/shop",
    "/ar/shop",
    "/en/shop/foldable-charcoal-bbq-grill",
    "/ar/shop/foldable-charcoal-bbq-grill",
    "/en/shop/outdoor-luxury-set",
    "/ar/shop/outdoor-luxury-set",
    "/en/about",
    "/ar/about",
    "/en/blog",
    "/ar/blog",
    "/en/contact",
    "/ar/contact",
    "/en/cart",
    "/ar/cart",
    "/en/checkout",
    "/ar/checkout",
    `/en/order-success/${checkoutData.orderId}`,
    `/ar/order-success/${checkoutData.orderId}`,
    "/robots.txt",
    "/sitemap.xml",
  ];

  for (const route of routesToTest) {
    const res = await fetch(`${BASE_URL}${route}`);
    if (res.ok) {
      console.log(`✔ [${res.status}] ${route}`);
    } else {
      console.error(`✖ [${res.status}] ${route}`);
      throw new Error(`Failed route: ${route}`);
    }
  }

  console.log("\n=== ALL VERIFICATION TESTS PASSED SUCCESSFULLY! ===");
}

runVerification().catch((e) => {
  console.error(e);
  process.exit(1);
});
