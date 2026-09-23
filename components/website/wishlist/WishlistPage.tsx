'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, ShoppingBag, X, Trash2, ArrowLeft } from 'lucide-react';
import { useWishlist } from '@/hooks/useWishlist';
import { useCart } from '@/hooks/useCart';
import styles from './WishlistPage.module.css';

export default function WishlistPage() {
  const { wishlist, toggle, clearWishlist } = useWishlist();
  const { addItem } = useCart();

  const handleMoveToCart = (productId: number) => {
    const item = wishlist.find((w) => w.product.id === productId);
    if (!item) return;

    addItem(item.product, 1, { color: item.color, size: item.size });
    toggle(item.product); // remove from wishlist
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {/* HEADER */}
        <div className={styles.header}>
          <div>
            <h1 className={styles.title}>My Wishlist</h1>
            <p className={styles.subtitle}>
              {wishlist.length === 0
                ? 'No items saved yet.'
                : `${wishlist.length} item${wishlist.length === 1 ? '' : 's'} saved`}
            </p>
          </div>

          {wishlist.length > 0 && (
            <button
              type="button"
              className={styles.clearBtn}
              onClick={clearWishlist}
            >
              <Trash2 size={16} strokeWidth={1.8} />
              Clear All
            </button>
          )}
        </div>

        {/* EMPTY / GRID */}
        {wishlist.length === 0 ? (
          <div className={styles.empty}>
            <span className={styles.emptyIcon}>
              <Heart size={32} strokeWidth={1.5} />
            </span>
            <h2 className={styles.emptyTitle}>Your wishlist is empty</h2>
            <p className={styles.emptyText}>
              Save your favourite pieces here and come back to them anytime.
            </p>
            <Link href="/shop" className={styles.emptyBtn}>
              <ArrowLeft size={16} strokeWidth={2} />
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className={styles.grid}>
            {wishlist.map((item) => {
              const { product, color, size } = item;
              return (
                <article key={product.id} className={styles.card}>
                  <button
                    type="button"
                    className={styles.removeBtn}
                    onClick={() => toggle(product)}
                    aria-label="Remove from wishlist"
                  >
                    <X size={16} strokeWidth={2} />
                  </button>

                  <Link href={`/product/${product.id}`} className={styles.imageWrap}>
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      className={styles.image}
                    />
                  </Link>

                  <div className={styles.info}>
                    <span className={styles.category}>{product.category}</span>
                    <Link href={`/product/${product.id}`} className={styles.name}>
                      {product.name}
                    </Link>

                    {/* variants now shown */}
                    {(color || size) && (
                      <div className={styles.variants}>
                        {color && (
                          <span className={styles.variant}>
                            Color: <strong>{color}</strong>
                          </span>
                        )}
                        {size && (
                          <span className={styles.variant}>
                            Size: <strong>{size}</strong>
                          </span>
                        )}
                      </div>
                    )}

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
                  </div>

                  <button
                    type="button"
                    className={styles.moveBtn}
                    onClick={() => handleMoveToCart(product.id)}
                  >
                    <ShoppingBag size={16} strokeWidth={1.9} />
                    Move to Cart
                  </button>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
