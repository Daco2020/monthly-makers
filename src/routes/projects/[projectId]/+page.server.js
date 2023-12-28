import { supabase } from "$lib/supabaseClient.js";

export async function load( {params} ) {
    const id = params.projectId;
    const { data: projectData } = await supabase.from("projects").select().eq("id", id).single();
    const { data: otherProjectsData } = await supabase.from("projects").select().neq("id", id).eq('user_id', projectData.user_id).eq('is_active', true).order('created_at', {ascending: false});
    return {projectData, otherProjectsData};
}
