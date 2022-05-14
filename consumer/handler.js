module.exports = {
  main: function (event, context) {
    console.log("[1-EVENT]", event);
    console.log("[2-CONTEXT]", context);

    return "Hello World from Kyma Serverless!";
  },
};
