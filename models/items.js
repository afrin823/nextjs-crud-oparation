// models/Item.js
import { Schema, model, models } from 'mongoose';

const ItemSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
}, { timestamps: true });

export default models.Item || model('Item', ItemSchema);
