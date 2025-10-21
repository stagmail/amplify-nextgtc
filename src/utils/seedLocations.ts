import { generateClient } from "aws-amplify/data";
import type { Schema } from "../../amplify/data/resource";
import { Amplify } from "aws-amplify";
import outputs from "../../amplify_outputs.json";

Amplify.configure(outputs);

const client = generateClient<Schema>();

const initialLocations = [
  { name: "AFT Core C (Gate 3)", code: "AFT-C3" },
  { name: "AFT Core I (Gate 5)", code: "AFT-I5" },
  { name: "AFT Core k Link Way", code: "AFT-KLW" },
  { name: "AFT Fedex Building", code: "AFT-FX" },
  { name: "ICC1 Main Gate", code: "ICC1-MG" },
  { name: "ICC2 Main Gate", code: "ICC2-MG" },
  { name: "PTB1 Bravo 10", code: "PTB1-B10" },
  { name: "PTB1 Coach Bay", code: "PTB1-CB" },
  { name: "PTB2 Coach Bay", code: "PTB2-CB" },
  { name: "PTB3 Alpha 10", code: "PTB3-A10" },
  { name: "PTB3 GTC", code: "PTB3-GTC" },
  { name: "PTB4 GTC", code: "PTB4-GTC" },
];

export async function seedLocations() {
  try {
    console.log('Seeding locations...');
    
    for (const location of initialLocations) {
      await client.models.Location.create({
        name: location.name,
        code: location.code,
        isActive: true,
      });
      console.log(`Added: ${location.name}`);
    }
    
    console.log('All locations seeded successfully!');
  } catch (error) {
    console.error('Error seeding locations:', error);
  }
}

// Uncomment the line below to run the seeding function
// seedLocations();