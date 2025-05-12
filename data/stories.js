// It is used for footer stories
const stories = [
  // 1
  {
    title: 'About me',
    slug: 'about-me',
    path: '/footer/about-me',
    paragraphs: [
      'Hello! My name is Andrew and I am an inspired and highly motivated web-developer specializing in front-end technologies.',
      'I really like coding and my main goals are, first and foremost, to do what I enjoy and to enjoy what I do. Also, to see the results of my work.',
      'In life I am a person who is consistent, responsible, hard-working and punctual. In professional life I am adaptable, approachable, easygoing and open to feedback, a person who respects subordination, able to listen carefully, and I am not afraid to ask and clarify things.',
    ],
  },
  // 2
  {
    title: 'Skills development',
    slug: 'skills-development',
    path: '/footer/skills-development',
    paragraphs: [
      'I firstly enjoyed something related to programming back when I was a kid, 9 or 10 years old. I already was into computers and games, and my good childhood friend found a program that could execute code in any app. We were spending hours upon hours trying to make it perform certain action in games to cheat our way through otherwise tedious grinds. Program itself was very basic and simple - for example, it could identify a color of a chosen pixel and based on that press some key or move or click a mouse. But in certain games it was more than sufficient to automate processes that could last several hours.',
      'As my passion for programs and games never went away, gradually my skills of automating processes improved. A while later I began to add scripts, macros and such.',
      'My first experience of web-design was way later, when I was studying in uni. During my second year there we had a course of Information Science, where the main task was to build a simple website using only HTML and CSS. We were free to choose the thematics and design, requirements were quite vague. I ended up created a news resource with several pages, image maps (to navigate users to the correct pages based on the image coords they clicked), tables (to store images, text and date of the news) and such. Also I talked my way in to use a little bit of jQuery to add drop-down menus!',
    ],
  },
  // 3
  {
    title: 'Career',
    slug: 'career',
    path: '/footer/career',
    paragraphs: [
      "After finishing unversity I spent a couple of years trying different things as a freelancer. They weren't related to programming but it was the perfect years to try new things out. Later on I joined a really small Start-up called Gamerthings', 'At Gamerthings, generally speaking, our goal was to start with an E-commerce platform that would eventually grow to social networks and other services. For almost the whole course of me being there I was a sole programmer. Prior to this moment I hadn't had much experience and hadn't worked with the project of this scale. During the development we weren't in a hurry and we valued quality, so I was able to learn via courses and internet resources to then implement what I learned in the project.",
      "It was an amazing experience and I am so grateful that it went exactly like that. Because I was able to practice a lot, never falling into so-called tutorial hell, and I was able to make mistakes, and then correct them. Now I am aware of many pitfalls that I would never know if I went from courses to some kind of team with a supervisor. I just wouldn't be on a level to make wronmg decisions to witness the consequences.",
      "After developing the website for a little more than a year the financial situation became tricky and I had to move on. It would be unethical for me to use the work I've done for my portfolio, since the Gamerthings project was never frozen nor abandoned. That's why I decided to create Loomhub. And right now I am open to new ideas and opportunities.",
    ],
  },
  // 4
  {
    title: 'Expertise',
    slug: 'expertise',
    path: '/footer/expertise',
    paragraphs: [
      "In this section I would like to just list the technologies, skills and concepts that I've had experience at (be it more or less):",
      {
        type: 'list',
        items: [
          'HTML',
          'CSS',
          'Javascript',
          'TypeScript',
          'Vue',
          'Composition API',
          'Options API',
          'Vue Router',
          'Nuxt',
          'Pinia',
          'Axios',
          'Cookies',
          'WebSockets',
          'TailwindCSS',
          'Git & GitHub',
          'MongoDB',
          'JWT',
          'Session-based auth',
          'Form Validation',
          'DevTools & Lighthouse',
          'SSR & SPA',
          'SEO basics',
          'Responsive Design',
          'REST API',
          'SMTP',
          'BEM',
          'Mobile-first',
          'Vercel',
          'Railway',
          'Nginx',
          'Prompts',
          'ChatGPT',
        ],
      },
    ],
  },

  // 5
  {
    title: 'Why Loomhub',
    slug: 'why-loomhub',
    path: '/footer/why-loomhub',
    paragraphs: [
      "Loomhub is the main project that I am able to show to the world, while other projects that I've worked on are still active an in development by other people.",
      'It felt that a single big project would allow me to go far deeper into each topic than smaller ones ever could. And it is crucial to understand how all of the things fit together: state management, routing, authentication, component communication, consistent design over pages, etc.',
      "Finally, larger projects allow you to encounter 'real' and messy problems such as inconsistent data between views, hydration mismatch, different edge cases. In large projects one has to concentrate on building scalable and maintainable solutions, not just quick fixes.",
    ],
  },
  // 6
  {
    title: 'Roadmap',
    slug: 'roadmap',
    path: '/footer/roadmap',
    paragraphs: [
     'Current state of the website is definitely far from the final stages. Getting Loomhub to a respectable state would require several steps. The remaining missing features are Cart, Checkout, Shopping history and Review writing. They are essential for making Loomhub a functioning e-commerce platform and they are also closely interconnected.',
      'The Cart system needs to allow users to add, update and remove items, and keep the selections persistent across pages. This means handling state management with Cookies or Local storage.',
      'The Checkout process is even more critical because it combines many layers: form and data validation with third-party integration for payments. A mock payment system or test-mode Stripe would be sufficient, but the structure must be flexible enough to support full integration later on.',
"Shipping history requires yet another collection on the database to store this information. It would make sense to place this feature nearby out inside profile, so it is possible to throw on a profile picture change possibility at the same time.",
"Finally, it should be possible to determine if a user had bought a certain product to allow them write a review about it. The system of keeping, showing and sorting reviews is already in place, so it would only require implementing the creation and deletion of a review.",
      'Once the core features are in place, the next milestone is optimization and polish. I want Loomhub to be fast and pleasant to use. This would require implementing lazy loading, converting images to modern formats such as WebP, paying attention to the sizes of all assets, auditing the app using Lighthouse and browser devtools and so on.', "While the basic sign up, login and session systems are presented, the processes are not exactly secure yet. Both sign up and login forms require an E-mail verification and timeouts on incorrect data submits.",
      'It would also be nice to improve accessibility: adding alt attributes and aria labels, ensuring that whole app can be navigated via keyboard and screen reader.',
    ],
  },
  // 7
  {
    title: 'Features',
    slug: 'features',
    path: '/footer/features',
    paragraphs: [
      'I believe that the best way to see features is to use the website and click around. On this website many modern web technologies and features are implemented. Some of them being: dynamic product filtering, search and sorting, reusable components, adaptive design, both static and dynamic routing, persistent authentication, etc. I also paid close attention to UI consistency so that routing, layout behavior, and state logic work together smoothly across the entire app.',
      "Using modular approach and good practices, I've tried my best to keep the codebase clean, maintainable and scalable. I've been consistent with my code placement, code behaviour, naming patterns and comments throughout whole project. Taking all of the above into consideration, I believe Loomhub to be an adequate representation of the features I can implement.",
    ],
  },
  // 8
  {
    title: 'Credits',
    slug: 'credits',
    path: '/footer/credits',
    paragraphs: [
      'I would like to thank Hamza Naeem for their amazing website design: https://www.figma.com/community/file/1273571982885059508/e-commerce-website-template-freebie.',
      'Huge thanks and deep love to my mom and friends for their everlasting support and positivity.',
      'And thanks to you, dear user, for reading this far!',
    ],
  },

  // 9
  {
    title: 'Letter',
    slug: 'letter',
    path: '/footer/letter',
    paragraphs: [
      'Closer to the bottom of almost every page you may find a component that asks for your e-mail to stay up to date to newest offers. I encourage you to try it out by typing in any real e-mail address, you shall receive an actual surprise e-mail, but nothing FISHY (I promise!).',
      "Some tips: should you have any privacy concerns you may just use any of the available temporary email services (like 10-minute-mail). Also the letter sometimes ends upin the spam folder, not entirely sure why since all of my e-mail addresses receive it normally, I haven't been able to replicate the issue.",
    ],
  },
  // 10
  {
    title: 'Sliders',
    slug: 'sliders',
    path: '/footer/sliders',
    paragraphs: [
      'There are product sliders at different pages: two at Home page (New arrivals and Top selling) and individual product page (Relevant items). Titles are fairly self-explainatory but I would like to point some aspects out anyway:',
      "These sliders take in an array of objects (products) and display data in a concise manner that is easy to digest. Sliders can display any number of product but I've chosen to stop at the limit of nine items. New arrivals slider simply shows 9 newest items and Top selling slider - 9 most sold items of all time. But Relevant items slider is a bit special - depending on the product page user is at, slider dynamically adjusts showing up to 9 items that share current product's Category, Brand, and then Clothing type. It makes sure that products are always unique and relevant.",
    ],
  },
  // 11
  {
    title: 'Filters',
    slug: 'filters',
    path: '/footer/filters',
    paragraphs: ["Filters turned out tricky to be tricky to implement right, they also made me aware of how easy components may go out of hand with multiple props and emits.", "User may choose multiple filters at once, both filters and products are updated upon each selection. Each filter option displays the number of items that match the criteria. This allows users to immediately see which combinations are still valid.", "The component takes in the list of all products, but it only works with insignificant number of total items since the filtering happens on the frontend. In real-world conditions that approach wouldn't work because of unscalability, high load times and bad user experience. The proper implementation would be a backend filtering. Frontend would only manage query and the response."],
  },
  // 12
  {
    title: 'Search',
    slug: 'search',
    path: '/footer/search',
    paragraphs: ['Search is yet another component that presented a fair amount of challenge even in its basic implementation. The core idea is simple - get the query that user types in and send it to the backend, then to look for this query with priority in the following fields: item names, item descriptions, item brands.', "When PC users are using this search it is triggered at every keystroke and it works pleasantly well in stale internet conditions. However, mobile users can often find themselves in areas where internet connection is limited, so it is not a very good idea to triggers asynchronous requests often, it inevitably leads to frustrating user experience. To address this I decided to let mobile users complete the input and only trigger search afterwards."],
  },
];

export default stories;
