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
  { firstname: 'Alisson', lastname: 'Becker', nickname: 'TheLung' },
  { firstname: 'Gianluigi', lastname: 'Donnarumma', nickname: 'Gigio' },
  { firstname: 'Jan', lastname: 'Oblak', nickname: 'TheMuro' },
  { firstname: 'Marc-André', lastname: 'ter Stegen', nickname: 'TerStegen' },
  { firstname: 'Jordan', lastname: 'Pickford', nickname: 'Pickers' },
  { firstname: 'Thorgan', lastname: 'Hazard', nickname: 'Thorgan' },
  { firstname: 'James', lastname: 'Maddison', nickname: 'MadDog' },
  { firstname: 'Raheem', lastname: 'Sterling', nickname: 'Raheem' },
  { firstname: 'Tammy', lastname: 'Abraham', nickname: 'BigTam' },
  { firstname: 'Philippe', lastname: 'Coutinho', nickname: 'Cout' },
  { firstname: 'Isco', lastname: 'Alarcón', nickname: 'Isco' },
  { firstname: 'Franck', lastname: 'Kessié', nickname: 'Kessie' },
  { firstname: 'Georginio', lastname: 'Wijnaldum', nickname: 'Wijnie' },
  { firstname: 'NGolo', lastname: 'Kanté', nickname: 'Kante' },
  { firstname: 'Wilfried', lastname: 'Zaha', nickname: 'Wilf' },
  { firstname: 'Timo', lastname: 'Werner', nickname: 'Timo' },
  { firstname: 'Christian', lastname: 'Pulisic', nickname: 'CFC' },
  { firstname: 'Mason', lastname: 'Mount', nickname: 'Mase' },
  { firstname: 'Declan', lastname: 'Rice', nickname: 'Ricey' },
  { firstname: 'César', lastname: 'Azpilicueta', nickname: 'Azpi' },
  { firstname: 'Benjamin', lastname: 'Mendy', nickname: 'Mendy' },
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
  // Create 50 football players
  for (let i = 0; i < 50; i++) {
    const player = players[i % players.length]; // Repeat player data to reach 50 profiles

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

  console.log('Seeded 50 football players with userInfo and footballProfile');

  // Create teams
  const createdTeams = [];
  for (let i = 0; i < 5; i++) {  // Create 5 teams
    const creatorProfile = await prisma.footballProfile.findFirst();  // Use the first profile for simplicity, can be customized
    if(creatorProfile)
    {
      
    const team = await prisma.footballTeam.create({
      data: {
        name: `Team ${i + 1}`,
        location: getRandom(cities),
        maxPlayers: 10,  // Max players per team
        createdById: creatorProfile.id,
      },
    });

    createdTeams.push(team);

    // Assign 10 random players to this team
    const playersForTeam = await prisma.footballProfile.findMany({
      where: {
        NOT: {
          userId: creatorProfile.userId, // Prevent creator from being added again
        },
      },
      take: 10,
    });

    for (const player of playersForTeam) {
      await prisma.footballTeamMember.create({
        data: {
          footballProfileId: player.id,
          footballTeamId: team.id,
        },
      });
    }
    }


    
  }

  console.log('Seeded 5 teams with players');
}

main()
  .catch((e) => {
    console.error('Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
