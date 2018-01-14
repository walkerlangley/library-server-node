const db = require('./db');

db.query('DROP TABLE IF EXISTS AuthorBooks')
  .then(r => console.log('AuthorBooks dropped'))
  .catch(e => console.log('ERROR: ', e));

db.query(`DROP TABLE IF EXISTS Authors`)
  .then(r => console.log('Authors Dropped'))
  .catch(e => console.log('Error: ', e));

db.query(`DROP TABLE IF EXISTS Books`)
  .then(_ => console.log('Books Dropped!'))
  .catch(e => console.log('Error: ', e));

db.query(`DROP TABLE IF EXISTS BookStatus`)
  .then(_ => console.log('BookStatus Dropped!'))
  .catch(e => console.log('Error: ', e));

db.query(`DROP TABLE IF EXISTS Relationships`)
  .then(_ => console.log('Relationships Dropped!'))
  .catch(e => console.log('Error: ', e));

db.query(`DROP TABLE IF EXISTS RelationshipStatus`)
  .then(_ => console.log('RelationshipStatus Dropped!'))
  .catch(e => console.log('Error: ', e));

db.query(`DROP TABLE IF EXISTS Users`)
  .then(_ => console.log('Users Dropped!'))
  .catch(e => console.log('Error: ', e));

db.query(`DROP TABLE IF EXISTS UsersBooks`)
  .then(_ => console.log('UsersBooks Dropped!'))
  .catch(e => console.log('Error: ', e));

      //// Create AuthorBooks table
db.query(`CREATE TABLE \`authorBooks\` (
  \`id\` int(11) unsigned NOT NULL AUTO_INCREMENT,
  \`authorId\` int(11) DEFAULT NULL,
  \`bookId\` int(11) DEFAULT NULL,
  PRIMARY KEY (\`id\`),
  UNIQUE KEY \`AuthorBookComposite\` (\`authorId\`,\`bookId\`)
  ) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8;`)
  .then(_ => console.log('AuthorBooks Table Created'))
  .catch(e => console.log('Error: ', e))

    //// Load AuthorBooks Data
db.query(`INSERT INTO authorBooks (id, authorId, bookId)
  VALUES
    (1, 1, 1),
    (2, 2, 2),
    (3, 3, 2),
    (4, 4, 3),
    (5, 5, 4),
    (6, 6, 5),
    (7, 7, 6),
    (8, 8, 7),
    (9, 9, 8),
    (10, 10, 8),
    (11, 11, 8),
    (12, 12, 9),
    (13, 13, 10),
    (15, 13, 11),
    (14, 14, 10),
    (16, 14, 11),
    (17, 15, 12),
    (18, 15, 13),
    (19, 16, 14),
    (23, 17, 15),
    (24, 18, 16);`)
  .then(_ => console.log('AuthorBooks table data created'))
  .catch(e => console.log('Error: ', e));

    //// Create Authors Table
db.query(`CREATE TABLE authors (
  id int(11) unsigned NOT NULL AUTO_INCREMENT,
  firstName varchar(255) NOT NULL DEFAULT '',
  lastName varchar(255) NOT NULL DEFAULT '',
  PRIMARY KEY (id),
  UNIQUE KEY FirstLastComposite (firstName,lastName)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8;`)
  .then(_ => console.log('Table Authors Created'))
  .catch(e => console.log('Error: ', e));

    //// Load Authors Data
db.query(`INSERT INTO authors (id, firstName, lastName)
  VALUES
    (15, 'Adam', 'Grant'),
    (2, 'Andrew', 'Hunt'),
    (1, 'Charles', 'Petzold'),
    (3, 'David', 'Thomas'),
    (4, 'Don', 'Norman'),
    (16, 'Eric', 'Evans'),
    (7, 'Erik', 'Larson'),
    (9, 'Gene', 'Kim'),
    (12, 'Joshua', 'Foer'),
    (8, 'Ken', 'Kesey'),
    (10, 'Kevin', 'Behr'),
    (11, 'Kim', 'Spafford'),
    (18, 'Malcolm', 'Gladwell'),
    (6, 'Paulo', 'Coelho'),
    (14, 'Stephen', 'J.'),
    (5, 'Steve', 'Krug'),
    (13, 'Steven', 'D.'),
    (17, 'W.', 'Timothy');`)
  .then(_ => console.log('Authors Data Created'))
  .catch(e => console.log('Error: ', e));

    //// Create Books table
