import mongoose from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";

interface TicketAttributes {
  title: string;
  price: number;
  userId: string;
  category: string;
}

interface TicketDocument extends mongoose.Document {
  title: string;
  price: number;
  userId: string;
  category: string;
  version: number;
  orderId?: string;
}

interface TicketModel extends mongoose.Model<TicketDocument> {
  createNew: (attributes: TicketAttributes) => TicketDocument;
}

const ticketSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    orderId: {
      type: String,
    },
  },
  {
    toJSON: {
      transform(doc, ret: any) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

ticketSchema.set("versionKey", "version");
ticketSchema.plugin(updateIfCurrentPlugin);

ticketSchema.statics.createNew = (attributes: TicketAttributes) => {
  return new Ticket(attributes);
};

const Ticket = mongoose.model<TicketDocument, TicketModel>(
  "Ticket",
  ticketSchema
);

export { Ticket };
