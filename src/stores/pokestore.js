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
//       image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
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
    title: '프로젝트1',
    description: '프로젝트1 설명',
    image: 'https://picsum.photos/640/480?random=1',
    link: 'https://naver.com',
    author: '김민수',
  },
  {
    title: '프로젝트2',
    description: '프로젝트2 설명',
    image: 'https://picsum.photos/640/480?random=2',
    link: 'https://naver.com',
    author: '김민수',
  },
  {
    title: '프로젝트3',
    description: '프로젝트3 설명',
    image: 'https://picsum.photos/640/480?random=3',
    link: 'https://naver.com',
    author: '장득현',
  },
  {
    title: '프로젝트4',
    description: '프로젝트4 설명',
    image: 'https://picsum.photos/640/480?random=4',
    link: 'https://naver.com',
    author: '박지현',
  },
  {
    title: '프로젝트5',
    description: '프로젝트5 설명',
    image: 'https://picsum.photos/640/480?random=5',
    link: 'https://naver.com',
    author: '구현아',
  },
  {
    title: '프로젝트6',
    description: '프로젝트6 설명',
    image: 'https://picsum.photos/640/480?random=6',
    link: 'https://naver.com',
    author: '김주현',
  },
  {
    title: '프로젝트7',
    description: '프로젝트7 설명',
    image: 'https://picsum.photos/640/480?random=7',
    link: 'https://naver.com',
    author: '백미현',
  },
  {
    title: '프로젝트8',
    description: '프로젝트8 설명',
    image: 'https://picsum.photos/640/480?random=8',
    link: 'https://naver.com',
    author: '도현주',
  },
  {
    title: '프로젝트9',
    description: '프로젝트9 설명',
    image: 'https://picsum.photos/640/480?random=9',
    link: 'https://naver.com',
    author: '이시현',
  },
]

arrProject.set(projects);
