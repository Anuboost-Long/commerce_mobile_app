export const Screen = {
  // Root
  SplashScreen: "index",

  Account: {
    index: "(account)",
    address: "address",
    dashboard: "dashboard",
    orders: "orders",
    wish_list: "wish-list",
  },

  Auth: {
    index: "(auth)",
    forget_password: "forget-password",
    sign_in: "sign-in",
    sign_up: "sign-up",
    verify: "verify",
  },

  Main: {
    index: "(main)",
    about_us: "about-us",
    blog: "blog",
    contact_us: "contact-us",
    privacy_policies: "privacy-policies",
    refund_return_policies: "refund-return-policies",
    shipping_policies: "shipping-policies",
    term_conditions: "term-conditions",
  },

  Payment: {
    index: "(payment)",
    credit_card_payment: "credit-card-payment",
    payment_option: "payment-option",
    payment_success: "payment-success",
  },

  Product: {
    index: "(product)",
    product_detail: "product-detail",
    product_list: "product-list",
    product_search: "product-search",
  },

  Tab: {
    index: "(tab)",
    home: "home",
    categories: "categories",
    cart: "cart",
    account: "account",
  },
} as const;
