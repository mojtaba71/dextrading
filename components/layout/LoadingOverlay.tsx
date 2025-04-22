// components/LoadingOverlay.js
'use client';
import React, { useEffect } from 'react';
import Loading from '@/components/common/Loading';

const tips = [
    'You can find out the reliability of a token in the token section.',
    'Press ctrl+j to access info on tokens and their investibility.',
    'Always double-check the wallet address before making any transactions to avoid common phishing scams.',
    'Use two-factor authentication to enhance the security of your trading accounts.',
    'Keep an eye on transaction fees, which can vary significantly between different cryptocurrencies and networks.',
    'Consider the liquidity of a cryptocurrency before trading large amounts to ensure you can execute trades at desired prices.',
    'Stay updated with regulatory news as it can have significant impacts on market prices.',
    'Use technical analysis tools available on the platform to identify trading opportunities based on market trends.',
    'Diversify your portfolio to reduce risk by investing in different types of cryptocurrencies.',
    'Watch out for high volatility in the crypto market, especially around major news events or market announcements.',
    'Join our community forums to connect with other traders and share insights.',
    'Set up price alerts to be notified of significant price movements while you are away from your desk.',
    'Review historical performance data available on the site to understand potential future trends.',
    'Regularly backup your digital wallets and ensure that recovery phrases are stored securely off your computer.'
];

const randomIndex = Math.floor(Math.random() * tips.length);

export default function LoadingOverlay() {

    useEffect(() => {
        console.log('the route is changing (store)');
    }, []);

    return (
        <div className="fixed inset-0 backdrop-blur-sm bg-background bg-opacity-70 h-screen z-50 w-screen flex flex-col items-center justify-center gap-6 md:gap-8">
            <Loading width={70} height={70} />
            <div className="text-base flex items-start gap-2 justify-center md:text-lg text-muted-foreground px-10">
                <span className="whitespace-nowrap">
                    Tip:
                </span>
                <p className="max-w-lg">
                    {tips[randomIndex]}
                </p>
            </div>
        </div>
    );
}
