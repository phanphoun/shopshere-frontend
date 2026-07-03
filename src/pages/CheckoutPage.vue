<template>
  <div class="mx-auto max-w-[1400px] px-6 py-10">
    <h1 class="text-2xl font-bold text-[#111827] mb-8">{{ $t('checkout.title') }}</h1>

    <LoadingSpinner v-if="cartStore.loading" />

    <div v-else-if="!cartStore.cart.items.length" class="text-center py-20">
      <p class="text-sm text-[#6B7280] mb-4">{{ $t('checkout.empty') }}</p>
      <RouterLink :to="{ name: 'products' }" class="btn-primary px-6 h-11 text-sm font-semibold inline-flex items-center">{{ $t('checkout.continueShopping') }}</RouterLink>
    </div>

    <form v-else @submit.prevent="placeOrder" class="grid lg:grid-cols-3 gap-8">
      <div v-if="errors.general" class="lg:col-span-3 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-card text-sm">
        {{ errors.general }}
        <button type="button" @click="errors = {}" class="float-right font-bold">&times;</button>
      </div>
      <div class="lg:col-span-2 space-y-6">
        <div class="bg-white rounded-card border border-border shadow-card p-6">
          <h3 class="text-base font-bold text-[#111827] mb-5">{{ $t('checkout.shippingInfo') }}</h3>
          <div class="grid md:grid-cols-2 gap-4">
            <div>
              <label class="text-sm font-semibold text-[#111827] block mb-1.5">{{ $t('checkout.fullName') }}</label>
              <input :value="authStore.user?.name" disabled class="input bg-gray-100">
            </div>
            <div>
              <label class="text-sm font-semibold text-[#111827] block mb-1.5">{{ $t('checkout.email') }}</label>
              <input :value="authStore.user?.email" disabled class="input bg-gray-100">
            </div>
            <div class="md:col-span-2">
              <label class="text-sm font-semibold text-[#111827] block mb-1.5">{{ $t('checkout.shippingAddress') }} *</label>
              <textarea v-model="form.shipping_address" @input="clearError('shipping_address')" required rows="3" class="input"
                :class="{ 'border-red-500': errors.shipping_address }"
                :placeholder="$t('checkout.addressPlaceholder')"></textarea>
              <p v-if="errors.cart" class="text-red-500 text-xs mt-1">{{ errors.cart }}</p>
              <p v-if="errors.shipping_address" class="text-red-500 text-xs mt-1">{{ errors.shipping_address }}</p>
            </div>
            <div>
              <label class="text-sm font-semibold text-[#111827] block mb-1.5">{{ $t('checkout.phone') }} *</label>
              <input v-model="form.phone" @input="clearError('phone')" type="tel" required class="input"
                :class="{ 'border-red-500': errors.phone }"
                :placeholder="$t('checkout.phonePlaceholder')">
              <p v-if="errors.phone" class="text-red-500 text-xs mt-1">{{ errors.phone }}</p>
            </div>
            <div>
              <label class="text-sm font-semibold text-[#111827] block mb-1.5">{{ $t('checkout.paymentMethod') }}</label>
              <select v-model="form.payment_method" class="input">
                <option value="cod">{{ $t('checkout.cashOnDelivery') }}</option>
                <option value="stripe">Stripe</option>
                <option value="paypal">PayPal</option>
                <option value="aba">ABA Payway</option>
              </select>
            </div>
            <div class="md:col-span-2">
              <label class="text-sm font-semibold text-[#111827] block mb-1.5">{{ $t('checkout.notes') }}</label>
              <textarea v-model="form.notes" rows="2" class="input"
                :placeholder="$t('checkout.notesPlaceholder')"></textarea>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div class="bg-white rounded-card border border-border shadow-card p-6 sticky top-28">
          <h3 class="text-base font-bold text-[#111827] mb-5">{{ $t('checkout.orderSummary') }}</h3>
          <div class="space-y-3 mb-4 max-h-64 overflow-y-auto">
            <div v-for="item in cartStore.cart.items" :key="item.id" class="flex gap-3">
              <img :src="item.product.image_url || 'https://via.placeholder.com/50'" class="w-12 h-12 rounded-img object-cover">
              <div class="flex-1 text-sm">
                <p class="line-clamp-1 font-medium text-[#111827]">{{ item.product.name }}</p>
                <p class="text-[#6B7280]">{{ $t('checkout.qty') }}: {{ item.quantity }}</p>
              </div>
              <span class="text-sm font-semibold text-[#111827]">${{ item.subtotal.toFixed(2) }}</span>
            </div>
          </div>
          <div class="border-t border-border pt-4 space-y-2 mb-4 text-sm">
            <div class="flex justify-between"><span class="text-[#6B7280]">{{ $t('checkout.subtotal') }}</span><span class="font-semibold text-[#111827]">${{ cartStore.summary.subtotal.toFixed(2) }}</span></div>
            <div class="flex justify-between"><span class="text-[#6B7280]">{{ $t('checkout.tax') }}</span><span class="font-semibold text-[#111827]">${{ cartStore.summary.tax.toFixed(2) }}</span></div>
            <div class="flex justify-between"><span class="text-[#6B7280]">{{ $t('checkout.shipping') }}</span><span class="font-semibold text-[#111827]">${{ cartStore.summary.shipping_fee.toFixed(2) }}</span></div>
          </div>
          <div class="border-t border-border pt-4 mb-5">
            <div class="flex justify-between font-bold text-base">
              <span class="text-[#111827]">{{ $t('checkout.total') }}</span>
              <span class="text-primary-600">${{ cartStore.summary.total.toFixed(2) }}</span>
            </div>
          </div>
          <button type="submit" :disabled="submitting" class="btn-primary w-full h-12 text-sm font-semibold">
            {{ submitting ? $t('checkout.placingOrder') : $t('checkout.placeOrder') }}
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useAuthStore } from '@/stores/auth'
import { useCartStore } from '@/stores/cart'
import { useToastStore } from '@/stores/toast'
import api from '@/services/axios'
import LoadingSpinner from '@/components/LoadingSpinner.vue'