db.query(`CREATE TABLE books (
  id int(11) unsigned NOT NULL AUTO_INCREMENT,
  isbn10 varchar(255) DEFAULT NULL,
  isbn13 varchar(255) DEFAULT NULL,
  title varchar(255) NOT NULL DEFAULT '',
  subtitle varchar(255) DEFAULT NULL,
  description varchar(5000) NOT NULL DEFAULT '',
  smallThumbnail varchar(255) DEFAULT NULL,
  thumbnail varchar(255) DEFAULT NULL,
  previewLink varchar(255) DEFAULT NULL,
  infoLink varchar(255) DEFAULT NULL,
  buyLink varchar(255) DEFAULT NULL,
  publishedDate varchar(255) DEFAULT NULL,
  pageCount int(11) DEFAULT NULL,
  averageRating int(11) DEFAULT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY isbn13 (isbn13)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8;`)
  .then(_ => console.log('Books table created'))
  .catch(e => console.log('Error: ', e));

db.query(`INSERT INTO books (id, isbn10, isbn13, title, subtitle, description, smallThumbnail, thumbnail, previewLink, infoLink, buyLink, publishedDate, pageCount, averageRating)
VALUES
(1, '0735638721', '9780735638723', 'Code', 'The Hidden Language of Computer Hardware and Software', 'What do flashlights, the British invasion, black cats, and seesaws have to do with computers? In CODE, they show us the ingenious ways we manipulate language and invent new means of communicating with each other. And through CODE, we see how this ingenuity and our very human compulsion to communicate have driven the technological innovations of the past two centuries. Using everyday objects and familiar language systems such as Braille and Morse code, author Charles Petzold weaves an illuminating narrative for anyone who’s ever wondered about the secret inner life of computers and other smart machines. It’s a cleverly illustrated and eminently comprehensible story—and along the way, you’ll discover you’ve gained a real context for understanding today’s world of PCs, digital media, and the Internet. No matter what your level of technical savvy, CODE will charm you—and perhaps even awaken the technophile within.', 'http://books.google.com/books/content?id=iptCAwAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api', 'http://books.google.com/books/content?id=iptCAwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api', 'http://books.google.com/books?id=iptCAwAAQBAJ&printsec=frontcover&dq=isbn:9780735638723&hl=&cd=1&source=gbs_api', 'https://play.google.com/store/books/details?id=iptCAwAAQBAJ&source=gbs_api', 'https://play.google.com/store/books/details?id=iptCAwAAQBAJ&rdid=book-iptCAwAAQBAJ&rdot=1&source=gbs_api', '2000-10-11', 400, 5),
(2, '013211917X', '9780132119177', 'The Pragmatic Programmer', 'From Journeyman to Master', 'What others in the trenches say about The Pragmatic Programmer... “The cool thing about this book is that it’s great for keeping the programming process fresh. The book helps you to continue to grow and clearly comes from people who have been there.” —Kent Beck, author of Extreme Programming Explained: Embrace Change “I found this book to be a great mix of solid advice and wonderful analogies!” —Martin Fowler, author of Refactoring and UML Distilled “I would buy a copy, read it twice, then tell all my colleagues to run out and grab a copy. This is a book I would never loan because I would worry about it being lost.” —Kevin Ruland, Management Science, MSG-Logistics “The wisdom and practical experience of the authors is obvious. The topics presented are relevant and useful.... By far its greatest strength for me has been the outstanding analogies—tracer bullets, broken windows, and the fabulous helicopter-based explanation of the need for orthogonality, especially in a crisis situation. I have little doubt that this book will eventually become an excellent source of useful information for journeymen programmers and expert mentors alike.” —John Lakos, author of Large-Scale C++ Software Design “This is the sort of book I will buy a dozen copies of when it comes out so I can give it to my clients.” —Eric Vought, Software Engineer “Most modern books on software development fail to cover the basics of what makes a great software developer, instead spending their time on syntax or technology where in reality the greatest leverage possible for any software team is in having talented developers who really know their craft well. An excellent book.” —Pete McBreen, Independent Consultant “Since reading this book, I have implemented many of the practical suggestions and tips it contains. Across the board, they have saved my company time and money while helping me get my job done quicker! This should be a desktop reference for everyone who works with code for a living.” —Jared Richardson, Senior Software Developer, iRenaissance, Inc. “I would like to see this issued to every new employee at my company....” —Chris Cleeland, Senior Software Engineer, Object Computing, Inc. “If I’m putting together a project, it’s the authors of this book that I want. . . . And failing that I’d settle for people who’ve read their book.” —Ward Cunningham Straight from the programming trenches, The Pragmatic Programmer cuts through the increasing specialization and technicalities of modern software development to examine the core process--taking a requirement and producing working, maintainable code that delights its users. It covers topics ranging from personal responsibility and career development to architectural techniques for keeping your code flexible and easy to adapt and reuse. Read this book, and you\\'ll learn how to Fight software rot; Avoid the trap of duplicating knowledge; Write flexible, dynamic, and adaptable code; Avoid programming by coincidence; Bullet-proof your code with contracts, assertions, and exceptions; Capture real requirements; Test ruthlessly and effectively; Delight your users; Build teams of pragmatic programmers; and Make your developments more precise with automation. Written as a series of self-contained sections and filled with entertaining anecdotes, thoughtful examples, and interesting analogies, The Pragmatic Programmer illustrates the best practices and major pitfalls of many different aspects of software development. Whether you\\'re a new coder, an experienced programmer, or a manager responsible for software projects, use these lessons daily, and you\\'ll quickly see improvements in personal productivity, accuracy, and job satisfaction. You\\'ll learn skills and develop habits and attitudes that form the foundation for long-term success in your career. You\\'ll become a Pragmatic Programmer.', 'http://books.google.com/books/content?id=5wBQEp6ruIAC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api', 'http://books.google.com/books/content?id=5wBQEp6ruIAC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api', 'http://books.google.com/books?id=5wBQEp6ruIAC&printsec=frontcover&dq=isbn:9780132119177&hl=&cd=1&source=gbs_api', 'https://play.google.com/store/books/details?id=5wBQEp6ruIAC&source=gbs_api', 'https://play.google.com/store/books/details?id=5wBQEp6ruIAC&rdid=book-5wBQEp6ruIAC&rdot=1&source=gbs_api', '1999-10-20', 352, 4),
(3, '0465072992', '9780465072996', 'The Design of Everyday Things', 'Revised and Expanded Edition', 'In this entertaining and insightful analysis, cognitive scientist Don Norman hails excellence of design as the most important key to regaining the competitive edge in influencing consumer behavior. Even the smartest among us can feel inept as we fail to figure out which light switch or oven burner to turn on, or whether to push, pull, or slide a door. The fault, argues this ingenious-even liberating-book, lies not in ourselves, but in product design that ignores the needs of users and the principles of cognitive psychology. The problems range from ambiguous and hidden controls to arbitrary relationships between controls and functions, coupled with a lack of feedback or other assistance and unreasonable demands on memorization. The Design of Everyday Things shows that good, usable design is possible. The rules are simple: make things visible, exploit natural relationships that couple function and control, and make intelligent use of constraints. The goal: guide the user effortlessly to the right action on the right control at the right time. The Design of Everyday Things is a powerful primer on how-and why-some products satisfy customers while others only frustrate them.', 'http://books.google.com/books/content?id=nVQPAAAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api', 'http://books.google.com/books/content?id=nVQPAAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api', 'http://books.google.com/books?id=nVQPAAAAQBAJ&printsec=frontcover&dq=isbn:9780465072996&hl=&cd=1&source=gbs_api', 'https://play.google.com/store/books/details?id=nVQPAAAAQBAJ&source=gbs_api', 'https://play.google.com/store/books/details?id=nVQPAAAAQBAJ&rdid=book-nVQPAAAAQBAJ&rdot=1&source=gbs_api', '2013-11-05', 384, 3),
(4, '0321965515', '9780321965516', "Don\'t Make Me Think, Revisited", 'A Common Sense Approach to Web Usability', 'Offers observations and solutions to fundamental Web design problems, as well as a new chapter about mobile Web design.', 'http://books.google.com/books/content?id=qahpAgAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api', 'http://books.google.com/books/content?id=qahpAgAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api', 'http://books.google.com/books?id=qahpAgAAQBAJ&printsec=frontcover&dq=isbn:9780321965516&hl=&cd=1&source=gbs_api', 'http://books.google.com/books?id=qahpAgAAQBAJ&dq=isbn:9780321965516&hl=&source=gbs_api', NULL, '2014', 200, 4),
(5, '0062416219', '9780062416216', 'The Alchemist', NULL, "A special 25th anniversary edition of the extraordinary international bestseller, including a new Foreword by Paulo Coelho. Combining magic, mysticism, wisdom and wonder into an inspiring tale of self-discovery, The Alchemist has become a modern classic, selling millions of copies around the world and transforming the lives of countless readers across generations. Paulo Coelho\'s masterpiece tells the mystical story of Santiago, an Andalusian shepherd boy who yearns to travel in search of a worldly treasure. His quest will lead him to riches far different—and far more satisfying—than he ever imagined. Santiago\'s journey teaches us about the essential wisdom of listening to our hearts, of recognizing opportunity and learning to read the omens strewn along life\'s path, and, most importantly, to follow our dreams.", 'http://books.google.com/books/content?id=FzVjBgAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api', 'http://books.google.com/books/content?id=FzVjBgAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api', 'http://books.google.com/books?id=FzVjBgAAQBAJ&pg=PP1&dq=isbn:9780062416216&hl=&cd=1&source=gbs_api', 'https://play.google.com/store/books/details?id=FzVjBgAAQBAJ&source=gbs_api', 'https://play.google.com/store/books/details?id=FzVjBgAAQBAJ&rdid=book-FzVjBgAAQBAJ&rdot=1&source=gbs_api', '2015-02-24', 208, 3),
(6, '1410455769', '9781410455765', 'The Devil in the White City', 'Murder, Magic, and Madness at the Fair that Changed America', "An account of the Chicago World\'s Fair of 1893 relates the stories of two men who shaped the history of the event--architect Daniel H. Burnham, who coordinated its construction, and serial killer Herman Mudgett.", 'http://books.google.com/books/content?id=GBbxjwEACAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api', 'http://books.google.com/books/content?id=GBbxjwEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api', 'http://books.google.com/books?id=GBbxjwEACAAJ&dq=isbn:9781410455765&hl=&cd=1&source=gbs_api', 'http://books.google.com/books?id=GBbxjwEACAAJ&dq=isbn:9781410455765&hl=&source=gbs_api', NULL, '2013-03-08', 691, 4),
(7, '1101575271', '9781101575277', "One Flew Over the Cuckoo\'s Nest", '50th Anniversary Edition', 'A Penguin Classics Deluxe Edition of a counterculture classic with a foreword by Chuck Palahniuk Boisterous, ribald, and ultimately shattering, Ken Kesey’s 1962 novel has left an indelible mark on the literature of our time. Now in a new deluxe edition with a foreword by Chuck Palahniuk and cover by Joe Sacco, here is the unforgettable story of a mental ward and its inhabitants, especially the tyrannical Big Nurse Ratched and Randle Patrick McMurphy, the brawling, fun-loving new inmate who resolves to oppose her. We see the struggle through the eyes of Chief Bromden, the seemingly mute half-Indian patient who witnesses and understands McMurphy’s heroic attempt to do battle with the powers that keep them all imprisoned. For more than seventy years, Penguin has been the leading publisher of classic literature in the English-speaking world. With more than 1,700 titles, Penguin Classics represents a global bookshelf of the best works throughout history and across genres and disciplines. Readers trust the series to provide authoritative texts enhanced by introductions and notes by distinguished scholars and contemporary authors, as well as up-to-date translations by award-winning translators. From the Trade Paperback edition.', 'http://books.google.com/books/content?id=wCP2qgXwXdUC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api', 'http://books.google.com/books/content?id=wCP2qgXwXdUC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api', 'http://books.google.com/books?id=wCP2qgXwXdUC&printsec=frontcover&dq=isbn:9781101575277&hl=&cd=1&source=gbs_api', 'https://play.google.com/store/books/details?id=wCP2qgXwXdUC&source=gbs_api', 'https://play.google.com/store/books/details?id=wCP2qgXwXdUC&rdid=book-wCP2qgXwXdUC&rdot=1&source=gbs_api', '2012-01-19', 320, 5),
(8, '0988262584', '9780988262584', 'The Phoenix Project', 'A Novel About IT, DevOps, and Helping Your Business Win', "Bill is an IT manager at Parts Unlimited. It\'s Tuesday morning and on his drive into the office, Bill gets a call from the CEO. The company\'s new IT initiative, code named Phoenix Project, is critical to the future of Parts Unlimited, but the project is massively over budget and very late. The CEO wants Bill to report directly to him and fix the mess in ninety days or else Bill\'s entire department will be outsourced. With the help of a prospective board member and his mysterious philosophy of The Three Ways, Bill starts to see that IT work has more in common with manufacturing plant work than he ever imagined. With the clock ticking, Bill must organize work flow, streamline interdepartmental communications, and effectively serve the other business functions at Parts Unlimited. In a fast-paced and entertaining style, three luminaries of the DevOps movement deliver a story that anyone who works in IT will recognize. Readers will not only learn how to improve their own IT organizations, they\'ll never view IT the same way again.", 'http://books.google.com/books/content?id=qaRODgAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api', 'http://books.google.com/books/content?id=qaRODgAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api', 'http://books.google.com/books?id=qaRODgAAQBAJ&printsec=frontcover&dq=isbn:9780988262584&hl=&cd=1&source=gbs_api', 'https://play.google.com/store/books/details?id=qaRODgAAQBAJ&source=gbs_api', 'https://play.google.com/store/books/details?id=qaRODgAAQBAJ&rdid=book-qaRODgAAQBAJ&rdot=1&source=gbs_api', '2014-10-14', 348, 3),
(9, '1101475978', '9781101475973', 'Moonwalking with Einstein', 'The Art and Science of Remembering Everything', 'The blockbuster phenomenon that charts an amazing journey of the mind while revolutionizing our concept of memory An instant bestseller that is poised to become a classic, Moonwalking with Einstein recounts Joshua Foer\\'s yearlong quest to improve his memory under the tutelage of top \\"mental athletes.\\" He draws on cutting-edge research, a surprising cultural history of remembering, and venerable tricks of the mentalist\\'s trade to transform our understanding of human memory. From the United States Memory Championship to deep within the author\\'s own mind, this is an electrifying work of journalism that reminds us that, in every way that matters, we are the sum of our memories. From the Trade Paperback edition.', 'http://books.google.com/books/content?id=-Ac81W-ZQDEC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api', 'http://books.google.com/books/content?id=-Ac81W-ZQDEC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api', 'http://books.google.com/books?id=-Ac81W-ZQDEC&printsec=frontcover&dq=isbn:9781101475973&hl=&cd=1&source=gbs_api', 'https://play.google.com/store/books/details?id=-Ac81W-ZQDEC&source=gbs_api', 'https://play.google.com/store/books/details?id=-Ac81W-ZQDEC&rdid=book--Ac81W-ZQDEC&rdot=1&source=gbs_api', '2011-03-03', 320, 4),
(10, '1443416533', '9781443416535', 'Think Like A Freak', NULL, 'Steven Levitt and Stephen Dubner single-handedly showed the world that applying counter-intuitive approaches to everyday problems can bear surprising results. Think Like a Freak will take readers further inside this special thought process, revealing a new way of approaching the decisions we make, the plans we create and the morals we choose. It answers the question on the lips of everyone who’s read the previous books: How can I apply these ideas to my life? How do I make smarter, harder and better decisions? How can I truly think like a freak? With short, highly entertaining insights running the gamut from “The Upside of Quitting” to “How to Succeed with No Talent,” Think Like a Freak is poised to radically alter the way we think about all aspects of life on this planet.', 'http://books.google.com/books/content?id=IzGSAgAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api', 'http://books.google.com/books/content?id=IzGSAgAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api', 'http://books.google.com/books?id=IzGSAgAAQBAJ&pg=PP1&dq=isbn:9781443416535&hl=&cd=1&source=gbs_api', 'http://books.google.com/books?id=IzGSAgAAQBAJ&dq=isbn:9781443416535&hl=&source=gbs_api', NULL, '2014-05-12', 304, 4),
(11, '0062132342', '9780062132345', 'Freakonomics', 'A Rogue Economist Explores the Hidden Side of Everything', 'Which is more dangerous, a gun or a swimming pool? What do schoolteachers and sumo wrestlers have in common? How much do parents really matter? These may not sound like typical questions for an economist to ask. But Steven D. Levitt is not a typical economist. He studies the riddles of everyday life--from cheating and crime to parenting and sports--and reaches conclusions that turn conventional wisdom on its head. Freakonomics is a groundbreaking collaboration between Levitt and Stephen J. Dubner, an award-winning author and journalist. They set out to explore the inner workings of a crack gang, the truth about real estate agents, the secrets of the Ku Klux Klan, and much more. Through forceful storytelling and wry insight, they show that economics is, at root, the study of incentives--how people get what they want or need, especially when other people want or need the same thing.', 'http://books.google.com/books/content?id=wNPnl5zYA-cC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api', 'http://books.google.com/books/content?id=wNPnl5zYA-cC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api', 'http://books.google.com/books?id=wNPnl5zYA-cC&pg=PP1&dq=isbn:9780062132345&hl=&cd=1&source=gbs_api', 'http://books.google.com/books?id=wNPnl5zYA-cC&dq=isbn:9780062132345&hl=&source=gbs_api', NULL, '2011-09-20', 352, 4),
(12, '1101622849', '9781101622841', 'Give and Take', 'Why Helping Others Drives Our Success', 'A groundbreaking look at why our interactions with others hold the key to success, from the bestselling author of Originals For generations, we have focused on the individual drivers of success: passion, hard work, talent, and luck. But in today’s dramatically reconfigured world, success is increasingly dependent on how we interact with others. In Give and Take, Adam Grant, an award-winning researcher and Wharton’s highest-rated professor, examines the surprising forces that shape why some people rise to the top of the success ladder while others sink to the bottom. Praised by social scientists, business theorists, and corporate leaders, Give and Take opens up an approach to work, interactions, and productivity that is nothing short of revolutionary. From the Hardcover edition.', 'http://books.google.com/books/content?id=6IFjl3V7ByoC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api', 'http://books.google.com/books/content?id=6IFjl3V7ByoC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api', 'http://books.google.com/books?id=6IFjl3V7ByoC&printsec=frontcover&dq=isbn:9781101622841&hl=&cd=1&source=gbs_api', 'https://play.google.com/store/books/details?id=6IFjl3V7ByoC&source=gbs_api', 'https://play.google.com/store/books/details?id=6IFjl3V7ByoC&rdid=book-6IFjl3V7ByoC&rdot=1&source=gbs_api', '2013-04-09', 320, 5),
(13, '0698405773', '9780698405776', 'Originals', 'How Non-Conformists Move the World', 'The #1 New York Times bestseller that examines how people can champion new ideas—and how leaders can fight groupthink, from the author of Give and Take and co-author of Option B “Reading Originals made me feel like I was seated across from Adam Grant at a dinner party, as one of my favorite thinkers thrilled me with his insights and his wonderfully new take on the world.” —Malcolm Gladwell, author of Outliers and The Tipping Point “Originals is one of the most important and captivating books I have ever read, full of surprising and powerful ideas. It will not only change the way you see the world; it might just change the way you live your life. And it could very well inspire you to change your world.” —Sheryl Sandberg, COO of Facebook and author of Lean In With Give and Take, Adam Grant not only introduced a landmark new paradigm for success but also established himself as one of his generation’s most compelling and provocative thought leaders. In Originals he again addresses the challenge of improving the world, but now from the perspective of becoming original: choosing to champion novel ideas and values that go against the grain, battle conformity, and buck outdated traditions. How can we originate new ideas, policies, and practices without risking it all? Using surprising studies and stories spanning business, politics, sports, and entertainment, Grant explores how to recognize a good idea, speak up without getting silenced, build a coalition of allies, choose the right time to act, and manage fear and doubt; how parents and teachers can nurture originality in children; and how leaders can build cultures that welcome dissent. Learn from an entrepreneur who pitches his start-ups by highlighting the reasons not to invest, a woman at Apple who challenged Steve Jobs from three levels below, an analyst who overturned the rule of secrecy at the CIA, a billionaire financial wizard who fires employees for failing to criticize him, and a TV executive who didn’t even work in comedy but saved Seinfeld from the cutting-room floor. The payoff is a set of groundbreaking insights about rejecting conformity and improving the status quo.', 'http://books.google.com/books/content?id=Cy86CQAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api', 'http://books.google.com/books/content?id=Cy86CQAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api', 'http://books.google.com/books?id=Cy86CQAAQBAJ&printsec=frontcover&dq=isbn:9780698405776&hl=&cd=1&source=gbs_api', 'https://play.google.com/store/books/details?id=Cy86CQAAQBAJ&source=gbs_api', 'https://play.google.com/store/books/details?id=Cy86CQAAQBAJ&rdid=book-Cy86CQAAQBAJ&rdot=1&source=gbs_api', '2016-02-02', 320, 4),
(14, '0321125215', '9780321125217', 'Domain-driven Design', 'Tackling Complexity in the Heart of Software', 'Describes ways to incorporate domain modeling into software development.', 'http://books.google.com/books/content?id=xColAAPGubgC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api', 'http://books.google.com/books/content?id=xColAAPGubgC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api', 'http://books.google.com/books?id=xColAAPGubgC&printsec=frontcover&dq=isbn:0321125215&hl=&cd=1&source=gbs_api', 'http://books.google.com/books?id=xColAAPGubgC&dq=isbn:0321125215&hl=&source=gbs_api', NULL, '2004', 529, 5),
(15, '0307758850', '9780307758859', 'The Inner Game of Tennis', 'The Classic Guide to the Mental Side of Peak Performance', 'The Inner Game of Tennis is a revolutionary program for overcoming the self-doubt, nervousness, and lapses of concentration that can keep a player from winning. Now available in a revised paperback edition, this classic bestseller can change the way the game of tennis is played. From the Trade Paperback edition.', 'http://books.google.com/books/content?id=zA3GvAlJvccC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api', 'http://books.google.com/books/content?id=zA3GvAlJvccC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api', 'http://books.google.com/books?id=zA3GvAlJvccC&printsec=frontcover&dq=isbn:9780307758859&hl=&cd=1&source=gbs_api', 'https://play.google.com/store/books/details?id=zA3GvAlJvccC&source=gbs_api', 'https://play.google.com/store/books/details?id=zA3GvAlJvccC&rdid=book-zA3GvAlJvccC&rdot=1&source=gbs_api', '2010-06-30', 160, 5),
(16, '0316040347', '9780316040341', 'Outliers', 'The Story of Success', 'In this stunning bestseller, Malcolm Gladwell takes us on an intellectual journey through the world of \\"outliers\\"--the best and the brightest, the most famous and the most successful. His answer is that we pay too much attention to what successful people are like, and too little attention to where they are from: that is, their culture, their family, their generation, and the idiosyncratic experiences of their upbringing. Along the way he reveals the secrets of software billionaires like Bill Gates, why you\\'ve never heard of the smartest man in the world, why almost no star hockey players are born in the fall, why Asians are good at math, what made the Beatles the greatest rock band and, why, when it comes to plane crashes, where the pilots are from matters as much as how well they are trained. The lives of outliers follow a peculiar and unexpected logic, and in uncovering that logic, Gladwell presents a fascinating blueprint for making the most of human potential--one that transforms the way we understand success.', 'http://books.google.com/books/content?id=3NSImqqnxnkC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api', 'http://books.google.com/books/content?id=3NSImqqnxnkC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api', 'http://books.google.com/books?id=3NSImqqnxnkC&printsec=frontcover&dq=isbn:9780316040341&hl=&cd=1&source=gbs_api', 'https://play.google.com/store/books/details?id=3NSImqqnxnkC&source=gbs_api', 'https://play.google.com/store/books/details?id=3NSImqqnxnkC&rdid=book-3NSImqqnxnkC&rdot=1&source=gbs_api', '2008-11-18', 320, 4)`)
  .then(_ => console.log('Book Data Added'))
  .catch(e => console.log('Error:', e))

