import request from "../utils/request";

interface IUser {
  user: string;
  age: string;
}

request<IUser>("/", "get", { id: 1 }).then((res) => {
  console.log(res.data.age);
});

request<string>("/", "post", { id: 1 }).then((res) => {
  console.log(res.data);
});

request<string>("/", "delete", { id: 1 }).then((res) => {
  console.log(res.data);
});
