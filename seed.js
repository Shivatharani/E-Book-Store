const mongoose = require('mongoose');
const Book = require('./models/Book');

mongoose.connect('mongodb://localhost:27017/ebook-store', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const seedBooks = [
  {
    title: 'Atomic Habits',
    description: 'An easy & proven way to build good habits & break bad ones.',
    price: 399,
    coverImage: '/images/atomic.jpg',
    author: {
      name: 'James Clear',
      bio: 'James Clear is an author and speaker focused on habits, decision-making, and continuous improvement.',
      image: '/images/jamesclear.jpg'
    }
  },
  {
    title: 'Deep Work',
    description: 'Rules for focused success in a distracted world.',
    price: 499,
    coverImage: '/images/deepwork.jpg',
    author: {
      name: 'Cal Newport',
      bio: 'Cal Newport is a computer science professor and author known for his books on productivity and digital minimalism.',
      image: '/images/calnewport.jpg'
    }
  },
  {
    title: 'Rich Dad Poor Dad',
    description: 'What the rich teach their kids about money that the poor and middle class do not!',
    price: 299,
    coverImage: '/images/richdad.jpg',
    author: {
      name: 'Robert Kiyosaki',
      bio: 'Robert T. Kiyosaki is an entrepreneur, educator, and investor who advocates financial literacy.',
      image: '/images/robertkiyosaki.jpg'
    }
  },
  {
    title: 'The Alchemist',
    description: 'A fable about following your dream.',
    price: 249,
    coverImage: '/images/alchemist.jpg',
    author: {
      name: 'Paulo Coelho',
      bio: 'Paulo Coelho is a Brazilian novelist best known for his international bestseller, The Alchemist.',
      image: '/images/paulocoelho.jpg'
    }
  },
  {
    title: 'The Power of Now',
    description: 'A guide to spiritual enlightenment.',
    price: 399,
    coverImage: '/images/now.jpg',
    author: {
      name: 'Eckhart Tolle',
      bio: 'Eckhart Tolle is a spiritual teacher and author known for The Power of Now and A New Earth.',
      image: '/images/eckharttolle.jpg'
    }
  },
  {
    title: 'Sapiens',
    description: 'A brief history of humankind.',
    price: 599,
    coverImage: '/images/sapiens.jpg',
    author: {
      name: 'Yuval Noah Harari',
      bio: 'Yuval Noah Harari is a historian and bestselling author of books on humanity and technology.',
      image: '/images/harari.jpg'
    }
  },
  {
    title: 'Can’t Hurt Me',
    description: 'Master your mind and defy the odds.',
    price: 349,
    coverImage: '/images/canthurtme.jpg',
    author: {
      name: 'David Goggins',
      bio: 'David Goggins is a retired Navy SEAL and endurance athlete known for his mental toughness.',
      image: '/images/davidgoggins.jpg'
    }
  },
  {
    title: 'Think and Grow Rich',
    description: 'The classic guide to achieving success.',
    price: 199,
    coverImage: '/images/thinkrich.jpg',
    author: {
      name: 'Napoleon Hill',
      bio: 'Napoleon Hill was a self-help author widely considered the father of personal success literature.',
      image: '/images/napoleonhill.jpg'
    }
  },
  {
    title: 'Start With Why',
    description: 'How great leaders inspire everyone to take action.',
    price: 449,
    coverImage: '/images/why.jpg',
    author: {
      name: 'Simon Sinek',
      bio: 'Simon Sinek is a leadership expert and motivational speaker best known for "Start With Why".',
      image: '/images/simonsinek.jpg'
    }
  },
  {
    title: 'Ikigai',
    description: 'The Japanese secret to a long and happy life.',
    price: 279,
    coverImage: '/images/ikigai.jpg',
    author: {
      name: 'Francesc Miralles',
      bio: 'Francesc Miralles is a Spanish author and journalist known for his books on spirituality and purpose.',
      image: '/images/francesc.jpg'
    }
  },
  {
    title: 'The Subtle Art of Not Giving a F*ck',
    description: 'A counterintuitive approach to living a good life.',
    price: 359,
    coverImage: '/images/subtle.jpg',
    author: {
      name: 'Mark Manson',
      bio: 'Mark Manson is a blogger and author known for his blunt style on happiness and success.',
      image: '/images/markmanson.jpg'
    }
  },
  {
    title: 'The Monk Who Sold His Ferrari',
    description: 'A fable about fulfilling your dreams and reaching your destiny.',
    price: 289,
    coverImage: '/images/monk.jpg',
    author: {
      name: 'Robin Sharma',
      bio: 'Robin Sharma is a Canadian writer and leadership speaker best known for his self-help books.',
      image: '/images/robinsharma.jpg'
    }
  },
  {
    title: 'The 7 Habits of Highly Effective People',
    description: 'Powerful lessons in personal change.',
    price: 399,
    coverImage: '/images/7habits.jpg',
    author: {
      name: 'Stephen R. Covey',
      bio: 'Stephen Covey was an educator and businessman, best known for his book on personal development.',
      image: '/images/stephencovey.jpg'
    }
  },
  {
    title: 'Educated',
    description: 'A memoir by Tara Westover.',
    price: 419,
    coverImage: '/images/educated.jpg',
    author: {
      name: 'Tara Westover',
      bio: 'Tara Westover is an American memoirist, essayist and historian.',
      image: '/images/tarawestover.jpg'
    }
  },
  {
    title: 'Zero to One',
    description: 'Notes on startups, or how to build the future.',
    price: 349,
    coverImage: '/images/zerotoone.jpg',
    author: {
      name: 'Peter Thiel',
      bio: 'Peter Thiel is a billionaire entrepreneur and investor who co-founded PayPal and Palantir.',
      image: '/images/peterthiel.jpg'
    }
  },
  {
    title: 'The Lean Startup',
    description: 'How today’s entrepreneurs use continuous innovation.',
    price: 379,
    coverImage: '/images/leanstartup.jpg',
    author: {
      name: 'Eric Ries',
      bio: 'Eric Ries is an entrepreneur and author of the Lean Startup methodology.',
      image: '/images/ericries.jpg'
    }
  },
  {
    title: 'Essentialism',
    description: 'The disciplined pursuit of less.',
    price: 299,
    coverImage: '/images/essentialism.jpg',
    author: {
      name: 'Greg McKeown',
      bio: 'Greg McKeown is a leadership strategist and author helping individuals focus on what truly matters.',
      image: '/images/greg.jpg'
    }
  },
  {
    title: 'Grit',
    description: 'The power of passion and perseverance.',
    price: 359,
    coverImage: '/images/grit.jpg',
    author: {
      name: 'Angela Duckworth',
      bio: 'Angela Duckworth is a psychologist and author who studies grit and self-control.',
      image: '/images/angela.jpg'
    }
  },
  {
    title: 'Hooked',
    description: 'How to build habit-forming products.',
    price: 319,
    coverImage: '/images/hooked.jpg',
    author: {
      name: 'Nir Eyal',
      bio: 'Nir Eyal is an author and behavioral design expert known for his work on product psychology.',
      image: '/images/nir.jpg'
    }
  },
  {
    title: 'Make Time',
    description: 'A practical guide to focusing on what matters every day.',
    price: 339,
    coverImage: '/images/maketime.jpg',
    author: {
      name: 'Jake Knapp',
      bio: 'Jake Knapp is the creator of the design sprint and author of Make Time.',
      image: '/images/jake.jpg'
    }
  },
  {
    title: 'Money: Master the Game',
    description: '7 simple steps to financial freedom.',
    price: 499,
    coverImage: '/images/money.jpg',
    author: {
      name: 'Tony Robbins',
      bio: 'Tony Robbins is a motivational speaker and author of several personal finance and self-help books.',
      image: '/images/tony.jpg'
    }
  },
  {
    title: 'Becoming',
    description: 'A memoir by the former First Lady of the United States.',
    price: 399,
    coverImage: '/images/becoming.jpg',
    author: {
      name: 'Michelle Obama',
      bio: 'Michelle Obama is an American attorney and author who served as First Lady of the United States.',
      image: '/images/michelle.jpg'
    }
  },
  {
    title: 'The Meaning of Everything',
    description: 'The story of the Oxford English Dictionary.',
    price: 279,
    coverImage: '/images/meaning.jpg',
    author: {
      name: 'Simon Winchester',
      bio: 'Simon Winchester is a British-American author known for his historical writing.',
      image: '/images/winchester.jpg'
    }
  },
  {
    title: 'Wings of Fire',
    description: 'An autobiography of A.P.J. Abdul Kalam.',
    price: 199,
    coverImage: '/images/wings.jpg',
    author: {
      name: 'A.P.J. Abdul Kalam',
      bio: 'Dr. Kalam was a scientist, teacher, and the 11th President of India.',
      image: '/images/kalam.jpg'
    }
  }
];

Book.deleteMany({})
  .then(() => Book.insertMany(seedBooks))
  .then(() => {
    console.log("Database seeded successfully with 25 books 📚");
    mongoose.connection.close();
  })
  .catch(err => {
    console.error("Seeding error:", err);
    mongoose.connection.close();
  });
