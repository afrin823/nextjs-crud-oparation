// app/api/items/[id]/route.js
import items from '@/models/items';
import { connectToDB } from '@/utils/database';

export async function PUT(req, { params }) {
  try {
    await connectToDB();
    const data = await req.json();
    const updatedItem = await items.findByIdAndUpdate(params.id, data, { new: true });
    return new Response(JSON.stringify(updatedItem), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}

export async function DELETE(_, { params }) {
  try {
    await connectToDB();
    await items.findByIdAndDelete(params.id);
    return new Response(JSON.stringify({ message: 'Item deleted' }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}



export async function GET() {
    try {
      await connectToDB();
      const item = await items.find({});
      return new Response(JSON.stringify(items), { status: 200 });
    } catch (error) {
      return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
  }
