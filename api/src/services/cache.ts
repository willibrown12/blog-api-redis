import mongoose  from "mongoose";
import { createClient, RedisClientType } from "redis";

const redisURL = "redis://127.0.0.1:6379";
export const client: RedisClientType = createClient({ url: redisURL });

client.on("error", (error: Error) => console.error("Redis Client Error", error));



export async function redisConnect()  {
    try {
      await client.connect();
      console.log("Connected to Redis successfully!");
    } catch (error) {
      console.error("Redis connection error:", error);
    }
  };
  


export async function cacheQuery<T>(query :  mongoose.Query<T, any>) {

    if (!(query instanceof mongoose.Query)) {
      throw new Error("cacheQuery must be called with a Mongoose query");
    }
  
    const key = JSON.stringify({
      query: query.getQuery(),
      collection: (query as any).model.collection.name,
    });
  
    // Check cache
    const cacheValue = await client.hGet( (query as any).model.collection.name ,key);


    if (cacheValue) {
        try {
       
          
            const doc = JSON.parse(cacheValue);
      
            return Array.isArray(doc)
              ? doc.map(d => new (query as any).model(d))
              : new (query as any).model(doc);
          } catch (error) {
            console.error("Error parsing cached value:", error);
            // Fallback to executing the query
          }
     
       }
  
    // Execute query if not cached
    const result = await query.exec();
   
    
    await client.hSet((query as any).model.collection.name, key, JSON.stringify(result));
    await client.expire((query as any).model.collection.name, 10);
    
    return result;
  }
  

export  function clearHash(hashKey : any){

    client.del(JSON.stringify(hashKey))


}