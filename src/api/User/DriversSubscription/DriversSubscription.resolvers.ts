import { withFilter } from "graphql-yoga";
import User from "../../../entities/User";

// filter driver object that carries payload that is going be returned to users who are at the lastlat and lastlng is close driverslastlat and lng.
const resolvers = {
  Subscription: {
    DriversSubscription: {
      subscribe: withFilter(
        (_, __, { pubSub }) => pubSub.asyncIterator("driverUpdate"),
        (payload, _, { context }) => {
          const user: User = context.currentUser;
          const {
            DriversSubscription: {
              lastLat: driverLastLat,
              lastLng: driverLastLng,
            },
          } = payload;
          const { lastLat: userLastLat, lastLng: userLastLng } = user;
          return (
            driverLastLat >= userLastLat - 0.05 &&
            driverLastLat <= userLastLat + 0.05 &&
            driverLastLng >= userLastLng - 0.05 &&
            driverLastLng <= userLastLng + 0.05
          );
        }
      ),
    },
  },
};

export default resolvers;
