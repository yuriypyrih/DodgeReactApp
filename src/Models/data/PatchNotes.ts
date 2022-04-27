export const PATCH_NOTES: Array<{
  title: string;
  tag: string;
  content: string[];
}> = [
  {
    title: "Patch v1.2.5 : Backend - HotFixes",
    tag: "v1.2.5",
    content: [
      "After the deployment of the Backend Server and Database there would be complications. It would have been weird if there weren't any." +
        " But thankfully I had some time to fix them right away.",
      "- Refresh Rate throttling capping at 60fps now",
      "- Bugfix: Winning a level should now properly unlock you the next one",
      "- Bugfix: Autocomplete no longer overrides styles",
      "- Loading spinners have been added to login/register",
    ],
  },
  {
    title: "Patch v1.2 : Backend",
    tag: "v1.2",
    content: [
      "The backend integration is now live! You can now login and keep your progress stored in your account.",
      "- What a time to be alive!",
    ],
  },
  {
    title: "Patch v1.0 : Dodge is now LIVE",
    tag: "v1.0",
    content: [
      "It's been a long journey but now Dodge Game is now live on Netlify!",
    ],
  },
  {
    title: "Patch v0.2 : Levels",
    tag: "v0.2",
    content: [
      "A set of 11 playable levels. More levels are in development though. The goal is by the end of this Project scope to have at least 20 playable levels.",
    ],
  },
  {
    title: "Patch v0.1 : Foundation",
    tag: "v0.1",
    content: [
      "In 2018 I created the first demo using Java of what it's going to be the Dodge Project." +
        " In 2020 I decided to make it into a Web Application and rewrite it with JavaScript and in 2021 to rewrite it again into TypeScript.",
      "Nowadays, it works with modern JS framework like ReactJs alongside UI libraries such as Material-UI." +
        " This project, even though ambitious, it aims to work as a Portfolio piece.  Later on, I am planning to add more levels, superpowers/relics, settings, achievement system, global leaderboards, and much more!",
    ],
  },
];
