// import { writable } from 'svelte/store';

// export const arrProject = writable([]);

// const limit = 150;
// const offset = 500;

// const fetchPokemon = async () => {
//   const url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;
//   const res = await fetch(url);
//   const data = await res.json();

//   const loadedPokemon = data.results.map((pokemon, index) => {
//     return {
//       name: koreanNames[index],
//       id: index + offset,
//       thumbnail: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
//         index + offset
//       }.png`,
//     };
//   });
//   arrProject.set(loadedPokemon);
// }


// const koreanNames = [];
// const urls = [];

// for (let i=offset; i<offset+limit; i++) {
//   urls.push(`https://pokeapi.co/api/v2/pokemon-species/${i}`);
// }

// let requests = urls.map(url => fetch(url));

// Promise.all(requests) // 여러개의 요청을 순서를 지키고 모든 결과를 받을 때까지 기다린다.
//     .then(responses => Promise.all(responses.map(r => r.json()))) // 값을 가져오려면 then 을 사용해야 한다.
//     .then(results => {
//         results.forEach((result) => {
//             koreanNames.push(result.names[2].name);
//         });
//         fetchPokemon();
//     });


    

import { writable } from 'svelte/store';

export const arrProject = writable([]);

const projects = [
  {
    id: '1',
    user_id: '1',
    title: '프로젝트 프로젝트 프로젝트 프로젝트',
    description: '프로젝트1 설명 프로젝트1 설명프로젝트1 설명프로젝트1 설명프로젝트1 설명프로젝트1 설명 설명프로젝트1 설명 설명프로젝트1',
    detail: '프로젝트1 상세설명',
    thumbnail: 'https://picsum.photos/640/480?random=1',
    link: 'https://naver.com',
    maker: 'Daco',
    password: '1q2w3e4r',
    allow_sns_promotion: true,
    tag: [],
    created_at: '2021-01-01',
    updated_at: '2021-01-01',
  },
  {
    id: '2',
    user_id: '2',
    title: '프로젝트2',
    description: '프로젝트2 설명',
    detail: '프로젝트2 상세설명',
    thumbnail: 'https://picsum.photos/640/480?random=2',
    link: 'https://naver.com',
    maker: '김민수',
    password: '1q2w3e4r',
    allow_sns_promotion: true,
    tag: [],
    created_at: '2021-01-01',
    updated_at: '2021-01-01',
  },
  {
    id: '3',
    user_id: '3',
    title: '프로젝트3',
    description: '프로젝트3 설명',
    detail: '프로젝트3 상세설명',
    thumbnail: 'https://picsum.photos/640/480?random=3',
    link: 'https://naver.com',
    maker: '장득현',
    password: '1q2w3e4r',
    allow_sns_promotion: true,
    tag: [],
    created_at: '2021-01-01',
    updated_at: '2021-01-01',
  },
  {
    id: '4',
    user_id: '4',
    title: '프로젝트4',
    description: '프로젝트4 설명',
    detail: '프로젝트4 상세설명',
    thumbnail: 'https://picsum.photos/640/480?random=4',
    link: 'https://naver.com',
    maker: '박지현',
    password: '1q2w3e4r',
    allow_sns_promotion: true,
    tag: [],
    created_at: '2021-01-01',
    updated_at: '2021-01-01',
  },
  {
    id: '5',
    user_id: '5',
    title: '프로젝트5',
    description: '프로젝트5 설명',
    detail: '프로젝트5 상세설명',
    thumbnail: 'https://picsum.photos/640/480?random=5',
    link: 'https://naver.com',
    maker: '구현아',
    password: '1q2w3e4r',
    allow_sns_promotion: true,
    tag: [],
    created_at: '2021-01-01',
    updated_at: '2021-01-01',
  },
  {
    id: '6',
    user_id: '6',
    title: '프로젝트6',
    description: '프로젝트6 설명',
    detail: '프로젝트6 상세설명',
    thumbnail: 'https://picsum.photos/640/480?random=6',
    link: 'https://naver.com',
    maker: '김주현',
    password: '1q2w3e4r',
    allow_sns_promotion: true,
    tag: [],
    created_at: '2021-01-01',
    updated_at: '2021-01-01',
  },
  {
    id: '7',
    user_id: '7',
    title: '프로젝트7',
    description: '프로젝트7 설명',
    detail: '프로젝트7 상세설명',
    thumbnail: 'https://picsum.photos/640/480?random=7',
    link: 'https://naver.com',
    maker: '백미현',
    password: '1q2w3e4r',
    allow_sns_promotion: true,
    tag: [],
    created_at: '2021-01-01',
    updated_at: '2021-01-01',
  },
  {
    id: '8',
    user_id: '8',
    title: '프로젝트8',
    description: '프로젝트8 설명',
    detail: '프로젝트8 상세설명',
    thumbnail: 'https://picsum.photos/640/480?random=8',
    link: 'https://naver.com',
    maker: '도현주',
    password: '1q2w3e4r',
    allow_sns_promotion: true,
    tag: [],
    created_at: '2021-01-01',
    updated_at: '2021-01-01',
  },
  {
    id: '9',
    user_id: '9',
    title: '프로젝트9',
    description: '프로젝트9 설명',
    detail: '프로젝트9 상세설명',
    thumbnail: 'https://picsum.photos/640/480?random=9',
    link: 'https://naver.com',
    maker: '이시현',
    password: '1q2w3e4r',
    allow_sns_promotion: true,
    tag: [],
    created_at: '2021-01-01',
    updated_at: '2021-01-01',
  },
]

arrProject.set(projects);
