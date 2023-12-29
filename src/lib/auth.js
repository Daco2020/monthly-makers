import { userStore } from '../stores/userStore';
import { supabase } from '../lib/supabaseClient';

async function currentUser() {
    try {
        const { data } = await supabase.auth.getUser();
        userStore.set(data.user);
        return data.user;
    } catch (error) {
        console.error('Error fetching user:', error);
        return null;
    }
}

async function signInWithGithub() {
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'github'
    });
    console.log(error);
}


async function signOut() {
    const { error } = await supabase.auth.signOut();
    if (!error) {
        // 로그아웃 성공 후 페이지 새로고침
        location.reload();
    } else {
        // 오류 처리 (필요한 경우)
        console.error('Logout failed:', error);
    }
}


export { currentUser, signInWithGithub, signOut };