db.query(`CREATE TABLE bookStatus (
  id int(11) unsigned NOT NULL AUTO_INCREMENT,
  status varchar(255) DEFAULT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;`)
  .then(_ => console.log('BookStatus Table Created'))
  .catch(e => console.log('Error: ', e));

db.query(`INSERT INTO bookStatus (id, status)
VALUES
	(1, 'Not Read'),
	(2, 'Reading'),
  (3, 'Read');`)
  .then(_ => console.log('BookStatus Data Added'))
  .catch(e => console.log('Error: ', e));

db.query(`CREATE TABLE relationships (
  id int(11) unsigned NOT NULL AUTO_INCREMENT,
  userId int(11) DEFAULT NULL,
  friendId int(11) DEFAULT NULL,
  statusId tinyint(11) DEFAULT NULL,
  actionUserId int(11) DEFAULT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY UserFriendComposite (userId,friendId)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;`)
  .then(_ => console.log('Relationships table created'))
  .catch(e => console.log('Error: ', e));

db.query(`INSERT INTO relationships (id, userId, friendId, statusId, actionUserId)
VALUES
	(1, 1, 2, 2, 1),
	(2, 1, 3, 2, 1),
  (4, 2, 4, 2, 2);`)
  .then(_ => console.log('Relationships data created'))
  .catch(e => console.log('Error: ', e));

