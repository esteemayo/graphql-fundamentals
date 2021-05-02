import { itemResolvers } from "./items";
import { userResolvers } from "./users";
import { postResolvers } from "./posts";

export default {
  Query: {
    ...itemResolvers.Query,
    ...userResolvers.Query,
    ...postResolvers.Query,
  },
  Mutation: {
    ...itemResolvers.Mutation,
    ...userResolvers.Mutation,
    ...postResolvers.Mutation,
  },
};
