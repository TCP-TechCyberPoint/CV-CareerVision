import { createUser, findByEmail } from "../repositories/userRepository";
import type { IUser } from "../models/User";

interface Auth0User {
  sub: string;
  email: string;
  name: string;
  email_verified: boolean;
}

export const syncAuth0User = async (auth0User: Auth0User): Promise<IUser> => {
  try {
    // Check if user already exists in our database
    const existingUser = await findByEmail(auth0User.email);
    
    if (existingUser) {
      console.log("User already exists in database:", existingUser.email);
      return existingUser;
    }
    
    // Create new user in our database
    const newUser = await createUser({
      name: auth0User.name,
      email: auth0User.email,
      password: `auth0_${auth0User.sub}`, // Use Auth0 sub as password placeholder
    });
    
    console.log("Created new user in database:", newUser.email);
    return newUser;
    
  } catch (error) {
    console.error("Error syncing Auth0 user:", error);
    throw error;
  }
};

export const ensureUserExists = async (auth0User: Auth0User): Promise<IUser> => {
  return await syncAuth0User(auth0User);
}; 