db.query(`CREATE TABLE relationshipStatus (
  id int(11) unsigned NOT NULL AUTO_INCREMENT,
  status varchar(255) DEFAULT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;`)
  .then(_ => console.log('RelationshipStatus table created'))
  .catch(e => console.log('Error: ', e));

db.query(`INSERT INTO relationshipStatus (id, status)
VALUES
	(1, 'Pending'),
	(2, 'Accepted'),
	(3, 'Declined'),
  (4, 'Blocked');`)
  .then(_ => console.log('RelationshipStatus Data Created'))
  .catch(e => console.log('Error: ', e));

db.query(`CREATE TABLE users (
  id int(11) unsigned NOT NULL AUTO_INCREMENT,
  firstName varchar(255) NOT NULL DEFAULT '',
  lastName varchar(255) NOT NULL DEFAULT '',
  username varchar(255) NOT NULL DEFAULT '',
  password varchar(255) DEFAULT NULL,
  occupation varchar(255) DEFAULT NULL,
  email varchar(255) NOT NULL DEFAULT '',
  PRIMARY KEY (id),
  UNIQUE KEY username (username)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;`)
  .then(_ => console.log('Users Table Created'))
  .catch(e => console.log('Error: ', e));

db.query(`INSERT INTO users (id, firstName, lastName, username, password, occupation, email)
VALUES
	(1, 'Walker', 'Langley', 'walkerlangley', NULL, 'Software Engineer', 'walkerlangley@gmail.com'),
	(2, 'Eva', 'Langley', 'evalangley', NULL, 'Account Supervisor', 'eva.wu808@gmail.com'),
	(3, 'Luke', 'SkyWalker', 'skywalker', NULL, 'Jedi', 'lskywalker@gmail.com'),
  (4, 'Han', 'Solo', 'hsolo', NULL, 'Pilot', 'hsolo@gmail.com');`)
  .then(_ => console.log('Users Data Created'))
  .catch(e => console.log('Error: ', e));

