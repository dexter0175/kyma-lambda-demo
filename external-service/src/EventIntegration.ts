export interface IEventConnector {
    sendEvent: (type:string, data: any) => Promise<any>
}


class EventIntegration {
    private eventsConnector:  IEventConnector;

    setEventConnector(connector: IEventConnector) { 
        this.eventsConnector = connector;
    }

    getEventConnector() {
        return this.eventsConnector;
    }

}

const EventIntegrationInstance = new EventIntegration();

export const eventTrigger = (eventType: string) => {
    return (target: any, memberName: string, propDescriptor: PropertyDescriptor) => {
        return {
            get() {
              const wrapperFn = (...args: any[]) => {
                if(!EventIntegrationInstance.getEventConnector()) {
                    console.warn("Events Connector is not active")
                    return propDescriptor.value.apply(this, args);
                }
                EventIntegrationInstance.getEventConnector().sendEvent(eventType, eventType)

                return propDescriptor.value.apply(this, args);
              }
      
              Object.defineProperty(this, memberName, {
                  value: wrapperFn,
                  configurable: true,
                  writable: true
              });

              return wrapperFn;
            }
        }
    }
}

export default EventIntegrationInstance;