// Allows the front end to communicate with the database
import { createClient } from '@supabase/supabase-js'
export const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)