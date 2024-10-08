// Only to be used for backend code.
// SECRET_KEY allows full access to write to tables protected on the front end.
import { createClient } from '@supabase/supabase-js'
export const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SECRET_KEY!
)
