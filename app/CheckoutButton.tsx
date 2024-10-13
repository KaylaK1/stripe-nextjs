'use client';

import { loadStripe } from "@stripe/stripe-js";
import { supabase } from "../utils/supabaseClient";
import toast from 'react-hot-toast';

export default function CheckoutButton() {
    const handleCheckout = async() => {
        const { data } = await supabase.auth.getUser();

        if (!data?.user) {
            toast.error("Please log in to create a new Stripe Checkout session");
            return;
        }

        const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
        const stripe = await stripePromise;
        const response = await fetch('/api/checkout'. {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ prideId: '', userId: data.user?.id, email: data.user?.email }),
        });

        
    }
}