db.query(`CREATE TABLE usersBooks (
  id int(11) unsigned NOT NULL AUTO_INCREMENT,
  userId int(11) DEFAULT NULL,
  bookId int(11) DEFAULT NULL,
  statusId tinyint(4) DEFAULT NULL,
  notes varchar(255) DEFAULT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY UserBookComposite (userId,bookId)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8;`)
  .then(_ => console.log('UsersBooks Table Created'))
  .catch(e => console.log('Error: ', e));

db.query(`INSERT INTO usersBooks (id, userId, bookId, statusId, notes)
VALUES
  (1, 1, 1, 3, NULL),
  (2, 1, 2, 3, NULL),
  (3, 1, 3, 3, NULL),
  (4, 1, 4, 3, NULL),
  (5, 1, 5, 3, NULL),
  (6, 1, 6, 3, NULL),
  (7, 1, 7, 3, NULL),
  (8, 1, 8, 3, NULL),
  (9, 1, 9, 3, NULL),
  (10, 1, 10, 3, NULL),
  (11, 1, 11, 3, NULL),
  (12, 1, 12, 1, NULL),
  (13, 1, 13, 1, NULL),
  (14, 1, 14, 2, NULL),
  (20, 1, 15, 1, NULL),
  (21, 1, 16, 1, NULL);`)
  .then(_ => {
    console.log('UsersBooks Table Created')
    process.exit()
  })
  .catch(e => console.log('Error: ', e));






