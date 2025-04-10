import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const players = [
  { firstname: 'Lionel', lastname: 'Messi', nickname: 'LaPulga' },
  { firstname: 'Cristiano', lastname: 'Ronaldo', nickname: 'CR7' },
  { firstname: 'Neymar', lastname: 'Jr', nickname: 'Ney' },
  { firstname: 'Kylian', lastname: 'Mbappe', nickname: 'KM7' },
  { firstname: 'Erling', lastname: 'Haaland', nickname: 'TheTerminator' },
  { firstname: 'Kevin', lastname: 'De Bruyne', nickname: 'KDB' },
  { firstname: 'Mohamed', lastname: 'Salah', nickname: 'EgyptianKing' },
  { firstname: 'Robert', lastname: 'Lewandowski', nickname: 'Lewy' },
  { firstname: 'Harry', lastname: 'Kane', nickname: 'HK10' },
  { firstname: 'Karim', lastname: 'Benzema', nickname: 'Benz' },
  { firstname: 'Vinicius', lastname: 'Junior', nickname: 'Vini' },
  { firstname: 'Luka', lastname: 'Modric', nickname: 'Maestro' },
  { firstname: 'Sadio', lastname: 'Mané', nickname: 'Speedster' },
  { firstname: 'Paul', lastname: 'Pogba', nickname: 'PP6' },
  { firstname: 'Antoine', lastname: 'Griezmann', nickname: 'Grizou' },
  { firstname: 'Jadon', lastname: 'Sancho', nickname: 'Sancho' },
  { firstname: 'Marcus', lastname: 'Rashford', nickname: 'Rashy' },
  { firstname: 'João', lastname: 'Felix', nickname: 'WonderKid' },
  { firstname: 'Phil', lastname: 'Foden', nickname: 'StockportIniesta' },
  { firstname: 'Jack', lastname: 'Grealish', nickname: 'JackyBoy' },
  { firstname: 'Bukayo', lastname: 'Saka', nickname: 'Starboy' },
  { firstname: 'Declan', lastname: 'Rice', nickname: 'D-Rice' },
  { firstname: 'Trent', lastname: 'Alexander-Arnold', nickname: 'TAA' },
  { firstname: 'Pedri', lastname: 'Gonzalez', nickname: 'Pedrito' },
  { firstname: 'Gavi', lastname: '', nickname: 'GoldenBoy' },
  { firstname: 'Jude', lastname: 'Bellingham', nickname: 'JB5' },
  { firstname: 'Casemiro', lastname: '', nickname: 'Wall' },
  { firstname: 'Raphaël', lastname: 'Varane', nickname: 'Rock' },
  { firstname: 'David', lastname: 'Alaba', nickname: 'Bossman' },
  { firstname: 'Thibaut', lastname: 'Courtois', nickname: 'TheWall' },
];

const cities = [
  'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai',
  'Kolkata', 'Pune', 'Ahmedabad', 'Jaipur', 'Lucknow'
];

const roles = ['Striker', 'Midfielder', 'Defender', 'Goalkeeper', 'Winger', 'CAM', 'CDM', 'Fullback'];

function getRandom<T>(arr: T[]) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getRandomAge() {
  return Math.floor(Math.random() * 10) + 18; // age 18–27
}

function getRandomExp() {
  const years = Math.floor(Math.random() * 10) + 1;
  return `${years} year${years > 1 ? 's' : ''}`;
}

async function main() {
  for (let i = 0; i < players.length; i++) {
    const player = players[i];

    const user = await prisma.userInfo.create({
      data: {
        firstname: player.firstname,
        lastname: player.lastname || 'Player',
        username: `${player.firstname.toLowerCase()}${i + 1}`,
        email: `${player.firstname.toLowerCase()}${i + 1}@example.com`,
        age: getRandomAge(),
        city: getRandom(cities),
      },
    });

    await prisma.footballProfile.create({
      data: {
        userId: user.id,
        nickname: player.nickname,
        role: getRandom(roles),
        experience: getRandomExp(),
      },
    });
  }

  console.log('Seeded 30 football players with userInfo and footballProfile');
}

main()
  .catch((e) => {
    console.error('Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
