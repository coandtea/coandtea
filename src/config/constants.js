/**
 * Application Configuration
 * Centralized configuration for the CO & Tea application
 */

// WhatsApp Configuration
export const WHATSAPP_CONFIG = {
  phoneNumber: import.meta.env.VITE_WHATSAPP_NUMBER || '6282160000957',
  defaultMessage: 'Halo Co & Tea, saya ingin memesan:\n\n',
  closingMessage: '\n\nMohon diproses, Terima Kasih!',
};

// Price Configuration
export const PRICE_CONFIG = {
  multiplier: 1000, // Konversi dari K ke Rupiah (misal: 18K = 18000)
  currency: 'Rp',
  locale: 'id-ID',
};

// Store Information
export const STORE_INFO = {
  name: 'CO&T',
  fullName: 'Co & Tea',
  tagline: 'Special Coffee and Tea',
  description: 'Crafting moments, one cup at a time.',
  address: {
    street: 'Jl. Dr. Mansyur No.41',
    district: 'Kec. Medan Selayang',
    city: 'Kota Medan',
    province: 'Sumatera Utara',
    postalCode: '20153',
  },
  operatingHours: {
    days: 'Senin - Minggu',
    hours: '03:00 - 23:30 WIB',
  },
  socialMedia: {
    instagram: {
      handle: '@co_and_tea',
      url: 'https://www.instagram.com/co_and_tea',
    },
  },
  mapEmbedUrl:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3982.0280840526!2d98.6458148!3d3.5815612!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30312f8a86a6b325%3A0x19a3182a3c748261!2sJl.%20Dr.%20Mansyur%20No.41!5e0!3m2!1sid!2sid!4v1702857600000!5m2!1sid!2sid',
  // Fallback ke koordinat jika embed tidak berjalan
  mapCoordinates: {
    lat: 3.5815612,
    lng: 98.6458148,
  },
  googleMapsUrl: 'https://www.google.com/maps/place/Jl.+Dr.+Mansyur+No.41,+Padang+Bulan+Selayang+I,+Kec.+Medan+Selayang,+Kota+Medan,+Sumatera+Utara+20153',
};

// Product Categories
export const PRODUCT_CATEGORIES = {
  default: 'Espresso Based',
  all: 'All',
  options: ['Espresso Based', 'Non Coffee', 'Tea', 'Traditional Coffee', 'Float'],
};

// Toast Configuration
export const TOAST_CONFIG = {
  duration: 3000, // milliseconds
  defaultType: 'success',
};

// Navigation Links
export const NAV_LINKS = [
  { name: 'Home', href: '/#home' },
  { name: 'Products', href: '/#products' },
  { name: 'Menu', href: '/#menu' },
  { name: 'Location', href: '/#location' },
];

// Helper Functions
export const formatPrice = (price) => {
  const amount = price * PRICE_CONFIG.multiplier;
  return `${PRICE_CONFIG.currency} ${amount.toLocaleString(PRICE_CONFIG.locale)}`;
};

export const formatPriceShort = (price) => {
  return `${price}K`;
};

export const generateWhatsAppUrl = (items, totalPrice) => {
  let message = WHATSAPP_CONFIG.defaultMessage;

  items.forEach((item, index) => {
    message += `${index + 1}. ${item.name} (${item.variant}) - ${item.quantity}x - Rp ${item.price}K\n`;
  });

  message += `\nTotal: ${formatPrice(totalPrice / PRICE_CONFIG.multiplier)}`;
  message += WHATSAPP_CONFIG.closingMessage;

  return `https://wa.me/${WHATSAPP_CONFIG.phoneNumber}?text=${encodeURIComponent(message)}`;
};
