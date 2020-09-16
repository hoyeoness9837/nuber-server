import { withFilter } from "graphql-yoga";
import User from "../../../entities/User";

const resolvers = {
  Subscription: {
    RideStatusSubscription: {
      subscribe: withFilter(
        (_, __, { pubSub }) => pubSub.asyncIterator("rideUpdate"), // different channel
        (payload, _, { context }) => {
          const user: User = context.currentUser;
          const {
            RideStatusSubscription: { driverId, passengerId },
          } = payload; // payload = ride has id of driver and passenger and if they are listening the subscription, then publish changes to UpdateRideStatus, via pubsub.
          return user.id === driverId || user.id === passengerId; // when user connects to subscription, filter based on id that returning true.
        }
      ),
    },
  },
};

export default resolvers;
