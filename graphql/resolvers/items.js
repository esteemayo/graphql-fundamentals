import Item from "../../models/Item";

export const itemResolvers = {
  Query: {
    getItems: async () => {
      return await Item.find();
    },
    getItem: async (_, { id }) => {
      try {
        const item = await Item.findById(id);
        if (item) {
          return item;
        }
        throw new Error("No item found with that ID.");
      } catch (err) {
        throw err;
      }
    },
  },
  Mutation: {
    createItem: async (
      _,
      { input: { text, title, time, timeISO, deleted } }
    ) => {
      return await Item.create({
        text,
        title,
        time,
        deleted,
        timeISO: new Date().toISOString(),
      });
    },
    updateItem: async (_, { id, input }) => {
      const item = await Item.findByIdAndUpdate(id, input, {
        new: true,
        runValidators: true,
      });

      if (!item) {
        throw new Error("No item found with that ID.");
      }
      return item;
    },
    deleteItem: async (_, { id }) => {
      const item = await Item.findByIdAndDelete(id);

      if (!item) {
        throw new Error("No item found with that ID.");
      }

      return "Item successfully deleted";
    },
  },
};
