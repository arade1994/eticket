import mongoose from "mongoose";

interface RatingAttributes {
  rate: number;
  comment: string;
  userId: string;
  ratedUserId: string;
}

interface RatingDocument extends mongoose.Document {
  rate: number;
  comment: string;
  userId: string;
  ratedUserId: string;
}

interface RatingModel extends mongoose.Model<RatingDocument> {
  createNew: (attributes: RatingAttributes) => RatingDocument;
}

const ratingSchema = new mongoose.Schema(
  {
    rate: {
      type: Number,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    ratedUserId: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

ratingSchema.statics.createNew = (attributes: RatingAttributes) => {
  return new Rating(attributes);
};

const Rating = mongoose.model<RatingDocument, RatingModel>(
  "Rating",
  ratingSchema
);

export { Rating };
