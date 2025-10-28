import { type ClientSchema, a, defineData } from '@aws-amplify/backend';


const schema = a.schema({


    TransportToWork: a
    .model({
      pickupLocation: a.string().required(),
      dropoffLocation: a.string().required(),
      pickupTime: a.datetime().required(),
      paxNameId: a.string().required(),
      assignedDriverId: a.string(),
      poolId: a.string(),
    })
    .authorization((allow) => [allow.publicApiKey()]),

    TransportToHome: a
    .model({
      pickupLocation: a.string().required(),
      dropoffLocation: a.string().required(),
      pickupTime: a.datetime().required(),
      paxNameId: a.string().required(),
      assignedDriverId: a.string(),
      poolId: a.string(),
    })
    .authorization((allow) => [allow.publicApiKey()]),

    Assignment: a
    .model({
      tripId: a.string().required(),
      driverId: a.string().required(),
      tripType: a.enum(['ToWork', 'ToHome']),
      assignedAt: a.datetime().required(),
      status: a.enum(['Assigned', 'InProgress', 'Completed', 'Cancelled']),
    })
    .authorization((allow) => [allow.publicApiKey()]),

    Staff: a
    .model({
      fullName: a.string().required(),
      staffId: a.string().required(),
      mobileNumber: a.string().required(),
      homeAddress: a.string().required(),
    })
    .authorization((allow) => [allow.publicApiKey()]),

    Driver: a
    .model({
      fullName: a.string().required(),
      licenceNo: a.string().required(),
      vehicleNo: a.string().required(),
      mobileNumber: a.string().required(),
    })
    .authorization((allow) => [allow.publicApiKey()]),

    Location: a
    .model({
      name: a.string().required(),
      code: a.string(),
      isActive: a.boolean().default(true),
    })
    .authorization((allow) => [allow.publicApiKey()]),

    TripPool: a.model({
      poolName: a.string().required(),
      tripIds: a.string().array(),
      assignedDriverId: a.string(),
      estimatedPickupTime: a.datetime().required(),
      status: a.enum(['Active', 'Completed', 'Cancelled']),
      maxCapacity: a.integer().default(3),
      currentPassengers: a.integer().required(),
      tripType: a.enum(['ToWork', 'ToHome']),
    })
    .authorization((allow) => [allow.publicApiKey()]),

    QueueToWork: a
    .model({
      pickupLocation: a.string().required(),
      dropoffLocation: a.string().required(),
      pickupTime: a.datetime().required(),
      paxNameId: a.string().required(),
      dutyManagerId: a.string().required(),
      batchId: a.string(),
    })
    .authorization((allow) => [allow.publicApiKey()]),

    QueueToHome: a
    .model({
      pickupLocation: a.string().required(),
      dropoffLocation: a.string().required(),
      pickupTime: a.datetime().required(),
      paxNameId: a.string().required(),
      dutyManagerId: a.string().required(),
      batchId: a.string(),
    })
    .authorization((allow) => [allow.publicApiKey()]),
});



export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'apiKey',
     apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
});

/*== STEP 2 ===============================================================
Go to your frontend source code. From your client-side code, generate a
Data client to make CRUDL requests to your table. (THIS SNIPPET WILL ONLY
WORK IN THE FRONTEND CODE FILE.)

Using JavaScript or Next.js React Server Components, Middleware, Server 
Actions or Pages Router? Review how to generate Data clients for those use
cases: https://docs.amplify.aws/gen2/build-a-backend/data/connect-to-API/
=========================================================================*/

/*
"use client"
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";

const client = generateClient<Schema>() // use this Data client for CRUDL requests
*/

/*== STEP 3 ===============================================================
Fetch records from the database and use them in your frontend component.
(THIS SNIPPET WILL ONLY WORK IN THE FRONTEND CODE FILE.)
=========================================================================*/

/* For example, in a React component, you can use this snippet in your
  function's RETURN statement */
// const { data: todos } = await client.models.Todo.list()

// return <ul>{todos.map(todo => <li key={todo.id}>{todo.content}</li>)}</ul>
