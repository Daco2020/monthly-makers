import { supabase } from "$lib/supabaseClient.js";

export async function load() {
    const { data } = await supabase.from("projects").select();
    return {
        projects: data ?? [],
    };
}