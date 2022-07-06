import store from "../store";
import storage from "../utils/storage";

interface ITestStorage {
  test: string;
}

const testItem: ITestStorage = {
  test: "test",
};

storage.setStorage("item", testItem);

console.log(storage.getStorage<ITestStorage>("item"));

storage.clearStorage();

console.log(storage.getStorage<ITestStorage>("item"));
