interface challenge {
  id: string;
  name: string;
  image: string;
}

interface challengePlaylist {
  id: string;
  name: string;
  additionalComment?: string;
  description: string;
  image: string;
  difficulty: string;
  challenges: challenge[];
  publishDate: string;
  author: string;
}

//these images are samples

const playlists: challengePlaylist[] = [
  {
    id: "1",
    name: "Beginner Playlist",
    image: "https://placehold.co/600x400",
    difficulty: "Rookie",
    description: "This is a Rookie playlist",
    additionalComment: "This is a comment",
    publishDate: "2021-01-01",
    author: "CSS Masters",
    challenges: [
      {
        id: "1",
        name: "The Basics",
        image: "https://placehold.co/600x400",
      },
      {
        id: "2",
        name: "The Basics",
        image: "https://placehold.co/600x400",
      },
      {
        id: "3",
        name: "The Basics",
        image: "https://placehold.co/600x400",
      },
      {
        id: "4",
        name: "The Basics",
        image: "https://placehold.co/600x400",
      },
      {
        id: "5",
        name: "The Basics",
        image: "https://placehold.co/600x400",
      },
      {
        id: "6",
        name: "The Basics",
        image: "https://placehold.co/600x400",
      },
      {
        id: "7",
        name: "The Basics",
        image: "https://placehold.co/600x400",
      },
    ],
  },
];

export default playlists;