const { t } = useI18n()
const authStore = useAuthStore()
const cartStore = useCartStore()
const toastStore = useToastStore()
const router = useRouter()

const form = ref({
  shipping_address: authStore.user?.address || '',
  phone: authStore.user?.phone || '',
  payment_method: 'cod',
  notes: '',
})
const errors = ref({})
const submitting = ref(false)
const showQrModal = ref(false)
const qrContent = ref('')

function clearError(field) {
  delete errors.value[field]
}

onMounted(async () => {
  await cartStore.fetchCart()
  if (!form.value.shipping_address && authStore.user?.address) {
    form.value.shipping_address = authStore.user.address
  }
  if (!form.value.phone && authStore.user?.phone) {
    form.value.phone = authStore.user.phone
  }
})

async function placeOrder() {
  if (form.value.payment_method === 'aba') {
    window.open('https://link.payway.com.kh/ABAPAY19471568n', '_blank', 'noopener,noreferrer')
    return
  }

  submitting.value = true
  errors.value = {}
  try {
    const { data } = await api.post('/checkout', form.value)
    toastStore.success('Order placed!')
    await cartStore.fetchCart()
    router.push({ name: 'order-detail', params: { id: data.data.id } })
  } catch (e) {
    if (e.response?.status === 422 && e.response.data?.errors) {
      const fieldErrors = {}
      for (const [field, msgs] of Object.entries(e.response.data.errors)) {
        fieldErrors[field] = msgs[0]
      }
      fieldErrors.general = e.response.data.message
      errors.value = fieldErrors
    } else {
      errors.value = { general: e.formattedMessage || 'Failed to place order' }
    }
    toastStore.error(e.formattedMessage || 'Failed to place order')
  } finally {
    submitting.value = false
  }
}
</script>
