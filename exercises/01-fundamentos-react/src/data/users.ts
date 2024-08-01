export interface User {
  avatarUrl: string;
  name: string;
  role: string;
}

interface Users {
  [key: string]: User;
}

export const users: Users = {
  maykbrito: {
    avatarUrl: "https://github.com/maykbrito.png",
    name: "Mayk Brito",
    role: "Educador @Rocketseat",
  },
  jessebcorreia: {
    avatarUrl: "https://github.com/jessebcorreia.png",
    name: "Jessé Bruno Correia",
    role: "Web Developer",
  },
  default: {
    avatarUrl: "https://picsum.photos/200/300",
    name: "Nome",
    role: "Usuário",
  },
};
