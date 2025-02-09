'use client';
 
import type { ReactNode } from 'react';
import { OnchainKitProvider } from '@coinbase/onchainkit';
import { base ,baseSepolia} from 'wagmi/chains'; // add baseSepolia for testing
import { createConfig, cookieToInitialState, useConfig, http } from 'wagmi'
 import { headers } from 'next/headers';

export function Providers(props: { children: ReactNode }) {
  const config = createConfig({
    chains: [base],
    transports: {
      [base.id]: http('https://mainnet.example.com'),
    },
  })
  
  return (
    <OnchainKitProvider 
      apiKey={process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY}
      chain={base} // add baseSepolia for testing
      projectId={process.env.NEXT_PUBLIC_ONCHAINKIT_PROJECT_ID}
      config={{
        appearance: {
          mode: 'auto', // 'auto' | 'light' | 'dark'
          theme: 'hacker', // 'default' | 'base' | 'cyberpunk' | 'hacker' | 'your-custom-theme'
        },
      }}
    >
      {props.children}
    </OnchainKitProvider>
  );
}