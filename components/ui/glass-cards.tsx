"use client";

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cardData, PricingCard } from '../../lib/utils';
import { Spotlight } from './spotlight';

gsap.registerPlugin(ScrollTrigger);

interface CardProps extends PricingCard {
    index: number;
    totalCards: number;
}

const Card: React.FC<CardProps> = ({ 
    title, 
    description, 
    price, 
    pricePeriod, 
    features, 
    buttonText, 
    isPopular,
    index, 
    totalCards, 
    color 
}) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const card = cardRef.current;
        const container = containerRef.current;
        if (!card || !container) return;

        const targetScale = 1 - (totalCards - index) * 0.05;

        // Set initial state
        gsap.set(card, {
            scale: 1,
            transformOrigin: "center top"
        });

        // Create scroll trigger for stacking effect (similar to the reference component)
        const scrollTrigger = ScrollTrigger.create({
            trigger: container,
            start: "top center",
            end: "bottom center",
            scrub: 1,
            onUpdate: (self) => {
                const progress = self.progress;
                const scale = gsap.utils.interpolate(1, targetScale, progress);
                gsap.set(card, {
                    scale: Math.max(scale, targetScale),
                    transformOrigin: "center top"
                });
            }
        });

        return () => {
            scrollTrigger.kill();
        };
    }, [index, totalCards]);

    return (
        <div
            ref={containerRef}
            style={{
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'sticky',
                top: 0
            }}
        >
            <div
                ref={cardRef}
                style={{
                    position: 'relative',
                    width: '70%',
                    height: '600px',
                    borderRadius: '24px',
                    isolation: 'isolate',
                    top: `calc(-5vh + ${index * 25}px)`,
                    transformOrigin: 'top'
                }}
                className="card-content"
            >
                {/* Electric Border Effect */}
                <div
                    style={{
                        position: 'absolute',
                        inset: '-3px',
                        borderRadius: '27px',
                        padding: '3px',
                        background: `conic-gradient(
                            from 0deg,
                            transparent 0deg,
                            ${color} 60deg,
                            ${color.replace('0.8', '0.6')} 120deg,
                            transparent 180deg,
                            ${color.replace('0.8', '0.4')} 240deg,
                            transparent 360deg
                        )`,
                        zIndex: -1
                    }}
                />

                {/* Main Card Content */}
                <div style={{
                    position: 'relative',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: '24px',
                    background: `
                        linear-gradient(145deg, 
                            rgba(255, 255, 255, 0.1), 
                            rgba(255, 255, 255, 0.05)
                        )
                    `,
                    backdropFilter: 'blur(25px) saturate(180%)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    boxShadow: `
                        0 8px 32px rgba(0, 0, 0, 0.3),
                        0 2px 8px rgba(0, 0, 0, 0.2),
                        inset 0 1px 0 rgba(255, 255, 255, 0.3),
                        inset 0 -1px 0 rgba(255, 255, 255, 0.1)
                    `,
                    overflow: 'hidden'
                }}>
                    {/* Enhanced Glass reflection overlay */}
                    <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: '60%',
                        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.1) 50%, transparent 100%)',
                        pointerEvents: 'none',
                        borderRadius: '24px 24px 0 0'
                    }} />

                    {/* Glass shine effect */}
                    <div style={{
                        position: 'absolute',
                        top: '10px',
                        left: '10px',
                        right: '10px',
                        height: '2px',
                        background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.6) 50%, transparent 100%)',
                        borderRadius: '1px',
                        pointerEvents: 'none'
                    }} />

                    {/* Side glass reflection */}
                    <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '2px',
                        height: '100%',
                        background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.3) 0%, transparent 50%)',
                        borderRadius: '24px 0 0 24px',
                        pointerEvents: 'none'
                    }} />

                    {/* Frosted glass texture */}
                    <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundImage: `
                            radial-gradient(circle at 20% 30%, rgba(255,255,255,0.1) 1px, transparent 2px),
                            radial-gradient(circle at 80% 70%, rgba(255,255,255,0.08) 1px, transparent 2px),
                            radial-gradient(circle at 40% 80%, rgba(255,255,255,0.06) 1px, transparent 2px)
                        `,
                        backgroundSize: '30px 30px, 25px 25px, 35px 35px',
                        pointerEvents: 'none',
                        borderRadius: '24px',
                        opacity: 0.7
                    }} />

                    {/* Card Content */}
                    <div style={{
                        position: 'relative',
                        zIndex: 1,
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        padding: '1.5rem 2rem',
                        color: '#ffffff',
                        overflow: 'hidden'
                    }}>
                        <div style={{ textAlign: 'center' }}>
                            {/* Popular Badge */}
                            {isPopular && (
                                <div style={{
                                    display: 'inline-block',
                                    padding: '0.25rem 0.75rem',
                                    marginBottom: '1rem',
                                    borderRadius: '12px',
                                    background: 'rgba(147, 51, 234, 0.3)',
                                    border: '1px solid rgba(147, 51, 234, 0.5)',
                                    fontSize: '0.75rem',
                                    fontWeight: '600',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.05em'
                                }}>
                                    Most Popular
                                </div>
                            )}
                            
                            <h2 style={{
                                fontSize: '2rem',
                                fontWeight: '600',
                                marginBottom: '0.5rem'
                            }}>
                                {title}
                            </h2>
                            
                            <p style={{
                                fontSize: '0.95rem',
                                opacity: 0.8,
                                marginBottom: '1.5rem'
                            }}>
                                {description}
                            </p>
                            
                            {/* Price */}
                            <div style={{
                                marginBottom: '1.5rem'
                            }}>
                                <span style={{
                                    fontSize: '3rem',
                                    fontWeight: '700',
                                    lineHeight: '1'
                                }}>
                                    {price}
                                </span>
                                {pricePeriod && (
                                    <span style={{
                                        fontSize: '1rem',
                                        opacity: 0.7,
                                        marginLeft: '0.25rem'
                                    }}>
                                        {pricePeriod}
                                    </span>
                                )}
                            </div>
                        </div>
                        
                        {/* Features List */}
                        <div style={{
                            flex: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            marginBottom: '1.25rem',
                            minHeight: 0,
                            overflowY: 'auto'
                        }}>
                            <ul style={{
                                listStyle: 'none',
                                padding: 0,
                                margin: 0,
                                textAlign: 'left'
                            }}>
                                {features.map((feature, idx) => (
                                    <li key={idx} style={{
                                        padding: '0.4rem 0',
                                        fontSize: '0.875rem',
                                        opacity: 0.9,
                                        display: 'flex',
                                        alignItems: 'flex-start',
                                        lineHeight: '1.4'
                                    }}>
                                        <span style={{
                                            marginRight: '0.75rem',
                                            fontSize: '0.875rem',
                                            marginTop: '0.1rem',
                                            flexShrink: 0
                                        }}>✓</span>
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        
                        {/* CTA Button */}
                        <button style={{
                            width: '100%',
                            padding: '0.875rem 1.5rem',
                            borderRadius: '12px',
                            background: `linear-gradient(135deg, ${color}, ${color.replace('0.8', '0.6')})`,
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            color: '#ffffff',
                            fontSize: '1rem',
                            fontWeight: '600',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
                            flexShrink: 0,
                            marginTop: 'auto'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-2px)';
                            e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.3)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.2)';
                        }}
                        >
                            {buttonText}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const StackedCards: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        gsap.fromTo(container,
            { opacity: 0 },
            {
                opacity: 1,
                duration: 1.2,
                ease: "power2.out"
            }
        );

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    return (
        <main ref={containerRef} style={{ background: '#0a0a0a' }}>
            {/* Hero Section */}
            <section style={{
                height: '70vh',
                width: '100%',
                display: 'grid',
                placeContent: 'center',
                position: 'relative',
                color: '#ffffff',
                overflow: 'hidden'
            }}>
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundImage: `
                        linear-gradient(to right, rgba(79, 79, 79, 0.18) 1px, transparent 1px),
                        linear-gradient(to bottom, rgba(79, 79, 79, 0.18) 1px, transparent 1px)
                    `,
                    backgroundSize: '54px 54px',
                    maskImage: 'radial-gradient(ellipse 60% 50% at 50% 0%, #000 70%, transparent 100%)',
                    zIndex: 1
                }} />
                <Spotlight
                    className='from-purple-500 via-purple-400 to-purple-300 blur-2xl'
                    size={400}
                />

                <h1 style={{
                    fontSize: 'clamp(3rem, 8vw, 6rem)',
                    fontWeight: '900',
                    textAlign: 'center',
                    lineHeight: '1.1',
                    padding: '0 2rem',
                    position: 'relative',
                    zIndex: 2,
                    letterSpacing: '-0.02em'
                }}>
                    Pricing
                </h1>
            </section>

            {/* Cards Section */}
            <section style={{
                color: '#ffffff',
                width: '100%'
            }}>
                {cardData.map((card, index) => {
                    return (
                        <Card
                            key={card.id}
                            {...card}
                            index={index}
                            totalCards={cardData.length}
                        />
                    );
                })}
            </section>
        </main>
    );
};

