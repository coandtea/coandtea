<template>
  <div class="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 mb-8">
    <!-- Form Header with Toggle -->
    <button @click="isExpanded = !isExpanded" class="w-full p-6 flex items-center justify-between bg-gradient-to-r from-green-50 to-emerald-50 hover:from-green-100 hover:to-emerald-100 transition-colors">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-md">
          <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </div>
        <div class="text-left">
          <h2 class="text-lg font-bold text-brown-900">{{ editMode ? 'Edit Menu' : 'Tambah Menu Baru' }}</h2>
          <p class="text-sm text-gray-500">{{ editMode ? 'Perbarui informasi menu' : 'Isi detail untuk menambahkan menu' }}</p>
        </div>
      </div>
      <svg class="w-5 h-5 text-gray-500 transition-transform duration-300" :class="isExpanded ? 'rotate-180' : ''" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
    </button>

    <!-- Collapsible Form Content -->
    <Transition name="collapse">
      <div v-show="isExpanded" class="p-6 border-t border-gray-100">
        <form @submit.prevent="handleSubmit" class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Nama Menu -->
          <div class="col-span-2 md:col-span-1">
            <label class="block text-sm font-semibold text-gray-700 mb-2"> Nama Menu <span class="text-red-500">*</span> </label>
            <input v-model="form.name" type="text" placeholder="Contoh: Kopi Gayo" class="w-full border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all" required />
          </div>

          <!-- Kategori -->
          <div class="col-span-2 md:col-span-1">
            <label class="block text-sm font-semibold text-gray-700 mb-2"> Kategori <span class="text-red-500">*</span> </label>
            <div class="relative">
              <select v-model="form.category" class="w-full border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all appearance-none bg-white" required>
                <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
              </select>
              <svg class="w-5 h-5 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          <!-- Harga Section -->
          <div class="col-span-2 grid grid-cols-2 gap-4">
            <!-- Harga Panas -->
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">
                <span class="inline-flex items-center gap-1"> 🔥 Harga Panas </span>
              </label>
              <div class="relative">
                <input v-model="form.price_hot" type="number" placeholder="18" min="0" class="w-full border border-gray-200 p-3 pr-10 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all" />
                <span class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 font-medium">K</span>
              </div>
            </div>

            <!-- Harga Dingin -->
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">
                <span class="inline-flex items-center gap-1"> ❄️ Harga Dingin </span>
              </label>
              <div class="relative">
                <input v-model="form.price_cold" type="number" placeholder="20" min="0" class="w-full border border-gray-200 p-3 pr-10 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" />
                <span class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 font-medium">K</span>
              </div>
            </div>
          </div>

          <!-- Gambar Section -->
          <div class="col-span-2">
            <label class="block text-sm font-semibold text-gray-700 mb-2">
              Gambar Menu
              <span v-if="!editMode || !editProduct?.image" class="text-red-500">*</span>
              <span v-else class="text-gray-400 text-xs font-normal">(opsional, biarkan jika tidak ingin mengubah)</span>
            </label>

            <!-- Tab Toggle: Upload vs URL -->
            <div class="flex gap-2 mb-3">
              <button
                type="button"
                @click="imageInputMode = 'upload'"
                :class="[
                  'flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2',
                  imageInputMode === 'upload' ? 'bg-green-100 text-green-700 border-2 border-green-500' : 'bg-gray-100 text-gray-600 border-2 border-transparent hover:bg-gray-200',
                ]"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                Upload File
              </button>
              <button
                type="button"
                @click="imageInputMode = 'url'"
                :class="[
                  'flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2',
                  imageInputMode === 'url' ? 'bg-green-100 text-green-700 border-2 border-green-500' : 'bg-gray-100 text-gray-600 border-2 border-transparent hover:bg-gray-200',
                ]"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
                URL Gambar
              </button>
            </div>

            <div class="flex gap-4">
              <div class="flex-1">
                <!-- Upload Mode -->
                <div v-if="imageInputMode === 'upload'">
                  <div
                    @dragover.prevent="isDragging = true"
                    @dragleave.prevent="isDragging = false"
                    @drop.prevent="handleFileDrop"
                    :class="[
                      'border-2 border-dashed rounded-xl p-6 text-center transition-all cursor-pointer',
                      isDragging ? 'border-green-500 bg-green-50' : 'border-gray-300 hover:border-green-400 hover:bg-gray-50',
                      isUploading ? 'pointer-events-none opacity-50' : '',
                    ]"
                    @click="triggerFileInput"
                  >
                    <input ref="fileInput" type="file" accept="image/*" class="hidden" @change="handleFileSelect" />
                    <div v-if="isUploading" class="flex flex-col items-center gap-2">
                      <svg class="w-8 h-8 text-green-500 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                      </svg>
                      <span class="text-sm text-gray-600">Mengupload gambar...</span>
                    </div>
                    <div v-else class="flex flex-col items-center gap-2">
                      <svg class="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                      <p class="text-sm text-gray-600"><span class="text-green-600 font-semibold">Klik untuk upload</span> atau drag & drop</p>
                      <p class="text-xs text-gray-400">PNG, JPG, WEBP hingga 2MB</p>
                    </div>
                  </div>
                </div>

                <!-- URL Mode -->
                <div v-else>
                  <input
                    v-model="form.image"
                    type="url"
                    placeholder="https://example.com/image.jpg"
                    class="w-full border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
                  />
                  <p class="text-xs text-gray-400 mt-1">Masukkan URL gambar dari internet</p>
                </div>
              </div>

              <!-- Image Preview -->
              <div v-if="form.image" class="w-20 h-20 rounded-xl overflow-hidden border-2 border-gray-200 flex-shrink-0 relative group">
                <img :src="form.image" alt="Preview" class="w-full h-full object-cover" @error="handleImageError" />
                <button type="button" @click="clearImage" class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <!-- Deskripsi -->
          <div class="col-span-2">
            <label class="block text-sm font-semibold text-gray-700 mb-2">Deskripsi</label>
            <textarea
              v-model="form.description"
              rows="3"
              placeholder="Deskripsi singkat menu..."
              class="w-full border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all resize-none"
            ></textarea>
          </div>

          <!-- Favorit Toggle -->
          <div class="col-span-2">
            <label class="flex items-center gap-3 cursor-pointer group">
              <div class="relative">
                <input type="checkbox" v-model="form.is_favorite" class="sr-only peer" />
                <div class="w-11 h-6 bg-gray-200 rounded-full peer-checked:bg-amber-500 transition-colors"></div>
                <div class="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow peer-checked:translate-x-5 transition-transform"></div>
              </div>
              <div>
                <span class="font-semibold text-gray-700 group-hover:text-gray-900 transition-colors"> ⭐ Menu Favorit </span>
                <p class="text-xs text-gray-500">Menu akan tampil di bagian Featured di beranda</p>
              </div>
            </label>
          </div>

          <!-- Action Buttons -->
          <div class="col-span-2 flex gap-3 pt-4 border-t border-gray-100">
            <button v-if="editMode" type="button" @click="handleCancel" class="flex-1 font-semibold py-3 px-6 rounded-xl border-2 border-gray-200 text-gray-700 hover:bg-gray-50 transition-all">Batal</button>
            <button
              type="submit"
              :disabled="isLoading"
              class="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold py-3 px-6 rounded-xl hover:from-green-700 hover:to-emerald-700 hover:shadow-lg transform hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
            >
              <svg v-if="isLoading" class="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
              </svg>
              <span v-if="isLoading">{{ editMode ? 'Menyimpan...' : 'Menambahkan...' }}</span>
              <span v-else>{{ editMode ? 'Simpan Perubahan' : 'Tambah Menu' }}</span>
            </button>
          </div>
        </form>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { reactive, ref, watch } from 'vue';
