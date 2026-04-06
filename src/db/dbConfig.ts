import mongoose from 'mongoose';

// Cache the connection on the global object so it survives across
// warm serverless invocations in the same container (Vercel Node.js runtime).
// NOTE: MongoDB/Mongoose requires Node.js runtime — it cannot run on Edge.
//       Only use this in API routes, NOT in middleware.
declare global {
    // eslint-disable-next-line no-var
    var _mongooseConn: typeof mongoose | undefined;
    var _mongoosePromise: Promise<typeof mongoose> | undefined;
}

export async function connect() {
    // Already connected — reuse
    if (mongoose.connection.readyState === 1) return;

    // Reuse an in-progress connection promise (handles concurrent cold-start calls)
    if (global._mongoosePromise) {
        await global._mongoosePromise;
        return;
    }

    try {
        global._mongoosePromise = mongoose.connect(process.env.MONGO_URI!, {
            bufferCommands: false, // fail fast if not connected
        });

        await global._mongoosePromise;
        console.log('MongoDB Connected successfully');
    } catch (error: any) {
        global._mongoosePromise = undefined; // clear so next call retries
        console.error('MongoDB connection error:', error.message);
        throw error;
    }
}
