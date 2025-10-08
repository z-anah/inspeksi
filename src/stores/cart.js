import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCartStore = defineStore('cart', () => {
  const items = ref([])
  const whatsappNumber = ref('')

  // Load cart from localStorage on store initialization
  const loadCart = () => {
    const saved = localStorage.getItem('front_cart')
    if (saved) {
      items.value = JSON.parse(saved)
    }
  }

  // Save cart to localStorage
  const saveCart = () => {
    localStorage.setItem('front_cart', JSON.stringify(items.value))
  }

  // Add item to cart
  const addToCart = (product, quantity = 1) => {
    const qty = Number(quantity) || 1
    if (qty < 1 || qty > product.stock) return

    const existingItem = items.value.find(item => item.id === product.id)
    if (existingItem) {
      existingItem.qty = Math.min(existingItem.qty + qty, product.stock)
    } else {
      items.value.push({
        id: product.id,
        name: product.name,
        price: product.price,
        stock: product.stock,
        primary_image: product.primary_image || product.image,
        qty,
        category: product.category || 'Product'
      })
    }
    saveCart()
  }

  // Update item quantity
  const updateQuantity = (itemId, newQty) => {
    const item = items.value.find(item => item.id === itemId)
    if (item) {
      if (newQty < 1) {
        removeFromCart(itemId)
      } else {
        item.qty = Math.min(newQty, item.stock)
        saveCart()
      }
    }
  }

  // Increase quantity
  const increaseQuantity = (itemId) => {
    const item = items.value.find(item => item.id === itemId)
    if (item && item.qty < item.stock) {
      item.qty += 1
      saveCart()
    }
  }

  // Decrease quantity
  const decreaseQuantity = (itemId) => {
    const item = items.value.find(item => item.id === itemId)
    if (item) {
      if (item.qty > 1) {
        item.qty -= 1
        saveCart()
      } else {
        removeFromCart(itemId)
      }
    }
  }

  // Remove item from cart
  const removeFromCart = (itemId) => {
    const index = items.value.findIndex(item => item.id === itemId)
    if (index > -1) {
      items.value.splice(index, 1)
      saveCart()
    }
  }

  // Clear cart
  const clearCart = () => {
    items.value = []
    saveCart()
  }

  // Computed properties
  const itemCount = computed(() => {
    return items.value.reduce((total, item) => total + item.qty, 0)
  })

  const subtotal = computed(() => {
    return items.value.reduce((total, item) => total + (item.price * item.qty), 0)
  })

  const total = computed(() => subtotal.value)

  // Format price helper
  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID').format(price)
  }

  // WhatsApp order function
  const sendWhatsAppOrder = () => {
    if (!whatsappNumber.value || items.value.length === 0) return
    
    let msg = `Halo, saya ingin memesan:\n`
    items.value.forEach(item => {
      msg += `- ${item.name} x${item.qty} (Rp ${formatPrice(item.price)} per item)\n`
    })
    msg += `Total: Rp ${formatPrice(total.value)}\n`
    msg += `\nMohon hubungi saya untuk detail lebih lanjut.`
    
    const url = `https://wa.me/${whatsappNumber.value}?text=${encodeURIComponent(msg)}`
    window.open(url, '_blank')
  }

  // Set WhatsApp number
  const setWhatsAppNumber = (number) => {
    whatsappNumber.value = number
  }

  // Initialize cart on store creation
  loadCart()

  return {
    items,
    whatsappNumber,
    addToCart,
    updateQuantity,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
    itemCount,
    subtotal,
    total,
    formatPrice,
    sendWhatsAppOrder,
    setWhatsAppNumber,
    loadCart,
    saveCart
  }
})