import { PRODUCT_CATEGORIES } from '@/config/constants';
import { supabase } from '@/supabase';

// Props
const props = defineProps({
  isLoading: {
    type: Boolean,
    default: false,
  },
  editMode: {
    type: Boolean,
    default: false,
  },
  editProduct: {
    type: Object,
    default: null,
  },
});

// Emits
const emit = defineEmits(['submit', 'cancel', 'toast']);

// Data
const categories = PRODUCT_CATEGORIES.options;
const isExpanded = ref(true);
const imageInputMode = ref('upload'); // 'upload' or 'url'
const isDragging = ref(false);
const isUploading = ref(false);
const fileInput = ref(null);

const form = reactive({
  name: '',
  category: PRODUCT_CATEGORIES.default,
  price_hot: null,
  price_cold: null,
  image: '',
  description: '',
  is_favorite: false,
});

// Watch for edit mode changes
watch(
  () => props.editProduct,
  (newProduct) => {
    if (newProduct) {
      form.name = newProduct.name || '';
      form.category = newProduct.category || PRODUCT_CATEGORIES.default;
      form.price_hot = newProduct.price_hot || null;
      form.price_cold = newProduct.price_cold || null;
      form.image = newProduct.image || '';
      form.description = newProduct.description || '';
      form.is_favorite = newProduct.is_favorite || false;
      isExpanded.value = true;
      // If editing and has image, switch to URL mode to show existing
      if (newProduct.image) {
        imageInputMode.value = 'url';
      }
    }
  },
  { immediate: true }
);

// Methods
function triggerFileInput() {
  fileInput.value?.click();
}

function handleFileSelect(event) {
  const file = event.target.files?.[0];
  if (file) {
    uploadImage(file);
  }
}

