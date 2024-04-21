class QuantityPicker extends HTMLElement {
  constructor() {
    super();
    this.incrementElement = null;
    this.decrementElement = null;
    this.inputElement = null;
    this.maxQuantity = parseInt(this.getAttribute("max")) || Infinity;
  }

  connectedCallback() {
    this.render();
    this.incrementElement = this.querySelector(".plus");
    this.decrementElement = this.querySelector(".minus");
    this.inputElement = this.querySelector("input");

    if (this.getAttribute("data-page") !== "cart") {
      this.incrementElement.addEventListener(
        "click",
        this.increment.bind(this),
      );
      this.decrementElement.addEventListener(
        "click",
        this.decrement.bind(this),
      );
      this.inputElement.addEventListener(
        "input",
        this.handleInputChange.bind(this),
      );
    }
  }

  increment() {
    let currentValue = Number(this.inputElement.value);
    if (currentValue < this.maxQuantity) {
      this.inputElement.value = currentValue + 1;
    }
  }

  decrement() {
    let currentValue = Number(this.inputElement.value);
    if (currentValue > 1) {
      this.inputElement.value = currentValue - 1;
    }
  }

  handleInputChange() {
    let inputValue = Number(this.inputElement.value);
    if (inputValue < 1) {
      this.inputElement.value = 1;
    } else if (inputValue > this.maxQuantity) {
      this.inputElement.value = this.maxQuantity;
    }
  }

  render() {
    const isCartPage = this.getAttribute("data-page") === "cart";
    const url = this.getAttribute("data-url");
    const elementType = isCartPage ? "a" : "button";
    const quantity = this.getAttribute("data-quantity") || 1;
    const lineIndex = this.getAttribute("data-line-index") || 1;

    this.innerHTML = `
      <div class="cart-quantity-selector rounded-full border-[var(--Black)] border-2 bg-white px-1.5 text-center shadow-sm w-32">
        <${elementType}
          ${isCartPage ? `href="${url}?line=${lineIndex}&quantity=${quantity - 1}"` : 'type="button"'}
          class="minus inline-block border-r-2 border-dashed pr-2 border-[var(--Black)]"
        >-</${elementType}>
        <input
          class="w-9 text-center bg-white"
          type="text"
          ${isCartPage ? 'name="updates[]"' : 'name="quantity"'}
          value="${quantity}"
          max="${this.maxQuantity}"
        >
        <${elementType}
          ${isCartPage ? `href="${url}?line=${lineIndex}&quantity=${quantity + 1}"` : 'type="button"'}
          class="plus inline-block border-l-2 border-dashed pl-2 border-[var(--Black)]"
        >+</${elementType}>
      </div>
    `;
  }
}

customElements.define("quantity-picker", QuantityPicker);
