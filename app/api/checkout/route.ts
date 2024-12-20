// Route.ts - tells Nextjs to render a url that doesn't return a React Server Component
// but typically JSON or text. Works like an API endpoint in Express
// Backend endpoint that creates a Checkout session with priceId

import { NextResponse } from "next/server";
import { stripe } from "@/utils/stripe";

export async function POST(request: Request) {
    try {
        const { priceId, email, userId } = await request.json();

        // Can add your own metadata to a Stripe checkout session
        const session = await stripe.checkout.sessions.create({
            metadata: {
                user_id: userId,
            },
            customer_email: email,
            payment_method_types: ['card'],
            line_items: [
                {
                    // base subscription
                    price: priceId,
                    quantity: 1,
                },
                // {
                //     // one time setup fee
                //     price: priceId,
                //     quantity: 1,
                // },
            ],
            mode: 'subscription',
            success_url: `${request.headers.get('origin')}/success`,
            cancel_url: `${request.headers.get('origin')}/cancel`,
        });

        // Return the session.id to use in the front end to redirect the user to
        // this checkout session.
        return NextResponse.json({ id: session.id });
    } catch (error: any) {
        console.error(error);
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}