const { v4: uuidv4 } = require('uuid');
require('axios');
module.exports = {
    main: function (event, context) {
        const sanitisedData = sanitise(event.data)
        const eventOut=event.buildResponseCloudEvent(
          uuidv4(), 
          "sap.kyma.custom.leverx.order.created.v1",
          sanitisedData
        );
        eventOut.source="kyma"
        eventOut.specversion="1.0"
        event.publishCloudEvent(eventOut);
        console.log(`Payload pushed`,eventOut)
        return eventOut;
    }
}
let sanitise = (data)=>{
    console.log(`sanitising data...`)
    console.log(data)
    return data
}