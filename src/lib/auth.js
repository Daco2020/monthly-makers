import { userStore } from '../stores/userStore';
import { supabase } from '../lib/supabaseClient';
import { goto } from '$app/navigation';


supabase.auth.onAuthStateChange(async (event, session) => {
    if (event === 'SIGNED_IN') {
      userStore.set(session.user);
      goto('/', { replaceState: true });
    }
  });


async function signInWithGithub() {
    await supabase.auth.signInWithOAuth({
        provider: 'github',
        options: {
            redirectTo: 'http://localhost:5173/'
          }
    });
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


export { signInWithGithub, signOut };