import { type ClientSchema, a, defineData } from '@aws-amplify/backend';


const schema = a.schema({


    TransportToWork: a
    .model({
      pickupLocation: a.string().required(),
      dropoffLocation: a.enum(['LocationOne', 'LocationTwo', 'LocationThree', 'LocationFour', 'LocationFive']),
      pickupTime: a.datetime().required(),
      paxNameId: a.string().required(),
    })
    .authorization((allow) => [allow.publicApiKey()]),

    TransportToHome: a
    .model({
      pickupLocation: a.enum(['LocationOne', 'LocationTwo', 'LocationThree', 'LocationFour', 'LocationFive']),
      dropoffLocation: a.string().required(),
      pickupTime: a.datetime().required(),
      paxNameId: a.string().required(),
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
