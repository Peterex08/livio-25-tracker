import { createClient } from "@supabase/supabase-js";

// Pega a URL e a chave pública (anon) das variáveis de ambiente
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Cria e exporta o cliente Supabase para ser usado no resto do aplicativo
export const supabase = createClient(supabaseUrl, supabaseAnonKey);