'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/Navbar'
import { useCart } from '@/context/CartContext'
import { SHIPPING } from '@/lib/config'
import type { PaymentMethod } from '@/lib/types'

const MX_STATES = [
  'Aguascalientes','Baja California','Baja California Sur','Campeche','Chiapas','Chihuahua',
  'Ciudad de México','Coahuila','Colima','Durango','Estado de México','Guanajuato','Guerrero',
  'Hidalgo','Jalisco','Michoacán','Morelos','Nayarit','Nuevo León','Oaxaca','Puebla','Querétaro',
  'Quintana Roo','San Luis Potosí','Sinaloa','Sonora','Tabasco','Tamaulipas','Tlaxcala',
  'Veracruz','Yucatán','Zacatecas',
]

const US_STATES = [
  'Alabama','Alaska','Arizona','Arkansas','California','Colorado','Connecticut','Delaware',
  'Florida','Georgia','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky',
  'Louisiana','Maine','Maryland','Massachusetts','Michigan','Minnesota','Mississippi',
  'Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico',
  'New York','North Carolina','North Dakota','Ohio','Oklahoma','Oregon','Pennsylvania',
  'Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont',
  'Virginia','Washington','West Virginia','Wisconsin','Wyoming',
]

export default function CheckoutPage() {
  const router = useRouter()
  const { items, total, clearCart } = useCart()
  const [country, setCountry] = useState<'MX' | 'US'>('MX')
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('transferencia')
  const [loading, setLoading] = useState(false)

  const shippingCost = total >= SHIPPING.freeShippingThreshold ? 0 : 150
  const grandTotal = total + shippingCost

  const states = country === 'MX' ? MX_STATES : US_STATES

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      clearCart()
      router.push('/checkout/confirmacion?orden=ORD-001&metodo=' + paymentMethod)
    }, 1200)
  }

  if (items.length === 0) {
    router.push('/carrito')
    return null
  }

  return (
    <>
      <Navbar />
      <main className="pt-28 pb-20 min-h-screen">
        <div className="max-w-5xl mx-auto px-6">
          <h1 className="font-serif text-3xl font-light mb-10">Checkout</h1>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
              {/* Formulario */}
              <div className="lg:col-span-3 space-y-8">

                {/* Datos de contacto */}
                <section>
                  <h2 className="text-xs tracking-widest uppercase font-medium mb-4">Datos de contacto</h2>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <input required placeholder="Nombre" className="border border-stone-300 px-4 py-3 text-sm w-full focus:outline-none focus:border-mare-dark transition-colors" />
                      <input required placeholder="Apellido" className="border border-stone-300 px-4 py-3 text-sm w-full focus:outline-none focus:border-mare-dark transition-colors" />
                    </div>
                    <input required type="email" placeholder="Correo electrónico" className="border border-stone-300 px-4 py-3 text-sm w-full focus:outline-none focus:border-mare-dark transition-colors" />
                    <input required type="tel" placeholder="Teléfono" className="border border-stone-300 px-4 py-3 text-sm w-full focus:outline-none focus:border-mare-dark transition-colors" />
                  </div>
                </section>

                {/* Dirección de envío */}
                <section>
                  <h2 className="text-xs tracking-widest uppercase font-medium mb-4">Dirección de envío</h2>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        type="button"
                        onClick={() => setCountry('MX')}
                        className={`py-3 text-sm border transition-colors ${country === 'MX' ? 'border-mare-dark bg-mare-dark text-white' : 'border-stone-300 hover:border-mare-dark'}`}
                      >
                        🇲🇽 México
                      </button>
                      <button
                        type="button"
                        onClick={() => setCountry('US')}
                        className={`py-3 text-sm border transition-colors ${country === 'US' ? 'border-mare-dark bg-mare-dark text-white' : 'border-stone-300 hover:border-mare-dark'}`}
                      >
                        🇺🇸 Estados Unidos
                      </button>
                    </div>
                    <input required placeholder="Calle y número" className="border border-stone-300 px-4 py-3 text-sm w-full focus:outline-none focus:border-mare-dark transition-colors" />
                    <input placeholder="Colonia / Apartamento (opcional)" className="border border-stone-300 px-4 py-3 text-sm w-full focus:outline-none focus:border-mare-dark transition-colors" />
                    <div className="grid grid-cols-2 gap-4">
                      <input required placeholder="Ciudad" className="border border-stone-300 px-4 py-3 text-sm w-full focus:outline-none focus:border-mare-dark transition-colors" />
                      <select required className="border border-stone-300 px-4 py-3 text-sm w-full focus:outline-none focus:border-mare-dark transition-colors bg-white">
                        <option value="">Estado</option>
                        {states.map((s) => <option key={s}>{s}</option>)}
                      </select>
                    </div>
                    <input required placeholder="Código postal" className="border border-stone-300 px-4 py-3 text-sm w-full focus:outline-none focus:border-mare-dark transition-colors" />
                  </div>

                  {/* Estimación de envío */}
                  <div className="mt-4 bg-stone-50 p-4 text-xs text-mare-gray space-y-1">
                    {country === 'MX' ? (
                      <p>📦 Entrega estimada: <strong>3-5 días hábiles</strong> · DHL / Estafeta</p>
                    ) : (
                      <p>📦 Entrega estimada: <strong>7-10 días hábiles</strong> · FedEx Internacional</p>
                    )}
                    <p>Recibirás tu número de guía por correo una vez que tu pedido sea enviado.</p>
                  </div>
                </section>

                {/* Método de pago */}
                <section>
                  <h2 className="text-xs tracking-widest uppercase font-medium mb-4">Método de pago</h2>
                  <div className="space-y-3">
                    <label className={`flex items-start gap-4 p-4 border cursor-pointer transition-colors ${paymentMethod === 'transferencia' ? 'border-mare-dark' : 'border-stone-200 hover:border-stone-400'}`}>
                      <input
                        type="radio"
                        name="payment"
                        value="transferencia"
                        checked={paymentMethod === 'transferencia'}
                        onChange={() => setPaymentMethod('transferencia')}
                        className="mt-1 accent-mare-dark"
                      />
                      <div>
                        <p className="text-sm font-medium">Transferencia bancaria</p>
                        <p className="text-xs text-mare-gray mt-1">Realiza tu pago y sube tu comprobante. Confirmamos en 24-48 hrs.</p>
                      </div>
                    </label>

                    <label className={`flex items-start gap-4 p-4 border cursor-pointer transition-colors ${paymentMethod === 'tarjeta' ? 'border-mare-dark' : 'border-stone-200 hover:border-stone-400'}`}>
                      <input
                        type="radio"
                        name="payment"
                        value="tarjeta"
                        checked={paymentMethod === 'tarjeta'}
                        onChange={() => setPaymentMethod('tarjeta')}
                        className="mt-1 accent-mare-dark"
                      />
                      <div>
                        <p className="text-sm font-medium">Tarjeta de crédito / débito</p>
                        <p className="text-xs text-mare-gray mt-1">Pago seguro con Stripe. Visa, Mastercard, American Express.</p>
                      </div>
                    </label>
                  </div>
                </section>
              </div>

              {/* Resumen del pedido */}
              <div className="lg:col-span-2">
                <div className="bg-stone-50 p-6 sticky top-28">
                  <h2 className="text-xs tracking-widest uppercase font-medium mb-6">Tu pedido</h2>

                  <div className="space-y-4 mb-6">
                    {items.map((item) => (
                      <div key={`${item.productId}-${item.variantId}`} className="flex justify-between text-sm">
                        <div>
                          <p className="font-light">{item.name}</p>
                          <p className="text-xs text-mare-gray">{item.color} × {item.quantity}</p>
                        </div>
                        <p>${(item.price * item.quantity).toLocaleString('es-MX')}</p>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-stone-200 pt-4 space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-mare-gray">Subtotal</span>
                      <span>${total.toLocaleString('es-MX')} MXN</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-mare-gray">Envío</span>
                      <span>{shippingCost === 0 ? 'Gratis' : `$${shippingCost} MXN`}</span>
                    </div>
                    <div className="flex justify-between font-medium pt-2 border-t border-stone-200">
                      <span>Total</span>
                      <span>${grandTotal.toLocaleString('es-MX')} MXN</span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full mt-6 bg-mare-dark text-white text-xs tracking-widest uppercase py-4 hover:bg-stone-800 transition-colors disabled:opacity-60"
                  >
                    {loading ? 'Procesando...' : 'Confirmar pedido'}
                  </button>

                  <p className="text-xs text-mare-gray text-center mt-4">
                    Al confirmar aceptas nuestros{' '}
                    <a href="/terminos" className="underline underline-offset-2">Términos y condiciones</a>
                  </p>
                </div>
              </div>
            </div>
          </form>
        </div>
      </main>
    </>
  )
}
