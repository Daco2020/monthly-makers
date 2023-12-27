import { supabase } from "$lib/supabaseClient.js";

export async function load( {params} ) {
    const id = params.projectId;     
    const { data } = await supabase.from("projects").select().eq("id", id).single();
    return data;
}