function handleFileDrop(event) {
  isDragging.value = false;
  const file = event.dataTransfer.files?.[0];
  if (file && file.type.startsWith('image/')) {
    uploadImage(file);
  }
}

// Helper function to extract file path from Supabase URL
function getStoragePathFromUrl(url) {
  if (!url) return null;

  // Check if it's a Supabase storage URL
  const match = url.match(/\/storage\/v1\/object\/public\/images\/(.+)/);
  return match ? match[1] : null;
}

// Delete image from Supabase Storage
async function deleteOldImage(imageUrl) {
  const filePath = getStoragePathFromUrl(imageUrl);
  if (!filePath) return; // Not a Supabase storage URL, skip deletion

  try {
    const { error } = await supabase.storage.from('images').remove([filePath]);
    if (error) {
      console.warn('Could not delete old image:', error.message);
    }
  } catch (err) {
    console.warn('Error deleting old image:', err);
  }
}

async function uploadImage(file) {
  // Validate file size (max 2MB)
  if (file.size > 2 * 1024 * 1024) {
    emit('toast', { message: 'Ukuran file maksimal 2MB', type: 'error' });
    return;
  }

  // Validate file type
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
  if (!allowedTypes.includes(file.type)) {
    emit('toast', { message: 'Format file harus JPG, PNG, WEBP, atau GIF', type: 'error' });
    return;
  }

  isUploading.value = true;

  // Store old image URL for deletion after successful upload
  const oldImageUrl = form.image;

  try {
    // Generate unique filename - always create new file to avoid conflicts
    const fileExt = file.name.split('.').pop().toLowerCase();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
    const filePath = `menu-images/${fileName}`;

    // Upload to Supabase Storage
    const { error } = await supabase.storage.from('images').upload(filePath, file, {
      cacheControl: '3600',
      upsert: false,
    });

    if (error) {
      throw error;
    }

    // Get public URL
    const { data: urlData } = supabase.storage.from('images').getPublicUrl(filePath);

    // Update form with new image URL
    form.image = urlData.publicUrl;

    // Delete old image from storage (if it was a Supabase storage URL)
    if (oldImageUrl && oldImageUrl !== urlData.publicUrl) {
      await deleteOldImage(oldImageUrl);
    }

    emit('toast', { message: 'Gambar berhasil diupload!', type: 'success' });
  } catch (error) {
    console.error('Upload error:', error);
    emit('toast', { message: 'Gagal mengupload gambar. Pastikan bucket "images" sudah dibuat di Supabase Storage.', type: 'error' });
  } finally {
    isUploading.value = false;
  }

  // Always reset file input to allow selecting same file again
  if (fileInput.value) {
    fileInput.value.value = '';
  }
}

async function clearImage() {
  const oldImageUrl = form.image;
  form.image = '';

  if (fileInput.value) {
    fileInput.value.value = '';
  }

  // Delete from storage if it's a Supabase URL
  if (oldImageUrl) {
    await deleteOldImage(oldImageUrl);
  }
}

function handleSubmit() {
  // Untuk menu baru, gambar wajib diisi
  // Untuk edit, gambar boleh kosong jika sudah ada gambar sebelumnya
  const hasExistingImage = props.editMode && props.editProduct?.image;
  const imageToUse = form.image || (hasExistingImage ? props.editProduct.image : '');

  if (!form.name) {
    emit('toast', { message: 'Nama menu wajib diisi!', type: 'error' });
    return;
  }

  if (!imageToUse) {
    emit('toast', { message: 'Gambar menu wajib diisi!', type: 'error' });
    return;
  }

  // Gunakan gambar yang ada jika tidak ada gambar baru
  const submitData = { ...form };
  if (!submitData.image && hasExistingImage) {
    submitData.image = props.editProduct.image;
  }

  emit('submit', submitData);

  if (!props.editMode) {
    resetForm();
  }
}

function handleCancel() {
  resetForm();
  emit('cancel');
}

function resetForm() {
  form.name = '';
  form.category = PRODUCT_CATEGORIES.default;
  form.price_hot = null;
  form.price_cold = null;
  form.image = '';
  form.description = '';
  form.is_favorite = false;
  imageInputMode.value = 'upload';
}

function handleImageError(e) {
  e.target.src = 'https://placehold.co/80x80/e5e7eb/9ca3af?text=Error';
}
</script>

<style scoped>
.collapse-enter-active,
.collapse-leave-active {
  transition: all 0.3s ease;
  overflow: hidden;
}

.collapse-enter-from,
.collapse-leave-to {
  max-height: 0;
  opacity: 0;
  padding-top: 0;
  padding-bottom: 0;
}

.collapse-enter-to,
.collapse-leave-from {
  max-height: 1000px;
  opacity: 1;
}
</style>
