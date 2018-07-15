import feathers from "feathers-client";
import io from "socket.io-client";

const host = "http://localhost:3030";
const socket = io(host);

export const appService = feathers()
  .configure(feathers.socketio(socket))
  .configure(feathers.authentication())
  .configure(feathers.hooks());


//export const postService = appService.service("posts");
//export const usersService = appService.service("users");

export const services = {
  posts: appService.service("posts"),
  users: appService.service("users")
};