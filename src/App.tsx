import { Header } from "./components/Header"
import { Author, Content, Post } from "./components/Post"
import { Sidebar } from "./components/Sidebar"
import "./global.css"

import styles from "./App.module.css"

interface Post {
  id: number;
  author: Author;
  publishedAt: Date;
  content: Content[];
}

const posts : Post[] = [
  {
    id: 1,
    author: {
      avatarUrl: "https://github.com/lourencoHenri.png",
      name: "Henrique Lourenço",
      role: "CEO @smartTokens"
    },
    content: [
      {
        type: "paragraph", content: "Fala galeraa 👋"
      },
      {
        type: "paragraph", content: "Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀"
      },
      { 
        type: "link", content: "jane.design/doctorcare"
      }
    ],
    publishedAt: new Date("2022-08-03 20:00:00")
  },
  {
    id: 2,
    author: {
      avatarUrl: "https://github.com/DuduLourenco.png",
      name: "Eduardo Lourenço",
      role: "CEO at Lourenço Tokens"
    },
    content: [
      {
        type: "paragraph", content: "Fala galeraa 👋"
      },
      {
        type: "paragraph", content: "Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀"
      },
      { 
        type: "link", content: "jane.design/doctorcare"
      }
    ],
    publishedAt: new Date("2022-08-15 20:00:00")
  },
]

export function App() {
  return (
    <div>
      <Header />

      <div className={styles.wrapper}>
        <Sidebar />
        <main>
          {posts.map(post => {
            return (
            <Post 
              key={post.id}
              author={post.author}
              content={post.content}
              publishedAt={post.publishedAt}
            />)
          })}
        </main>
      </div>
    </div>
    
  )
}

