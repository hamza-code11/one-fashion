// components/website/product/ProductPage/Productinfo.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Heart, Minus, Plus, Star, Truck, RefreshCw, ShieldCheck } from 'lucide-react';
import { Product } from '@/types/Product';
import { useCart } from '@/hooks/useCart';
import { useWishlist } from '@/hooks/useWishlist';
import styles from './Productinfo.module.css';

interface ProductInfoProps {
    product: Product;
}

export default function ProductInfo({ product }: ProductInfoProps) {
    const { addItem } = useCart();
    const { toggle, has } = useWishlist();

    const [selectedColor, setSelectedColor] = useState(product.colors?.[0]?.name ?? '');
    const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] ?? '');
    const [quantity, setQuantity] = useState(1);
    const [openSection, setOpenSection] = useState<string | null>('Description');

    const wishlisted = has(product.id);

    const discount =
        product.oldPrice && product.oldPrice > product.price
            ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
            : null;

    const handleAddToCart = () => {
        addItem(product, quantity, {
            color: selectedColor || undefined,
            size: selectedSize || undefined,
        });
    };

    const handleWishlist = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        toggle(product, {
            color: selectedColor || undefined,
            size: selectedSize || undefined,
        });
    };

    return (
        <div className={styles.info}>
            <nav className={styles.breadcrumb}>
                <Link href="/">Home</Link>
                <span>/</span>
                <Link href="/product">Shop</Link>
                <span>/</span>
                <span className={styles.breadcrumbCurrent}>{product.name}</span>
            </nav>

            {product.brand && <p className={styles.brand}>{product.brand}</p>}
            <h1 className={styles.title}>{product.name}</h1>

            <div className={styles.ratingRow}>
                <span className={styles.stars}>
                    {Array.from({ length: 5 }).map((_, index) => (
                        <Star
                            key={index}
                            size={16}
                            className={index < Math.round(product.rating) ? styles.starFilled : styles.starEmpty}
                        />
                    ))}
                </span>
                <span className={styles.ratingValue}>{product.rating}</span>
                <span className={styles.dot}>·</span>
                <span className={styles.category}>{product.category}</span>
            </div>

            <div className={styles.priceRow}>
                <span className={styles.price}>PKR {product.price.toLocaleString()}</span>
                {product.oldPrice && (
                    <span className={styles.oldPrice}>PKR {product.oldPrice.toLocaleString()}</span>
                )}
                {discount && <span className={styles.saveBadge}>Save {discount}%</span>}
            </div>

            {product.description && <p className={styles.description}>{product.description}</p>}

            {product.colors && product.colors.length > 0 && (
                <div className={styles.section}>
                    <p className={styles.label}>
                        Color: <span className={styles.labelValue}>{selectedColor}</span>
                    </p>
                    <div className={styles.colorRow}>
                        {product.colors.map((color) => (
                            <button
                                key={color.name}
                                type="button"
                                className={`${styles.colorSwatch} ${selectedColor === color.name ? styles.colorSwatchActive : ''
                                    }`}
                                style={{ backgroundColor: color.value }}
                                onClick={() => setSelectedColor(color.name)}
                                aria-label={color.name}
                            />
                        ))}
                    </div>
                </div>
            )}

            {product.sizes && product.sizes.length > 0 && (
                <div className={styles.section}>
                    <div className={styles.sizeHeader}>
                        <p className={styles.label}>
                            Size: <span className={styles.labelValue}>{selectedSize}</span>
                        </p>
                        <Link href="/size-guide" className={styles.sizeGuideLink}>
                            Size Guide
                        </Link>
                    </div>
                    <div className={styles.sizeGrid}>
                        {product.sizes.map((size) => (
                            <button
                                key={size}
                                type="button"
                                className={`${styles.sizeButton} ${selectedSize === size ? styles.sizeButtonActive : ''
                                    }`}
                                onClick={() => setSelectedSize(size)}
                            >
                                {size}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            <div className={styles.actionRow}>
                <div className={styles.quantityStepper}>
                    <button
                        type="button"
                        onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                        aria-label="Decrease quantity"
                    >
                        <Minus size={16} />
                    </button>
                    <span>{quantity}</span>
                    <button
                        type="button"
                        onClick={() => setQuantity((prev) => prev + 1)}
                        aria-label="Increase quantity"
                    >
                        <Plus size={16} />
                    </button>
                </div>

                <button
                    type="button"
                    className={styles.addToCartButton}
                    onClick={handleAddToCart}
                >
                    Add To Cart
                </button>

                <button
                    type="button"
                    className={`${styles.wishlistButton} ${wishlisted ? styles.wishlistButtonActive : ''
                        }`}
                    onClick={handleWishlist}
                    aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
                >
                    <Heart size={18} fill={wishlisted ? 'currentColor' : 'none'} />
                </button>
            </div>

            <div className={styles.trustRow}>
                <div className={styles.trustItem}>
                    <Truck size={20} />
                    <span>Delivery 24/7</span>
                </div>
                <div className={styles.trustItem}>
                    <RefreshCw size={20} />
                    <span>7-day easy returns</span>
                </div>
                <div className={styles.trustItem}>
                    <ShieldCheck size={20} />
                    <span>Secure checkout</span>
                </div>
            </div>

            {product.description && (
                <div className={styles.accordion}>
                    <div className={styles.accordionItem}>
                        <button
                            type="button"
                            className={styles.accordionHeader}
                            onClick={() =>
                                setOpenSection((prev) => (prev === 'Description' ? null : 'Description'))
                            }
                        >
                            <span>Description</span>
                            <span>{openSection === 'Description' ? '\u2212' : '+'}</span>
                        </button>
                        {openSection === 'Description' && (
                            <p className={styles.accordionContent}>{product.description}</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}