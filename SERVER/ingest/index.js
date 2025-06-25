import { Inngest } from "inngest";
import User from "../models/user.js";

export const inngest = new Inngest({ id: "movie-ticket-booking" });

//whatever inngest functions you create are passed in this functions array
//we will use ingest to update database of user that whenever user is created deleted modify
//it automatically updates in mongodb

//in each function we provide id event type name  use inngest.createFunction

const syncUserCreation = inngest.createFunction(
  { id: "sync-user-from-clerk" },
  { event: "clerk/user.created" },
  async ({ event }) => {
    const { id, first_name, last_name, emails, image_url } = event.data;
    const userData = {
      _id: id,
      email: emails[0].email_address,
      name: first_name + " " + last_name,
      image: image_url,
    };
    await User.findOneAndUpdate(id, userData);
  }
);

const syncUserDeletion = inngest.createFunction(
  { id: "delete-user-from-clerk" },
  { event: "clerk/user.deleted" },
  async ({ event }) => {
    const { id } = event.data;
    await User.findByIdAndDelete(id);
  }
);

const syncUserUpdation = inngest.createFunction(
  { id: "update-user-from-clerk" },
  { event: "clerk/user.updated" },
  async ({ event }) => {
    const { id, first_name, last_name, emails, image_url } = event.data;
    const userData = {
      _id: id,
      email: emails[0].email_address,
      name: first_name + " " + last_name,
      image: image_url,
    };
  }
);

export const functions = [syncUserCreation, syncUserDeletion, syncUserUpdation];
