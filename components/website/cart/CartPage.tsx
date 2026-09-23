'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Minus, Plus, X, ShoppingBag, ArrowLeft } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import styles from './CartPage.module.css';

export default function CartPage() {
  const {
    cart,
    removeItem,
    updateQuantity,
    updateVariant,
    totalPrice,
    totalItems,
  } = useCart();

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Shopping Cart</h1>
          <p className={styles.subtitle}>
            {totalItems === 0
              ? 'Your cart is empty.'
              : `${totalItems} item${totalItems === 1 ? '' : 's'} in your cart`}
          </p>
        </div>

        {cart.length === 0 ? (
          <div className={styles.empty}>
            <span className={styles.emptyIcon}>
              <ShoppingBag size={32} strokeWidth={1.5} />
            </span>
            <h2 className={styles.emptyTitle}>Your cart is empty</h2>
            <p className={styles.emptyText}>
              Looks like you haven&apos;t added anything yet.
            </p>
            <Link href="/shop" className={styles.emptyBtn}>
              <ArrowLeft size={16} strokeWidth={2} />
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className={styles.layout}>
            {/* ITEMS */}
            <div className={styles.items}>
              {cart.map((item, index) => {
                const { product, quantity, color, size } = item;
                return (
                  <article
                    key={`${product.id}-${color ?? ''}-${size ?? ''}-${index}`}
                    className={styles.item}
                  >
                    <Link href={`/product/${product.id}`} className={styles.imageWrap}>
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        sizes="140px"
                        className={styles.image}
                      />
                    </Link>

                    <div className={styles.details}>
                      {/* LEFT: info + variant pickers */}
                      <div className={styles.infoCol}>
                        <span className={styles.category}>{product.category}</span>

                        <Link href={`/product/${product.id}`} className={styles.name}>
                          {product.name}
                        </Link>

                        <div className={styles.priceRow}>
                          <span className={styles.price}>
                            PKR {product.price.toLocaleString()}
                          </span>
                          {product.oldPrice && (
                            <span className={styles.oldPrice}>
                              PKR {product.oldPrice.toLocaleString()}
                            </span>
                          )}
                        </div>

                        {/* COLOR SWATCHES */}
                        {product.colors && product.colors.length > 0 && (
                          <div className={styles.variantBlock}>
                            <span className={styles.variantLabel}>
                              Color: <strong>{color ?? '—'}</strong>
                            </span>
                            <div className={styles.colorRow}>
                              {product.colors.map((c) => (
                                <button
                                  key={c.name}
                                  type="button"
                                  className={`${styles.colorSwatch} ${
                                    color === c.name ? styles.colorSwatchActive : ''
                                  }`}
                                  style={{ backgroundColor: c.value }}
                                  onClick={() =>
                                    updateVariant(
                                      product.id,
                                      { color, size },
                                      { color: c.name, size }
                                    )
                                  }
                                  aria-label={c.name}
                                />
                              ))}
                            </div>
                          </div>
                        )}

                        {/* SIZE BOXES */}
                        {product.sizes && product.sizes.length > 0 && (
                          <div className={styles.variantBlock}>
                            <span className={styles.variantLabel}>
                              Size: <strong>{size ?? '—'}</strong>
                            </span>
                            <div className={styles.sizeGrid}>
                              {product.sizes.map((s) => (
                                <button
                                  key={s}
                                  type="button"
                                  className={`${styles.sizeButton} ${
                                    size === s ? styles.sizeButtonActive : ''
                                  }`}
                                  onClick={() =>
                                    updateVariant(
                                      product.id,
                                      { color, size },
                                      { color, size: s }
                                    )
                                  }
                                >
                                  {s}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* RIGHT: quantity, line total, remove */}
                      <div className={styles.actionCol}>
                        <div className={styles.quantityStepper}>
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(product.id, quantity - 1, {
                                color,
                                size,
                              })
                            }
                            aria-label="Decrease quantity"
                          >
                            <Minus size={14} />
                          </button>
                          <span>{quantity}</span>
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(product.id, quantity + 1, {
                                color,
                                size,
                              })
                            }
                            aria-label="Increase quantity"
                          >
                            <Plus size={14} />
                          </button>
                        </div>

                        <span className={styles.lineTotal}>
                          PKR {(product.price * quantity).toLocaleString()}
                        </span>

                        <button
                          type="button"
                          className={styles.removeBtn}
                          onClick={() =>
                            removeItem(product.id, { color, size })
                          }
                          aria-label="Remove item"
                        >
                          <X size={16} strokeWidth={2} />
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            {/* SUMMARY */}
            <aside className={styles.summary}>
              <h2 className={styles.summaryTitle}>Order Summary</h2>

              <div className={styles.summaryRow}>
                <span>Subtotal</span>
                <span>PKR {totalPrice.toLocaleString()}</span>
              </div>

              <div className={styles.summaryTotal}>
                <span>Total</span>
                <span>PKR {totalPrice.toLocaleString()}</span>
              </div>

              <Link href="/checkout" className={styles.checkoutBtn}>
                Proceed to Checkout
              </Link>

              <Link href="/shop" className={styles.continueLink}>
                <ArrowLeft size={14} strokeWidth={2} />
                Continue Shopping
              </Link>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
}
