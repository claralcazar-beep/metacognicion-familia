import { createClient } from "@supabase/supabase-js";

// Credenciales del proyecto metacognicion-familia (la clave publishable es pública, como en la invitación)
const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://zpqiludtdblbwgmwvade.supabase.co";
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "sb_publishable_dAL0ore94Dy9ZEAOWANrKw_31waCO-v";

export const supabase = createClient(url, key);
export const configured = Boolean(url && key);
