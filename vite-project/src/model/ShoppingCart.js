import getId from "../utils/getId";
import CartItem from "./CartItem";

class ShoppingCart {
  // Private static property to store all ShoppingCart instances.
  // Best Practice: Keep the property private to ensure it's only accessible through class methods,
  // encapsulating the management of all cart instances.
  static #allCarts = [];

  // Private property to store cart items for this instance.
  #cartItems;

  constructor() {
    this.id = getId();

    // Private property to store CartItems in this specific cart instance.
    this.#cartItems = [];

    // Add the instance to the static array of all carts.
    // Best Practice: Perform this in the constructor to ensure no instance is left out
    ShoppingCart.#allCarts.push(this);
  }

  // Static method to return all ShoppingCart instances.
  static listAll() {
    // Best Practice:  Return a shallow copy of the private #allCarts array, maintaining data integrity.
    return [...this.#allCarts];
  }

  // Static method to find a ShoppingCart instance by its unique ID.
  static findBy(id) {
    // Best Practice: Use Array.find for efficiency, and return `null` if no cart is found
    // to ensure the method always has a consistent return type (either an object or null).
    return this.#allCarts.find((cart) => cart.id === id) || null;
  }

  // Method to create a new CartItem and add it to the cart.
  createItem(name, price) {
    // Using the CartItem class helps to create consistent CartItem objects.
    const newItem = new CartItem(name, price);

    // Add the new item to the private cartItems array.
    this.#cartItems.push(newItem);
    return newItem;
  }

  getItems() {
    // Best Practice: Return a shallow copy of the cartItems array to protect the original data from being modified
    return [...this.#cartItems];
  }

  removeItem(id) {
    /*
    Best Practice: Use Array.filter to create a new array that excludes the item with the matching ID. This ensures the immutability of the original array.
    Note: You could also use findIndex and splice, but this approach mutates the original array and requires more steps.*/
    this.#cartItems = this.#cartItems.filter((item) => item.id !== id);
  }

  getTotal() {
    // Best Practice: Use Array.reduce for an efficient calculation of the total price.
    return this.#cartItems.reduce((total, item) => total + item.price, 0);
  }
}

export default ShoppingCart;
