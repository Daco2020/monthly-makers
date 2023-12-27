import { supabase } from "$lib/supabaseClient.js";

export async function load() {
    const { data } = await supabase.from("projects").select().eq('is_active', true);;
    return {
        projects: data ?? [],
    };
}