export interface ContentItem {
  type: "paragraph" | "link";
  content: string;
}

interface Contents {
  [key: string]: ContentItem[];
}

export const contents: Contents = {
  post1: [
    {
      type: "paragraph",
      content: "Fala Dev!",
    },
    {
      type: "paragraph",
      content: "Estou apredendo reactjs 🚀",
    },
    {
      type: "link",
      content: "https://github.com/jessebcorreia",
    },
  ],
  post2: [
    {
      type: "paragraph",
      content: "Fala galeraa 👋",
    },
    {
      type: "paragraph",
      content:
        "Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀",
    },
    {
      type: "link",
      content: "jane.design/doctorcare",
    },
  ],
};
