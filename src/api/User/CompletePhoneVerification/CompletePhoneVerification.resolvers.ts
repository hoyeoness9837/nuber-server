import User from "../../../entities/User";
import Verification from "../../../entities/Verification";
import {
  CompletePhoneVerificationMutationArgs,
  CompletePhoneVerificationResponse,
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";

const resolvers: Resolvers = {
  Mutation: {
    CompletePhoneVerification: async (
      _,
      args: CompletePhoneVerificationMutationArgs
    ): Promise<CompletePhoneVerificationResponse> => {
      const { phoneNumber, key } = args;
      try {
        const verification = await Verification.findOne({
          payload: phoneNumber,
          key,
        });
        if (!verification) {
          return {
            ok: false,
            error: " Verification code is not vaild",
            token: null,
          };
        } else {
          verification.verified = true;
          verification.save();
        }
      } catch (error) {
        return {
          ok: false,
          error: error.message,
          token: null,
        };
      }

      //try if user have been already verified with a phone number
      try {
        const user = await User.findOne({ phoneNumber });
        if (user) {
          user.verifiedPhoneNumber = true;
          user.save();
          return {
            ok: true,
            error: null,
            token: "coming soon",
          };
        } else {
          //phone number has been verified, but there is no user assigned to it
          return {
            ok: true,
            error: null,
            token: null,
          };
        }
      } catch (error) {
        return {
          ok: false,
          error: error.message,
          token: null,
        };
      }
    },
  },
};

export default resolvers;