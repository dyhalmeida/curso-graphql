module.exports = {
  priceWithDiscount: (parent) => {
    if (parent.discount) {
      return parent.price * (1 - (parent.discount / 100))
    }
    return parent.price
  }
}